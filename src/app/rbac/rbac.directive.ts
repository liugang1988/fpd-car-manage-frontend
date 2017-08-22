/*
rbac => role base access control
该组件用于控制页面权限点的显示与隐藏

parmes string: "control_actionname"
example account_addUser
*/

import { Directive, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from '../../environments/environment';
@Directive({
  selector: '[appRbac]'
})
export class RbacDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }
  @Input() set appRbac(name: string) {
    if (this.isActionRights(name)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  isActionRights(actionName) {
    const ActionArr = JSON.parse(localStorage.getItem(environment.local_storage_account)).ActionRights;
    return ActionArr.indexOf(actionName) > -1 ? true : false;
  }
}
