import { Component, OnInit, AfterContentInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { EventsService } from '../../../../services/events-service.service';
import { DriverManageService } from '../driver-manage.service';

@Component({
  selector: 'app-access-file',
  templateUrl: './access-file.component.html',
  styleUrls: ['./access-file.component.scss']
})
export class AccessFileComponent implements OnInit {

  public getId: any;
  public data: any;
  public id: string;

  public getRenderList: any;
  public star= 80;
  public evaluateStr:any;  // 系统评价
  constructor(
    private driverManageService: DriverManageService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getDerviceId();
  }

  getDerviceId() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = params.id;
        this.getDetail({ DriverId: parseInt(params.id, 10) });
      }
    });
  }

  // 系统评价(驾龄,月度平均分,驾驶行为分,运营管控评分)
  systemEvaluate(num1, num2, num3, num4){
    let str1 = '';
    let str2 = '';
    let str3 = '';
    let str4 = '';
    if(num1 >= 10){
      str1 = '丰富';
    }else if(num1 >= 5 && num1 < 10){
      str1 = '一般';
    }else if(num1 >=3 && num1 < 5){
      str1 = '经验较少';
    }else{
      str1 = '经验少';
    }

    if(num2 >= 90){
      str2 = '平稳';
    }else if(num2 >= 80 && num2 < 90){
      str2 = '较平稳';
    }else if(num2 >=70 && num2 < 80){
      str2 = '正常';
    }else if(num2 >=60 && num2 < 70){
      str2 = '不稳';
    }else{
      str2 = '异常';
    }

    if(num3 >= 90){
      str3 = '高';
    }else if(num3 >= 80 && num3 < 90){
      str3 = '良好';
    }else if(num3 >=70 && num3 < 80){
      str3 = '一般';
    }else if(num3 >=60 && num3 < 70){
      str3 = '较差';
    }else{
      str3 = '差';
    }

    if(num4 >= 90){
      str4 = '高';
    }else if(num4 >= 80 && num4 < 90){
      str4 = '良好';
    }else if(num4 >=70 && num4 < 80){
      str4 = '一般';
    }else if(num4 >=60 && num4 < 70){
      str4 = '较差';
    }else{
      str4 = '差';
    }
    this.evaluateStr = '驾驶经验' + str1 + ',驾驶' + str1 + ',乘客舒适度' + str2 + ',遵守纪律度' + str3 + ',身体健康状态' + str4
  }

  getDetail(data) {
    this.getRenderList = this.driverManageService.GetSingleDriver(data).subscribe((res) => {
      // this.showLoading = false;
      this.data = res.Data;
      const startDate = new Date(res.Data.FirstDriversLicense);
      const endDate = new Date();
      const df = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000));
      this.data.Driving = (df / 365).toFixed(2);
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

  // 取消
  back() {
    if (this.id) {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }

  ngOnDestroy() {
    if (this.getId) {
      this.getId.unsubscribe();
    }
    if (this.getRenderList) {
      this.getRenderList.unsubscribe();
    }

  }


}