# STACK

## Summary
- Framework: Ionic 8 on Angular 20.
- Language: TypeScript 5.9 with strict compiler settings.
- Mobile runtime: Capacitor 8.
- Styling: SCSS with Ionic global styles and custom CSS variables.
- Testing: Jasmine + Karma.
- Linting: ESLint with angular-eslint.

## Core Dependencies
- Angular packages at `^20.0.0` for core app platform, router, forms, and browser runtime.
- `@ionic/angular` at `^8.0.0` for UI shell and Ionic routing integration.
- Capacitor packages for app shell, camera, filesystem, haptics, keyboard, preferences, and status bar.
- RxJS `~7.8.0`, Zone.js `~0.15.0`, and `tslib`.

## Tooling
- Angular CLI and build pipeline from `@angular-devkit/build-angular`.
- Ionic Angular Toolkit for schematics and Angular integration.
- ESLint 9 with Angular template and TypeScript rules.
- Karma runner with Jasmine reporter and coverage output.

## Build And Runtime Shape
- Standard Angular browser build outputs to `www`.
- Development server uses Angular dev server.
- Production swaps `src/environments/environment.ts` with `src/environments/environment.prod.ts`.
- Capacitor is configured to load the built web app from `www`.

## Evidence
- `package.json`
- `angular.json`
- `capacitor.config.ts`
- `tsconfig.json`
- `karma.conf.js`
