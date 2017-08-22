import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { ParamSettingService } from '../param-setting.service';
import { EventsService } from '../../../../../services/events-service.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent extends MitDataTableBase implements OnInit, OnDestroy {
  public id: number;
  public DeviceRenderInfo: any;

  public SingleDeviceParamList: any;
  public updateParamList: Array<any> = [];
  public disabled = true;

  public obdStatus:any;
  public obdStatusText:any;
  public obdBtnStatus: any;
  constructor(
    private eventsService: EventsService,
    private paramSettingService: ParamSettingService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.checkAction();
  }

  // 获取ID
  checkAction() {
    this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.DeviceDetail({ DeviceId: this.id });
        this.SingleDeviceParam({ Did: this.id });
      }
    });
  }

  // 设备库详情(包含车辆详情)
  DeviceDetail(data) {
    this.paramSettingService.DeviceDetail(data).subscribe((res) => {
      if (res.State) {
        this.DeviceRenderInfo = res.Data;
        this.obdStatus = res.Data.DeviceDTO.OBDStatus;
        this.btnStatus(this.obdStatus);
      }
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    });
  }

  // 按钮状态
  btnStatus(num){
    switch (num) {
      case 1:
        this.obdBtnStatus = '禁用';
        this.obdStatusText = '已启用';
        break;
      case 2:
        this.obdBtnStatus = '设备禁用中...';
        this.obdStatusText = '禁用中';
        break;
      case 3:
        this.obdBtnStatus = '启用';
        this.obdStatusText = '已禁用';
        break;
      case 4:
        this.obdBtnStatus = '设备启用中...';
        this.obdStatusText = '启用中';
        break;
    }
  }

  // 设置OBD状态
  setStatus() {
    const data = {
      DeviceID: this.DeviceRenderInfo.DeviceDTO.ID
    };
    this.paramSettingService.SwitchOBD(data).subscribe((res) => {
      this.obdStatus = res.Data;
      this.btnStatus(this.obdStatus);
    }, (err) => {
      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    })
  }

  // 获取单个设备的参数设置
  SingleDeviceParam(data) {
    this.paramSettingService.SingleDeviceParam(data).subscribe((res) => {
      if (res.State) {
        this.SingleDeviceParamList = res.Data;
      }
    }, (err) => {

      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    }
    );
  }

  disabledFn(data, item, index) {
    this.updateParamList = [];
    const min = item.RangeValue.split('~')[0];
    const max = item.RangeValue.split('~')[1];
    if (item.setValue || item.setValue === 0) {
      if (item.setValue > max || item.setValue < min) {
        data[index].setErrorClass = true;
        this.disabled = true;
      } else {
        data[index].setErrorClass = false;
        data[index].setSuccessClass = true;
        data.forEach((v, i) => {
          if (v.setValue && v.setValue !== undefined) {
            this.updateParamList.push({
              SetType: v.SetType,
              value: v.setValue
            });
          }
        });
      };
    } else {
      data[index].setErrorClass = false;
      data[index].setSuccessClass = false;
    }


    if (this.updateParamList.length === 0) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }

  }

  Submit(e) {
    this.updateSetting(this.updateParamList);
  }

  // 提交更改参数设置
  updateSetting(item) {
    const singleUpdate = {
      DidList: [this.id],
      DeviceParamList: item
    };
    this.paramSettingService.DeviceParamSet(singleUpdate).subscribe((res) => {
      this.disabled = true;
      this.SingleDeviceParam({ Did: this.id });
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);

    }, (err) => {

      if (err.State == 10 || err.State == 11 || err.State == 12) {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2500)
      } else {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
      }
    }
    );
  }

  // 取消
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  // 销毁
  ngOnDestroy() {
    this.rows = [];
    this.list = [];
  }

}
