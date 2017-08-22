import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性

// 动画
import { fadeIn } from '../../../../../animation/fadeIn';

// 服务
import { SpeedFenceService } from '../speed-fence.service';
import { EventsService } from '../../../../../services/events-service.service';


@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss'],
  animations: [fadeIn]
})
export class ModifyComponent implements OnInit {
  public form: FormGroup;
  public getId: any;
  public id: number;
  constructor(
    private speedFenceService: SpeedFenceService,
    private eventsService: EventsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      'ID': 0,
      'RuleContent': this.fb.group({
        'MaxSpeed': [0, Validators.compose([Validators.required, Validators.pattern('(([4-9][0-9])|(1[0-1][0-9])|(120))')])],
        'FenceName': ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(10)])],
      })

    });
  }

  ngOnInit() {
    this.checkAction();
  }

  // 获取ID
  checkAction() {
    this.activatedRoute.params.subscribe((params: { id: string }) => {
      if (params.id) {
        this.id = parseInt(params.id, 10);
        this.form.controls['ID'].setValue(this.id);
        this.GetSpeedFenceSettingByFenceId({ FenceId: parseInt(params.id, 10) });
      }
    });
  }

  GetSpeedFenceSettingByFenceId(data) {
    this.speedFenceService.GetSpeedFenceSettingByFenceId(data).subscribe(
      (res) => {
        if (res.State) {
          this.form.controls['RuleContent'].setValue({
            'MaxSpeed': res.Data.RuleContent.MaxSpeed || '',
            'FenceName': res.Data.RuleContent.FenceName || '',
          });
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

  onSubmit(form) {
    this.speedFenceService.AddOrUpdateSpeedFenceSetting(form).subscribe(
      res => {
        this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
        this.back();
      },
      err => {
        this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
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



}
