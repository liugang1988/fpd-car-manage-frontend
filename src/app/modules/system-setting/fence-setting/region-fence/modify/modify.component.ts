import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { Router, ActivatedRoute } from '@angular/router';

// 服务
import { RegionFenceService } from '../region-fence.service';
import { EventsService } from '../../../../../services/events-service.service';

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public getId: any;
  public showLoading = false;
  public _getDetail:any;

  public disabled = false;
  public id: number;
  public areasArr = [];  // 存储地区名称
  public codeArr = [];  // 存储地区编码
  public dataArr = [];  // 存储选中地区
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private regionFenceService: RegionFenceService
  ) {


    this.form = fb.group({
      'ID': 0,
      'RuleContent': this.fb.group({
        'FenceName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])], // 栅栏名称
        'Areas': ['', Validators.required],
        'FenceAddress': ['']
      })
    });
  }
 
  ngOnInit() {
    this.checkAction();
  }

  // 根据是否存在id判断是新增还是修改
  checkAction() {
    this.getId = this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.form.controls['ID'].setValue(this.id);
        this.getDatil(this.id);
      } else {
        this.showLoading = false;
      }
    });
  }

  // 选择地址
  selectAddress(e) {
    const address = [];
    const code = [];
    for (const key in e) {
      if (e[key].name) {
        address.push(e[key].name);
        code.push(e[key].id);
      }
    }
    const _address = address.join(' - ');  // 存完整名字
    const _code = code[code.length - 1]; // 存最后一个编码
    this.checkSelectAddress(_address, _code); 
  }

  // 查找地址关联及存在项
  checkSelectAddress(currentAddress, currentCode) {
    this.areasArr.push(currentAddress);
    this.areasArr = Array.from(new Set(this.areasArr));
    this.codeArr.push(currentCode);
    this.codeArr = Array.from(new Set(this.codeArr));
    this.dataArr = [];
    for(let i=0, j = this.areasArr.length; i < j; i++){
      this.dataArr.push({
        'AreaName': this.areasArr[i],
        'Code': this.codeArr[i]
      })
    }
    this.form.controls['RuleContent']['controls']['Areas'].setValue(this.dataArr);
  }


  // 删除区域
  deleteArea(i) {
    this.areasArr.splice(i, 1);
    if (this.areasArr.length === 0) {
      this.form.controls['RuleContent']['controls']['Areas'].setValue('');
    }
    this.dataArr = [];
    for(let i=0, j = this.areasArr.length; i < j; i++){
      this.dataArr.push({
        'AreaName': this.areasArr[i],
        'Code': this.codeArr[i]
      })
    }
    this.form.controls['RuleContent']['controls']['Areas'].setValue(this.dataArr);
  }


  // 获取详情
  getDatil(id) {
    const _data = { FenceId: id };
    this._getDetail = this.regionFenceService.GetAreaFenceSettingByFenceId(_data).subscribe((res) => {
      if (res.State) {
        this.form.setValue({
          'ID': id,
          'RuleContent': {
            'FenceName': res.Data.RuleContent.FenceName || '',
            'FenceAddress': res.Data.RuleContent.FenceAddress || '',
            'Areas': res.Data.RuleContent.Areas || ''
          }
        });
        this.areasArr = res.Data.RuleContent.Areas.map((item)=> item.AreaName);
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


  // 提交
  onSubmit(form) {
    this.disabled = true;
    this.regionFenceService.AddOrUpdateAreaFenceSetting(form).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      this.back();
    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.back();
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
    if(this._getDetail){
      this._getDetail.unsubscribe();
    }
  }


}
