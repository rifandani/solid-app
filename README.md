# Intro

Solid template built with:

- `typescript` + `eslint` + `prettier` -> dev productivity
- `@solid-primitives` -> common primitives (similar to custom hooks or `react-use` in React)
- `@solidjs/router` -> routing
- `vite` + `vitest` + `@solidjs/testing-library` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` + `daisyui` -> styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `redaxios` + `@tanstack/solid-query` -> data fetching
- `zod` -> schema validation
- `@felte/solid` -> form management
- `@kobalte/core` -> unstyled UI component library (similar to `radix-ui` in React)

## Development

```bash
# install deps
$ pnpm install

# init msw
$ pnpm msw:init

# Runs the app
$ pnpm start
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
```

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Notes

Todos:

- [ ] try out solidjs component compiled to web component
- [ ] solidjs inside react (?)
- [ ] fix all tests
- [x] use router routes configuration object, instead of `Routes`. Currently `v0.8.2` not possible. Using router configuration object OR separate the routes in a component breaks the app. `Uncaught Error: Make sure your app is wrapped in a <Router />`
- [x] integrate `solid-devtools`. Currently `v0.27.3` not possible. Using `"type": "module"` in `package.json` breaks the app. Importing `import 'solid-devtools'` in `index.tsx` also breaks the app.

Debugging:

```tsx
const [searchParams] = useSearchParams();
const params = () => ({ ...searchParams, limit: Number(searchParams?.limit ?? defaultLimit) });

createEffect(() =>
  console.log('🚀 ~ useTodosCreate', {
    todosQuery: { ...todosQuery },
    todoListsQueryData: queryClient.getQueryData(todoKeys.lists()),
    todoListQueryData: queryClient.getQueryData(todoKeys.list(params())), // TodoListApiResponseSchema
    todoDetailsQueryData: queryClient.getQueryData(todoKeys.details()),
    todoDetail1QueryData: queryClient.getQueryData(todoKeys.detail(1)),
    queryCache: queryClient.getQueryCache(),
  }),
);
```
