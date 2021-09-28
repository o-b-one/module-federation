import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [    
    RouterModule.forRoot([
      {
        path: 'home',
        children: [
          {
            path: '',
            outlet: 'navbar',
            loadChildren: () => import('@robust-micro-frontend/navigation-bar').then(m => m.BootstrapModule)
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'home'
      }



    ], { initialNavigation: 'enabledNonBlocking' }),
  ]
})
export class AppRoutingModule {}
