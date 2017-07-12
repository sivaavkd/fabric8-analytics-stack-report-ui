import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs';

// import { Logger } from '../../node_modules/ngx-login-client';

import { StackAnalysesService } from '../stack-analyses.service';

import { GlobalConstants } from '../constants/constants.service';
import { getStackRecommendations, getResultInformation } from '../utils/stack-api-utils';

@Component({
  selector: 'stack-details',
  templateUrl: './stack-details.component.html',
  styleUrls: ['./stack-details.component.scss'],
  providers: [
    StackAnalysesService
  ],
  encapsulation: ViewEncapsulation.None
})
/**
 * StackDetailsComponent - Provides the detailed analysis for the given codebase
 * by giving recommendation, overview and information about the dependencies of their packages
 *
 * implements OnInit
 *
 * Selector: 'stack-details'
 * Template: stack-details.component.html
 * Style: stack-details.component.scss
 *
 * Services:
 * 1. AddWorkFlowService
 * 2. Logger
 * 3. StackAnalysesService
 *
 * Parent component that includes,
 * 1. Recommendations
 * 2. Overview
 * 3. Components/Dependencies
 *
 * Hits the Stack Analysis Service, gets the response
 * Passes the tailored response to each of the children.
 */
export class StackDetailsComponent implements OnInit {
  @Input() stack;
  @Input() displayName;
  @Input() repoInfo;

  @ViewChild('stackModule') modalStackModule: any;
  public messages: any;

  public companion: Array<any> = [];
  public alternate: Array<any> = [];
  public user: Array<any> = [];

  public userStack: any = {};
  public stackLevelInfo: any = {};
  public outliers: any = {};

  public previewData: any = {};

  errorMessage: any = {};
  stackAnalysesData: Array<any> = [];
  componentAnalysesData: any = {};
  mode: string = 'Observable';

  componentDataObject: any = {};
  componentsDataTable: Array<any> = [];

  currentIndex: number = 0;

  similarStacks: Array<any> = [];
  workItemRespMsg: string = '';

  workItemData: any = {};
  multilpeActionData: any = {};

  buildId: string = '';
  isLoading: boolean = true;

  modalHeader: string = null;

  private recommendations: Array<any> = [];
  private dependencies: Array<any> = [];
  private stackOverviewData: any = {};

  showAnalysedDepData: boolean = false;
  showDependentsData: boolean = false;

  constructor(
    private stackAnalysesService: StackAnalysesService,
    private constants: GlobalConstants
  ) {
    this.constants.getMessages('stackDetails').subscribe((message) => {
      this.messages = message;
    });
  }

  ngOnInit() {
    if (this.stack) {
      this.setBuildId();
    }
    this.displayName = this.displayName || 'Stack Reports';
  }

  public showStackModal(event: Event): void {
    event.preventDefault();
    this.modalStackModule.open();
  }

  /**
   * Gets triggered on close of modal,
   * Clears the existing states to make it proper on open
   */
  public handleModalClose(): void {
    this.resetFields();
  }

  private resetFields(): void {
    this.recommendations = [];
    this.stackOverviewData = [];
    this.dependencies = [];
  }

  /**
   * getRecommendationActions - takes nothing and returns an Array<any>
   * This function returns the static Array of objects that are to be used
   * as actions for each recommendation.
   */
  private getRecommendationActions(): Array<any> {
    return [
      {
        itemName: 'Create WorkItem',
        identifier: 'CREATE_WORK_ITEM'
      }
    ];
  }

  private setBuildId(): void {
    let currentStackUrl: string = this.stack;
    let splitForBuildId: string = currentStackUrl.split('/stack-analyses/')[1];
    if (splitForBuildId) {
      let splitLen: number = splitForBuildId.length;
      if (splitForBuildId[splitLen - 1] === '/') {
        splitForBuildId = splitForBuildId.substring(0, splitLen - 1);
      }
      this.buildId = splitForBuildId;
    }
  }

  private setRecommendations(responseRecommendations: any): void {
    let missing: Array<any> = responseRecommendations['missing'] || [];
    let version: Array<any> = responseRecommendations['version'] || [];
    let stackName: string = responseRecommendations['stackName'] || 'An existing stack';
    let fileName: string = responseRecommendations['fileName'];
    this.recommendations = [];
    for (let i in missing) {
      if (missing.hasOwnProperty(i)) {
        this.recommendations.push({
          suggestion: 'Recommended',
          action: 'Add',
          message: missing[i],
          subMessage: stackName + ' has this dependency included',
          key: missing[i],
          workItem: {
            action: 'Add ' + missing[i],
            message: 'Stack analytics has identified a potentially missing library. It\'s recommended that you add "' + missing[i] + ' to your application as many other Vert.x OpenShift applications have it included',
            codebase: {
              'repository': 'Test_Repo',
              'branch': 'task-1234',
              'filename': fileName,
              'linenumber': 1
            }
          },
          pop: this.getRecommendationActions()
        });
      }
    }

    for (let i in version) {
      if (version.hasOwnProperty(i)) {
        this.recommendations.push({
          suggestion: 'Recommended',
          action: 'Update',
          message: version[i],
          subMessage: stackName + ' has a different version of dependency',
          workItem: {
            action: 'Update ' + version[i],
            message: 'Stack analytics has identified a potentially version upgrade. It\'s recommended that you upgrade "' + version[i] + ' to your application as many other Vert.x OpenShift applications have it included',
            codebase: {
              'repository': 'Exciting',
              'branch': 'task-101',
              'filename': fileName,
              'linenumber': 1
            }
          },
          pop: this.getRecommendationActions()
        });
      }
    }
  }

  /**
   * setRecommendations - takes missing (Array), version (Array) and returns nothing.
   * This function gets the missing packages information and version mismatch information
   * Displays the information accordingly on screen
   */
  private setRecommendations_ACTUAL(responseRecommendations: any): void {
    let missing: Array<any> = responseRecommendations['missing'] || [];
    let version: Array<any> = responseRecommendations['version'] || [];
    let stackName: string = responseRecommendations['stackName'] || 'An existing stack';
    let fileName: string = responseRecommendations['fileName'];
    this.recommendations = [];
    for (let i in missing) {
      if (missing.hasOwnProperty(i)) {
        let key: any = Object.keys(missing[i]);
        this.recommendations.push({
          suggestion: 'Recommended',
          action: 'Add',
          message: key[0] + ' : ' + missing[i][key[0]],
          subMessage: stackName + ' has this dependency included',
          key: key[0],
          workItem: {
            action: 'Add ' + key[0] + ' with version ' + missing[i][key[0]],
            message: 'Stack analytics has identified a potentially missing library. It\'s recommended that you add "' + key[0] + '" with version ' + missing[i][key[0]] + ' to your application as many other Vert.x OpenShift applications have it included',
            codebase: {
              'repository': 'Test_Repo',
              'branch': 'task-1234',
              'filename': fileName,
              'linenumber': 1
            }
          },
          pop: this.getRecommendationActions()
        });
      }
    }

    for (let i in version) {
      if (version.hasOwnProperty(i)) {
        let key: any = Object.keys(version[i]);
        this.recommendations.push({
          suggestion: 'Recommended',
          action: 'Update',
          message: key[0] + ' : ' + version[i][key[0]],
          subMessage: stackName + ' has a different version of dependency',
          workItem: {
            action: 'Update ' + key[0] + ' with version ' + version[i][key[0]],
            message: 'Stack analytics has identified a potentially version upgrade. It\'s recommended that you upgrade "' + key[0] + '" with version ' + version[i][key[0]] + ' to your application as many other Vert.x OpenShift applications have it included',
            codebase: {
              'repository': 'Exciting',
              'branch': 'task-101',
              'filename': fileName,
              'linenumber': 1
            }
          },
          pop: this.getRecommendationActions()
        });
      }
    }
  }

  private setDependencies(components: Array<any>): void {
    this.dependencies = components;
  }

  private setOverviewData(components: Array<any>): void {
    // set the default values - start
    let noOfComponents: number = components ? components.length : 0;
    let totalCycloComplexity: number = 0;
    let avgCycloComplexity: any = 'NA';
    let validComponentsWithCycloValue: number = 0;
    let totalNoOfLines: number = 0;
    let totalNoOfFiles: number = 0;
    let cvssObj: any = {
      id: '',
      value: -1 // -1 to say that no package is vulnerable
    };
    let licenseList: Array<string> = [];
    // set the default values - end
    components.forEach(item => {
      totalNoOfFiles += item.code_metrics.total_files;
      totalNoOfLines += item.code_metrics.code_lines;
      if (item.code_metrics.average_cyclomatic_complexity !== -1) {
        totalCycloComplexity += item.code_metrics.average_cyclomatic_complexity;
        validComponentsWithCycloValue += 1;
      }

      if (item.security && item.security.vulnerabilities && item.security.vulnerabilities[0].cvss) {
        let value = parseFloat(item.security.vulnerabilities[0].cvss);
        if (value > cvssObj.value) {
          cvssObj.value = value;
          cvssObj.id = item.security.vulnerabilities[0].id;
        }
      }
      if (item.licenses && item.licenses.length) {
        licenseList = [...licenseList, ...item.licenses];
      }
    });
    if (validComponentsWithCycloValue > 0) {
      avgCycloComplexity =
        Math.round(totalCycloComplexity / validComponentsWithCycloValue * 1000) / 1000;
    }
    this.stackOverviewData = {
      noOfComponents: noOfComponents,
      totalNoOfFiles: totalNoOfFiles,
      totalNoOfLines: totalNoOfLines,
      avgCycloComplexity: avgCycloComplexity,
      cvss: cvssObj,
      licenseList: licenseList
    };
  }

  /**
   * getStackAnalyses - takes an id (string) and returns nothing.
   * This hits the service and gets the response and passes it on to different functions.
   */
  private getStackAnalyses(url: string): void {
    if (!url) return;
    this.isLoading = true;
    let stackAnalysesData: any = {};
    this.errorMessage = {};
    this.stackAnalysesService
      .getStackAnalyses(url)
      .subscribe(data => {
        // Enter the actual scene only if the data is valid and the data
        // has something inside.
        this.clearLoader();
        this.modalHeader = 'Updated just now';
        if (data && (!data.hasOwnProperty('error') && Object.keys(data).length !== 0)) {
          stackAnalysesData = data;
          let result: any;
          let components: Array<any> = [];

          /**
           * Get Result Information from utils
           */
          let resultInformationObservable: Observable<any> = getResultInformation(data);
          if (resultInformationObservable) {
            resultInformationObservable.subscribe((response) => {
              if (response) {
                if (response.hasOwnProperty('components')) {
                  // Call the stack-components with the components information so that
                  // It can parse the necessary information and show relevant things.
                  this.setDependencies(response.components);

                  // set the overview data :-
                  // this.setOverviewData(response.components);
                }
              }
            });
          }
          // Ends Result Information

          /**
           * Get Recommendations from utils
           */
          let recObservable: Observable<any> = getStackRecommendations(data);
          if (recObservable) {
            recObservable.subscribe((recommendations) => {
              if (recommendations) {
                // Call the recommendations with the recommendations response object
                this.setRecommendations(recommendations);
              }
            });
          }
          // Ends Recommendations

        } else {
          // Set an error if the data is invalid or not proper.
          this.errorMessage.message = `This could take a while. Return to pipeline to keep
           working or stay on this screen to review progress.`;
          this.modalHeader = 'Updating ...';
        }
      },
      error => {
        this.clearLoader();
        // Throw error when the service fails
        this.errorMessage.message = error.message;
        this.errorMessage.status = error.status;
        this.errorMessage.statusText = error.statusText;
        this.modalHeader = 'Report failed ...';
      });
  }

  private clearLoader(): void {
    this.isLoading = false;
  }


  /** New Stack Analysis Implementation */
  private getStackResults(): void {
    let url: string = 'https://gist.githubusercontent.com/arunkumars08/530483080a4162edcb57b9924a8eefd1/raw/95aa0700534140098a003d1d5a798a9c2b3778de/stack.json';
    let result: Observable<any> = this.stackAnalysesService.getStackResults(url);
    result.subscribe((data: any) => {
      this.handleStackResult(data);
      this.isLoading = false;
    });
    console.log(result);
  }

  private buildCommon(data: Array<any>): void {

  }

  private buildCompanion(data: Array<any>): void {

  }

  private buildAlternate(data: Array<any>): void {

  }

  private buildUserStack(data: Array<any>): void {

  }

  private buildStackLevelInfo(data: any, outliers: any): void {
    console.log(data);
    this.stackLevelInfo = data;
    this.outliers = outliers;
  }

  private handleSelectedRecommendation(data: any): void {
    console.log('Inside');
    this.previewData = data;
  }

  private handleStackResult(data: any): void {
    let result = data.result[0];
    let userStack: any = result['user_stack_info'];
    let recommendations: any = result['recommendations'];
    let outliers: any = {
      usage_outliers: recommendations['usage_outliers'],
      license_outliers: recommendations['license_outliers']
    };

    this.companion = recommendations['companion'];
    this.alternate = recommendations['alternate'];
    this.user = userStack['dependencies'];
    this.previewData = this.companion[0];
    this.previewData.isCurrent = true;
    this.previewData.showWorkItem = true;

    console.log('Companion');
    console.log(this.companion);

    this.buildCompanion(this.companion);
    this.buildAlternate(this.alternate);
    this.buildUserStack(this.user);

    this.buildStackLevelInfo(userStack, outliers);
  }

  public toggleAnalysedDepData(event: Event): void {
    event.preventDefault();
    this.showAnalysedDepData = !this.showAnalysedDepData;
  }

  public toggleDependentsData(event: Event): void {
    event.preventDefault();
    this.showDependentsData = !this.showDependentsData;
  }
  /** New Stack Analysis Implementation */
}
