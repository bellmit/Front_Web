/*基本配置--主要为系统配置*/
const BASE_CONFIG = {
  unique_key: 'mall_admin_unique_key'/*系统缓存key键*/,
  environment: 'dev'/*当前环境，pro:生产环境，dev:开发环境*/,
  domain: 'http://10.0.5.226:8082'/*常用地址*/,
  project: '/mall-buzhubms-api'/*常用工程*/,
  common_domain: 'http://112.74.207.132:8088'/*公用地址*/,
  common_project: '/yttx-public-api'/*公用工程*/
};
/*组合参数*/
BASE_CONFIG['url'] = `${BASE_CONFIG.domain}${BASE_CONFIG.project}`;
BASE_CONFIG['common_url'] = `${BASE_CONFIG.common_domain}${BASE_CONFIG.common_project}`;

export class BaseConfig {
  static getBaseConfig() {
    return BASE_CONFIG;
  }
}
