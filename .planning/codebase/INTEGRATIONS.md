# INTEGRATIONS

## Current External Integrations
- Capacitor App plugin is installed.
- Capacitor Camera plugin is installed.
- Capacitor Filesystem plugin is installed.
- Capacitor Haptics plugin is installed.
- Capacitor Keyboard plugin is installed.
- Capacitor Preferences plugin is installed.
- Capacitor Status Bar plugin is installed.
- Ionicons SVG assets are copied into the build output.

## Actual Usage In Code
- No concrete service layer or plugin usage was found in `src/app`.
- Environment files only expose a `production` flag and do not define API hosts, credentials, or feature toggles.
- The only visible app-specific interaction is a stubbed `login` method that logs the in-memory user object.

## Asset Integrations
- App branding assets exist under `src/assets/imgs`, including a Mayan logo.
- Audio assets exist under `src/assets/sounds` in `mp3`, `ogg`, and `m4r` formats.
- Custom font assets are present under `src/assets/fonts`.

## Missing Or Deferred Integrations
- No HTTP client usage or backend API client exists yet.
- No authentication provider, token persistence flow, or route guard exists.
- No barcode scanner, offline storage abstraction, or sync pipeline exists in the current code.
- No analytics, crash reporting, or observability integration was found.

## Interpretation
- Dependencies indicate intended native/mobile capabilities.
- The application code has not yet wired those capabilities into domain flows.

## Evidence
- `package.json`
- `src/environments/environment.ts`
- `src/app/tabs/tabs.page.ts`
- `src/assets/`
