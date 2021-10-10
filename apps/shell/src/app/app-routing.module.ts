import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import {AuthorizedGuard} from "./guards/authorized.guard";
import {NotAuthorizedGuard} from "./guards/not-authorized.guard";
import {environment} from "../environments/environment";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        canActivate: [NotAuthorizedGuard],
        loadChildren: () => import('login/public-api').then(m => m.BootstrapModule)
      },
      {
        path: '',
        canActivate: [AuthorizedGuard],
        children: [
          {
            path: '',
            outlet: 'navbar',
            loadChildren: () => import('navigationBar/public-api').then(m => m.BootstrapModule)
          },
          {
            path: 'user',
            loadChildren: () => import('user/public-api').then(m => m.BootstrapModule)
          },
          {
            path: 'feed',
            loadChildren: () => import('feed/public-api').then(m => m.BootstrapModule)
          },
          {
            path: '',
            redirectTo: 'feed',
            pathMatch: 'full'
          },
          {
            path: '**',
            outlet: 'navbar',
            loadChildren: () => import('navigationBar/public-api').then(m => m.BootstrapModule)
          },
          {
            path: '**',
            redirectTo: 'feed'
          },
        ]
      },
    ],
    {initialNavigation: 'enabledNonBlocking'}),
  ]
})
export class AppRoutingModule {
}

