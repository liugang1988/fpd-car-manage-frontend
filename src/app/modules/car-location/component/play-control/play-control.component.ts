import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MitBaiduMapService } from '../../../../widgets/mit-baidu-map/services/mit-baidu-map.service';

@Component( {
  selector: 'app-play-control',
  templateUrl: './play-control.component.html',
  styleUrls: [ './play-control.component.scss' ]
})
export class PlayControlComponent implements OnInit {

  constructor( private mitBaiduMapService: MitBaiduMapService ) { }

  ngOnInit() {
  }

  pause() {
     this.mitBaiduMapService.LushuControl('pause');
  }
  play() {
     this.mitBaiduMapService.LushuControl('start');
  }

  stop() {
  this.mitBaiduMapService.LushuControl('stop');
  }

}
