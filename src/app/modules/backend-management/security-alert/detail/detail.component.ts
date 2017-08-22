import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityAlertService } from '../security-alert.service';
import { MitBaiduMapComponent } from '../../../../widgets/mit-baidu-map/mit-baidu-map.component';
import { EventsService } from '../../../../services/events-service.service';

import { fadeIn } from '../../../../animation/fadeIn';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn]
})
export class DetailComponent implements OnInit, OnDestroy {
  @ViewChild(MitBaiduMapComponent) mitBaiduComponent: MitBaiduMapComponent;
  public getId: any;
  public id: string;
  public renderEventInfo: any;
  public renderAlertInfo: any;
  private overlayArr = [];
  private pointArr = [];

  public _HandlerDetail_: any;
  public _HandlerDetail1_: any;


  constructor(
    private securityAlertService: SecurityAlertService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.checkAction();
  }

  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.GetAlertProcessingDetails({ AID: parseInt(params.id, 10) });
        this.GetAlertDetail('/' + params.id);
        this.mitBaiduComponent.LoadBMap('Iz0YCH1ZtoxHyzhlD7yyz2fNckw8FRq5').then(() => {
          this.mitBaiduComponent.Init(); // 初始化百度地图
        });
      }
    });
  }




  // 获取报警处理详情
  GetAlertProcessingDetails(data) {
    this._HandlerDetail_ = this.securityAlertService.GetAlertProcessingDetails(data).subscribe(
      (res) => {
        if (res.State) {
          this.renderEventInfo = res.Data;
        }
      },
      (err) => {
        
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );
  }

  // 报警详情
  GetAlertDetail(data) {
    this._HandlerDetail1_ = this.securityAlertService.GetDetail(data).subscribe(
      (res) => {
        if (res.State) {
          this.renderAlertInfo = res.Data;

          if (this.renderAlertInfo.StartPoint && this.renderAlertInfo.StartPoint.Lng && this.renderAlertInfo.StartPoint.Lat) {
            this.MakerEventPoint(this.renderAlertInfo.StartPoint, '开始时间：' + this.renderAlertInfo.StartTime, this.renderAlertInfo.AlertType);
          }

          if (this.renderAlertInfo.EndPoint && this.renderAlertInfo.EndPoint.Lng && this.renderAlertInfo.EndPoint.Lat) {
            this.MakerEventPoint(this.renderAlertInfo.EndPoint, '结束时间：' + this.renderAlertInfo.EndTime, this.renderAlertInfo.AlertType);
          }
        }
      },
      (err) => {
        
        if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
      }
    );
  }

  // 标注事件
  MakerEventPoint(event, time, AlertType) {
    this.mitBaiduComponent.GetPoint(event.Lng, event.Lat).then((point) => {
      this.securityAlertService.getAddress(event.Lat, event.Lng).subscribe((res) => {
        point.point = point;
        point.time = time;
        point.address = '地址：' + res.result.formatted_address + res.result.sematic_description;
        point.icon = '../../../assets/images/car_location/tracks/' + AlertType + '.png';
        this.SetEventMaker(point);
        this.SetIcon(point, 29, 35);
      });
    });
  }


  // 设置图标
  SetIcon(point, width, height) {
    const marker = this.mitBaiduComponent.MakerIcon(point, width, height);
    this.mitBaiduComponent.currentMap.addOverlay(marker);
    marker.addEventListener('click', () => {
      this.ShowOverlay(point);
    });

    this.pointArr.push(point);
    this.mitBaiduComponent.SetView(this.pointArr);
  }


  // 显示信息弹窗
  ShowOverlay(e) {
    this.overlayArr.forEach((item, key) => {
      if (item.event.lat === e.lat && item.event.lng === e.lng) {
        item.show();
      } else {
        item.hide();
      }
    });
  }


  // 设置覆盖物
  SetEventMaker(point) {
    const overlay = this.mitBaiduComponent.EventOverlay(point);
    this.overlayArr.push(overlay);
    this.mitBaiduComponent.currentMap.addOverlay(overlay);

  }

  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this._HandlerDetail_) {
      this._HandlerDetail_.unsubscribe();
    }
    if (this._HandlerDetail1_) {
      this._HandlerDetail1_.unsubscribe();
    }
    this.overlayArr = [];
    this.pointArr = [];
  }



}
