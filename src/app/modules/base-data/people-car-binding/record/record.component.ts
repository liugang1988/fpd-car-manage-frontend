import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeopleCarBindingService } from '../people-car-binding.service';
import { EventsService } from '../../../../services/events-service.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() item: any;
  public list: any;
  constructor(private peopleCarBindingService: PeopleCarBindingService, private eventsService: EventsService, private router: Router) {

  }

  // 获取所有数据
  getList() {
    const data = {
      DriverId: this.item.DID
    };
    this.peopleCarBindingService.GetBindRecords(data).subscribe((res) => {
      if (res.State) {
        this.list = res.Data;
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

  saveHandler() {
    this.close.emit(null);
  }


  closeHandler(e) {
    this.close.emit(null);
  }


  ngOnInit() {
    this.getList();
  }

}
