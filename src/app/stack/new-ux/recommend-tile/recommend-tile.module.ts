import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RecommendTileComponent} from './recommend-tile.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RecommendTileComponent
    ],
    exports: [
        RecommendTileComponent
    ]
})

export class RecommendTileModule {}
