import { Outlet } from '@solidjs/router';
import { Component } from 'solid-js';
import { Footer, Navbar } from '../organisms';

const PageWrapper: Component = () => {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default PageWrapper;
