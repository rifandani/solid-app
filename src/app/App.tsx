import { Route, Router, Routes } from '@solidjs/router';
import { Component, lazy } from 'solid-js';
import { PageWrapper } from '../components/templates';

const PostPage = lazy(() => import('../pages/post/Post.page'));
const PostsPage = lazy(() => import('../pages/post/Posts.page'));
const TodoPage = lazy(() => import('../pages/todo/Todo.page'));
const LoginPage = lazy(() => import('../pages/login/Login.page'));

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={LoginPage} />
        <Route path="/todos" component={PageWrapper}>
          <Route path="/" component={TodoPage} />
        </Route>
        <Route path="/posts" component={PageWrapper}>
          <Route path="/" component={PostsPage} />
          <Route path="/:id" component={PostPage} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
