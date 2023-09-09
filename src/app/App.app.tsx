import LoginPage from '@auth/pages/Login/Login.page';
import NotFoundPage from '@auth/pages/NotFound/NotFound.page';
import { SuspenseWithFallbackSpinner } from '@shared/components/molecules';
import { PageWrapper } from '@shared/components/templates';
import { Route, Router, Routes } from '@solidjs/router';
import routeDataTodo from '@todo/pages/Todo/Todo.data';
import { Component, lazy } from 'solid-js';
import AppErrorBoundary from './ErrorBoundary.app';
import { RootProvider, queryClient } from './RootProvider.app';

export const LazyHomePage = lazy(() => import('../modules/home/pages/Home/Home.page'));
export const LazyPlaygroundPage = lazy(() => import('../modules/playground/pages/Playground.page'));
export const LazyTodosPage = lazy(() => import('../modules/todo/pages/Todos/Todos.page'));
export const LazyTodoPage = lazy(() => import('../modules/todo/pages/Todo/Todo.page'));

const App: Component = () => (
  <AppErrorBoundary>
    <RootProvider>
      <Router>
        <Routes>
          {/* home routes */}
          <Route path="/" component={PageWrapper}>
            <Route
              path="/"
              element={
                <SuspenseWithFallbackSpinner>
                  <LazyHomePage />
                </SuspenseWithFallbackSpinner>
              }
            />
          </Route>

          {/* login routes */}
          <Route
            path="/login"
            element={
              <SuspenseWithFallbackSpinner>
                <LoginPage />
              </SuspenseWithFallbackSpinner>
            }
          />

          {/* playground routes */}
          <Route
            path="/playground"
            element={
              <SuspenseWithFallbackSpinner>
                <LazyPlaygroundPage />
              </SuspenseWithFallbackSpinner>
            }
          />

          {/* todos routes */}
          <Route path="/todos" component={PageWrapper}>
            <Route
              path="/"
              element={
                <SuspenseWithFallbackSpinner>
                  <LazyTodosPage />
                </SuspenseWithFallbackSpinner>
              }
            />

            <Route
              path="/:id"
              data={routeDataTodo(queryClient)}
              element={
                <SuspenseWithFallbackSpinner>
                  <LazyTodoPage />
                </SuspenseWithFallbackSpinner>
              }
            />
          </Route>

          {/* not found routes */}
          <Route
            path="*"
            element={
              <SuspenseWithFallbackSpinner>
                <NotFoundPage />
              </SuspenseWithFallbackSpinner>
            }
          />
        </Routes>
      </Router>
    </RootProvider>
  </AppErrorBoundary>
);

export default App;
