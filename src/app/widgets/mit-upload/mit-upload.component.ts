
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { MitImageUploadLoaderService } from './services/mit-image-upload.loader.service';
import { MitImageUploadService } from './services/mit-image-upload.service';

import { uploadImgParam } from '../../../environments/environment';  // 上传配置

@Component({
  selector: 'app-mit-upload',
  templateUrl: './mit-upload.component.html',
  styleUrls: ['./mit-upload.component.scss']
})
export class MitUploadComponent implements OnInit, AfterViewInit {
  @Input() uploadTitleName: string; // 上传标题字
  @Input() height: any; // 定制高度
  @Input() valiScope?: any; // 上传限制条件
  @Input() uploadType: string; // 限定上类型
  @Output() uploadEvt = new EventEmitter();
  @Input() preview: any; // 图片预览
  public uploadDesrc = '请点击上传'; // 点击上传文字替换
  public loadingStatus = false; // loading

  public uploadStatus = false; // 上传状态样式高亮

  constructor(
    private loader: MitImageUploadLoaderService,
    private mitImageUploadService: MitImageUploadService
  ) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    const lrz = (<any>window)['lrz'];

    if (!lrz) {
      this.loader.load().then(() => {
      }).catch(() => { });
    } else {
    }
  }

  onerror(e) {
  }

  // 选择文件
  selected(e) {
    this.fileValidator(e.target.files[0], this.uploadType);
  }



  // 上传格式限制判断
  fileValidator(e, uploadType?) {
    // [valiScope]="{'imageType':['image/png','image/jpeg','image/jpg'],'imageSize':3}"
    const scope = {
      type: [],
      size: 3
    };
    const filename = e.name;
    const filetype = e.type;
    const filesize = e.size;


    if (this.valiScope) {
      scope.type = this.valiScope.Type; // 限制的文件格式
      scope.size = this.valiScope.Size * 1024 * 1024; // 限制的大小
    } else {
      scope.type = uploadImgParam.fileType;
      scope.size = uploadImgParam.fileSize * 1024 * 1024;
    }



    if (e && scope.type.indexOf(filetype) === -1) {
      this.uploadDesrc = '图片格式不匹配';
      this.uploadStatus = true;
    } else if (e && scope.size < filesize) {
      this.uploadDesrc = '图片大小不匹配';
      this.uploadStatus = true;
    } else {
      this.uploadStatus = false;
      this.loadingStatus = true;
      this.resize(e);
    }
    return null;
  }





  // reize
  resize(e) {
    if (e) {
      this.mitImageUploadService.resize(e).then((res) => {
        this.uploadIMG(res.formData); // 调用上传接口
      });
    }
  }

  // 上传图片
  uploadIMG(data) {
    this.mitImageUploadService.uploadImg(data).subscribe((res) => {
      this.loadingStatus = false;
      if (res.State) {
        this.preview = res.Data;  // 回调成功后渲染图片
        this.uploadEvt.emit(res.Data);
      } else {
        this.uploadStatus = true;
        this.uploadDesrc = res.Message;
      }

    }, (error) => {
      this.loadingStatus = false;
      this.uploadStatus = true;
      this.uploadDesrc = '上传失败请重试';
    });
  }


  // 删除图片预览
  delete(e) {
    this.preview = null;
  }

}
