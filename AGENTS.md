---
name: AGENTS
description: 'Repository-level guidance for AI agents, skills, and prompts used when working on the QoQ monorepo.'
---

## Purpose

This file provides concise, repository-level guidance for AI agents and for contributors creating skills, prompts, or instruction files. Prefer `skills/` for task-level workflows and use this document for repository-wide conventions.

## Quick commands

- Build (root): `npm run build` (runs `lerna run build` across packages)
- Test (root): `npm run test` (runs `vitest` across projects)
- Check: `npm run qoq:check`
- Fix: `npm run qoq:fix`

## Where to look

- Monorepo root: `package.json`, `lerna.json`
- Main CLI and runtime: `packages/cli`
- Package conventions and utilities: `packages/`
- Agent/Skill docs: `skills/` — contains `SKILL.md` files with task-level guidance

## Agent behaviour guidance

- Prefer existing `skills/` before creating new instructions: they encapsulate tested, repeatable workflows (see `skills/qoq/SKILL.md`).
- When proposing cross-package changes, validate by running root checks: `npm run qoq:check` and `npm run test`.

## Validation & review

- Run `npm run qoq:check` for lint/format checks and `npm run test` when code changes are proposed.
- If unsure, open a draft PR and tag maintainers listed in `CONTRIBUTING.md`.
