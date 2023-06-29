# Intro

Solid template built with:

- `typescript` + `eslint` + `prettier` -> dev productivity
- `solid-devtools` -> debug reactivity graph
- `@solid-primitives` -> common primitives (similar to custom hooks or `react-use` in React)
- `@solidjs/router` -> routing
- `vite` + `vitest` + `@solidjs/testing-library` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` + `daisyui` -> styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/solid-query` -> data fetching
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

Notes:

- upgrading `vite`, `vitest`, and `@vitest/coverage-c8` breaks the app
- using router configuration object OR separate the routes in a component breaks the app. `Uncaught Error: Make sure your app is wrapped in a <Router />`

Todos:

- [ ] `@vitest/coverage-c8` no longer maintained. Use `@vitest/coverage-istanbul` instead
- [ ] fix all tests
- [x] use more [@solid-primitives](https://primitives.solidjs.community/)
- [x] use [kobalte](https://kobalte.dev/docs/core/overview/introduction)
- [x] use API from [dummyjson](https://dummyjson.com)
- [x] use router routes configuration object, instead of `Routes`. Not possible. Even tried to
- [x] `/playground` route to showcase solid-specific API's, so that we can compare it to another framework

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
