import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentLevelComponent} from './component-level.component';
import {EllipsisDirective} from '../utils/ellipsis.directive';
import {SentimentModule} from '../utils/sentiment/sentiment.module';

import {TableFilter} from '../utils/table-filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        SentimentModule
    ],
    declarations: [
        ComponentLevelComponent,
        EllipsisDirective,
        TableFilter
    ],
    exports: [
        ComponentLevelComponent
    ]
})

export class ComponentLevelModule {

}
