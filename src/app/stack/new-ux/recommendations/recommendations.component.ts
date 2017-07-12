import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['recommendations.component.scss']
})

export class RecommendationsComponent {
    @Input() recommendations;
    @Output() onRecommendationSelect: EventEmitter<any> = new EventEmitter<any>();

    ngOnChanges(): void {
        if (this.recommendations) {

        }
    }

    resetRecommendations(): void {
        let tiles = document.getElementsByClassName('recommend-tile');
        for (let elem in tiles) {
            if (tiles.hasOwnProperty(elem)) {
                if (tiles[elem].classList.contains('active')) {
                    tiles[elem].classList.remove('active');
                }
            }
        }
    }

    handleTileClick(event: any, recommendation: any): void {
        this.resetRecommendations();
        recommendation.isCurrent = true;
        recommendation.showWorkItem = event.currentTarget.parentNode && event.currentTarget.parentNode.parentNode && !event.currentTarget.parentNode.parentNode.classList.contains('user-section');
        this.onRecommendationSelect.emit(recommendation);
    }
}
