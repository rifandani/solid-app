/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import devtools from 'solid-devtools/vite';
import { defineConfig, PluginOption } from 'vite';
import eslint from 'vite-plugin-eslint';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] | undefined = [
    solid(),
    {
      // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: 'build',
    },
  ];

  if (mode === 'development')
    plugins.unshift(
      devtools({
        /* additional options */
        autoname: true, // e.g. enable autoname
        // pass `true` or an object with options
        locator: {
          targetIDE: 'vscode',
          componentLocation: true,
          jsxLocation: true,
        },
      }),
    );

  return {
    plugins,
    server: {
      port: 5000,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      transformMode: { web: [/\.[jt]sx?$/] },
      setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect.js', 'src/setupTests.ts'],
      // Will call .mockRestore() on all spies before each test. This will clear mock history and reset its implementation to the original one.
      restoreMocks: true,
      // otherwise, solid would be loaded twice:
      deps: { registerNodeLoader: true },
      // if you have few tests, try commenting one
      // or both out to improve performance:
      // threads: false,
      // isolate: false,
    },
    build: {
      target: 'esnext',
    },
    resolve: {
      conditions: ['development', 'browser'],
    },
  };
});
