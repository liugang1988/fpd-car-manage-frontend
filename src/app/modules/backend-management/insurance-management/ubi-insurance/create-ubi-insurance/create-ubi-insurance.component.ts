import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { UbiInsuranceService } from './../ubi-insurance.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-create-ubi-insurance',
  templateUrl: './create-ubi-insurance.component.html',
  styleUrls: ['./create-ubi-insurance.component.scss']
})
export class CreateUbiInsuranceComponent implements OnInit, OnDestroy {
  @Input() CINo: any;  // 常规保单号
  @Input() CID:any; // 常规保单id
  @Input() VID:any;  // 车辆id
  @Output() close = new EventEmitter();
  public carInfor:any;
  public _carInfor:any;
  // ubi模型下拉
  public placeholder = '请选择模型';
  public optionName = "ModelName";
  public optionList: Array<any>;
  public model:any;  // 模型
  public errMsg:any = '';  // 错误提示
  public showLoading:boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ubiInsuranceService: UbiInsuranceService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.geInfor({CINo :this.CINo});
    this.getUBIModelList();
  }

  // 选择模型
  selectModel(e){
    this.model = e.ID;
    this.errMsg = '';
  }

  geInfor(data) {
    this._carInfor = this.ubiInsuranceService.GetCommonInsuranceDetail(data).subscribe((res) => {
        if (res.Data) {
         this.carInfor = res.Data;
        }
      },(err) => {
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

  // 获取ubi模型
  getUBIModelList(){
    this.ubiInsuranceService.GetUBIModelList().subscribe((res)=>{
      if(res.Data){
        this.optionList = res.Data;
      }
    },(err)=>{
      if(err.State == 10 || err.State == 11 || err.State == 12){
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
          setTimeout(()=>{
            this.router.navigate(['/account/login']);
          },2500)
        }else{
          this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, '网络异常!');
        }
    })
  }

  // 关闭
  closeHandler(e) {
    this.close.emit(null);
  }

  // 提交
  saveHandler(){
    if(this.model && !this.showLoading){
      const data = {
        CIID: this.CID,
        ModelId: this.model,
        Vid: this.VID,
      }
      this.showLoading = true;
      this.ubiInsuranceService.AddUBIInsurance(data).subscribe((res)=>{
        this.eventsService.emitMessageEvent(res.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.close.emit(true);
        this.showLoading = false;
      },(err)=>{
        this.eventsService.emitMessageEvent(err.State == 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
        this.close.emit(null);
        this.showLoading = false;
      })
    }else{
      this.errMsg = '请选择UBI模型!';
    }
    
  }

  ngOnDestroy(){
    if(this._carInfor){
      this._carInfor.unsubscribe();
    }
  }

}
