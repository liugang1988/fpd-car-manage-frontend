import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';


// fncModules--功能模块
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule , JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RbacModule } from './rbac/rbac.module';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
const fncModules = [
  BrowserModule,
  HttpModule,
  JsonpModule,
  RouterModule,
  FormsModule,
  BrowserAnimationsModule,
  NgbModule.forRoot(),
  RbacModule.forRoot(),
  SlimLoadingBarModule.forRoot()
];



// module--业务模块
import { MitNotificationsModule } from './widgets/mit-notifications/mit-notifications.module';
import { MitLayoutModule } from './widgets/mit-layout/mit-layout.module';
const businessModules = [
  MitNotificationsModule.forRoot(),
  MitLayoutModule
];




// Services---服务
import { AuthService } from './services/auth.service';
import { EventsService } from './services/events-service.service';
import { AppService } from './app.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent
    // ...pipe
  ],
  imports: [
    ...fncModules,
    ...businessModules,
    AppRoutes,
  ],
  providers: [AuthService, EventsService, AppService, NgbDatepickerConfig],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
