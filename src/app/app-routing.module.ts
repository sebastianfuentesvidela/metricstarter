import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '@app/core';

import { SettingsContainerComponent } from './settings';
// import { LoginDialogComponent } from './logindialog/login-dialog';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'dialog',
    canActivate: [AuthGuardService],
    component: SettingsContainerComponent,
//    component: LoginDialogComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'settings',
    canActivate: [AuthGuardService],
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: 'infometrics',
    canActivate: [AuthGuardService],
    redirectTo: 'infometrics/dashh',
    //    loadChildren: 'app/infoarea/info.module#InfoModule'
  },
  {
    path: 'examples',
    canActivate: [AuthGuardService],
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
