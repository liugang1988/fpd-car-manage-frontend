import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { FileUploadService } from './file-upload.service';


import { uploadExcelParam } from '../../../environments/environment';  // 上传配置

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnChanges {
  @Input() url: string; // API链接

  @Output() uploadedEvt = new EventEmitter();  // 上传完成事件

  @Input() valiScope?: any; // 上传限制条件
  @Input() uploadType: string; // 限定上类型
  public currentFile: File;


  public uploadDesrc: string;  // 上传状态信息


  constructor(private fileUploadService: FileUploadService) { }

  ngOnInit() {


  }

  ngOnChanges() {

  }

  // 选择文件事件
  selected(e) {

    this.validType(e.target.files[0]);
  }


  // 文件格式检验
  validType(e, uploadType?) {

    const scope = {
      type: [],
      size: 3
    };

    const filename = '.' + e.name.substring(e.name.lastIndexOf('.') + 1);
    const filetype = e.type;
    const filesize = e.size;
    if (this.valiScope) {
      scope.type = this.valiScope.Type; // 限制的文件格式
      scope.size = this.valiScope.Size * 1024 * 1024; // 限制的大小
    } else {
      scope.type = uploadExcelParam.fileType;
      scope.size = uploadExcelParam.fileSize * 1024 * 1024;
    }
    if (e && scope.type.indexOf(filename) === -1) {
      this.uploadDesrc = '文件格式不匹配';
    } else if (e && scope.size < filesize) {
      this.uploadDesrc = '文件大小不匹配';
    } else {
      this.uploadDesrc = '';
      this.upload(e);
    }
    return null;


  }

  // 通过校验
  upload(e) {
    this.currentFile = e;
    const form = new FormData();
    form.append('file', e);
    this.uploadedEvt.emit(form);
  }

  // 删除文件
  delete(e) {
    this.currentFile = undefined;
    this.uploadedEvt.emit(undefined);
  }


}
