import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FlexLayoutModule } from '@angular/flex-layout';


import { MatRadioModule } from '@angular/material/radio';


import { fuseConfig } from 'app/fuse-config';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { SettingsComponent } from './settings.component';

const routes = [
    {
        path     : 'settings',
        component: SettingsComponent
    }
];

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,ReactiveFormsModule,

        TranslateModule,

        FlexLayoutModule,

        MatRadioModule,

        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule
    ],
    exports     : [
        SettingsComponent
    ]
})

export class SettingsModule
{
}
