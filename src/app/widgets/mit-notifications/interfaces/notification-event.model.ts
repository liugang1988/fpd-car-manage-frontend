import {Notification} from './notification.model';

export interface NotificationEvent {
  add?: boolean;
  command: string;
  id?: string;
  notification?: Notification;
}
