# Requirements: Mayan Mobile

**Defined:** 2026-04-06
**Core Value:** All 13 WMS workflow modules must be fully functional and connected to the Mayan WMS API.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Core Infrastructure

- [ ] **CORE-01**: App has a navigable dashboard shell listing all available WMS workflow modules
- [ ] **CORE-02**: App plays audio feedback (success sound) on successful scanner operations
- [ ] **CORE-03**: App plays audio feedback (error sound) on failed scanner operations
- [ ] **CORE-04**: App maintains focus on barcode input fields during active scanning workflows (20ms interval pattern)
- [ ] **CORE-05**: HTTP client sends UserName on all authenticated API requests
- [ ] **CORE-06**: HTTP client uses configurable API base URL (stored in Preferences key `apiUrl-sessionWms`)
- [ ] **CORE-07**: App ID is `com.reenge.mayanwms` and display name is "Mayan Mobile"

### Authentication

- [ ] **AUTH-01**: User can log in with username and password
- [ ] **AUTH-02**: User can configure the API base URL before or after login
- [ ] **AUTH-03**: App validates app version compatibility with the API on login and alerts user on mismatch
- [ ] **AUTH-04**: Session persists across app restarts — user is redirected to dashboard automatically if session exists
- [ ] **AUTH-05**: User can log out, clearing session and returning to login screen

### Reception

- [ ] **REC-01**: User can view the list of pending and in-progress reception orders
- [ ] **REC-02**: User can search and filter reception orders by code/date
- [ ] **REC-03**: User can view NFes (invoices) linked to a selected reception order
- [ ] **REC-04**: User can create a master pallet for a reception order (with vehicle/truck link and seal generation)
- [ ] **REC-05**: User can create unit pallets linked to a master pallet
- [ ] **REC-06**: User can add and remove items (SKUs with quantities) to/from unit pallets
- [ ] **REC-07**: User can view the list of existing pallets on a reception order

### Storage

- [ ] **STOR-01**: User can view pending storage operations
- [ ] **STOR-02**: User can select a product for storage (via scan or list)
- [ ] **STOR-03**: User can assign a destination storage location to a product
- [ ] **STOR-04**: User can confirm the storage operation

### Picking

- [ ] **PICK-01**: User can view pending picking (separation) orders
- [ ] **PICK-02**: User can process item picking by scanning location and product
- [ ] **PICK-03**: User can confirm picked quantities per item
- [ ] **PICK-04**: User can complete a picking order

### Transfer

- [ ] **TRAN-01**: User can view pending transfer operations
- [ ] **TRAN-02**: User can select origin and destination locations for a transfer
- [ ] **TRAN-03**: User can confirm a transfer operation

### Inventory

- [ ] **INV-01**: User can view inventory counting tasks
- [ ] **INV-02**: User can count items at a given location
- [ ] **INV-03**: User can submit inventory count results

### Shipping (Expedição)

- [ ] **SHIP-01**: User can view pending shipping orders
- [ ] **SHIP-02**: User can process items for shipping
- [ ] **SHIP-03**: User can confirm a shipping operation

### Stuffing (Carregamento)

- [ ] **STUFF-01**: User can view pending stuffing (vehicle loading) operations
- [ ] **STUFF-02**: User can load items/pallets into vehicles
- [ ] **STUFF-03**: User can confirm stuffing completion

### Conference

- [ ] **CONF-01**: User can view items to be verified in a conference task
- [ ] **CONF-02**: User can scan and confirm items during conference
- [ ] **CONF-03**: User can submit conference results

### TFA (Termo de Falta ou Avaria)

- [ ] **TFA-01**: User can create a shortage or damage report (TFA) linked to a reception operation
- [ ] **TFA-02**: User can specify TFA type (shortage or damage) and affected quantities
- [ ] **TFA-03**: User can submit the TFA record

### Initial Charge

- [ ] **INIT-01**: User can perform initial stock charge operations (first inventory load into the system)

### Auxiliary Queries

- [ ] **QRY-01**: User can query location information by barcode or code
- [ ] **QRY-02**: User can query seal (lacre) information

### Settings

- [ ] **SET-01**: User can update the API base URL from the settings screen
- [ ] **SET-02**: User can toggle the keyboard hide/show setting (suppress virtual keyboard during hardware scanner use)
- [ ] **SET-03**: User can log out from the settings screen

## v2 Requirements

Deferred to future release.

### Scanner Integration

- **SCAN-01**: App integrates with physical Bluetooth/USB barcode scanners
- **SCAN-02**: App automatically routes scanner input to the correct focused field without camera

### Security

- **SEC-01**: Session data stored in encrypted (secure) storage instead of plain Preferences
- **SEC-02**: HTTPS enforced for all API communication (HTTP rejected)
- **SEC-03**: Certificate pinning for Mayan WMS API domain

### Platform

- **PLAT-01**: iOS build configured and functional

## Out of Scope

| Feature | Reason |
|---------|--------|
| iOS build | Android only for this milestone |
| UI redesign | Keeping legacy behavior and visual patterns — no UX changes |
| OAuth / JWT authentication | Keeping existing username/password + session token pattern |
| Hardware barcode scanner (v1) | Camera-based input preserved; HW scanner integration deferred to v2 |
| Encrypted/secure storage (v1) | Capacitor Preferences used as localStorage equivalent; encryption deferred |
| HTTPS enforcement (v1) | API URL is runtime-configurable; TLS enforcement deferred |
| Offline mode / sync | Requires API contract changes outside current scope |
| Analytics / crash reporting | Not in initial release |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CORE-01 | Phase 2 | Pending |
| CORE-02 | Phase 1 | Pending |
| CORE-03 | Phase 1 | Pending |
| CORE-04 | Phase 1 | Pending |
| CORE-05 | Phase 1 | Pending |
| CORE-06 | Phase 1 | Pending |
| CORE-07 | Phase 9 | Pending |
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| AUTH-04 | Phase 2 | Pending |
| AUTH-05 | Phase 2 | Pending |
| REC-01 | Phase 3 | Pending |
| REC-02 | Phase 3 | Pending |
| REC-03 | Phase 3 | Pending |
| REC-04 | Phase 3 | Pending |
| REC-05 | Phase 3 | Pending |
| REC-06 | Phase 3 | Pending |
| REC-07 | Phase 3 | Pending |
| STOR-01 | Phase 4 | Pending |
| STOR-02 | Phase 4 | Pending |
| STOR-03 | Phase 4 | Pending |
| STOR-04 | Phase 4 | Pending |
| TRAN-01 | Phase 4 | Pending |
| TRAN-02 | Phase 4 | Pending |
| TRAN-03 | Phase 4 | Pending |
| PICK-01 | Phase 5 | Pending |
| PICK-02 | Phase 5 | Pending |
| PICK-03 | Phase 5 | Pending |
| PICK-04 | Phase 5 | Pending |
| INV-01 | Phase 6 | Pending |
| INV-02 | Phase 6 | Pending |
| INV-03 | Phase 6 | Pending |
| CONF-01 | Phase 6 | Pending |
| CONF-02 | Phase 6 | Pending |
| CONF-03 | Phase 6 | Pending |
| SHIP-01 | Phase 7 | Pending |
| SHIP-02 | Phase 7 | Pending |
| SHIP-03 | Phase 7 | Pending |
| STUFF-01 | Phase 7 | Pending |
| STUFF-02 | Phase 7 | Pending |
| STUFF-03 | Phase 7 | Pending |
| TFA-01 | Phase 8 | Pending |
| TFA-02 | Phase 8 | Pending |
| TFA-03 | Phase 8 | Pending |
| INIT-01 | Phase 8 | Pending |
| QRY-01 | Phase 8 | Pending |
| QRY-02 | Phase 8 | Pending |
| SET-01 | Phase 9 | Pending |
| SET-02 | Phase 9 | Pending |
| SET-03 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 49 total
- Mapped to phases: 49
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-06*
*Last updated: 2026-04-06 after initialization*
