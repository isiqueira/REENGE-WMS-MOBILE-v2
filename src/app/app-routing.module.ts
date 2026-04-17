import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'dash',
    loadChildren: () => import('./pages/dash/dash.module').then(m => m.DashPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./pages/configuration/configuration.module').then(m => m.ConfigurationPageModule),
    canActivate: [AuthGuard],
  },
  // Reception
  {
    path: 'reception',
    loadChildren: () =>
      import('./pages/reception/reception.module').then(m => m.ReceptionPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reception-nfes',
    loadChildren: () =>
      import('./pages/reception/reception-nfes/reception-nfes.module').then(
        m => m.ReceptionNfesPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reception-pallets',
    loadChildren: () =>
      import('./pages/reception/reception-pallets/reception-pallets.module').then(
        m => m.ReceptionPalletsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reception-pallets-create',
    loadChildren: () =>
      import('./pages/reception/reception-pallets-create/reception-pallets-create.module').then(
        m => m.ReceptionPalletsCreatePageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reception-pallets-itens',
    loadChildren: () =>
      import('./pages/reception/reception-pallets-itens/reception-pallets-itens.module').then(
        m => m.ReceptionPalletsItensPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reception-pallets-itens-create-unitary',
    loadChildren: () =>
      import(
        './pages/reception/reception-pallets-itens-create-unitary/reception-pallets-itens-create-unitary.module'
      ).then(m => m.ReceptionPalletsItensCreateUnitaryPageModule),
    canActivate: [AuthGuard],
  },
  // Storage
  {
    path: 'storage',
    loadChildren: () =>
      import('./pages/storage/storage.module').then(m => m.StoragePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'storage-task-lists',
    loadChildren: () =>
      import('./pages/storage/storage-task-lists/storage-task-lists.module').then(
        m => m.StorageTaskListsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'storage-tasks',
    loadChildren: () =>
      import('./pages/storage/storage-tasks/storage-tasks.module').then(
        m => m.StorageTasksPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'storage-confirm',
    loadChildren: () =>
      import('./pages/storage/storage-confirm/storage-confirm.module').then(
        m => m.StorageConfirmPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'storage-conclude',
    loadChildren: () =>
      import('./pages/storage/storage-conclude/storage-conclude.module').then(
        m => m.StorageConcludePageModule,
      ),
    canActivate: [AuthGuard],
  },
  // Picking
  {
    path: 'picking',
    loadChildren: () =>
      import('./pages/picking/picking.module').then(m => m.PickingPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'picking-task-lists',
    loadChildren: () =>
      import('./pages/picking/picking-task-lists/picking-task-lists.module').then(
        m => m.PickingTaskListsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'picking-tasks',
    loadChildren: () =>
      import('./pages/picking/picking-tasks/picking-tasks.module').then(
        m => m.PickingTasksPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'picking-item',
    loadChildren: () =>
      import('./pages/picking/picking-item/picking-item.module').then(
        m => m.PickingItemPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'picking-storage-confirm',
    loadChildren: () =>
      import('./pages/picking/picking-storage-confirm/picking-storage-confirm.module').then(
        m => m.PickingStorageConfirmPageModule,
      ),
    canActivate: [AuthGuard],
  },
  // Transfer
  {
    path: 'transfer',
    loadChildren: () =>
      import('./pages/transfer/transfer.module').then(m => m.TransferPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'transfer-tasks',
    loadChildren: () =>
      import('./pages/transfer/transfer-tasks/transfer-tasks.module').then(
        m => m.TransferTasksPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'transfer-actions',
    loadChildren: () =>
      import('./pages/transfer/transfer-actions/transfer-actions.module').then(
        m => m.TransferActionsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'transfer-collect',
    loadChildren: () =>
      import('./pages/transfer/transfer-collect/transfer-collect.module').then(
        m => m.TransferCollectPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'transfer-storage',
    loadChildren: () =>
      import('./pages/transfer/transfer-storage/transfer-storage.module').then(
        m => m.TransferStoragePageModule,
      ),
    canActivate: [AuthGuard],
  },
  // Inventory
  {
    path: 'inventory',
    loadChildren: () =>
      import('./pages/inventory/inventory.module').then(m => m.InventoryPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory-task-lists',
    loadChildren: () =>
      import('./pages/inventory/inventory-task-lists/inventory-task-lists.module').then(
        m => m.InventoryTaskListsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory-masters',
    loadChildren: () =>
      import('./pages/inventory/inventory-masters/inventory-masters.module').then(
        m => m.InventoryMastersPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'inventory-childrens',
    loadChildren: () =>
      import('./pages/inventory/inventory-childrens/inventory-childrens.module').then(
        m => m.InventoryChildrensPageModule,
      ),
    canActivate: [AuthGuard],
  },
  // Conference
  {
    path: 'conference',
    loadChildren: () =>
      import('./pages/conference/conference.module').then(m => m.ConferencePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'conference-pallets',
    loadChildren: () =>
      import('./pages/conference/conference-pallets/conference-pallets.module').then(
        m => m.ConferencePalletsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'conference-pallets-itens',
    loadChildren: () =>
      import('./pages/conference/conference-pallets-itens/conference-pallets-itens.module').then(
        m => m.ConferencePalletsItensPageModule,
      ),
    canActivate: [AuthGuard],
  },
  // Shipping
  {
    path: 'shipping',
    loadChildren: () =>
      import('./pages/shipping/shipping.module').then(m => m.ShippingPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'shipping-tasks',
    loadChildren: () =>
      import('./pages/shipping/shipping-tasks/shipping-tasks.module').then(
        m => m.ShippingTasksPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'shipping-conference',
    loadChildren: () =>
      import('./pages/shipping/shipping-conference/shipping-conference.module').then(
        m => m.ShippingConferencePageModule,
      ),
    canActivate: [AuthGuard],
  },
  // Stuffing
  {
    path: 'stuffing',
    loadChildren: () =>
      import('./pages/stuffing/stuffing.module').then(m => m.StuffingPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'stuffing-tasks',
    loadChildren: () =>
      import('./pages/stuffing/stuffing-tasks/stuffing-tasks.module').then(
        m => m.StuffingTasksPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'stuffing-conference',
    loadChildren: () =>
      import('./pages/stuffing/stuffing-conference/stuffing-conference.module').then(
        m => m.StuffingConferencePageModule,
      ),
    canActivate: [AuthGuard],
  },
  // TFA
  {
    path: 'tfa',
    loadChildren: () =>
      import('./pages/tfa/tfa.module').then(m => m.TfaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tfa-reception-orders',
    loadChildren: () =>
      import('./pages/tfa/tfa-reception-orders/tfa-reception-orders.module').then(
        m => m.TfaReceptionOrdersPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'tfa-nfes',
    loadChildren: () =>
      import('./pages/tfa/tfa-nfes/tfa-nfes.module').then(m => m.TfaNfesPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tfa-create-by-seal',
    loadChildren: () =>
      import('./pages/tfa/tfa-create-by-seal/tfa-create-by-seal.module').then(
        m => m.TfaCreateBySealPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'tfa-create-by-nfe',
    loadChildren: () =>
      import('./pages/tfa/tfa-create-by-nfe/tfa-create-by-nfe.module').then(
        m => m.TfaCreateByNfePageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'tfa-pictures',
    loadChildren: () =>
      import('./pages/tfa/tfa-pictures/tfa-pictures.module').then(m => m.TfaPicturesPageModule),
    canActivate: [AuthGuard],
  },
  // Initial Charge
  {
    path: 'initial-charge',
    loadChildren: () =>
      import('./pages/initial-charge/initial-charge.module').then(m => m.InitialChargePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'initial-charge-nfes',
    loadChildren: () =>
      import('./pages/initial-charge/initial-charge-nfes/initial-charge-nfes.module').then(
        m => m.InitialChargeNfesPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'initial-charge-pallets',
    loadChildren: () =>
      import('./pages/initial-charge/initial-charge-pallets/initial-charge-pallets.module').then(
        m => m.InitialChargePalletsPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'initial-charge-pallets-create',
    loadChildren: () =>
      import(
        './pages/initial-charge/initial-charge-pallets-create/initial-charge-pallets-create.module'
      ).then(m => m.InitialChargePalletsCreatePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'initial-charge-pallets-itens',
    loadChildren: () =>
      import(
        './pages/initial-charge/initial-charge-pallets-itens/initial-charge-pallets-itens.module'
      ).then(m => m.InitialChargePalletsItensPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'initial-charge-pallets-itens-create-unitary',
    loadChildren: () =>
      import(
        './pages/initial-charge/initial-charge-pallets-itens-create-unitary/initial-charge-pallets-itens-create-unitary.module'
      ).then(m => m.InitialChargePalletsItensCreateUnitaryPageModule),
    canActivate: [AuthGuard],
  },
  // Consulting
  {
    path: 'seal-consulting',
    loadChildren: () =>
      import('./pages/seal-consulting/seal-consulting.module').then(
        m => m.SealConsultingPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'location-consulting',
    loadChildren: () =>
      import('./pages/location-consulting/location-consulting.module').then(
        m => m.LocationConsultingPageModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'seal-read',
    loadChildren: () =>
      import('./pages/seal-read/seal-read.module').then(m => m.SealReadPageModule),
    canActivate: [AuthGuard],
  },
  // Lost Item
  {
    path: 'lost-item',
    loadChildren: () =>
      import('./pages/lost-item/lost-item.module').then(m => m.LostItemPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'lost-item-devolution',
    loadChildren: () =>
      import('./pages/lost-item/lost-item-devolution/lost-item-devolution.module').then(
        m => m.LostItemDevolutionPageModule,
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
