
/*
  支持三种操作项action固定，action_name可自定义
  operation = [
      { action: 'check', action_name: '详情' },
      { action: 'modify', action_name: '编辑' },
      { action: 'delete', action_name: '删除' }
  ];
*/


import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component( {
  selector: 'app-mit-table',
  templateUrl: './mit-table.component.html',
  styleUrls: [ './mit-table.component.scss' ]
})
export class MitTableComponent implements OnInit {

  @Input() columns: Array<any>;   // 头
  @Input() rows: Array<any>;    // 内容
  @Input() checkbox = false;   // 开启checkbox 默认false
  @Input() operations: Array<any> = [];  // 操作项
  @Input() pageSize: Number; // 每页显示数据条数
  @Output() operatEvent: EventEmitter<any> = new EventEmitter(); // 操作事件
  @Output() selectEvent: EventEmitter<any> = new EventEmitter(); // 点击列
  @Output() checkEvent: EventEmitter<any> = new EventEmitter(); // checkbox事件
  currentPage: Number = 1;  // 默认页码为 1
  sortingFlag: String; // 排序标志
  orderFlag: String; // 升序 asc  降序 desc
  checkedAll: boolean; // 全选事件
  checkedList: Array<any> = [];
  constructor( private sanitizer: DomSanitizer ) { }

  // innerHtml
  sanitize( html: string ): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml( html );
  }

  // 根据头部遍历数组
  getData( row: any, propertyName: string ): string {
    return propertyName.split( '.' ).reduce(( prev: any, curr: string ) => prev[ curr ], row );
  }
  ngOnInit() {

    // 当开启checkbox时遍历数组
    if ( this.checkbox ) {
      this.eachCheck( false );
    }

  }

  // 头元素点击事件用于排序
  sorting( column ) {
    if ( column.sorting && !this.orderFlag ) {
      this.sortingFlag = column.field;
      this.orderFlag = 'asc';
      // 第一次点击降序
    } else if ( column.sorting && this.orderFlag === 'asc' ) {
      this.sortingFlag = column.field;
      this.orderFlag = 'desc';
      // 第二次点击升序
    } else if ( column.sorting && this.orderFlag === 'desc' ) {
      this.sortingFlag = undefined;
      this.orderFlag = undefined;
      // 第三次关闭排序
    }
  }

  // 遍历数组
  eachCheck( flag: boolean ) {
    _( this.rows ).forEach( function ( row ) {
      row.check = flag;
    });
  }

  // 全选事件
  checkAll() {
    if ( this.checkedAll ) {
      this.eachCheck( true );
    } else {
      this.eachCheck( false );
    }
    this.checkedList = this.rows.filter(( item ) => item.check );
  }

  // 多选事件
  checked( row ) {
    this.checkedAll = false;
    this.checkedList = this.rows.filter(( item ) => item.check );
  }

  //  删除或标记已读
  checkAction( action ) {
    const _obj = { 'list': this.checkedList, 'action': action };
    this.checkEvent.emit( _obj );
  }

  // 行点击事件
  selected( row ) {
    this.selectEvent.emit( row );
  }

  // 操作点击事件
  action( row, opt ) {
    // 将行元素及操作项合并为一个对象，在根组件取得后根据操作项操作数组。
    this.operatEvent.emit( _.extend( row, opt ) );
  }

  // 页码点击事件
  pageChange( page ) {
    console.log( page );
  }

  changePage( page ) {
    console.log( page );
  }

}
