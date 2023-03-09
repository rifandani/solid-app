import { Link } from '@solidjs/router';
import { Component } from 'solid-js';

const NotFoundPage: Component = () => (
  <section class="flex h-screen flex-col items-center justify-center space-y-3 text-primary-content">
    <h1 class="text-3xl font-bold italic">404: Not Found</h1>
    <p class="!mb-5">It's gone 😞</p>

    <Link class="link-secondary link" href="/">
      Go back to home 🏡
    </Link>
  </section>
);

export default NotFoundPage;
