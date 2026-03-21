---
name: check-engine
description: Check minimum required `node` versions based on `package.json` dependencies. For monorepo checks all discovered packages based on `workspaces` recursively.
compatibility: Requires access to the internet for `node` LTS discovery
user-invocable: true
---

## MANDATORY PREPARATION

Check minimum security supported `node` LTS based on `https://nodejs.org/download/release/index.json`.

Determine project minimum required `node` version (or versions if project has `workspaces`) by running:

```bash
npx @saashub/check-engine
```

## Execution

Suggest changing respective `package.json` definitions if current configurations is lover than discovered minimum or below lowest security supported LTS based on `https://nodejs.org/download/release/index.json`.

**IMPORTANT**: If suggested `engines` are incompatible with current environment warn user.

## Post changes actions

1. If minimum required `node` versions will change check and suggest CI and documentation changes accordingly.

2. If any changes will be made open a PR with name `bump node to minimum supported LTS`
