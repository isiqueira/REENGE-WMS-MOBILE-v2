# CONCERNS

## Primary Concerns
- The repository is not feature-complete enough to represent a working WMS mobile client yet.
- The current app appears to be a starter Ionic tabs scaffold with limited branding and login UI modifications.
- There is a significant gap between installed native dependencies and actual in-app integration.

## Migration Risks
- `tabs.page.html` uses older Ionic-era template attributes and markup conventions that may be partially incompatible or misleading in Ionic 8.
- `global.scss` contains large legacy-style global CSS, which can create maintenance and styling regression risk as the app grows.
- The Capacitor app id remains the generic starter value `io.ionic.starter`, which is not suitable for production identity.

## Product Risks
- No backend integration exists, so authentication and domain flows are not operational.
- No trace of core WMS modules from the older repository is present in this v2 application structure.
- No error handling, loading states, offline strategy, or persistence-backed session flow exists.

## Quality Risks
- Tests are scaffold-level only.
- No CI pipeline or explicit production hardening configuration was found beyond standard Angular build budgets.
- Route protection and authorization rules are absent.

## Architectural Risks
- Keeping starter tab structure too long may constrain future information architecture for real warehouse workflows.
- Copying legacy CSS and template patterns forward without deliberate redesign may produce brittle hybrid code.

## Recommended Focus Areas
- Establish a core application layer for API, auth, storage, and device abstractions.
- Define the first real workflow to migrate from the legacy app and implement it end-to-end.
- Normalize templates and component patterns to Ionic 8 and Angular 20 conventions.
- Replace generic Capacitor metadata and environment placeholders with project-specific configuration.

## Evidence
- `capacitor.config.ts`
- `src/app/tabs/tabs.page.html`
- `src/app/tabs/tabs.page.ts`
- `src/global.scss`
- `src/environments/environment.ts`
