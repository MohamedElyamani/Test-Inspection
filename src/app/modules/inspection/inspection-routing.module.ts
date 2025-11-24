import { ServicModuleModule } from './sub-modules/servic-module/servic-module.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
     //{ path: 'home', component: OperationComponent },

    {
    path: 'operation',
    loadChildren: () => import('./sub-modules/operation/operation.module').then(m => m.OperationModule)},
    {
    path: 'service',
    loadChildren: () => import('./sub-modules/servic-module/servic-module.module').then(m => m.ServicModuleModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
/*************  ✨ Windsurf Command ⭐  *************/
/*******  140b8c71-d5d4-4647-9196-30fe0e39b18c  *******//**

 * Load the operation module
 * @param {string} path - The path to load the operation module
 * @returns {Promise<OperationModule>} - A promise that resolves to the operation module
 */
