# Intro

Solid template built with:

- `typescript` + `eslint` + `prettier` -> boosts dev productivity
- `solid-devtools` -> debug reactivity graph
- `@solidjs/router` -> route data function, dynamic route, nested route
- `vite` + `vitest` + `@solidjs/testing-library` -> unit test, integration test, coverage
- `msw` -> browser and server mocking
- `tailwindcss` + `tailwind-merge` + `daisyui` -> css utility class for styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/solid-query` -> data fetching
- `zod` -> schema validation
- `@felte/solid` -> form management

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

- [ ] revamp navbar, and all UI's
- [ ] use more [@solid-primitives](https://primitives.solidjs.community/)
- [x] use [kobalte](https://kobalte.dev/docs/core/overview/introduction)
- [x] use API from [dummyjson](https://dummyjson.com)
- [x] use router routes configuration object, instead of `Routes`. Not possible. Even tried to separate routes as Router component, but still -> `Uncaught Error: Make sure your app is wrapped in a <Router />`
- [x] `/playground` route to showcase solid-specific API's, so that we can compare it to another framework

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

```tsx
const useTodosResource = () => {
  const [searchParams] = useSearchParams();
  const paramsObject = createMemo(
    () => JSON.parse(JSON.stringify(searchParams)) as TodoFiltersSchema,
  );

  const todosResource = createResource(paramsObject, (params) =>
    http.get('/todos', { params }).then((res) => res.data as GetTodosResponse),
  );

  return todosResource;
};
```
