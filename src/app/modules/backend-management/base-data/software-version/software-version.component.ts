import { Component, OnInit } from '@angular/core';
import { SoftwareVersionService } from './software-version.service';

@Component( {
  selector: 'app-software-version',
  templateUrl: './software-version.component.html',
  styleUrls: [ './software-version.component.scss' ]
})
export class SoftwareVersionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
