import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events-service.service';
import { OrganizationTreeSelectService } from './organization-tree-select.service';
import { fadeIn } from '../../animation/fadeIn';

@Component({
  selector: 'app-organization-tree-select',
  templateUrl: './organization-tree-select.component.html',
  styleUrls: ['./organization-tree-select.component.scss']
})
export class OrganizationTreeSelectComponent implements OnInit {
  @Input() defaultVal: any;  // 默认值
  @Input() isDepartment: boolean = false;
  @Input() treeFalg: number;
  @Output() result: EventEmitter<any> = new EventEmitter(); // 输出选中结果
  public selected: String; // 选中结果
  public isExpand = false;
  public companyTree: Array<any>;  // 目录树
  public treeOptions = {
    displayField: 'Name', childrenField: 'SubLinks', isExpandedField: 'expanded'
  };  // 树组件设置
  public showOptionId:any;
  public num: number = 500000;  // 部门ID相加基数
  
  public nameList = [];
  public idList = [];
  public _GetList_: any;
  constructor(
    private organizationTreeSelectService: OrganizationTreeSelectService,
    private _eref: ElementRef,
    private eventsService: EventsService,
    private router: Router
  ) { }


  ngOnInit() {
    if( this.treeFalg ){
      this.GetList({TransferIndex: this.treeFalg});
    } else {
      this.GetList({TransferIndex: 0});
    }
  }



  GetList(data) {
    this._GetList_ = this.organizationTreeSelectService.GetCompanyTree(data).subscribe((res) => {
      if (res.State) {
        const _arr = [];  // 临时数组
        _arr.push( res.Data );
        _arr[ 0 ].expanded = true; // 设置默认展开
        this.init(_arr, this.defaultVal);
      }
    }, (err) => {
      
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }
  // 折叠
  toggle(){
    this.isExpand = !this.isExpand;
  }
  // 初始化
  init(arr, defaultVal){
    if(this.defaultVal){
      this.selected = this.defaultVal;
    }
    this.companyTree = arr;
  }


  // 选择公司名称
  chooseName(object){
    this.nameList = [];
    this.idList = [];
    this.goTop(object);
    // 去掉全部
    if(this.nameList.length > 1 && this.companyTree[0].ID == -1){
      this.nameList = this.nameList.splice(0, this.nameList.length-1);
      this.idList = this.idList.splice(0, this.idList.length-1);
    }
    this.selected = this.nameList.join('/');
    this.result.emit(this.idList); 

    // 是否选中
    if(this.isDepartment){
      if(object.data.IsDept){
        this.showOptionId = object.data.SequenceId;
      }else{
        this.showOptionId = null;
      }
    }else{
     this.showOptionId = object.data.SequenceId;
    }
  }

  // 向上遍历
  goTop(obj){
    if(obj.data.ID == -1){
      this.nameList.push(obj.displayField);
      this.idList.push(obj.data.ID);
    }else{
      this.nameList.unshift(obj.displayField);
      this.idList.unshift(obj.data.ID);
      if(obj.parent.path.length){
        const object = obj.parent;
        this.goTop(object);
      }
    }
  }


  // 监听全局点击事件
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._eref.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isExpand = false;
    }
  }
  // 销毁
  ngOnDestroy() {
    if (this._GetList_) {
      this._GetList_.unsubscribe();
    }
  }
}
