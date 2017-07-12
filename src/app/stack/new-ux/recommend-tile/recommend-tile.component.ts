import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'recommend-tile',
    templateUrl: './recommend-tile.component.html',
    styleUrls: ['recommend-tile.component.scss']
})

export class RecommendTileComponent {
    @Input() recommendation;

    ngOnChanges(): void {
        console.log(this.recommendation);
        if (this.recommendation) {

        }
    }
}
