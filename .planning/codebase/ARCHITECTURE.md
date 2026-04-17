# ARCHITECTURE

## High-Level Architecture
- Single Angular application using NgModule-based feature modules.
- Root app shell renders `ion-router-outlet` and delegates all navigation to the router.
- Default route lazy-loads a `TabsPageModule`.
- Tabs route defines three child routes for `tab1`, `tab2`, and `tab3`.

## Current Feature Architecture
- `tabs` acts as the effective landing experience and currently contains the only app-specific UI adaptation.
- `tab1`, `tab2`, and `tab3` remain starter pages with placeholder content.
- `explore-container` is still present from the Ionic starter template and supports placeholder tab pages.

## State And Data Flow
- No shared application state service exists.
- No domain models, repositories, or facade services exist.
- Login form state is held directly in the `TabsPage` component as a mutable object.
- The login action currently terminates in `console.log`, so there is no downstream workflow.

## Routing Model
- App routing preloads lazy modules using `PreloadAllModules`.
- Empty path redirects through the tabs shell to `/tabs/tab1`.
- There are no guards, resolvers, or role-based route constraints.

## Architectural Maturity
- The project is structurally a scaffold, not a migrated functional WMS client.
- Styling and branding show intent to port legacy behavior, but service and domain layers are absent.

## Likely Next Architecture Steps
- Introduce a core module or service layer for auth, API access, storage, and device capabilities.
- Replace starter tab placeholders with domain modules mapped to WMS workflows.
- Add route guards and persistence-backed session management.

## Evidence
- `src/app/app.module.ts`
- `src/app/app-routing.module.ts`
- `src/app/app.component.html`
- `src/app/tabs/tabs-routing.module.ts`
- `src/app/tabs/tabs.page.ts`
