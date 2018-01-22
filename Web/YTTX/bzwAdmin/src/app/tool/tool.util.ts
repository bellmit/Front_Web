import {BASE_CONFIG} from '../config/base.config';
import {RULE_CONFIG} from '../config/rule.config';

/*引入jquery*/
/*declare var $: any;*/

export class ToolUtil {

  /*返回系统唯一标识符*/
  static getSystemUniqueKey() {
    return BASE_CONFIG.unique_key;
  };

  /*判断是否盒模型*/
  static supportBox() {
    let elem = document.getElementsByTagName('body')[0],
      bs = window.getComputedStyle(elem, null).getPropertyValue("box-sizing") || document.defaultView.getComputedStyle(elem, null);
    return bs && bs === 'border-box';
  };

  /*判断是否支持JSON*/
  static supportJSON() {
    return JSON && JSON.stringify && typeof JSON.stringify === 'function';
  };

  /*判断是否支持本地存储*/
  static supportStorage() {
    return localStorage && sessionStorage;
  }

  /*判断是否支持图片*/
  static supportImage() {
    if (window.URL) {
      return window.URL.createObjectURL && typeof window.URL.createObjectURL === 'function';
    } else if (window.webkitURL) {
      return window.webkitURL.createObjectURL && typeof window.webkitURL.createObjectURL === 'function';
    } else {
      return false;
    }
  }

  /*清除本地存储--清除当前标识数据*/
  static clear(flag) {
    if (flag) {
      sessionStorage.removeItem(BASE_CONFIG.unique_key);
    } else {
      localStorage.removeItem(BASE_CONFIG.unique_key);
    }
  }

  /*清除本地存储--清除所有数据*/
  static clearAll(flag) {
    if (flag) {
      sessionStorage.clear();
    } else {
      localStorage.clear();
    }
  }

  /*递归查找缓存对象*/
  static paramsItem(config, type, action) {
    let key = config.key,
      cache = config.cache,
      value = '';

    for (let i in cache) {
      if (type === 'set') {
        value = config.value;
        if (i === key) {
          cache[i] = value;
          return true;
        } else {
          if (typeof cache[i] === 'object') {
            this.paramsItem({
              key: key,
              value: value,
              cache: cache[i]
            }, type, null);
          }
        }
      } else if (type === 'get') {
        if (i === key) {
          return cache[i];
        } else {
          if (typeof cache[i] === 'object') {
            this.paramsItem({
              key: key,
              cache: cache[i]
            }, type, null);
          }
        }
      } else if (type === 'find') {
        if (i === key) {
          if (action === 'delete') {
            delete cache[i];
          } else if (action === 'other') {
            /*to do*/
          }
          return true;
        } else {
          if (typeof cache[i] === 'object') {
            this.paramsItem({
              key: key,
              cache: cache[i]
            }, type, null);
          }
        }
      }
    }
  }

  /*设置本地存储*/
  static setParams(key, value, flag) {
    if (key === BASE_CONFIG.unique_key) {
      if (flag) {
        /*为localstorage*/
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        /*默认为localstorage*/
        localStorage.setItem(key, JSON.stringify(value));
      }
    } else {
      let cache = null;
      if (flag) {
        cache = JSON.parse(sessionStorage.getItem(BASE_CONFIG.unique_key));
      } else {
        cache = JSON.parse(localStorage.getItem(BASE_CONFIG.unique_key));
      }
      if (cache !== null) {
        if (typeof key !== 'undefined') {
          this.paramsItem({
            key: key,
            value: value,
            cache: cache
          }, 'set', null);
        }
      } else {
        cache = {};
        cache[key] = value;
      }
      if (flag) {
        /*为localstorage*/
        sessionStorage.setItem(BASE_CONFIG.unique_key, JSON.stringify(cache));
      } else {
        /*默认为localstorage*/
        localStorage.setItem(BASE_CONFIG.unique_key, JSON.stringify(cache));
      }
    }
  }

  /*获取本地存储*/
  static getParams(key, flag) {
    if (key === BASE_CONFIG.unique_key) {
      if (flag) {
        return JSON.parse(sessionStorage.getItem(BASE_CONFIG.unique_key)) || null;
      } else {
        return JSON.parse(localStorage.getItem(BASE_CONFIG.unique_key)) || null;
      }
    } else {
      let cache = null;
      if (flag) {
        cache = sessionStorage.getItem(BASE_CONFIG.unique_key);
      } else {
        cache = localStorage.getItem(BASE_CONFIG.unique_key);
      }
      if (cache !== null) {
        if (typeof key !== 'undefined') {
          return this.paramsItem({
            key: key,
            cache: JSON.parse(cache)
          }, 'get', null);
        }
        return JSON.parse(cache);
      } else {
        return null;
      }
    }
  }

  /*删除本地存储*/
  static removeParams(key, flag) {
    if (key === BASE_CONFIG.unique_key) {
      if (flag) {
        sessionStorage.removeItem(key);
      } else {
        localStorage.removeItem(key);
      }
    } else {
      let cache = null;
      if (flag) {
        cache = sessionStorage.getItem(BASE_CONFIG.unique_key);
      } else {
        cache = localStorage.getItem(BASE_CONFIG.unique_key);
      }
      if (cache !== null) {
        if (typeof key !== 'undefined') {
          this.paramsItem({
            key: key,
            cache: JSON.parse(cache)
          }, 'find', 'delete');
          if (flag) {
            /*为localstorage*/
            sessionStorage.setItem(BASE_CONFIG.unique_key, JSON.stringify(cache));
          } else {
            /*默认为localstorage*/
            localStorage.setItem(BASE_CONFIG.unique_key, JSON.stringify(cache));
          }
        }
      }
    }
  }

  /*适配请求地址*/
  static adaptReqUrl(config) {
    let debug = config.debug,
      url = config.url;

    if (debug) {
      /*debug模式*/
      if (url.indexOf('.json') !== -1) {
        return url;
      } else {
        return 'assets/json/test.json';
      }
    } else {
      if (config.common) {
        /*公共模式*/
        return BASE_CONFIG.common_url + url;
      } else {
        /*默认模式*/
        return BASE_CONFIG.url + url;
      }
    }
  }

  /*判断是否闰年*/
  static isLeapYear(year, month) {
    let m_arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      isly = (year % 4 === 0 && year % 100 !== 0) ? true : year % 400 === 0;

    isly ? m_arr.splice(1, 1, 29) : m_arr.splice(1, 1, 28);
    return month ? {
      isly: isly, /*是否闰年*/
      months: m_arr/*该年所有天数*/,
      days: m_arr[parseInt(month, 10) - 1]/*获取指定月的天数*/
    } : {
      isly: isly,
      months: m_arr
    }
  }

  /*将金额转换为大写*/
  static toUpMoney(str, wraps) {
    if (typeof str === 'undefined' || str === null) {
      if (wraps) {
        wraps.innerHTML = '零';
      }
      return '零';
    }
    let cn_zero = "零",
      cn_one = "壹",
      cn_two = "贰",
      cn_three = "叁",
      cn_four = "肆",
      cn_five = "伍",
      cn_six = "陆",
      cn_seven = "柒",
      cn_height = "捌",
      cn_nine = "玖",
      cn_ten = "拾",
      cn_hundred = "佰",
      cn_thousand = "仟",
      cn_ten_thousand = "万",
      cn_hundred_million = "亿",
      cn_symbol = "",
      cn_dollar = "元",
      cn_ten_cent = "角",
      cn_cent = "分",
      cn_integer = "整",
      integral,
      decimal,
      outputCharacters,
      digits,
      radices,
      bigRadices,
      decimals,
      zeroCount,
      i,
      p,
      d,
      quotient,
      modulus,
      tvs = str.toString(),
      formatstr = tvs.replace(/^0+/, ""),
      parts = formatstr.split(".");

    if (parts.length > 1) {
      integral = parts[0];
      decimal = parts[1];
      decimal = decimal.slice(0, 2);
    } else {
      integral = parts[0];
      decimal = "";
    }
    digits = [cn_zero, cn_one, cn_two, cn_three, cn_four, cn_five, cn_six, cn_seven, cn_height, cn_nine];
    radices = ["", cn_ten, cn_hundred, cn_thousand];
    bigRadices = ["", cn_ten_thousand, cn_hundred_million];
    decimals = [cn_ten_cent, cn_cent];
    outputCharacters = "";
    if (Number(integral) > 0) {
      zeroCount = 0;
      for (i = 0; i < integral.length; i++) {
        p = integral.length - i - 1;
        d = integral.substr(i, 1);
        quotient = p / 4;
        modulus = p % 4;
        if (d == "0") {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            outputCharacters += digits[0];
          }
          zeroCount = 0;
          outputCharacters += digits[Number(d)] + radices[modulus];
        }
        if (modulus == 0 && zeroCount < 4) {
          outputCharacters += bigRadices[quotient];
        }
      }
      outputCharacters += cn_dollar;
    }
    if (decimal != "") {
      for (i = 0; i < decimal.length; i++) {
        d = decimal.substr(i, 1);
        if (d != "0") {
          outputCharacters += digits[Number(d)] + decimals[i];
        }
      }
    }
    if (outputCharacters == "") {
      outputCharacters = cn_zero + cn_dollar;
    }
    if (decimal == "") {
      outputCharacters += cn_integer;
    }
    outputCharacters = cn_symbol + outputCharacters;

    if (wraps) {
      wraps.innerHTML = outputCharacters;
    }
    return outputCharacters;
  }

  /*银行卡格式化*/
  static cardFormat(str) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    let cardno = str.toString().replace(RULE_CONFIG.char_str, '');
    if (cardno == '') {
      return '';
    }
    cardno = cardno.split('');
    let len = cardno.length,
      i = 0,
      j = 1;
    for (i; i < len; i++) {
      if (j % 4 == 0 && j != len) {
        cardno.splice(i, 1, cardno[i] + " ");
      }
      j++;
    }
    return cardno.join('');
  }

  /*手机格式化*/
  static phoneFormat(str) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    let phoneno = str.toString().replace(RULE_CONFIG.char_str, '');
    if (phoneno == '') {
      return '';
    }
    phoneno = phoneno.split('');

    let len = phoneno.length,
      i = 0;
    for (i; i < len; i++) {
      let j = i + 2;
      if (i != 0) {
        if (i == 2) {
          phoneno.splice(i, 1, phoneno[i] + " ");
        } else if (j % 4 == 0 && j != len + 1) {
          phoneno.splice(i, 1, phoneno[i] + " ");
        }
      }
    }
    return phoneno.join('');
  }

  /*电话格式化*/
  static telePhoneFormat(str, type) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    let phoneno = str.toString().replace(RULE_CONFIG.char_str, '');
    if (phoneno == '') {
      return '';
    }
    phoneno = phoneno.split('');
    if (type) {
      if (type === 3) {
        if (phoneno.length >= 3) {
          phoneno.splice(2, 1, phoneno[2] + "-");
        }
      } else if (type === 4) {
        if (phoneno.length >= 4) {
          phoneno.splice(3, 1, phoneno[3] + "-");
        }
      } else {
        if (phoneno.length >= 4) {
          phoneno.splice(3, 1, phoneno[3] + "-");
        }
      }
    } else {
      if (phoneno.length >= 4) {
        phoneno.splice(3, 1, phoneno[3] + "-");
      }
    }
    return phoneno.join('');
  }

  /*去除html非法字符*/
  static trimHtmlIllegal(str) {
    return str.replace(RULE_CONFIG.illegalhtml_str, '').replace(RULE_CONFIG.illegalentity_str, '');
  };

  /*去除所有非法字符*/
  static trimIllegal(str) {
    return str.replace(RULE_CONFIG.illegal_str, '').replace(RULE_CONFIG.illegalentity_str, '');
  };

  /*去除所有指定字符（字符串,需去除字符,是否忽略大小写)：返回字符串*/
  static trimMatch(str, match, ignore) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    if (ignore) {
      return str.replace(new RegExp('\\' + match, 'ig'), '');
    } else {
      return str.replace(new RegExp('\\' + match, 'g'), '');
    }
  };

  /*去除所有空格（字符串）：返回字符串*/
  static trims(str) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    return str.replace(RULE_CONFIG.space_str, '');
  };

  /*去除前后空格(字符串)：返回字符串*/
  static trim(str) {
    if (typeof str === 'undefined' || str === null) {
      return '';
    }
    return str.replace(RULE_CONFIG.psspace_str, '');
  };

  /*是否为正确身份证(身份证字符串)：返回布尔值*/
  static isIDCard(str) {
    let area = {
        '11': "北京",
        '12': "天津",
        '13': "河北",
        '14': "山西",
        '15': "内蒙古",
        '21': "辽宁",
        '22': "吉林",
        '23': "黑龙江",
        '31': "上海",
        '32': "江苏",
        '33': "浙江",
        '34': "安徽",
        '35': "福建",
        '36': "江西",
        '37': "山东",
        '41': "河南",
        '42': "湖北",
        '43': "湖南",
        '44': "广东",
        '45': "广西",
        '46': "海南",
        '50': "重庆",
        '51': "四川",
        '52': "贵州",
        '53': "云南",
        '54': "西藏",
        '61': "陕西",
        '62': "甘肃",
        '63': "青海",
        '64': "宁夏",
        '65': "新疆",
        '71': "台湾",
        '81': "香港",
        '82': "澳门",
        '91': "国外"
      },
      wf = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      last = [1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2],
      idcard = this.trims(str.toString()),
      len = idcard.length;
    //判断是否为有效位
    if (idcard === '' || len < 15 || (len > 15 && len < 18) || len > 18) {
      return false;
    } else {
      //是否为为数字
      let nums = 0,
        nlen = 0;
      if (len === 18) {
        nums = idcard.slice(0, 17).replace(/\D*/g, '');
      } else if (len === 15) {
        nums = idcard.slice(0, 14).replace(/\D*/g, '');
      }
      nlen = nums.length;
      if (nlen < 14 || (nlen > 14 && nlen < 17)) {
        return false;
      }
      //是否为有效地区
      if (area[idcard.slice(0, 2)] == null) {
        return false;
      }
      let years,
        months,
        days,
        sex;
      if (len === 18) {
        years = parseInt(idcard.slice(6, 10), 10);
        months = parseInt(idcard.slice(10, 12), 10);
        days = parseInt(idcard.slice(12, 14), 10);
        sex = parseInt(idcard.slice(16, 17), 10);
      } else if (len === 15) {
        years = parseInt(idcard.slice(6, 8), 10) + 1900;
        months = parseInt(idcard.slice(8, 10), 10);
        days = parseInt(idcard.slice(10, 12), 10);
        sex = parseInt(idcard.slice(14), 10);
      }
      //是否为有效月份
      if (months > 12 || months < 1) {
        return false;
      }
      //是否为有效天
      if (days < 1) {
        return false;
      }
      let leapyear = this.isLeapYear(years, months);
      if ((leapyear.isly && months === 2 && days > 29) || (!leapyear.isly && months === 2 && days > 28) || (months !== 2 && leapyear.days < days)) {
        return false;
      }
      //是否为正确识别码
      if (len === 18) {
        let temparr = idcard.split(''),
          tempmax = 0,
          i = 0,
          haves = 0,
          ids = parseInt(idcard.slice(17), 10),
          tempids = 0;

        if (isNaN(ids)) {
          ids = 'x';
        }
        for (i; i < 17; i++) {
          tempmax += wf[i] * parseInt(temparr[i], 10);
        }
        haves = tempmax % 11;
        tempids = last[haves];
        if (ids !== tempids.toLowerCase()) {
          return false;
        }
      }
    }
    return true;
  }

  /*是否为数字*/
  static isNum(str) {
    return RULE_CONFIG.number_str.test(this.trims(str));
  }

  /*自动补全纠错人民币(字符串,最大数位,是否可以返回为空)，返回一个数组['格式化后的数据',带小数点的未格式化数据]*/
  static moneyCorrect(str, max, flag) {
    if (typeof str === 'undefined' || str === null) {
      if (flag) {
        return ['', ''];
      } else {
        return ['0.00', '0.00'];
      }
    }

    let money = this.trimMatch(str.toString(), ','),
      moneyarr,
      len = 0,
      partz,
      partx,
      tempstr = '';

    money = this.trims(money);
    if (money === '') {
      if (flag) {
        return ['', ''];
      } else {
        return ['0.00', '0.00'];
      }
    }
    if (flag && (parseInt(money * 100, 10) === 0)) {
      return ['', ''];
    }
    if (money.lastIndexOf('.') !== -1) {
      moneyarr = money.split('.');
      len = moneyarr.length;
      if (len > 2) {
        partz = moneyarr[len - 2];
        partx = moneyarr[len - 1];
      } else {
        partz = moneyarr[0];
        partx = moneyarr[1];
      }
      if (!this.isNum(partx)) {
        partx = partx.replace(/\D*/g, '');
      }
      if (partx.length == 0) {
        partx = '.00';
      } else if (partx.length == 1) {
        partx = '.' + partx + '0';
      } else if (partx.length >= 2) {
        partx = '.' + partx.slice(0, 2);
      }
    } else {
      partz = money;
      partx = '.00';
    }
    if (!this.isNum(partz)) {
      partz = partz.replace(/\D*/g, '');
    }
    tempstr = partz + partx;
    let templen = partz.length;
    if (templen > 3) {
      let i = 0,
        j = 1;
      partz = partz.split('').reverse();
      for (i; i < templen; i++) {
        if (j % 3 == 0 && j != templen) {
          partz.splice(i, 1, ',' + partz[i].toString());
        }
        j++;
      }
      partz = partz.reverse().join('');
    } else if (templen == 0) {
      partz = '0';
    }
    if (partz.length >= 2) {
      if (partz.charAt(0) == '0' || partz.charAt(0) == 0) {
        partz = partz.slice(1);
      }
    }
    if (typeof max !== 'undefined' && max > 3) {
      let filterlen = partz.length;
      if ((filterlen + 3) > max) {
        partz = partz.slice(0, max - 3);
        filterlen = partz.length;
        if (partz.charAt(filterlen - 1) === ',') {
          partz = partz.slice(0, filterlen - 1);
        }
      }
    }
    return [partz + partx, tempstr];
  };

}
