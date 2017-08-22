import { Injectable } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class ProductTestService {

  constructor(private authHttp: AuthService) { }

    // 生产测试列表
    GetDeviceList(data) {
      return this.authHttp.post(environment.baseUrl + 'DeviceManufacture/DeviceList', data);
    }

    // 生产测试详情
    DetailDevice(data) {
      return this.authHttp.post(environment.baseUrl + 'DeviceManufacture/DeviceDetail', data);
    }

    // 获取设备状态枚举(运气，休眠，离线)
    DeviceEnum() {
      return this.authHttp.get(environment.baseUrl + 'SysBasic/DeviceEnum');
    }
}
