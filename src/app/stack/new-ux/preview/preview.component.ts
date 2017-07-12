import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'preview',
    templateUrl: './preview.component.html',
    styleUrls: ['preview.component.scss']
})

export class PreviewComponent {
    @Input() previewData;

    public gaugeChart: any = {};
    public showAnalysedDepData: boolean = false;

    ngOnChanges(): void {
        if (this.previewData) {
            console.log('Preview');
            console.log(this.previewData);
            if (this.previewData.hasOwnProperty('sentiment')) {
                this.gaugeChart = {
                    data: {
                        columns: [
                            ['data', this.previewData.sentiment.overall_score]
                        ],
                        type: 'gauge'
                    },
                    configs: {
                        legend: {
                            show: true
                        }
                    },
                    options: {
                        gauge: {
                            label: {
                                format: function(value, ratio) {
                                    return value;
                                }
                            },
                            min: -1,
                            max: 1,
                            width: 39, // for adjusting arc thickness
                            title: 'Sentiment Score'
                        },
                        color: {
                            pattern: ['#cf2a0e', '#bdcf0e', '#368a55'],
                            threshold: {
                                values: [-.2, .2, 1]
                            }
                        },
                        size: {
                            height: 180
                        }
                    }
                };
            }

        }
    }
    public toggleAnalysedDepData(event: Event): void {
        event.preventDefault();
        this.showAnalysedDepData = !this.showAnalysedDepData;
    }
}
