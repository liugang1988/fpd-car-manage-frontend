import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { MenuManageService } from '../menu-manage.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  form: FormGroup; // 表单对象
  @Input() content: any;  // 用于输入原有数据
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件


  constructor(private fb: FormBuilder, private menuManageService: MenuManageService) {
    this.form = fb.group({
      'ID': 0,           // 唯一ID
      'ParentID': 0,           // 父类ID
      'IconName': '',         // 图标名称
      'MenuName': ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z\\u4e00-\\u9fa5\\d]{2,10}')])],        // 标题
      'Url': ['', Validators.compose([Validators.required, Validators.pattern('[\\w-\/]{2,80}')])],         // 链接
    });
  }

  ngOnInit() {
    this.renderForm();
  }


  // 插入数据
  renderForm() {
    if (this.content.action === 'add' && this.content.ID) {
      (this.form.controls['ParentID']).setValue(this.content.ID);
    } else if (this.content.action === 'add' && !this.content.ID) {
      (this.form.controls['ParentID']).setValue(-1);
    }

    if (this.content.action === 'edit') {
      (this.form.controls['ID']).setValue(this.content.ID);
      (this.form.controls['IconName']).setValue(this.content.IconName || '');
      (this.form.controls['MenuName']).setValue(this.content.MenuName || '');
      (this.form.controls['Url']).setValue(this.content.Url || '');
    }
  }

  saveHandler(e) {

    // 新增一级菜单
    if (this.content.action === 'add') {
      this.menuManageService.addMeun(e).subscribe((res) => {
        this.close.emit(_.extend(e, res));
      }, (err) => {
        this.close.emit(_.extend(e, err));
      });
    }


    // 编辑菜单
    if (this.content.action === 'edit') {
      this.menuManageService.updateMenu(e).subscribe((res) => {
        this.close.emit(_.extend(e, res));
      }, (err) => {
        this.close.emit(_.extend(e, err));
      });
    }

  }
  closeHandler() {
    this.close.emit(null);
  }
}
