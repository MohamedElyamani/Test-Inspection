import { Component } from '@angular/core';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
})
export class OperationComponent {

  items: any[]= [
    {label:'Inspection Operations', routerLink: '/inspection-operation'},
];

}
