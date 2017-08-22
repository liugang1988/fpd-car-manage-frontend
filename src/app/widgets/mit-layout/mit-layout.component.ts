import { Component, OnInit, HostListener } from '@angular/core';
import { EventsService } from '../../services/events-service.service';

@Component( {
  selector: 'app-mit-layout',
  templateUrl: './mit-layout.component.html',
  styleUrls: [ './mit-layout.component.scss' ]
})
export class MitLayoutComponent implements OnInit {

  public expand = true;  // 是否展开的断只值

  sidebar: boolean;

  constructor( private eventsService: EventsService ) { }

  ngOnInit() {
    this.initWidth();  // 初始化宽度
  }

  toggleEvt() {
    this.expand = !this.expand;
    this.eventsService.emitMessageEvent( this.eventsService.getNames().EVENT_LAYOUT_RESIZE, this.expand );
  }


  // 获取初始化窗口大小
  initWidth() {
    const firstWidth = window.innerWidth;
    if ( firstWidth >= 768 ) {
      this.expand = true;
    }
  }


}
