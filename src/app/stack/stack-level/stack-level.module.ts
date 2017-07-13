import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartComponent} from '../utils/chart-component';
import {StackLevelComponent} from './stack-level.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        StackLevelComponent,
        ChartComponent
    ],
    exports: [
        StackLevelComponent,
        ChartComponent
    ]
})

export class StackLevelModule {

}
