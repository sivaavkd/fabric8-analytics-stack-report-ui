import {Component, Input, OnChanges} from '@angular/core';

import {ComponentInformationModel, RecommendationsModel} from '../models/stack-report.model';

@Component({
    selector: 'component-level-information',
    templateUrl: './component-level.component.html',
    styleUrls: ['component-level.component.scss']
})

export class ComponentLevelComponent implements OnChanges {

    @Input() component: any;

    public dependencies: Array<ComponentInformationModel> = [];
    public recommendations: RecommendationsModel;
    private dependenciesList: Array<any> = [];
    private headers: Array<any> = [];
    private keys: any = [];
    private alternate: Array<ComponentInformationModel> = [];

    private fieldName: string;
    private fieldValue: string;


    constructor() {
        this.keys = {
            name: 'name',
            currentVersion: 'curret_version',
            latestVersion: 'latest_version',
            cveid: 'cveid',
            cvss: 'cvss',
            license: 'license',
            linesOfCode: 'linesOfCode',
            avgCycloComplexity: 'avgCycloComplexity',
            noOfFiles: 'noOfFiles',
            dateAdded: 'dateAdded',
            publicPopularity: 'pubPopularity',
            enterpriseUsage: 'enterpriseUsage',
            teamUsage: 'teamUsage'
        };
    }

    ngOnChanges(): void {
        if (this.component) {
            console.log(this.component);
            this.dependencies = this.component['dependencies'];
            this.recommendations = this.component['recommendations'];
            this.alternate = this.recommendations.alternate;
            this.handleDependencies(this.dependencies);
        }
    }

    private handleDependencies(dependencies: Array<ComponentInformationModel>): void {
        if (dependencies) {
            let length: number = dependencies.length;
            let dependency: any, eachOne: any;
            this.headers = [
                {
                    name: 'Package name',
                    identifier: this.keys['name'],
                    isSortable: true
                }, {
                    name: 'Current Version',
                    identifier: this.keys['currentVersion'],
                    isSortable: true
                }, {
                    name: 'Latest Version',
                    identifier: this.keys['latestVersion']
                }, {
                    name: 'License',
                    identifier: this.keys['license']
                }, {
                    name: 'Sentiment Score',
                    identifier: this.keys['linesOfCode'],
                    isSortable: true
                }, {
                    name: 'Github Usage',
                    identifier: this.keys['avgCycloComplexity']
                }, {
                    name: 'OSIO Usage',
                    identifier: this.keys['avgCycloComplexity']
                }, {
                    name: 'CVEs',
                    identifier: this.keys['avgCycloComplexity']
                }, {
                    name: 'Action',
                    identifier: this.keys['noOfFiles'],
                    isSortable: true
                }
            ];

            this.dependenciesList = [];
            let linesOfCode: any = '';
            let noOfFiles: any = '';
            for (let i: number = 0; i < length; ++i) {
                eachOne = dependencies[i];
                dependency = this.setParams(eachOne, false);
                this.dependenciesList.push(dependency);
                debugger;
                this.checkAlternate(eachOne['name'], eachOne['version'], this.dependenciesList);
            }
        }
    }

    private setParams(input: any, canCreateWorkItem: boolean) {
        let output: any = {};
        output['name'] = input['name'];
        output['current_version'] = input['version'];
        output['latest_version'] = input['latest_version'];
        output['license'] = input['licenses'] && input['licenses'].join(', ');
        output['sentiment_score'] = input['sentiment'] && input['sentiment']['overall_score'];
        output['github_user_count'] = input['github'] && input['github']['dependent_repos'];
        output['osio_user_count'] = input['osio_user_count'];
        output['cves'] = input['security'] && input['security'].map((s) => s.CVE).join(', ');
        output['action'] = canCreateWorkItem ? 'Create Work Item' : '';
        return output;
    }

    private checkAlternate (name: string, version: string, list: Array<any>) {
        if (this.alternate && this.alternate.length > 0) {
            let recom: Array<ComponentInformationModel> = this.alternate.filter((a) => a.replaces[0].name === name && a.replaces[0].version === version);
            recom.forEach(r => {
                let obj: any = this.setParams(r, true);
                obj['isChild'] = true;
                list.push(obj);
            });
        }
    }

}
