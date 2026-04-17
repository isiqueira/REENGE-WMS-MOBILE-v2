# TESTING

## Test Stack
- Test runner: Karma.
- Assertion and test framework: Jasmine.
- Angular test integration via `@angular-devkit/build-angular:karma`.
- Coverage output includes HTML and text summary reporters.

## Current Coverage Shape
- Specs exist for the root app component, tabs page, tab pages, and explore container component.
- Existing tests only assert that components can be instantiated.
- No service tests, integration tests, routing tests, or device/plugin tests exist.

## Execution Model
- Default Karma browser is Chrome.
- Watch mode is enabled by default.
- CI config disables watch and progress output.

## Risks
- Current tests will not protect behavior during a real migration from the legacy WMS app.
- There is no verification for authentication, routing rules, asset loading, plugin integration, or domain workflows.
- Placeholder tests may provide a false sense of coverage while core business functionality remains unimplemented.

## Recommended Test Priorities
- Add unit tests around authentication and persistence services once introduced.
- Add router and guard tests when protected flows are added.
- Add component tests for the migrated login flow and first operational WMS screen.
- Add E2E or device-level smoke coverage once Capacitor-native behavior is wired.

## Evidence
- `karma.conf.js`
- `angular.json`
- `src/app/**/*.spec.ts`
