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
        children: [
          {
            path: '',
            loadChildren: () => import('@mfe/login').then(m => m.BootstrapModule)
          }
        ]
      },
      {
        path: '',
        canActivate: [AuthorizedGuard],
        children: [
          {
            path: '',
            outlet: 'navbar',
            loadChildren: () => import('@mfe/navigation-bar').then(m => m.BootstrapModule)
          },
          {
            path: 'user',
            loadChildren: () => loadRemoteModule({
                remoteEntry: environment.micro_frontend.user,
                remoteName: 'user',
                exposedModule: './public-api'
              }).then(m => m.BootstrapModule)
          },
          {
            path: '',
            redirectTo: 'user',
            pathMatch: 'full'
          },
          {
            path: '**',
            redirectTo: 'user'
          },
        ]
      },
    ], {initialNavigation: 'enabledNonBlocking'}),
  ]
})
export class AppRoutingModule {
}

