import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { flyIn } from '../../../../animation/flyIn';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.scss'],
  animations: [flyIn]
})
export class ResetPwComponent implements OnInit {
  public form: FormGroup; // 表单对象
  public isEmailorPhone: any = /([\w-\.]+@[\w-]+(\.[\w-]))|(^1[3,4,5,7,8,9]\d{9}$)/;

  constructor(private fb: FormBuilder, private router: Router, private _location: Location) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.pattern(this.isEmailorPhone)])],
      'password': ['', Validators.compose([Validators.required, Validators.pattern('\\w{8,16}')])],
      'rememberAccount': ['']
    });
  }


  ngOnInit() {
  }


  back() {
    this._location.back();
  }



}


