import { Component, OnInit, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MitBaiduMapComponent } from '../../../../../widgets/mit-baidu-map/mit-baidu-map.component';

// 服务
import { NameOfCarService } from '../name-of-car.service';
import { EventsService } from '../../../../../services/events-service.service';


// 表格基类
import { MitDataTableBase } from '../../../../../widgets/mit-data-table/mit-data-table-base';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeIn]
})
export class DetailComponent extends MitDataTableBase implements OnInit, OnDestroy {

  @ViewChild(MitBaiduMapComponent) mitBaiduComponent: MitBaiduMapComponent;
  public id: number;
  public NameOfCarRenderInfo: any;
  public showDetectAlert = false;
  public currentItem: any;
  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素

  private styleOptions = {
    strokeColor: '#0078ff',    // 边线颜色。
    fillColor: '#0078ff',      // 填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 2,       // 边线的宽度，以像素为单位。
    strokeOpacity: 0.8,	   // 边线透明度，取值范围0 - 1。
    fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' // 边线的样式，solid或dashed。
  };


  constructor(
    private eventsService: EventsService,
    private nameOfCarService: NameOfCarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super(router, activatedRoute);
  }

  ngOnInit() {
    this.mitBaiduComponent.LoadBMap('Iz0YCH1ZtoxHyzhlD7yyz2fNckw8FRq5').then(() => {
      this.mitBaiduComponent.Init(); // 初始化百度地图
      this.checkAction();
    });
  }

  // 获取ID
  checkAction() {
    this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.GetRollCallFenceSettingByFenceId({ FenceId: this.id });
      }
    });
  }

  // 获取所有数据
  getList(pageIndex?) {
    this.rows = [];
    this.query.FenceID = this.id;
    this.query.PageSize = 10;
    this.nameOfCarService.GetPageRelatedVehicles(this.query).subscribe(
      (res) => {
        if (res.State) {
          this.rows.push({ pageNum: pageIndex ? pageIndex : this.query.PageIndex, data: res.Data.CurrentData });
          if (this.query.IsSearchTotal) {
            this.totalCount = res.Data.TotalCount;
          }
          this.getLocalData();
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

  // 获取栅栏详情
  GetRollCallFenceSettingByFenceId(data) {
    this.nameOfCarService.GetRollCallFenceSettingByFenceId(data).subscribe(
      (res) => {
        if (res.State) {
          this.NameOfCarRenderInfo = res.Data;
          this.setOverlay(res.Data.RuleContent.Points);
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

  // 设置覆盖物
  setOverlay(pointArr) {
    const _p = [];
    pointArr.forEach((item, i) => {
      this.mitBaiduComponent.GetPoint(item.X, item.Y).then((point) => {
        _p[i] = point;
      });
    });
    setTimeout(() => {
      const polygon = new BMap.Polygon(_p, this.styleOptions);  // 创建多边形
      this.mitBaiduComponent.currentMap.addOverlay(polygon);   // 增加多边形
      this.mitBaiduComponent.currentMap.setViewport(_p);
    }, 200);
  }


  // 添加车辆
  addcar() {
    this.showDetectAlert = true;
  }

  // 删除确认事件
  closeAlert(e) {
    this.getList();
    this.showDetectAlert = false;
  }


  // 删除弹窗
  delete(item): void {
    this.showDeleteAlert = true;
    this.deleteItem = item;
  }


  // 删除确认事件
  closeDeleteAlert(e) {
    this.showDeleteAlert = false;
    if (e && e.VID) {
      this.DeleteFence({ FenceId: this.id, VehicleId: e.VID });
    }
  }

  // 发起删除请求
  DeleteFence(data) {
    this.nameOfCarService.DeleteFenceVehicles(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.rows = [];
        this.list = [];
        this.getList();
      };
    });
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
