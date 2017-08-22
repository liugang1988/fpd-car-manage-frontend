export interface LoginInterface {
  UserName: string;  // 必须是手机号码或者邮箱
  PassWord: string; // 必须是混合密码,不能纯数字;

  rememberAccount: boolean; // 记住账号
}
