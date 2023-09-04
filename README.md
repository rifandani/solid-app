# Intro

[![DeepScan grade](https://deepscan.io/api/teams/13942/projects/24678/branches/761600/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13942&pid=24678&bid=761600)

Solid template built with:

- `vite` + `typescript` + `eslint` + `prettier` -> dev productivity
- `@solid-primitives` -> common primitives (similar to custom hooks or `react-use` in React)
- `@solidjs/router` -> routing
- `vitest` + `@solidjs/testing-library` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `daisyui` -> styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `@kobalte/core` -> unstyled UI component library (similar to `radix-ui` in React)
- `axios` + `@tanstack/solid-query` -> data fetching
- `zod` -> schema validation
- `@felte/solid` -> form management
- `@iconify-icon/solid` -> icon on demand (based on web-component)
- `type-fest` -> useful type helpers

## Development

```bash
# install deps
$ pnpm install

# init msw for browser mocking
$ pnpm msw:init

# Runs the app
$ pnpm start
```

```bash
# run test
$ pnpm test

# coverage with instanbul
$ pnpm test:coverage
```

## Build

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

```bash
# build app
$ pnpm build
```

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Notes

Todos:

- [ ] fix all tests
- [ ] add `/docs` folder, including all my decisions why or technical considerations.
- [x] use router routes configuration object, instead of `Routes`. Currently `v0.8.2` not possible. Currently, using router configuration object OR separate the routes in a component breaks the app. `Uncaught Error: Make sure your app is wrapped in a <Router />`
- [x] integrate `solid-devtools`. Currently `v0.27.3` not possible. Using `"type": "module"` in `package.json` breaks the app. Importing `import 'solid-devtools'` in `index.tsx` also breaks the app.
- [x] solidjs inside react. Currently `reactjs-solidjs-bridge` library exists, but the DX is so horrible. If we want to run both libraries side-by-side, we need to have separate Vite configs for React and Solid JSX. While both are JSX, they require different pragmas.
