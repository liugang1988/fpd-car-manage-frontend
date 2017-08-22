import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceLibraryService } from '../device-library.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public DeviceDetailInfo: any;
  public CarDetailInfo: any;
  public getId: any;
  public id: string;
  public readStatus: any;
  public _getReadStatus: any;
  public _deviceDetail: any;
  constructor(
    private deviceLibraryService: DeviceLibraryService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.checkAction();
  }

  // 根据id查看详情
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.DeviceDetail({ 'DeviceId': parseInt(params.id, 10) });
        this.getReadStatus({ 'DeviceId': parseInt(params.id, 10) })
      }
    });
  }

  // 设备详情(包含车辆详情)
  DeviceDetail(data) {
    this._deviceDetail = this.deviceLibraryService.DetailDevice(data).subscribe((res) => {
      if (res.State) {
        this.DeviceDetailInfo = res.Data.DeviceDTO;
        this.CarDetailInfo = res.Data.VehicleDTO;
        this.addressTs(res.Data.VehicleDTO.DeviceLat, res.Data.VehicleDTO.DeviceLng);
      }
    }, (err) => {
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }

  // 经纬度转换物理地址
  addressTs(lat, lng) {
    this.deviceLibraryService.getAddress(lat, lng).subscribe((res) => {
      this.CarDetailInfo.address = res.result.formatted_address + res.result.sematic_description;
    });
  }

  // 读取
  read(){
    const data = {
      DeviceId : parseInt(this.id, 10)
    }
    this.deviceLibraryService.GetDeviceVin(data).subscribe((res) => {
      if (res.State) {
        this.eventsService.emitMessageEvent(res.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.readStatus = 2;
      }
    }, (err) => {
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }

  // 获取读取状态
  getReadStatus(data){
    this._getReadStatus = this.deviceLibraryService.GetVinReadCommandExcuteResult(data).subscribe((res) => {
      if (res.State) {
        this.readStatus = res.Data;
      }
    }, (err) => {
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    });
  }

  // 销毁
  ngOnDestroy() {
    if( this._getReadStatus ) {
      this._getReadStatus.unsubscribe();
    }
    if( this._deviceDetail ) {
      this._deviceDetail.unsubscribe();
    }
  }

}
