---
name: check-packages
description: Check npm packages for possible updates, suggest compatibile updates, warn about major tech debt. 
user-invocable: true
---

## MANDATORY PREPARATION

Check outdated packages by running:
```bash
npm outdated
```

## Execution

Propose solution that updates any outdated packages to latest version.

**IMPORTANT**: Preffer strict versions in `package.json`.

### Minor and patch updates 

1. Suggest bumping all minor and patch changes in packages in one bulk.
2. If any changes will be made open a PR with description `chore: packages bump`

**IMPORTANT**: Avoid bumping packages that requires engines (based on `package.json`) incompatible with current environment

### Major updates

For every package separately use changelog / docs as a context. Prepare a migration plan:

1. **Identify breaking changes**:
   - What was added?
   - What was removed?
   - What functionalities changed their interface?
2. **Assess project impact**:
   - What components use removed features?
   - What components use changed functionalities?
3. **Propose changes**:
   - Use **minimum** code required new version to run.
   - Adjust test if they exsist. 

**IMPORTANT**: Avoid bumping packages that requires engines (based on `package.json`) incompatible with current environment.

**CRITICAL**: Propose PR to each major package bump **separetelly** with description pattern `chore: bump PACKAGE_NAME to version PACKAGE_VERSION` where uppercase variables corespond to current package properties.

## Health checks after updates

1. Identify if project has tests, run them if possible.
2. Identify how to build current project and do it.

**CRITICAL**: Every major package update needs separate health check

## Final touch

Check engines compatibility, preffer `/check-engine` from {{available_commands}}.
