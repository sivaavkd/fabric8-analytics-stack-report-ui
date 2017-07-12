import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PreviewComponent} from './preview.component';
import {ChartModule} from '../../new-ux/chart-module/chart.module';

@NgModule({
    imports: [
        CommonModule,
        ChartModule
    ],
    declarations: [
        PreviewComponent
    ],
    exports: [
        PreviewComponent,
        ChartModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PreviewModule {}
