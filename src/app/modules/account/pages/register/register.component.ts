import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../../../animation/flyIn';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [ flyIn ]
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
