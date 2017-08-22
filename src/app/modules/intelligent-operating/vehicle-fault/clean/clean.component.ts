import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

// services
import { VehicleFaultService } from '../vehicle-fault.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrls: ['./clean.component.scss']
})
export class CleanComponent implements OnInit, OnDestroy {
  @Input() item: any;
  @Output() close = new EventEmitter();

  public disabled = false;

  public _ClearFault_: any;
  constructor(
    private vehicleFaultService: VehicleFaultService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
  }



  ClearFault(data) {
    this._ClearFault_ = this.vehicleFaultService.ClearFault(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.close.emit(res);
      } else {

        this.close.emit(null);
      }

    }, (err) => {
      this.eventsService.emitMessageEvent(err.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, err.Message);
      this.close.emit(null);
    });
  }


  saveHandler(data) {
    this.disabled = true;
    this.ClearFault(data);
  }


  closeHandler(e) {
    this.close.emit(null);
  }

  ngOnDestroy() {
    if (this._ClearFault_) {
      this._ClearFault_.unsubscribe();
    }
  }

}
