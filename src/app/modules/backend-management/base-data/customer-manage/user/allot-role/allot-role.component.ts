import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventsService } from '../../../../../../services/events-service.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allot-role',
  templateUrl: './allot-role.component.html',
  styleUrls: ['./allot-role.component.scss']
})
export class AllotRoleComponent implements OnInit {
  public RoleID: any;
  @Input() item: any;
  @Input() OID: number;
  @Output() close = new EventEmitter();  // 用于向父级发送弹窗关闭事件

  constructor(private eventsService: EventsService, private userService: UserService, private router:Router) { }

  ngOnInit() {

  }

  saveHandler(e) {
    this.AllotRolesToUser();
  }


  closeHandler(e) {
    this.close.emit(null);
  }


  // 选择角色
  selectRole(event) {
    this.RoleID = event;
  }


  // AllotRolesToUser
  AllotRolesToUser() {
    const data = { UserId: this.item.ID, RoleIds: [this.RoleID] };
    this.userService.AllotRolesToUser(data).subscribe((res) => {
      this.close.emit(res);
      this.eventsService.emitMessageEvent(res.State === 1 ? this.eventsService.eventNames.EVENT_TOAST_SUCCESS : this.eventsService.eventNames.EVENT_TOAST_ERROR, res.Message);
    },(err)=>{
      
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

}
