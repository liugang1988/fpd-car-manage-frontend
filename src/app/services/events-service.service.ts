import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class EventsService {
  dispatcher: EventEmitter<any> = new EventEmitter();
  eventNames: EventNames = new EventNames();
  commonDispatcher: EventEmitter<any> = new EventEmitter();
  constructor() { }
  emitMessageEvent(name: string, data: any) {
    const message = new Message(name, data);
    this.dispatcher.emit(message);
  }

  // 通用事件
  emitEvent(name: string, data: any){
    const message = new Message(name, data);
    this.commonDispatcher.emit(message);
  }

  getCommonEmitter(){
    return this.commonDispatcher;
  }

  getEmitter() {
    return this.dispatcher;
  }

  getNames() {
    return this.eventNames;
  }
}

export class EventNames {
  public EVENT_TOAST_SUCCESS = 'EVENT_TOAST_SUCCESS';
  public EVENT_TOAST_ERROR = 'EVENT_TOAST_ERROR';
  public EVENT_CAR_REAL_TIME_TRACK = 'EVENT_CAR_REAL_TIME_TRACK';
  public EVENT_CAR_LOCATION_HISTORY_TRACK = 'EVENT_CAR_LOCATION_HISTORY_TRACK';
  public EVENT_CAR_PLAY_CTRL = 'EVENT_CAR_PLAY_CTRL';
  public EVENT_SECURITY_ALERT_HANDING = 'EVENT_SECURITY_ALERT_HANDING';
  public EVENT_LAYOUT_RESIZE = 'EVENT_LAYOUT_RESIZE';

  constructor() { }

}

export class Message {
  constructor(public name: string, public data: any) { }
}
