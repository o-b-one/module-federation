import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveComponentModule} from "@ngrx/component";
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {SideloadModule} from '@mfe/sideload';
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';



@NgModule({
  declarations: [
    NavigationBarComponent,
    UserAvatarComponent
  ],
    imports: [
        CommonModule,
        ReactiveComponentModule,
        MatTabsModule,
        RouterModule,
        SideloadModule,
        RouterModule.forChild([
            {
                path: '',
                component: NavigationBarComponent
            }
        ]),
        MatMenuModule,
        MatToolbarModule,
    ]
})
export class BootstrapModule { }
