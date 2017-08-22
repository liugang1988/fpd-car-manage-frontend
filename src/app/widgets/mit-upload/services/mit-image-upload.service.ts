import { Injectable } from '@angular/core'; // 核心库-注入服务
import { AuthService } from '../../../services/auth.service';  // 鉴权
import { environment } from '../../../../environments/environment'; // 环境变量

// 图片上传接口
import { IMitImageUpload } from '../interface/mit-image-upload.model';





@Injectable()
export class MitImageUploadService {

  constructor(private authHttp: AuthService) { }


  resize(e): Promise<any> {
    const lrz = (<any>window)['lrz'];
    const p = new Promise((resolve, reject) => {
      lrz(e)
        .then(function (rst) {
          resolve(rst);
        })
        .catch(function (err) {
          // 处理失败会执行
          reject(err);
        })
        .always(function () {
          // 不管是成功失败，都会执行
        });
    });

    return p;
  }

  uploadImg(iMitImageUploadParam: IMitImageUpload) {
    return this.authHttp.upload(environment.baseUrl + 'FileUpload/ImgUpload', iMitImageUploadParam);
  }


}

