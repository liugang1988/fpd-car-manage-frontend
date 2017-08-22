import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleInstallService } from '../vehicle-install.service';
import { EventsService } from '../../../../../services/events-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
@Component({
  selector: 'app-unbind',
  templateUrl: './unbind.component.html',
  styleUrls: ['./unbind.component.scss']
})
export class UnbindComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() item: any;
  public form: FormGroup; // 表单对象
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private vehicleInstallService: VehicleInstallService,
    private eventsService: EventsService
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      'DeviceID': [this.item.DeviceID, Validators.required],
      'VehicleID': [this.item.ID, Validators.required],
      'Description': ''
    });
  }


  saveHandler(form) {
    this.vehicleInstallService.UnInstallDevice(form).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.close.emit({ action: 'unbind', state: res.State });
      } else {
        this.close.emit(null);
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


  closeHandler(e) {
    this.close.emit(null);
  }


}
