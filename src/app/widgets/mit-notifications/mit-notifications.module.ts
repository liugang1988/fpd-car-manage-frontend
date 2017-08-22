import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitNotificationsComponent } from './mit-notifications.component';
import { MitNotificationsService } from './mit-notifications.service';
import { SimpleNotificationComponent } from './simple-notification/simple-notification.component';
import { MaxPipe } from './max.pipe';
@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [ MitNotificationsComponent, SimpleNotificationComponent, MaxPipe ],
  providers: [],
  exports: [ MitNotificationsComponent ]
})
export class MitNotificationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: MitNotificationsModule,
      providers: [
        MitNotificationsService
      ]
    };
  }
}
