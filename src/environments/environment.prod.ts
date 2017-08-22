// 基础信息
export const environment = {
  production: true,
  company: '脚印数据 版权所有',
  copyright: '2016 - 2017',
  version: 'V1.1.0',
  url: 'www.fpdiov.com',
  baseUrl: '/api/',
  local_storage_account: 'account_base_info',
  local_storage_menu: 'all_menu',
  local_remember_account: 'remember_account',
  local_carlocation_setting: 'local_carlocation_setting'
};


// 图片上传参数
export const uploadImgParam = {
  'fileType': ['image/png', 'image/jpeg', 'image/jpg'],  // 图片上传格式
  'fileSize': 3, // 图片上传大小限制（MB）
};

// excel上传参数
export const uploadExcelParam = {
  'fileType': ['.xlsx'],  // 图片上传格式
  'fileSize': 50, // 文件大小限制
};

