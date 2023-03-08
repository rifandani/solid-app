import { Route, Router, Routes } from '@solidjs/router';
import { Component, lazy, Suspense } from 'solid-js';
import { LoadingSpinner } from '../components/atoms';
import { PageWrapper } from '../components/templates';
import routeDataPost from '../pages/Post/Post.data';
import AppErrorBoundary from './ErrorBoundary.app';
import QueryProvider, { queryClient } from './QueryClient.app';
import { AppProvider } from './Store.app';

const HomePage = lazy(() => import('../pages/Home/Home.page'));
const PostPage = lazy(() => import('../pages/Post/Post.page'));
const PostAddPage = lazy(() => import('../pages/PostAdd/PostAdd.page'));
const PostsPage = lazy(() => import('../pages/Posts/Posts.page'));
const TodoPage = lazy(() => import('../pages/Todo/Todo.page'));
const LoginPage = lazy(() => import('../pages/Login/Login.page'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFound.page'));

const App: Component = () => (
  <AppErrorBoundary>
    <AppProvider>
      <QueryProvider>
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
      </QueryProvider>
    </AppProvider>
    );
  </AppErrorBoundary>
);

export default App;
