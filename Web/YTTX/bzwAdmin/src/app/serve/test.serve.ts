/*引入规则*/
import {RULE_CONFIG} from '../config/rule.config';

/*引入Mock*/
declare var Mock: any;
export class TestServe {
  /*通用私有方法--生成范围*/
  private _generateLimit(config) {
    let limit;
    /*配置信息*/
    if (config) {
      let min = config.mapmin,
        max = config.mapmax,
        name = typeof config.mapname === 'undefined' ? 'list' : config.mapname,
        maptype = typeof config.maptype !== 'undefined' ? config.maptype : 'array';


      if (maptype === 'array') {
        if (typeof min === 'undefined') {
          if (typeof max === 'undefined') {
            limit = name + '|10';
          } else {
            limit = name + '|' + max;
          }
        } else {
          if (typeof max === 'undefined') {
            limit = name + '|' + min;
          } else {
            limit = name + '|' + min + '-' + max;
          }
        }
      } else if (maptype === 'object') {
        limit = name;
      }
    } else {
      limit = 'list|10';
    }
    return limit;
  }

  /*通用私有方法--指定正则匹配*/
  private _generateRule(str) {
    let rule;
    if (typeof str === 'undefined') {
      rule = RULE_CONFIG.test_value;
    } else {
      if (str === 'id') {
        rule = RULE_CONFIG.test_id;
      } else if (str === 'guid') {
        rule = RULE_CONFIG.test_guid;
      } else if (str === 'sequence') {
        rule = RULE_CONFIG.test_sequence;
      } else if (str === 'name') {
        rule = RULE_CONFIG.test_name;
      } else if (str === 'goods') {
        rule = RULE_CONFIG.test_goods;
      } else if (str === 'goodstype') {
        rule = RULE_CONFIG.test_goodstype;
      } else if (str === 'mobile') {
        rule = RULE_CONFIG.test_mobile;
      } else if (str === 'phone') {
        rule = RULE_CONFIG.test_phone;
      } else if (str === 'datetime') {
        rule = () => {
          let d = new Date();
          return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()}`;
        };
      } else if (str === 'state') {
        rule = RULE_CONFIG.test_id;
      } else if (str === 'money') {
        rule = RULE_CONFIG.test_money;
      } else if (str === 'unit') {
        rule = RULE_CONFIG.test_unit;
      } else if (str === 'bankcard') {
        rule = RULE_CONFIG.test_bankcard;
      } else if (str === 'email') {
        rule = RULE_CONFIG.test_email;
      } else if (str === 'type') {
        rule = RULE_CONFIG.test_id;
      } else if (str === 'flag') {
        rule = RULE_CONFIG.test_flag;
      } else if (str === 'or') {
        rule = RULE_CONFIG.test_or;
      } else if (str === 'remark') {
        rule = RULE_CONFIG.test_remark;
      } else if (str === 'value') {
        rule = RULE_CONFIG.test_value;
      } else if (str === 'text') {
        rule = RULE_CONFIG.test_text;
      } else if (str === 'content') {
        rule = RULE_CONFIG.test_content;
      } else if (str === 'info') {
        rule = RULE_CONFIG.test_info;
      } else if (str === 'province') {
        return Mock.Random.province();
      } else if (str === 'city') {
        return Mock.Random.city();
      } else if (str === 'country') {
        return Mock.Random.county();
      } else if (str === 'address') {
        return Mock.Random.county(true);
      } else if (str.indexOf('minmax') !== -1) {
        return () => {
          let temprule = str.split(',').slice(1),
            min = parseInt(temprule[0], 10),
            max = parseInt(temprule[1], 10);
          return min + parseInt(Math.random() * (max - min), 10);
        };
      } else {
        rule = RULE_CONFIG.test_value;
      }
    }
    return Mock.mock(rule);
  }

  /*通用私有方法--生成集合*/
  private _generateMap(config) {
    if (!config) {
      return false;
    }

    let map = config.map,
      map_obj = {},
      result = {},
      maptype = config.maptype;

    /*遍历属性*/
    for (let i in map) {
      switch (map[i]) {
        case 'id':
          map_obj[i] = RULE_CONFIG.test_id;
          break;
        case 'guid':
          map_obj[i] = RULE_CONFIG.test_guid;
          break;
        case 'name':
          map_obj[i] = RULE_CONFIG.test_name;
          break;
        case 'goods':
          map_obj[i] = RULE_CONFIG.test_goods;
          break;
        case 'goodstype':
          map_obj[i] = RULE_CONFIG.test_goodstype;
          break;
        case 'mobile':
          map_obj[i] = RULE_CONFIG.test_mobile;
          break;
        case 'phone':
          map_obj[i] = RULE_CONFIG.test_phone;
          break;
        case 'datetime':
          map_obj[i] = () => {
            let d = new Date();
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDay()}`;
          };
          break;
        case 'state':
          map_obj[i] = RULE_CONFIG.test_id;
          break;
        case 'money':
          map_obj[i] = RULE_CONFIG.test_money;
          break;
        case 'unit':
          map_obj[i] = RULE_CONFIG.test_unit;
          break;
        case 'card':
          map_obj[i] = RULE_CONFIG.test_bankcard;
          break;
        case 'email':
          map_obj[i] = RULE_CONFIG.test_email;
          break;
        case 'type':
          map_obj[i] = RULE_CONFIG.test_id;
          break;
        case 'flag':
          map_obj[i] = RULE_CONFIG.test_flag;
          break;
        case 'or':
          map_obj[i] = RULE_CONFIG.test_or;
          break;
        case 'remark':
          map_obj[i] = RULE_CONFIG.test_remark;
          break;
        case 'value':
          map_obj[i] = RULE_CONFIG.test_value;
          break;
        case 'text':
          map_obj[i] = RULE_CONFIG.test_text;
          break;
        case 'content':
          map_obj[i] = RULE_CONFIG.test_content;
          break;
        case 'info':
          map_obj[i] = RULE_CONFIG.test_info;
          break;
        case 'province':
          map_obj[i] = () => {
            let address = Mock.Random.county(true).split(' ');
            /*存在市*/
            if (map['city']) {
              map_obj['city'] = address[1];
              if (map['country']) {
                map_obj['country'] = address[2];
              }
            }
            return address[0];
          };
          break;
        case 'address':
          map_obj[i] = Mock.Random.county(true);
          break;
        case '':
          map_obj[i] = '';
          break;
        default:
          if (map[i].indexOf('rule') !== -1) {
            (function () {

            }());
            map_obj[i] = () => {
              let rule = map[i].split(',').slice(1).join('|'),
                reg = '(' + rule + '){1}';
              return new RegExp(reg);
            }
          } else if (map[i].indexOf('minmax') !== -1) {
            map_obj[i] = () => {
              let rule = map[i].split(',').slice(1),
                min = parseInt(rule[0], 10),
                max = parseInt(rule[1], 10);
              return min + parseInt(Math.random() * (max - min), 10);
            };
          } else {
            map_obj[i] = RULE_CONFIG.test_value;
          }
          break;
      }
    }

    /*组合属性*/
    if (typeof maptype !== 'undefined') {
      if (maptype === 'array') {
        result[generateLimit(config)] = [map_obj];
      } else if (maptype === 'object') {
        result[generateLimit(config)] = map_obj;
      }
    } else {
      result[generateLimit(config)] = [map_obj];
    }
    return Mock.mock(result);
  }

  /*通用私有方法--生成结果集*/
  private _generateResult(datalist, config) {
    var result = {};
    if (config) {
      var type = config.type,
        message = typeof config.message === 'undefined' ? 'ok' : config.message,
        code = typeof config.code === 'undefined' ? 0 : config.code,
        count = typeof config.count === 'undefined' ? 50 : config.count;

      if (type === 'list') {
        result['message'] = message;
        datalist['count'] = count;
        result['code'] = code;
        result['result'] = datalist;
      } else if (type === 'table') {
        result['status'] = 200;
        result['data'] = {
          message: 'ok',
          count: 50,
          code: code,
          result: datalist
        };
      } else {
        result['status'] = 200;
        result['data'] = {
          message: 'ok',
          count: 50,
          code: code,
          result: datalist
        };
      }
    } else {
      result['status'] = 200;
      result['data'] = {
        message: 'ok',
        count: 50,
        code: code,
        result: datalist
      };
    }
    return result;
  }


  /*
   配置信息说明：
   config:{
   map:{abc:def}：返回结果集的字段说明，
   mapname:abc：结果集名称，
   mapmax:50:结果集随机最大值，
   mapmin:5:结果集随机最小值,
   maptype:array:结果集返回类型，
   type:请求类型（list:列表类型，table:表格类型）,
   count:分页总记录数,
   message:数据返回成功的提示信息
   }
   */


  /*公用接口--生成集合*/
  getMap(config) {
    return this._generateMap(config);
  };

  /*公用接口--生成集合*/
  getResult(datalist, config) {
    return this._generateResult(datalist, config);
  };

  /*公用接口--生成范围*/
  getLimit(config) {
    return this._generateLimit(config);
  };

  /*公用接口--生成正则值*/
  getRule(str) {
    return this._generateRule(str);
  };


  /*测试接口--普通*/
  test(config) {
    return this._generateResult(this._generateMap(config), config);
  };

  /*测试接口--生成凭证*/
  testToken(type) {
    let res,
      token = Mock.mock({
        "id": RULE_CONFIG.test_id,
        "token": RULE_CONFIG.test_token,
        "adminId": RULE_CONFIG.test_id,
        "organizationId": RULE_CONFIG.test_id,
        "organizationName": RULE_CONFIG.test_name
      });

    if (type) {
      if (type === 'list') {
        res = {
          message: 'ok',
          code: 0,
          result: token
        };
      } else if ('table') {
        res = {
          status: 200,
          data: {
            message: 'ok',
            code: 0,
            result: token
          }
        };
      } else {
        res = {
          status: 200,
          data: {
            message: 'ok',
            code: 0,
            result: token
          }
        };
      }
    } else {
      res = {
        status: 200,
        data: {
          message: 'ok',
          code: 0,
          result: token
        }
      };
    }
    return res;
  };

  /*测试接口--菜单*/
  testMenu(config) {
    let menuobj = {
        "menu": [{
          "modClass": "",
          "modId": 1,
          "modName": "组件示例",
          "modShow": true,
          "permitItem": [{
            "funcCode": "",
            "funcName": "",
            "isPermit": 1,
            "modId": 1,
            "prid": 10
          }]
        }]
      },
      setflag = false/*是否开启随机设置模式*/;
    if (config && config.setflag) {
      setflag = true;
    }
    if (setflag) {
      let menuarray = menuobj.menu,
        len = menuarray.length,
        i = 0;

      for (i; i < len; i++) {
        let menuitem = menuarray[i]['permitItem'],
          sublen = menuitem.length,
          j = 0;
        for (j; j < sublen; j++) {
          menuitem[j]['isPermit'] = parseInt(Math.random() * 10, 10) % 2;
        }
      }
    }
    return {
      status: 200,
      data: {
        code: "0",
        message: "查询成功",
        result: menuobj
      }
    };
  };

  /*测试接口--生成凭证*/
  testSuccess(type) {
    let res;

    if (type) {
      if (type === 'list') {
        res = {
          message: 'ok',
          code: 0,
          count: 50,
          result: {}
        };
      } else if ('table') {
        res = {
          status: 200,
          data: {
            message: 'ok',
            code: 0,
            count: 50,
            result: {}
          }
        };
      } else {
        res = {
          status: 200,
          data: {
            message: 'ok',
            code: 0,
            count: 50,
            result: {}
          }
        };
      }
    } else {
      res = {
        status: 200,
        data: {
          message: 'ok',
          code: 0,
          count: 50,
          result: {}
        }
      };
    }
    return res;
  };

}
