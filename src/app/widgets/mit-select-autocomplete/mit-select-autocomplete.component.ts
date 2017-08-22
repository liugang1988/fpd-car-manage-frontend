import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { fadeIn } from '../../animation/fadeIn';
@Component({
  selector: 'app-mit-select-autocomplete',
  templateUrl: './mit-select-autocomplete.component.html',
  styleUrls: ['./mit-select-autocomplete.component.scss'],
  animations: [fadeIn]
})
export class MitSelectAutocompleteComponent implements OnInit {

  @Input() array: Array<any>; // 数组

  @Input() mode: String; // 模式 --autocomplete  --select

  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  public selected: String; // 选中结果
  public searcVal: String;  // 临时变量
  public isExpand = false;

  constructor(private _eref: ElementRef) { }

  ngOnInit() { }

  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
      this.searcVal = undefined;
    }
  }

  // 输入事件
  inputEnter(event) {
    this.searcVal = event;
  }

  // 选中事件
  selectedFnc(value) {
    this.selected = value.name;
    this.result.emit(value.name);
  }

}
