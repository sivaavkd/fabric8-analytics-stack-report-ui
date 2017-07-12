import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecommendationsComponent} from './recommendations.component';

import {RecommendTileModule} from '../recommend-tile/recommend-tile.module';

@NgModule({
    imports: [
        CommonModule,
        RecommendTileModule
    ],
    declarations: [
        RecommendationsComponent
    ],
    exports: [
        RecommendationsComponent
    ]
})

export class RecommendationsModule {}
