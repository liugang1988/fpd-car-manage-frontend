import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleCarBindingService } from '../people-car-binding.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-unbind',
  templateUrl: './unbind.component.html',
  styleUrls: ['./unbind.component.scss']
})
export class UnbindComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() item: any;
  constructor(private peopleCarBindingService: PeopleCarBindingService, private eventsService: EventsService, private router: Router) {

  }

  unBindDriverVehiclee(data) {
    this.peopleCarBindingService.UnBindDriverVehiclee(data).subscribe((res) => {
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
      if (res.State) {
        this.close.emit({ action: 'bind', state: res.State, DID: data.DID });
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


  saveHandler(DID, VID) {
    const data = {
      DID: DID,
      VID: VID
    };
    this.unBindDriverVehiclee(data);
  }


  closeHandler(e) {
    this.close.emit(null);
  }


  ngOnInit() {
  }

}
