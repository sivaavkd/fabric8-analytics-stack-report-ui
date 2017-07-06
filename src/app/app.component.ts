import { Component } from '@angular/core';

@Component({
    selector: 'f8-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public label:string;
    public stackUrl: string;//d6819b27a4ba4e8fa6f6bf63bb7764ee;
    changeLabel() {
        console.log(this.label);
        this.stackUrl = 'https://recommender.api.openshift.io/api/v1/stack-analyses/'+ this.label;
  }
}
