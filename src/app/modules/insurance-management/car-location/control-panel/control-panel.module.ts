import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// 页面
import { ControlPanelComponent } from './control-panel.component';


// 路由注入
import { ControlPanelRoutes } from './control-panel.routes';



@NgModule({
  imports: [
    CommonModule,
    ControlPanelRoutes
  ],
  declarations: [ControlPanelComponent]
})
export class ControlPanelModule { }
