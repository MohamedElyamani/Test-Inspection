import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-submit-btns',
  templateUrl: './submit-btns.component.html',
  styleUrls: ['./submit-btns.component.css']
})
export class SubmitBtnsComponent implements OnInit {
  route:string;
@Input() isSaveDisabled: boolean = false; // يربط بالـ form.invalid
@Input() showSelected : boolean = false;
@Output() reset = new EventEmitter<void>();
//@Output() cancel = new EventEmitter<void>();

  constructor(private _activateRoute:ActivatedRoute) { }

  ngOnInit() {
    this.route = this._activateRoute.snapshot.data['mode'];
  }
print(){
  window.print();
}


}
