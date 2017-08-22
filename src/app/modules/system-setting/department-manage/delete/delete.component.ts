import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentManageService } from '../department-manage.service';
@Component( {
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: [ './delete.component.scss' ]
})
export class DeleteComponent implements OnInit {
  @Input() selectedItem: any;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件

  constructor( private departmentManageService: DepartmentManageService ) { }

  ngOnInit() {

  }

  saveHandler( e ) {
    const _objcet = { ID: e.ID };
    this.departmentManageService.DeleteOrganizationDept( _objcet ).subscribe(( res ) => {
      this.close.emit( _.extend( e, res ) );
    }, ( err ) => {
      this.close.emit( _.extend( e, err ) );
    });
  }


  closeHandler() {
    this.close.emit( null );
  }

}
