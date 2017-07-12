import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewComponent } from './overview.component';
import {ChartModule} from '../new-ux/chart-module/chart.module';

@NgModule({
    imports: [CommonModule, ChartModule],
    declarations: [
        OverviewComponent
    ],
    exports: [
        OverviewComponent,
        ChartModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OverviewModule {}
