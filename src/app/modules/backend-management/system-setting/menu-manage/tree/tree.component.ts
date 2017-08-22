import { Component, OnInit, AfterContentInit, ViewChild } from '@angular/core';
import { MenuManageService } from '../menu-manage.service';
import { EventsService } from '../../../../../services/events-service.service';
import { bounceIn } from '../../../../../animation/bounceIn';
import { Router } from '@angular/router';
@Component( {
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: [ './tree.component.scss' ],
  animations: [ bounceIn ]
})
export class TreeComponent implements OnInit, AfterContentInit {


  public menuTree: Array<any>;  // 目录树
  public showLoading = true;  // loading
  public showModifyAlert = false; // 显示修改或编辑组件
  public showDeleteAlert = false; // 显示删除确认弹窗组件
  public treeOptions = {
    displayField: 'MenuName', childrenField: 'SubLinks', isExpandedField: 'expanded'
  };  // 树组件设置
  public modifyContent: any; // 用于传递修改的菜单内容

  public selectedMenu: string; // 当前选择的菜单

  public _getMenuTree: any;

  constructor( private menuManageService: MenuManageService, private eventsService: EventsService, private router:Router ) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.getMenuTree();
  }

  getMenuTree( tree?) {
    // 获取系统所有菜单
    this._getMenuTree = this.menuManageService.GetAllMenuTree().subscribe(( res ) => {
      if ( res.State ) {
        this.showLoading = false;  // 关闭loading
        const _arr = [];  // 临时数组
        _arr.push( res.Data );
        _arr[ 0 ].expanded = true; // 设置默认展开
        this.menuTree = _arr;  // 渲染树
      }
    }, ( err ) => {
      this.showLoading = false;
      
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


  add( e ) {
    e.data.action = 'add';
    this.modifyContent = e.data;
    this.showModifyAlert = true;
  }

  edit( e ) {
    e.data.action = 'edit';
    this.modifyContent = e.data;
    this.showModifyAlert = true;
  }

  delete( e ) {
    this.modifyContent = e.data;
    this.showDeleteAlert = true;
  }

  closeAlert( e ) {

    // 回调并弹窗通知
    if ( e ) {
      this.getMenuTree();
      this.eventsService.emitMessageEvent( e.State ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, e.Message );
    }

    // 关闭弹窗
    this.showDeleteAlert = false;
    this.showModifyAlert = false;
  }

  // 销毁
  ngOnDestroy() {
    if (this._getMenuTree) {
      this._getMenuTree.unsubscribe();
    }
  } 

}
