import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentLevelComponent} from './component-level.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ComponentLevelComponent
    ],
    exports: [
        ComponentLevelComponent
    ]
})

export class ComponentLevelModule {

}
