import { Component, OnInit, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { MitAddressSelectService } from './mit-address-select.service';
import { IMitAddress } from './mit-address.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';

@Component({
  selector: 'app-mit-address-select',
  templateUrl: './mit-address-select.component.html',
  styleUrls: ['./mit-address-select.component.scss']
})
export class MitAddressSelectComponent implements OnInit {
  @Output() result = new EventEmitter();  // 结果集
  @Input() selected: string;  // 当前选择项
  @Input() dark: false; // 暗黑风格
  @Input() multi = false;
  public isExpand = false;
  public list: Array<any>;
  public province: IMitAddress;
  public city: IMitAddress;
  public district: IMitAddress;
  constructor(
    private mitAddressSelectService: MitAddressSelectService, 
    private _eref: ElementRef,
    private eventsService: EventsService,
    private router: Router
    ) { }

  ngOnInit() {
    this.mitAddressSelectService.getAddress().subscribe((res) => {
      this.list = res;
    }, (err) => {
      console.log('出错了！');
    });
  }


  // 选择动作
  selectHandle(province: any, city: any, district: any) {
    this.isExpand = false;
    if (this.multi) {
      this.filterHandle(province, city, district);
    } else {
      this.selected = province.name + '/' + city.name + '/' + district.name;
      this.result.emit(this.selected);
    }
  }


  // 复杂模式过滤动作
  filterHandle(province, city, district) {
    const data = { province: province || '', city: city || '', district: district || '' };
    this.result.emit(data);
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
