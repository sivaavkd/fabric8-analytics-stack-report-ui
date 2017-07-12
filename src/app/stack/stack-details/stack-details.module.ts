import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { ModalModule } from 'ngx-modal';

import { GlobalConstants } from '../constants/constants.service';
import { OverviewModule } from '../overview/overview.module';
import { RecommenderModule } from '../recommender/recommender.module';
import { StackComponentsModule } from '../stack-components/stack-components.module';
import { StackDetailsComponent } from './stack-details.component';

import {RecommendationsModule} from '../new-ux/recommendations/recommendations.module';
import {PreviewModule} from '../new-ux/preview/preview.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ModalModule,
    RecommenderModule,
    StackComponentsModule,
    OverviewModule,
    RecommendationsModule,
    PreviewModule
  ],
  declarations: [ StackDetailsComponent ],
  exports: [ StackDetailsComponent ],
  providers: [ GlobalConstants ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StackDetailsModule {
  constructor() {}
}
