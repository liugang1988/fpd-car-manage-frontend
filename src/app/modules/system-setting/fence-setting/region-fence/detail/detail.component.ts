import { Component, OnInit, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { RegionFenceService } from '../region-fence.service';
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

  public id: number;
  public RegionFenceRenderInfo: any;
  public showDetectAlert = false;
  public currentItem: any;
  public showDeleteAlert = false; // 删除弹窗
  public deleteItem: any; // 需要删除的元素


  constructor(
    private eventsService: EventsService,
    private regionFenceService: RegionFenceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
        this.GetSpeedFenceSettingByFenceId({ FenceId: parseInt(params.id, 10) });
      }
    });
  }

  // 获取所有数据
  getList(pageIndex?) {
    this.rows = [];
    this.query.FenceID = this.id;
    this.query.PageSize = 10;
    this.regionFenceService.GetPageRelatedVehicles(this.query).subscribe(
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
  GetSpeedFenceSettingByFenceId(data) {
    this.regionFenceService.GetAreaFenceSettingByFenceId(data).subscribe(
      (res) => {
        if (res.State) {
          this.RegionFenceRenderInfo = res.Data;

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
    this.regionFenceService.DeleteFenceVehicles(data).subscribe((res) => {
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
