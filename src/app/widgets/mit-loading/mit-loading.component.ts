import { Component, OnInit, Input } from '@angular/core';
@Component( {
  selector: 'app-mit-loading',
  templateUrl: './mit-loading.component.html',
  styleUrls: [ './mit-loading.component.scss' ]
})
export class MitLoadingComponent implements OnInit {
  @Input() option: string;

  constructor() { }

  ngOnInit() {
  }


}
