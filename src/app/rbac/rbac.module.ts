import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RbacDirective } from './rbac.directive';
import { RbacService } from './rbac.service';
@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [ RbacDirective ],
  exports: [ RbacDirective ],
  providers: [ RbacService ]
})
export class RbacModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RbacModule,
      providers: [ RbacService ]
    };
  }
}


