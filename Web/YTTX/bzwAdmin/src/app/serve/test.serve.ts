import {RULE_CONFIG} from '../config/rule.config';
/*引入Mock*/
declare var Mock: any;

/*通用方法--生成范围*/
function generateLimit(config) {
  var limit;
  /*配置信息*/
  if (config) {
    var min = config.mapmin,
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


/*通用方法--指定正则匹配*/
function generateRule(str) {
  var rule;
  if (typeof str === 'undefined') {
    rule = reg_value;
  } else {
    if (str === 'id') {
      rule = reg_id;
    } else if (str === 'guid') {
      rule = reg_guid;
    } else if (str === 'name') {
      rule = reg_name;
    } else if (str === 'goods') {
      rule = reg_goods;
    } else if (str === 'goodstype') {
      rule = reg_goodstype;
    } else if (str === 'mobile') {
      rule = reg_mobile;
    } else if (str === 'phone') {
      rule = reg_phone;
    } else if (str === 'datetime') {
      rule = reg_datetime;
    } else if (str === 'state') {
      rule = reg_id;
    } else if (str === 'money') {
      rule = reg_money;
    } else if (str === 'unit') {
      rule = reg_unit;
    } else if (str === 'card') {
      rule = reg_card;
    } else if (str === 'email') {
      rule = reg_email;
    } else if (str === 'type') {
      rule = reg_id;
    } else if (str === 'flag') {
      rule = reg_flag;
    } else if (str === 'or') {
      rule = reg_or;
    } else if (str === 'remark') {
      rule = reg_remark;
    } else if (str === 'value') {
      rule = reg_value;
    } else if (str === 'text') {
      rule = reg_text;
    } else if (str === 'content') {
      rule = reg_content;
    } else if (str === 'info') {
      rule = reg_info;
    }else if (str === 'province') {
      return Random.province();
    }else if (str === 'city') {
      return Random.city();
    }else if (str === 'country') {
      return Random.county();
    }else if (str === 'address') {
      return Random.county(true);
    }else if (str.indexOf('minmax') !== -1) {
      return (function () {
        var temprule = str.split(',').slice(1),
          min = parseInt(temprule[0], 10),
          max = parseInt(temprule[1], 10);
        return min + parseInt(Math.random() * (max - min), 10);
      }());
    }else{
      rule=reg_value;
    }
  }
  return Mock.mock(rule);
}

/*通用方法--生成集合*/
function generateMap(config) {
  if (!config) {
    return false;
  }

  var map = config.map,
    map_obj = {},
    result = {},
    maptype = config.maptype;

  /*遍历属性*/
  for (var i in map) {
    switch (map[i]) {
      case 'id':
        map_obj[i] = reg_id;
        break;
      case 'guid':
        map_obj[i] = reg_guid;
        break;
      case 'name':
        map_obj[i] = reg_name;
        break;
      case 'goods':
        map_obj[i] = reg_goods;
        break;
      case 'goodstype':
        map_obj[i] = reg_goodstype;
        break;
      case 'mobile':
        map_obj[i] = reg_mobile;
        break;
      case 'phone':
        map_obj[i] = reg_phone;
        break;
      case 'datetime':
        map_obj[i] = reg_datetime;
        break;
      case 'state':
        map_obj[i] = reg_id;
        break;
      case 'money':
        map_obj[i] = reg_money;
        break;
      case 'unit':
        map_obj[i] = reg_unit;
        break;
      case 'card':
        map_obj[i] = reg_card;
        break;
      case 'email':
        map_obj[i] = reg_email;
        break;
      case 'type':
        map_obj[i] = reg_id;
        break;
      case 'flag':
        map_obj[i] = reg_flag;
        break;
      case 'or':
        map_obj[i] = reg_or;
        break;
      case 'remark':
        map_obj[i] = reg_remark;
        break;
      case 'value':
        map_obj[i] = reg_value;
        break;
      case 'text':
        map_obj[i] = reg_text;
        break;
      case 'content':
        map_obj[i] = reg_content;
        break;
      case 'info':
        map_obj[i] = reg_info;
        break;
      case 'province':
        (function () {
          var address = Random.county(true).split(' ');
          map_obj[i] = address[0];
          /*存在市*/
          if (map['city']) {
            map_obj['city'] = address[1];
            if (map['country']) {
              map_obj['country'] = address[2];
            }
          }
        }());
        break;
      case 'address':
        map_obj[i] = Random.county(true);
        break;
      case '':
        map_obj[i] = '';
        break;
      default:
        if (map[i].indexOf('rule') !== -1) {
          (function () {
            var rule = map[i].split(',').slice(1).join('|'),
              reg = '(' + rule + '){1}';
            map_obj[i] = new RegExp(reg);
          }());
        } else if (map[i].indexOf('minmax') !== -1) {
          map_obj[i] = (function () {
            var rule = map[i].split(',').slice(1),
              min = parseInt(rule[0], 10),
              max = parseInt(rule[1], 10);
            return min + parseInt(Math.random() * (max - min), 10);
          }());
        }else {
          map_obj[i] = reg_value;
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

/*通用方法--生成结果集*/
function generateResult(datalist, config) {
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

export class TestServe{
  Random : Mock.Random;


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
  getMap (config) {
    return generateMap(config);
  };
  /*公用接口--生成集合*/
  getResult (datalist, config) {
    return generateResult(datalist, config);
  };
  /*公用接口--生成范围*/
  getLimit (config) {
    return generateLimit(config);
  };
  /*公用接口--生成正则值*/
  getRule (str) {
    return generateRule(str);
  };


  /*测试接口--普通*/
  test (config) {
    return generateResult(generateMap(config), config);
  };
  /*测试接口--生成凭证*/
  testToken (type) {
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
  testMenu (config) {
    let menuobj = {
        "menu": [{
          "modClass": "",
          "modId": 1,
          "modName": "组件示例",
          "modShow":true,
          "permitItem": [
            {
              "funcCode": "",
              "funcName": "批量删除",
              "isPermit": 1,
              "modId": 1,
              "prid": 10
            }
          ]
        }, {
          "modClass": "yttx-order-manager",
          "modCode": "yttx-order-manager",
          "modId": 2,
          "modLink": "yttx-order-manager",
          "modName": "订单管理",
          "permitItem": [{
            "funcCode": "yttx-order-details",
            "funcName": "详情",
            "isPermit": 1,
            "modId": 2,
            "prid": 15
          }]
        }, {
          "modClass": "yttx-invoice-manager",
          "modCode": "yttx-invoice-manager",
          "modId": 3,
          "modLink": "yttx-invoice-manager",
          "modName": "发货管理",
          "permitItem": [{
            "funcCode": "yttx-invoice-details",
            "funcName": "详情",
            "isPermit": 1,
            "modId": 3,
            "prid": 18
          }]
        }, {
          "modClass": "yttx-purchase-manager",
          "modCode": "yttx-purchase-manager",
          "modId": 4,
          "modLink": "yttx-purchase-manager",
          "modName": "采购管理",
          "permitItem": [{
            "funcCode": "yttx-purchase-audit",
            "funcName": "采购审核",
            "isPermit": 1,
            "modId": 4,
            "prid": 22
          }]
        }, {
          "modClass": "yttx-warehouse-manager",
          "modCode": "yttx-warehouse-manager",
          "modId": 5,
          "modLink": "yttx-warehouse-manager",
          "modName": "仓库管理",
          "permitItem": [{
            "funcCode": "mall-storage-stats",
            "funcName": "入库统计",
            "isPermit": 1,
            "modId": 5,
            "prid": 28
          }]
        }]
      },
      setflag = false/*是否开启随机设置模式*/;
    if (config && config.setflag) {
      setflag = true;
    }
    if (setflag) {
      var menuarray = menuobj.menu,
        len = menuarray.length,
        i = 0;

      for (i; i < len; i++) {
        var menuitem = menuarray[i]['permitItem'],
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
  testSuccess (type) {
    var res;

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
