# Contributing Guidelines

### Contents

- [Opening an Issue](#inbox_tray-opening-an-issue)
- [Feature Requests](#love_letter-feature-requests)
- [Triaging Issues](#mag-triaging-issues)
- [Submitting Pull Requests](#repeat-submitting-pull-requests)
- [Code Review](#white_check_mark-code-review)

## :inbox_tray: Opening an Issue

Before [creating an issue](https://github.com/saashub-it/qoq/issues/new), check if you are using the latest version of the project. If you are not up-to-date, see if updating fixes your issue first.

### :lock: Reporting Security Issues

Review our [Security Policy](./SECURITY.md). **Do not** file a public issue for security vulnerabilities.

### :beetle: Bug Reports and Other Issues

A great way to contribute to the project is to send a detailed issue when you encounter a problem. We always appreciate a well-written, thorough bug report. :v:

In short, since you are most likely a developer, **provide a ticket that you would like to receive**.

- **Review the documentation** before opening a new issue.

- **Do not open a duplicate issue!** Search through existing issues to see if your issue has previously been reported. If your issue exists, comment with any additional information you have. You may simply note "I have this problem too", which helps prioritize the most common problems and requests.

- **Prefer using [reactions](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/)**, not comments, if you simply want to "+1" an existing issue.

- **Fully complete the provided issue template.** The bug report template requests all the information we need to quickly and efficiently address your issue. Be clear, concise, and descriptive. Provide as much information as you can, including steps to reproduce, stack traces, compiler errors, library versions, OS versions, and screenshots (if applicable).

- **Use [GitHub-flavored Markdown](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax).** Especially put code blocks and console outputs in backticks (```). This improves readability.

## :love_letter: Feature Requests

Feature requests are welcome! While we will consider all requests, we cannot guarantee your request will be accepted. We want to avoid [feature creep](https://en.wikipedia.org/wiki/Feature_creep). Your idea may be great, but also out-of-scope for the project. If accepted, we cannot make any commitments regarding the timeline for implementation and release. However, you are welcome to submit a pull request to help!

- **Do not open a duplicate feature request.** Search for existing feature requests first. If you find your feature (or one very similar) previously requested, comment on that issue.

- **Fully complete the provided issue template.** The feature request template asks for all necessary information for us to begin a productive conversation.

- Be precise about the proposed outcome of the feature and how it relates to existing features. Include implementation details if possible.

### Adding new config

When adding new config to QOQ make sure that it's:

1. **Useful** - covers more usecases than just Your project :think:
1. **Extends base config** - always use base config for the tool
1. **Update CLI wizard and configs** - users should be able to utilize new configuration after release

### Adding new tools

When adding new tool to QoQ make sure that it will be:

1. **Independent** - usable with and without QoQ CLI to provide flexibility to projects setup
1. **Extendable** - we can create different configs variation from base one via JS/TS
1. **Useful** - covers more usecases than just Your project :think:

## :mag: Triaging Issues

You can triage issues which may include reproducing bug reports or asking for additional information, such as version numbers or reproduction instructions. Any help you can provide to quickly resolve an issue is very much appreciated!

## :repeat: Submitting Pull Requests

We **love** pull requests! Before [forking the repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) and [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/proposing-changes-to-your-work-with-pull-requests) for non-trivial changes, it is usually best to first open an issue to discuss the changes, or discuss your intended approach for solving the problem in the comments for an existing issue.

For most contributions, after your first pull request is accepted and merged, you will be [invited to the project](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository) and given **push access**. :tada:

_Note: All contributions will be licensed under the project's license._

- **Smaller is better.** Submit **one** pull request per bug fix or feature. A pull request should contain isolated changes pertaining to a single bug fix or feature implementation. **Do not** refactor or reformat code that is unrelated to your change. It is better to **submit many small pull requests** rather than a single large one. Enormous pull requests will take enormous amounts of time to review, or may be rejected altogether.

- **Coordinate bigger changes.** For large and non-trivial changes, open an issue to discuss a strategy with the maintainers. Otherwise, you risk doing a lot of work for nothing!

- **Prioritize understanding over cleverness.** Write code clearly and concisely. Remember that source code usually gets written once and read often. Ensure the code is clear to the reader. The purpose and logic should be obvious to a reasonably skilled developer, otherwise you should add a comment that explains it.

- **Follow existing coding style and conventions.** Keep your code consistent with the style, formatting, and conventions in the rest of the code base. When possible, these will be enforced with a linter. Consistency makes it easier to review and modify in the future.

- **Include test coverage.** Add unit tests or UI tests when possible. Follow existing patterns for implementing tests.

- **Add documentation.** Document your changes with code doc comments or in existing guides.

- **Use the repo's default branch.** Branch from and [submit your pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to the repo's default branch.

- **[Resolve any merge conflicts](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/resolving-a-merge-conflict-on-github)** that occur.

- **Promptly address any CI failures**. If your pull request fails to build or pass tests, please push another commit to fix it.

- When writing comments, use properly constructed sentences, including punctuation.

## :white_check_mark: Code Review

- **Review the code, not the author.** Look for and suggest improvements without disparaging or insulting the author. Provide actionable feedback and explain your reasoning.

- **You are not your code.** When your code is critiqued, questioned, or constructively criticized, remember that you are not your code. Do not take code review personally.

- **Always do your best.** No one writes bugs on purpose. Do your best, and learn from your mistakes.

- Kindly note any violations to the guidelines specified in this document.
