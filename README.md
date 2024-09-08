# GearWFM README

[GearWFM Homepage](https://www.gearwfm.com)

## Scripts

```bash
npm run dev
```

```bash
npm run dev:inspect
```

```bash
npm run dev:local
```

```bash
npm run build
```

```bash
npm run start
```

```bash
npm run lint
```

```bash
npm run format
```

```bash
npm run check
```

```bash
npm run prepare
```

```bash
npm run postinstall
```

```bash
npm run studio
```

These scripts are defined in the `package.json` file.

## Commits

This project has been configured with the following:

-   commitlint
-   eslint
-   husky
-   prettier

This is to ensure every developer working on this project is held to the same coding standards.<br />
For details on conventional commits, please see [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Also, to understand how this project has been configured for commits, take a look at the code in the following files:

-   .husky
    -   commit-msg
    -   pre-commit
    -   pre-push
-   eslint.config.js
-   .prettierignore
-   commitlint.config.mjs
-   prettier.config.cjs

### Commit Messages

| Commit Type    | Description                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `build:`       | Changes that effect the build system or external dependencies (example: gulp, broccoli, npm)                    |
| `ci:`          | Changes to CI configuration files and scripts (example: Travis, Circle, BrowserStack, SauceLabs)                |
| `docs:`        | Documentation changes                                                                                           |
| `feature:`     | New feature                                                                                                     |
| `fix:`         | Bug fix                                                                                                         |
| `performance:` | Code changes that improve performance                                                                           |
| `refactor:`    | Code changes that neither fixes a bug nor adds a feature                                                        |
| `style:`       | Changes that do not affect the meaning of the code (example: white-space, formatting, missing semi-colons, etc) |
| `test:`        | Adding or fixing tests                                                                                          |

### Examples:

```
git commit -m "build: update dependencies"
git commit -m "feature: add new feature"
```
