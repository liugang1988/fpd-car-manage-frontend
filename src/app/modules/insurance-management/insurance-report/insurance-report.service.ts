import { Injectable } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class InsuranceReportService {

  constructor(private authHttp: AuthService) { }

  // 监控列表
  GetPageCarMonitorVehicles(data) {
    return this.authHttp.post(environment.baseUrl + 'CarConditionMonitor/GetPageCarMonitorVehicles', data);
  }

  // 获取设备状态枚举(运行，休眠，离线)
  DeviceEnum() {
    return this.authHttp.get(environment.baseUrl + 'SysBasic/DeviceEnum');
  }

  // 获取发动机指标
  GetOBDEngineIndex(data) {
    return this.authHttp.post(environment.baseUrl + 'CarConditionMonitor/GetOBDEngineIndex', data);
  }

  // 获取怠速节气门图标数值
  GetIdleDrigramsData(data) {
    return this.authHttp.post(environment.baseUrl + 'CarConditionMonitor/GetIdleDrigramsData', data);
  }

  // 获取车辆档案详情
  VehicleDetail(data) {
    return this.authHttp.post(environment.baseUrl + 'Vehicle/VehicleDetail', data);
  }

  // 远程扫描记录
  GetPageCarMonitorLogs(data) {
    return this.authHttp.post(environment.baseUrl + 'CarConditionMonitor/GetPageCarMonitorLogs', data);
  }

  // 根据扫描日志ID获取扫描日志
  GetCarMonitorLogDetailByLogID(data) {
    return this.authHttp.post(environment.baseUrl + 'CarConditionMonitor/GetCarMonitorLogDetailByLogID', data);
  }
}