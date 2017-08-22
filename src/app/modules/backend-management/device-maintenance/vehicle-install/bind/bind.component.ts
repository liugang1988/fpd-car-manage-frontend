import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; // 引入表单的一些特性
import { VehicleInstallService } from '../vehicle-install.service';
import { EventsService } from '../../../../../services/events-service.service';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss']
})
export class BindComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() item: any;

  public disabled = false;

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private vehicleInstallService: VehicleInstallService,
    private eventsService: EventsService
  ) {
    this.form = fb.group({
      'IMEI': ['', Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(15)])],
      'BindMileage': [0.00, Validators.required],
      'VehicleID': ''
    });
  }

  ngOnInit() {
    this.form.controls['VehicleID'].setValue(this.item.ID);
  }


  InstallDevice(form) {
    this.vehicleInstallService.InstallDeviceByIMEI(form.value).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.close.emit({ action: 'bind', state: res.State });
      } else {
        this.close.emit(null);
      }
    },(err)=>{
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
    });
  }


  saveHandler(form) {
    this.disabled = false;
    this.InstallDevice(form);
  }


  closeHandler(e) {
    this.close.emit(null);
  }

}
