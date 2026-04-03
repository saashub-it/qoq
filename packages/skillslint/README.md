# @saashub/skillslint

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fskillslint)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fskillslint) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fskillslint)

## Rationale

Agents skills created via Anthropics [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) are generally good and reliable. Nevertheless You can also create or edit them manually since they are just `SKILL.md` files.

To avoid common mistakes, this CLI runs predefined [textlint](https://textlint.org/docs/getting-started) and [agent-skills-cli](https://github.com/Karanjot786/agent-skills-cli) to provide both semantic and quality checks on all Your skills.

## Usage

You can install package locally eg for [QoQ](https://www.npmjs.com/package/@saashub/qoq-cli) usage or run it directly:

```bash
npx @saashub/skillslint
```

to list available options

```bash
npx @saashub/skillslint -h
```
