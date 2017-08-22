
import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { bounceIn } from '../../../../animation/bounceIn';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  animations: [bounceIn]
})
export class SettingComponent implements OnInit {
  @Output() changeSetting = new EventEmitter;
  public isExpand = false;

  public settingData = {
    realTime: true,
    autoView: true
  };
  constructor(private _eref: ElementRef) { }

  ngOnInit() {
    const data = window.localStorage.getItem(environment.local_carlocation_setting);
    if (data) {
      this.settingData = JSON.parse(data);
    } else {
      window.localStorage.setItem(environment.local_carlocation_setting, JSON.stringify(this.settingData));
    }
    // this.changeSetting.emit(this.settingData);
  }

  updateSetting(settingData) {
    window.localStorage.setItem(environment.local_carlocation_setting, JSON.stringify(settingData));
    this.changeSetting.emit(settingData);
  }


  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
    }
  }

}
