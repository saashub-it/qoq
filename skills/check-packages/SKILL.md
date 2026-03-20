---
name: check-packages
description: Check npm packages for possible updates, suggest compatibile updates, warn about major tech debt. 
---

# Run packages checks

To gather all outdated packages start with running
```bash
npm outdated
```

## Minor and patch updates 

1. Suggest bumping all minor and patch changes in packages as it should be safe.
2. Avoid bumping packages that requires engines (based on `package.json`) incompatible with current environment.
3. If any changes will be made open a PR with name `chore: packages bump`

## Major updates

1. For every package separately check for changelog as a context
2. Avoid bumping packages that requires engines (based on `package.json`) incompatible with current environment.
3. Check package usage in current project and search for incompatibilities
4. Propose PR to each package bump separetelly that will contain only minimum number of changes required for new version. 

### Health checks after every update

1. If possible run test cases in project to verify if bump didn't brake them.
2. If possible build project to ensure bump didn't brake it.