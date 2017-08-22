import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { zoomInRight } from '../../../animation/zoomInRight';

@Component( {
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: [ './control-panel.component.scss' ],
  animations: [ zoomInRight ]
})
export class ControlPanelComponent implements OnInit {
  public controlStatus:boolean = false;
  public showText: string = '隐藏';

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  // 显示隐藏面板
  tagglePanel(){
    this.controlStatus = !this.controlStatus;
    this.showText = this.controlStatus ? '展开' : '隐藏';
  }

  //  关闭控制面板
  closePanel() {
    this.router.navigate( [ '/page/car-location' ] );
  }


}
