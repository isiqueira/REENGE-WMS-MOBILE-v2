# Roadmap: Mayan Mobile

## Overview

Full 1:1 migration of Mayan WMS Mobile (Ionic 3 / Angular 5 / Cordova 7) to Ionic 8 / Angular 20 / Capacitor 8 for Android. The migration proceeds in 9 phases: first establishing the core infrastructure and authentication shell, then migrating each WMS workflow module in logical groups (inbound operations, movement operations, outbound operations, auxiliary modules), and finalizing with app identity and release configuration. All 13 legacy modules are in scope. Legacy API connections and UX behavior are preserved throughout.

## Phases

- [ ] **Phase 1: Foundation** — Core infrastructure: HTTP client, session service, base page service, app config
- [ ] **Phase 2: Auth & Navigation Shell** — Login, API URL config, version check, session guard, dashboard
- [ ] **Phase 3: Reception Module** — Full reception workflow (6 pages: orders, NFes, pallets, items)
- [ ] **Phase 4: Storage & Transfer Modules** — Inbound storage placement and inter-location transfers
- [ ] **Phase 5: Picking Module** — Order separation and item picking workflows
- [ ] **Phase 6: Inventory & Conference Modules** — Stock counting and order conference verification
- [ ] **Phase 7: Shipping & Stuffing Modules** — Outbound expedition and vehicle loading
- [ ] **Phase 8: TFA, Initial Charge & Auxiliary Queries** — Shortage/damage reports, initial stock load, location/seal queries
- [ ] **Phase 9: Settings & App Finalization** — Settings screen, app identity (ID + name), Capacitor config cleanup

## Phase Details

### Phase 1: Foundation
**Goal**: Establish the core technical infrastructure that all other phases depend on — HTTP client, session service, base page service with audio/loading/toast, and app-wide configuration.
**Depends on**: Nothing
**Requirements**: CORE-02, CORE-03, CORE-04, CORE-05, CORE-06
**Success Criteria** (what must be TRUE):
  1. An `ApiService` exists that wraps Angular HttpClient, reads base URL from Preferences, and appends UserName to all authenticated requests
  2. A `SessionService` exists that reads/writes session data from/to Capacitor Preferences under key `user-sessionWms`
  3. A `BasePageService` exists providing `newLoading()`, `presentToast()`, `presentAlert()`, `playSuccess()`, `playError()` methods
  4. The barcode focus manager (20ms interval on `.foco` inputs) is implemented as an app-level service
  5. `AppVersion` constant is defined matching legacy value "1.0.1"
**Plans**: 3 plans

Plans:
- [ ] 01-01-PLAN.md — ApiService + SessionService (HTTP layer and session persistence)
- [ ] 01-02-PLAN.md — BasePageService + audio/loading/toast utilities
- [ ] 01-03-PLAN.md — BarcodeFocusService + GlobalEnvironment constant + core module wiring

### Phase 2: Auth & Navigation Shell
**Goal**: Deliver functional login, session persistence, automatic redirect, and a dashboard page listing all 13 modules.
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, CORE-01
**Success Criteria** (what must be TRUE):
  1. User can open the app, enter username/password, and log in — session stored in Preferences
  2. App redirects automatically to dashboard if a session already exists on launch
  3. App validates app version against API on login and shows alert on mismatch
  4. User can set a custom API URL before logging in
  5. Dashboard displays all 13 WMS module tiles and routes exist for each
  6. User can log out — session cleared, redirected to login
**Plans**: TBD

Plans:
- [ ] 02-01-PLAN.md — AuthProvider + LoginPage (login form, API URL config, version check)
- [ ] 02-02-PLAN.md — Session guard + app router + DashPage (module navigation menu)

### Phase 3: Reception Module
**Goal**: Deliver the full reception workflow — list orders, view NFes, manage pallets and items.
**Depends on**: Phase 2
**Requirements**: REC-01, REC-02, REC-03, REC-04, REC-05, REC-06, REC-07
**Success Criteria** (what must be TRUE):
  1. User can view and search/filter the list of reception orders
  2. User can select an order and view its linked NFes
  3. User can create a master pallet with vehicle/truck association and seal generation
  4. User can create unit pallets linked to a master pallet
  5. User can add/remove items (by SKU and quantity) to unit pallets
  6. User can view all pallets on an active reception order
**Plans**: TBD

Plans:
- [ ] 03-01-PLAN.md — ReceptionProvider + ReceptionPage (order list + search)
- [ ] 03-02-PLAN.md — ReceptionNfesPage + ReceptionPalletsPage
- [ ] 03-03-PLAN.md — ReceptionPalletsCreatePage + ReceptionPalletsItensPage + ReceptionPalletsItensCreateUnitaryPage

### Phase 4: Storage & Transfer Modules
**Goal**: Deliver storage placement and inter-location transfer workflows.
**Depends on**: Phase 2
**Requirements**: STOR-01, STOR-02, STOR-03, STOR-04, TRAN-01, TRAN-02, TRAN-03
**Success Criteria** (what must be TRUE):
  1. User can view and process pending storage operations (scan product → assign location → confirm)
  2. User can view and process transfer operations (select origin → select destination → confirm)
**Plans**: TBD

Plans:
- [ ] 04-01-PLAN.md — StorageProvider + Storage pages (list + operation flow)
- [ ] 04-02-PLAN.md — TransferProvider + Transfer pages (list + operation flow)

### Phase 5: Picking Module
**Goal**: Deliver the picking (order separation) workflow end-to-end.
**Depends on**: Phase 2
**Requirements**: PICK-01, PICK-02, PICK-03, PICK-04
**Success Criteria** (what must be TRUE):
  1. User can view pending picking orders
  2. User can process each pick item (scan location → scan product → confirm quantity)
  3. User can complete a picking order
**Plans**: TBD

Plans:
- [ ] 05-01-PLAN.md — PickingProvider + Picking pages (list + pick flow)

### Phase 6: Inventory & Conference Modules
**Goal**: Deliver inventory counting and conference verification workflows.
**Depends on**: Phase 2
**Requirements**: INV-01, INV-02, INV-03, CONF-01, CONF-02, CONF-03
**Success Criteria** (what must be TRUE):
  1. User can view inventory tasks, count items at a location, and submit results
  2. User can view conference tasks, scan and confirm items, and submit conference results
**Plans**: TBD

Plans:
- [ ] 06-01-PLAN.md — InventoryProvider + Inventory pages
- [ ] 06-02-PLAN.md — ConferenceProvider + Conference pages

### Phase 7: Shipping & Stuffing Modules
**Goal**: Deliver outbound expedition and vehicle loading workflows.
**Depends on**: Phase 2
**Requirements**: SHIP-01, SHIP-02, SHIP-03, STUFF-01, STUFF-02, STUFF-03
**Success Criteria** (what must be TRUE):
  1. User can view, process, and confirm shipping (expedition) orders
  2. User can view, process, and confirm vehicle stuffing (loading) operations
**Plans**: TBD

Plans:
- [ ] 07-01-PLAN.md — ShippingProvider + Shipping pages
- [ ] 07-02-PLAN.md — StuffingProvider + Stuffing pages

### Phase 8: TFA, Initial Charge & Auxiliary Queries
**Goal**: Deliver TFA reporting, initial stock charge, and auxiliary query screens (location/seal lookups).
**Depends on**: Phase 2
**Requirements**: TFA-01, TFA-02, TFA-03, INIT-01, QRY-01, QRY-02
**Success Criteria** (what must be TRUE):
  1. User can create, fill, and submit a TFA (shortage/damage) record linked to a reception
  2. User can perform an initial charge operation
  3. User can query location and seal information by barcode/code
**Plans**: TBD

Plans:
- [ ] 08-01-PLAN.md — TfaProvider + TFA pages
- [ ] 08-02-PLAN.md — InitialChargeProvider + pages + QueriesProvider + pages

### Phase 9: Settings & App Finalization
**Goal**: Deliver the settings screen and finalize app identity — App ID, display name, Capacitor config, and release-ready metadata.
**Depends on**: Phase 2
**Requirements**: SET-01, SET-02, SET-03, CORE-07
**Success Criteria** (what must be TRUE):
  1. User can view and update API URL, toggle keyboard-hide setting, and log out from Settings page
  2. Capacitor app ID is `com.reenge.mayanwms` and display name is "Mayan Mobile"
  3. App builds without placeholder metadata
**Plans**: TBD

Plans:
- [ ] 09-01-PLAN.md — SettingsProvider + SettingsPage
- [ ] 09-02-PLAN.md — Capacitor config finalization (app ID, name, version)

## Progress

**Execution Order:**
Phases 3–8 depend only on Phase 2 (can plan in parallel after Phase 2 ships). Phase 9 is independent cleanup.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/3 | Not started | - |
| 2. Auth & Navigation Shell | 0/2 | Not started | - |
| 3. Reception Module | 0/3 | Not started | - |
| 4. Storage & Transfer | 0/2 | Not started | - |
| 5. Picking Module | 0/1 | Not started | - |
| 6. Inventory & Conference | 0/2 | Not started | - |
| 7. Shipping & Stuffing | 0/2 | Not started | - |
| 8. TFA, Initial Charge & Queries | 0/2 | Not started | - |
| 9. Settings & Finalization | 0/2 | Not started | - |
