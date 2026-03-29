---
name: bump
description: Identify outdated npm packages (single-package or monorepo), propose safe patch/minor updates, and guide deep-analysis for major version bumps with per-package validation steps.
compatibility: Requires `npm` (or compatible package manager), network access for registry queries, and optional test/build infrastructure for local validation.
user-invocable: true
---

## Purpose

This skill detects outdated npm packages (`npm outdated`), suggests safe updates for patch and minor releases, and provides a structured workflow for major version bumps that require deeper analysis and verification. Use it when you want an automated, conservative plan to keep dependencies healthy without introducing breaking changes silently.

## When To Use (trigger)

- "update dependencies safely"
- "bump packages"
- "audit outdated packages in monorepo"
- "prepare package updates and PRs"

Trigger this skill whenever the user asks to check for outdated npm packages or to prepare dependency bump PRs.

## Mandatory Preparation

1. Ensure `npm` (or your package manager) is installed and usable in the environment.
2. Ensure network access to the npm registry.
3. For monorepos: the repo should list workspaces in `package.json` or be discoverable by the package manager.
4. Optional but recommended: have test and build commands available for packages (e.g., `npm test`, `npm run build`).

## Execution (step-by-step)

### 1) Discover packages

- If monorepo: read the root `package.json` `workspaces` field or use the package manager to enumerate workspaces.
- Otherwise operate on the single package in the current working directory.

### 2) Get outdated list

Run:

```bash
npm outdated --json > npm-outdated.json
```

- Parse `npm-outdated.json`. It lists, per package, `current`, `wanted`, and `latest` versions.

### 3) Propose safe updates (patch & minor)

- For every dependency where `wanted` > `current` and the `wanted` change is a patch or minor bump (no major version change), propose updating to the exact `wanted` version and pin it (strict semver) in `package.json`.
- Bundle all patch/minor updates into a single PR with title: `chore: bump packages (minor/patch)` and a body summarizing packages changed and the risk rationale.
- Suggest running `npm ci` (or `npm install`) and then `npm test` for each package changed.

### 4) Identify major bumps requiring deep analysis

- If `latest` indicates a different major version (major > current.major), mark that dependency as a major candidate and _do not_ auto-bump.
- For each major candidate, perform the deep-analysis workflow below (per-package):

#### Major bump deep-analysis

1. **Collect changelog / release notes**: fetch `CHANGELOG.md`, GitHub releases, or package changelog for the range between `current` and `latest`.
2. **Identify breaking changes**: extract bullet points of removed APIs, changed behavior, and required migrations.
3. **Assess project impact**:
   - Find direct usage sites in the package's source (imports/require patterns, API usages).
   - For a monorepo, find other packages that depend on this package and assess cross-package impact.
   - List tests and components likely affected.
4. **Propose minimum changes**:
   - Code edits (small adapters or feature flags) needed to remain compatible.
   - Polyfills or shims if applicable.
   - Feature toggles or opt-in flags as a transitional strategy.
5. **Validation plan**:
   - Update `package.json` in a branch to the target major version (do not commit directly to default branch).
   - Run `npm ci` and `npm test` for the package and its dependents (for monorepos, run relevant workspace tests).
   - Run build (`npm run build`) if a build step exists.
   - If tests fail, iterate on proposed minimal edits until behavior is compatible.
6. **Decision**: if compatibility can be achieved with minimal, low-risk changes and tests pass, prepare a PR; otherwise classify as "requires migration" and propose a dedicated migration PR with scope and timeline.

### 5) PR generation & artifacts

For every planned change, prepare a PR draft (branch + patch) containing:

- A short title:
  - Bulk minor/patch: `chore: bump packages (minor/patch)`
  - Major (per-package): `chore: bump PACKAGE_NAME to vX.Y.Z`
- PR body template that includes:
  - Summary of what changed (before → after versions)
  - Risk assessment (tests, breaking APIs found)
  - Validation steps taken (commands run and results)
  - If major: migration notes and recommended reviewer list

Also generate the following artifacts in the repo root (not committed automatically unless user approves):

- `npm-outdated.json` (raw output)
- `bump-suggestions.md` — per-package suggestions with rationale and recommended `package.json` lines
- `pr-templates/` — suggested PR body files per change

### 6) Validation and final checks

- Recommend running CI for the PR branch (if available) to ensure shared CI checks pass.
- For monorepos, ensure cross-package integration tests or end-to-end builds run.
- If any suggested `engines` incompatibilities are found, warn and annotate the PR.

## Outputs

- `npm-outdated.json` (raw)
- `bump-suggestions.md` (human-readable plan)
- `pr-templates/<name>.md` (PR body suggestions)

## Safety & Warnings

- Never auto-commit major bumps without tests passing and user approval.
- Avoid bulk-major upgrades. Major bumps must be handled per-package with explicit user verification.
- If a proposed change would bump `engines.node` or other environment requirements, call it out clearly with potential impact.

## Examples / Quick Run

- Quick check (single package):

```bash
npm outdated --json > npm-outdated.json
# review npm-outdated.json and run the skill to produce bump-suggestions.md
```

- Monorepo quick flow:

```bash
# from repo root
npm install
npm outdated --json > npm-outdated.json
# run the skill to generate suggestions for each workspace
```

## Suggested prompts to invoke this skill

- "Check outdated packages and propose safe minor/patch updates"
- "Audit monorepo dependencies and prepare PR templates for bumps"
- "Identify major dependency bumps and prepare a migration plan"

## Notes / Ambiguities to confirm with user

- Policy preference: should minor/patch updates be grouped in a single bulk PR, or split per package?
- For major bumps: preferred reviewers, migration window, and whether to accept temporary feature-flags.

---

If you want, I can now:

- run `npm outdated --json` in the repo and save `npm-outdated.json`,
- generate `bump-suggestions.md` and `pr-templates/` drafts and a branch with patches, or
- propose 2 PR body templates for bulk minor/patch updates and for a per-package major bump.
