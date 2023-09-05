import { Navbar } from '@shared/components/organisms';
import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';

const PageWrapper: Component = () => (
  <Navbar>
    <Outlet />
  </Navbar>
);

export default PageWrapper;
