import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
// 动画
import { fadeIn } from '../../animation/fadeIn';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [fadeIn]
})
export class SelectComponent implements OnInit {
  public selected: any; // 选中文字
  public searcVal: any; // 快速搜索关键字
  public isExpand: boolean = false; // 下拉框状态
  @Input() showAll = false; // 是否选项全部选项
  @Input() showSearch = false; // 是否显示快速搜索
  @Input() placeholder:string; // 占位符文字
  @Input() optionName: any; // 选项名称
  @Input() optionList: Array<any>; // 选项列表数据
  @Input() defaultValue:string; // 默认文字
  @Output() result: EventEmitter<any> = new EventEmitter(); // 绑定事件

  constructor(private _eref: ElementRef) { }

  ngOnInit() {
  }
  // 选择列表
  selectHandler(item){
    if(item == 'all'){
      this.selected = "全部";
      this.result.emit(-1);
    }else{
      this.selected = item[this.optionName];
      this.result.emit(item);
    }
    this.isExpand = !this.isExpand;
    this.searcVal = null;
  }

  setDefaultValue(){
    if(this.defaultValue != null && this.optionList && this.optionList.length){
      this.optionList.forEach((item) => {
        if(item.ID == this.defaultValue){
          this.selected = item[this.optionName];
          return false;
        }
      })
    }
  }

  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onclick(targetElement){
    const clickInside = this._eref.nativeElement.contains(targetElement);
    if(!clickInside){
      this.isExpand = false;
      this.searcVal = null;
    }
  }

  ngOnChanges(){
    this.setDefaultValue();
  }
}
