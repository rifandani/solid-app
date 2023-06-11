import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';
import { Navbar } from '../organisms';

const PageWrapper: Component = () => (
  <>
    <Navbar>
      <Outlet />
    </Navbar>
  </>
);

export default PageWrapper;
