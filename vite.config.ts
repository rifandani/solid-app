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
      coverage: {
        provider: 'c8', // 'istanbul' / 'c8'
        reporter: ['text', 'json', 'html'],
        statements: 80,
        branches: 80,
        functions: 65,
        lines: 80,
        exclude: [
          'coverage/**',
          'dist/**',
          'packages/*/test{,s}/**',
          '**/*.d.ts',
          'cypress/**',
          'test{,s}/**',
          'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
          '**/__tests__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
          '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
          // above is default
          'src/setupTests.ts',
          'src/index.tsx',
          'src/mocks/**',
          'src/assets/**',
          'src/models/**',
        ],
      },
    },
    build: {
      target: 'esnext',
    },
    resolve: {
      conditions: ['development', 'browser'],
    },
  };
});
