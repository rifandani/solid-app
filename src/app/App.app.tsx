import { Route, Router, Routes } from '@solidjs/router';
import { Component, Suspense, lazy } from 'solid-js';
import routeDataPost from '../modules/post/pages/Post/Post.data';
import { LoadingSpinner } from '../modules/shared/components/atoms';
import { PageWrapper } from '../modules/shared/components/templates';
import AppErrorBoundary from './ErrorBoundary.app';
import { RootProvider, queryClient } from './Store.app';

const HomePage = lazy(() => import('../modules/home/pages/Home/Home.page'));
const PostPage = lazy(() => import('../modules/post/pages/Post/Post.page'));
const PostAddPage = lazy(() => import('../modules/post/pages/PostAdd/PostAdd.page'));
const PostsPage = lazy(() => import('../modules/post/pages/Posts/Posts.page'));
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
                  <TodoPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="/posts" component={PageWrapper}>
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
                  <PostsPage />
                </Suspense>
              }
            />
            <Route
              path="/add"
              element={
                <Suspense
                  fallback={
                    <div class="flex items-center justify-center py-16">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <PostAddPage />
                </Suspense>
              }
            />
            {/* render-as-you-fetch for dynamic routes */}
            <Route
              path="/:id"
              data={routeDataPost(queryClient)}
              element={
                <Suspense
                  fallback={
                    <div class="flex items-center justify-center py-16">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <PostPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="*" component={NotFoundPage} />
          {/* <Navigate
            href={() => {
              // navigate is the result of calling useNavigate();
              // location is the result of calling useLocation();
              // You can use those to dynamically determine a path to navigate to

              return '/';
            }}
          /> */}
        </Routes>
      </Router>
    </RootProvider>
  </AppErrorBoundary>
);

export default App;
