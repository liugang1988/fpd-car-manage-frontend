import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { DepartmentManageService } from '../department-manage.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  form: FormGroup; // 表单对象
  disabled = false;
  @Input() content: any;  // 用于输入原有数据
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件


  constructor(private fb: FormBuilder, private departdmentManageService: DepartmentManageService) {
    this.form = fb.group({
      'ID': undefined,                 // 唯一ID
      'ParentID': '',           // 父类ID
      'DepartmentName': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\\u4e00-\\u9fa5\\d]{2,10}')])],      // 部门名称
      'DepartmentRemark': ['', Validators.compose([Validators.maxLength(200)])],
      'ParentDeptName': ''
    });
  }

  ngOnInit() {
    this.renderForm();
  }


  // 插入数据
  renderForm() {
    if (this.content.action === 'add' && this.content.ID) {
      this.form.controls['ParentID'].setValue(this.content.ID);
    } else if (this.content.action === 'add' && !this.content.ID) {
      this.form.controls['ParentID'].setValue(-1);
    }

    if (this.content.action === 'edit') {
      this.GetSingleOrganizationDept(this.content.ID);
    }

  }

  saveHandler(e) {
    this.disabled = true;
    // 新增一级菜单
    if (this.content.action === 'add') {
      this.departdmentManageService.AddOrganizationDept(e).subscribe((res) => {
        this.close.emit(_.extend(e, res));
      }, (err) => {
        this.close.emit(_.extend(e, err));
      });
    }


    // 编辑菜单
    if (this.content.action === 'edit') {
      this.departdmentManageService.UpdateOrganizationDept(e).subscribe((res) => {
        this.close.emit(_.extend(e, res));
      }, (err) => {
        this.close.emit(_.extend(e, err));
      });
    }

  }


  GetSingleOrganizationDept(ID) {
    this.departdmentManageService.GetSingleOrganizationDept(ID).subscribe((res) => {
      if (res.State) {
        this.form.controls['ID'].setValue(res.Data.ID);
        this.form.controls['ParentID'].setValue(res.ParentID);
        this.form.controls['DepartmentName'].setValue(res.Data.DepartmentName || '');
        this.form.controls['DepartmentRemark'].setValue(res.Data.DepartmentRemark || '');
        this.form.controls['ParentDeptName'].setValue(res.Data.ParentDeptName || '');
      }
    }, (err) => {

    });
  }


  closeHandler() {
    this.close.emit(null);
  }
}
