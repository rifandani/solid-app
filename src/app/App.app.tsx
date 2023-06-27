import { Toast } from '@kobalte/core';
import { Route, Router, Routes } from '@solidjs/router';
import { Component, Suspense, lazy } from 'solid-js';
import { Portal } from 'solid-js/web';
import { LoadingSpinner } from '../modules/shared/components/atoms';
import { PageWrapper } from '../modules/shared/components/templates';
import routeDataTodo from '../modules/todo/pages/Todo/Todo.data';
import AppErrorBoundary from './ErrorBoundary.app';
import { RootProvider, queryClient } from './Store.app';

const HomePage = lazy(() => import('../modules/home/pages/Home/Home.page'));
const TodosPage = lazy(() => import('../modules/todo/pages/Todos/Todos.page'));
const TodoPage = lazy(() => import('../modules/todo/pages/Todo/Todo.page'));
const LoginPage = lazy(() => import('../modules/auth/pages/Login/Login.page'));
const NotFoundPage = lazy(() => import('../modules/auth/pages/NotFound/NotFound.page'));

const App: Component = () => (
  <AppErrorBoundary>
    <RootProvider>
      <Router>
        <Routes>
          <Route path="/" component={PageWrapper}>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div class="flex items-center justify-center py-16">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <HomePage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <div class="flex items-center justify-center py-16">
                    <LoadingSpinner />
                  </div>
                }
              >
                <LoginPage />
              </Suspense>
            }
          />

          <Route path="/todos" component={PageWrapper}>
            <Route
              path="/"
              element={
                <Suspense
                  fallback={
                    <div class="flex items-center justify-center py-16">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <TodosPage />
                </Suspense>
              }
            />

            {/* render-as-you-fetch for dynamic routes */}
            <Route
              path="/:id"
              data={routeDataTodo(queryClient)}
              element={
                <Suspense
                  fallback={
                    <div class="flex items-center justify-center py-16">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <TodoPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="*" component={NotFoundPage} />
        </Routes>

        {/* toast */}
        <Portal>
          <Toast.Region duration={30_000} pauseOnInteraction swipeDirection="right">
            <Toast.List class="toast-end toast z-20 w-96" />
          </Toast.Region>
        </Portal>
      </Router>
    </RootProvider>
  </AppErrorBoundary>
);

export default App;
