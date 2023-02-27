# Intro

Solid template built with:

- `typescript` + `eslint` + `prettier` -> boosts dev productivity
- `solid-devtools` -> debug reactivity graph
- `@solidjs/router` -> route data function, dynamic route, nested route
- `vite` + `vitest` + `@solidjs/testing-library` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `clsx` + `tailwind-merge` -> css utility class for styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/solid-query` + `@lukemorales/query-key-factory` -> data fetching
- `zod` -> schema validation

## Development

```bash
# install deps
$ pnpm install

# init msw
$ pnpm msw:init

# Runs the app
$ pnpm start
$ pnpm start:qa
$ pnpm start:prod
```

```bash
# run test
$ pnpm test

# coverage with c8
$ pnpm coverage
```

## Build

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

```bash
# build app
$ pnpm build
$ pnpm build:qa
$ pnpm build:prod
```

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
