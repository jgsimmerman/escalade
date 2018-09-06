# New Project Boilerplate

A simple starter for new web applications, Gatsby plugins, react components, or JavaScript modules.

## Installation

```bash
git clone git@github.com:escaladesports/gatsby-boilerplate.git your-website
cd your-website
yarn
yarn reset
```

## Usage

- `yarn dev`: Starts up live development server
- `yarn build`: Builds site for production
- `yarn reset`: Changes the project name in `package.json` to match the directory, resets the version number, and resets the git history.
- `yarn env`: Pulls Netlify environment variables into a local `.env` file. (Only works if you have logged into [netlifyctl](https://github.com/netlify/netlifyctl#command-line-login) at least once and have permissions to the Netlify site)

## Preparing boilerplate to create Gatsby plugins

- Develop plugin in `./plugins/export` directory
- Change `build` script to `npm run build:plugin`