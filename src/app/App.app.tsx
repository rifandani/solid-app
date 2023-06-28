import { Toast } from '@kobalte/core';
import { Route, Router, Routes } from '@solidjs/router';
import { Component, lazy } from 'solid-js';
import { Portal } from 'solid-js/web';
import { SuspenseWithFallbackSpinner } from '../modules/shared/components/molecules';
import { PageWrapper } from '../modules/shared/components/templates';
import routeDataTodo from '../modules/todo/pages/Todo/Todo.data';
import AppErrorBoundary from './ErrorBoundary.app';
import { AppRootProvider, queryClient } from './Store.app';

export const LazyHomePage = lazy(() => import('../modules/home/pages/Home/Home.page'));
export const LazyLoginPage = lazy(() => import('../modules/auth/pages/Login/Login.page'));
export const LazyTodosPage = lazy(() => import('../modules/todo/pages/Todos/Todos.page'));
export const LazyTodoPage = lazy(() => import('../modules/todo/pages/Todo/Todo.page'));
export const LazyNotFoundPage = lazy(() => import('../modules/auth/pages/NotFound/NotFound.page'));

const App: Component = () => (
  <AppErrorBoundary>
    <AppRootProvider>
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
                <LazyHomePage />
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
                <LazyNotFoundPage />
              </SuspenseWithFallbackSpinner>
            }
          />
        </Routes>

        {/* toast with portal */}
        <Portal>
          <Toast.Region duration={30_000} pauseOnInteraction swipeDirection="right">
            <Toast.List class="toast-end toast z-20 w-96" />
          </Toast.Region>
        </Portal>
      </Router>
    </AppRootProvider>
  </AppErrorBoundary>
);

export default App;
