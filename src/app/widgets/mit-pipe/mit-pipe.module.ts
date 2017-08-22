import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MitPipeComponent } from './mit-pipe.component';

// 返回布尔值的校验管道
import { IsLicensePipe } from './IsLicense/is-license.pipe';  // 车牌号校验
import { IsCitizenIDPipe } from './IsCitizenID/is-citizen-id.pipe';  //  身份证校验
import { IsEmailPipe } from './IsEmail/is-email.pipe'; // 邮箱校验
import { IsFixedPhonePipe } from './IsFixedPhone/is-fixed-phone.pipe';  // 固话校验
import { IsMobilePhonePipe } from './IsMobilePhone/is-mobile-phone.pipe';  // 动断电话校验
import { IsNumberPipe } from './IsNumber/is-number.pipe';  // 数字校验
import { IsEnhancePasswordPipe } from './IsEnhancePassword/is-enhance-password.pipe'; // 加强型密码
import { IsNormalPasswordPipe } from './IsNormalPassword/is-normal-password.pipe';  // 常规密码
import { IsUsernamePipe } from './IsUsername/is-username.pipe'; // 用户名校验



// 功能管道
import { SliceStrPipe } from './SliceStr/slice-str.pipe';
import { TimeDifferencePipe } from './TimeDifference/time-difference.pipe';
import { TransDatePipe } from './TransDate/trans-date.pipe';  // 日期转换
import { ThousandSeparationPipe } from './thousandSeparation/thousand-separation.pipe'; // 千分位分割
import { SplitTimePipe } from './splitTime/split-time.pipe';  // 时间日期截取

const pipe =  [
  IsCitizenIDPipe,
  IsEmailPipe,
  IsEnhancePasswordPipe,
  IsFixedPhonePipe,
  IsLicensePipe,
  IsMobilePhonePipe,
  IsNormalPasswordPipe,
  IsNumberPipe,
  IsUsernamePipe,
  SliceStrPipe,
  TimeDifferencePipe,
  TransDatePipe,
  ThousandSeparationPipe,
  SplitTimePipe
];

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    MitPipeComponent,
    ...pipe
    ,
  ],
  exports: [ ...pipe ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MitPipeModule { }
