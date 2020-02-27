# Escalade Open Source Tools

## All supported packages are located in `packages/`

## Legacy are non-supported packages and will not work with `yarn bootstrap`

### Steps

```bash
yarn bootstrap
cd packages/<package-name>
```

Then edit your package and you should be able to go back to the root `escalade` directory.

From there you will:

```bash
yarn new-version
yarn new-publish
```

If this doesn't work how expected you can stay in the package directory and do:

```bash
npm version <version-type> # patch | minor | major
npm publish # make sure you are logged in
```
