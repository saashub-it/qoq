---
name: check-engine
description: Check minimum required `node` versions based on `package.json` dependencies. For monorepo checks all discovered packages based on `workspaces` recursively. 
---

1. Run shell `npx @saashub/check-engine` to determine project minimum required `node` version (or versions if project has `workspaces`).
2. Suggest changing respective `package.json` definitions if current configurations is lover than discovered minimum or below lowest security supported LTS based on `https://nodejs.org/download/release/index.json`.
3. If suggested `engines` are incompatible with current environment warn user.
4. If minimum required `node` versions will change check and suggest CI and documentation changes accordingly.
5. If any changes will be made open a PR with name `bump node to minimum supported LTS`