/*测试模块服务*/
(function () {
    'use strict';

    var Random = Mock.Random,
        reg_id = /[0-9]{1,2}//*id序列值*/,
        reg_guid = /(([0-9a-z]){5}(_)([0-9a-zA-Z]){15,20}){1}//*唯一序列值*/,
        reg_name = /((张|李|东方|百里|王|赵|慕容|刘|司马|宇文|马|周|杨|闻人|朱|上官|陈|公羊|令狐|长孙){1}((子|梓)(涵|辰|墨|轩|豪|强|鹏|宇)|(雨|语)(晴|馨|晨|彤|宣|萱|旋|暄)|龙|伟|(芳){1,2}|杰|(雨|紫|梦|思|宣|萱|旋|暄|子|梓)(涵)|娟|(薇){1,2}|超|(霞){1,2}|(露){1,2}|(莎){1,2}|(盈){1,2}|涛|豪|轩|浩|婷|晴|馨|晨|彤|(宣|萱|旋|暄)){1}){1}//*姓名序列值*/,
        reg_goods = /((家电馆:电视)(曲面电视|超薄电视|HDR电视|OLED电视|4K超清电视)(:)(55英寸|65英寸)|(服装|服饰鞋帽)(:)(女装|女上装|女式羊毛|羊绒衫|背心|吊带衫|女式T恤|女式衬衫|女式夹克|其他女上装|女式针织衫|女式风衣|女式羽绒服|女式毛衣|女式大衣|无袖上衣|女式牛仔服|皮革|毛皮服,高跟鞋|雪地靴|乔丹篮球鞋|登山鞋|毛绒拖鞋|真皮女靴|情侣手套|耐克|丝袜裤|羊绒围巾|鞋垫|皮带扣|成品鞋|正装鞋|女式正装皮鞋|女式正装仿皮鞋|男式正装仿皮鞋|男式正装皮鞋|其他正装鞋)(, 服装品牌:)(欧时力|塔她|衣香丽影|香影秋水伊人|佳人苑|红袖|三彩|拉素|弥缔拉|紫澜门|芭蒂娜|金羽杰|哥邦|谷邦|昆诗兰|艾莱依|时尚轩|雪歌|迪赛尼斯)(, 服装样板:)(前片|后片|直缩|横缩|后翘|肓克|开司|大袖|小袖|前袖|后袖|前袋|大袋|袋口|后袋|袋中|袋下|袋底|侧袋)(, 饰品:)(如花饰界|纯银|纯银耳环|美丽|纯银手链|纯银戒指|平安结纯银手编)(, 服装设计:)(树脂衬|捆条|荷叶边|止绳器|包边布|前育克压线|花式线迹|款式平面图|腋下省|顺风褶|纸样设计|平面裁剪|斜纹布|雪花呢|日字扣|定型带|尘土洗|灯芯绒|无纺衬)(, 服饰:)(裤头|腰头钮|里襟尖咀|裤头里|裤头钮|宝剑头|门襟|钮牌扣眼|裤门襟|裤裆垫布|侧缝|下裆缝|膝盖绸|裤脚|卷脚|贴脚条|裤中线|钮扣|里襟)|(家电馆:空调)(壁挂式空调|柜式空调|中央空调|依旧换新)|(家电馆:洗衣机)(滚筒洗衣机|洗烘一体机|波轮洗衣机|迷你洗衣机|烘干机)|(家电馆:冰箱)(多门|对开门|三门|双门|冷柜,冰吧|酒柜)){1}/,
        reg_goodstype = /((家用电器>|手机,运营商,数码>|电脑,办公>|家居,家具,家装,厨具>|男装,女装,童装,内衣>|美妆个护,宠物>|女鞋,箱包,钟表,珠宝>|男鞋,运动,户外>|汽车,汽车用品>|母婴,玩具乐器>|食品,酒类,生鲜,特产>|礼品鲜花,农资绿植>|医药保健,计生情趣>|图书,音像,电子书>|机票,酒店,旅游,生活>|理财,众筹,白条,保险>)(电视|空调|洗衣机|冰箱|厨卫大电|厨房小电|生活电器|个护健康|家庭影音|进口电器|手机通讯|运营商|手机配件|摄影摄像|数码配件|影音娱乐|智能设备|电子教育|电脑整机|电脑配件|外设产品|游戏设备|网络产品|办公设备|文具耗材|服务产品|厨具|家纺|生活日用|家装软饰|灯具|家具|家装主材|厨房卫浴|五金电工|装修定制|女装|男装|内衣|配饰|童装童鞋|面部护肤|洗发护发|身体护理|口腔护理|女性护理|香水彩妆|清洁用品|宠物生活|时尚女鞋|潮流女包|精品男包|功能箱包|奢侈品|精选大牌|钟表|珠宝首饰|金银投资|流行男鞋|运动鞋包|运动服饰|健身训练|骑行运动|体育用品|户外鞋服|户外装备|垂钓用品|游泳用品|汽车车型|汽车价格|汽车品牌|维修保养|汽车装饰|车载电器|美容清洗|安全自驾|赛事改装|汽车服务|奶粉|营业辅食|尿裤湿巾|喂养用品|洗护用品|寝居服饰|妈妈专区|童车童床|玩具|乐器|新鲜水果|蔬菜蛋品|精选肉类|海鲜水产|冷饮冻食|中外名酒|进口食品|休息食品|地方特产|茗茶|饮料冲调|粮油调味|火机烟具|礼品|鲜花速递|绿植园艺|种子|农药|肥料|畜牧养殖|农机农具|中西药品|营养健康|营养成分|滋补养生|计生情趣|保健器械|护理护具|隐形眼镜|邮币|少儿|教育|文艺|经管励志|人文社科|生活|科技|刊,原版|电子书|音像|交通出行|酒店预订|旅游度假|商旅服务|演出票务|生活缴费|生活服务|教育培训|彩票|游戏|海外生活|理财|众筹|东家|白条|钱包|保险|股票))/,
        reg_flag = /(true|false){1}//*布尔值*/,
        reg_or = /(0|1){1}//*布尔值*/,
        reg_unit = /(件|条|箱|瓶|把|斤|双|米|支|个|平米|升|团|块|桶|kg|m){1}//*布尔值*/,
        reg_value = /[a-zA-Z0-9]{2,10}/,
        reg_text = /[a-zA-Z0-9]{10,50}/,
        reg_card = /^(\d{16}|\d{19})$/,
        reg_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/,
        reg_datetime = moment().format('YYYY-MM-DD HH:mm:ss')/*当前世界*/,
        reg_money = /(^(([1-9]{1}\d{0,8})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$){1}//*人民币*/,
        reg_phone = /(([0-9]{4})(-)([0-9]{7,8}){1})/,
        reg_mobile = /(^(13[0-9]|14[579]|15[012356789]|16[6]|17[01235678]|18[0-9]|19[89])[0-9]{8}$){1}//*移动电话*/,
        reg_remark = /(最近太忙了，确认晚了，东西是很好的，呵呵，谢了。|物流公司的态度比较差,建议换一家！不过掌柜人还不错！|呵，货真不错，老公很喜欢！|很好的卖家，谢谢喽。我的同事们都很喜欢呢。下次再来哦 ！|掌柜人不错，质量还行，服务很算不错的。|没想到这么快就到了，尺寸正好，老板态度很好。|还不错，质量挺好的，速度也快！|终于找到家好店，服务好，质量不错，下次有机会再来买。|卖家人很好 这个还没用 看包装应该不错|店已经收藏了很久，不过是第一次下手。应该说还不错。|第二次来买了，货比我想像中要好！！老板人表扬下。|包装看起来很好，包得很用心，相信货一定很好，谢谢了！|货超值，呵，下次再来。帮你做个广告，朋友们：这家店的货值。|一个字！！值！！！|掌柜的服务态度真好，发货很快。商品质量也相当不错。太喜欢了，谢谢！|好卖家，真有耐心，我终于买到想要的东西了。谢谢卖家。|掌柜太善良了，真是干一行懂一行呀。在掌柜的指导下我都快变内行人士了！|卖家服务真周到。以后带同事一起来。|货到了，比图片上看到的好多了3Q！|忠心地感谢你，让我买到了梦寐以求的宝贝，太感谢了！|价格大众化，YY质量很好呀,款式、面料我都挺满意的．如果有需要我还会继续光顾你的店铺！){1}//*常用备注*/,
        reg_content = /(<h1>时光不老我们不散<\/h1><p>一茶一酒一阙词，一程山水一路景。人生有一种相遇，是穿越了日暮黄昏，是沐浴了唐宋烟雨，在墨香飘荡的天地里，造就了生命中永恒的美丽。在浩渺的人海里，我们素昧平生，因了文字的引见，你走近了我，我靠近了你，你默默阅读我，我渐渐懂得你，从此，有一种温情途径四季，在彼此的夜空里绽放成最灿烂的烟火;有一种芳菲辗转流年，在彼此的云水里旖旎成最明媚的风景。<\/p><p>那种桃花落肩的轻盈，那种蒹葭摇曳的幽欢，那种烟花绽放的绚烂，那种柴门篱菊的闲情，无不让生命的绿窗丰盈绮丽。修云水禅心，其实不只为觅知音。生活因宁静而清欢，生命因懂得而精彩。我们用素笔将高山流水淡淡写意，将细水长天轻轻描摹，待有一天我们把文字的涵意参透，相逢一笑，相信我们再也不忍轻易道再见。<\/p><p>在低眉与回首间，我们不知不觉已用真情绘制的生命线，将天青色等烟雨的一脉情深，将春风得意马蹄疾的一怀欣喜，将把酒问青天的一腔豪迈，将飞絮绕香阁的一帘诗意，皆编织成活色生香的风月画屏。此去经年，若有烟柳弄晴，若有梅影横窗，若有斜阳映楼，若有清风拂帘，若有经卷在手……一切的一切，都将被我们哼唱成轻舟泛湖般的如歌行板。<\/p><p>世间有一种景百看不厌，有一种感觉永如初见，有一种情恒久悠远。文字，能让我们破茧成蝶，也能让我们涅槃重生。我们，在文字里打坐，在文字穿行，在文字里放歌。咫尺天涯，有一种牵挂不在云端，不在潭底，只在不离不弃的点滴里。滚滚红尘，我们不必问君从何处来，也不必问君往何处去。我们只需相聚时花间一壶酒，离别时依依满别情。<\/p><p>烟火人生，因了文字的纱笼，那二十四桥明月夜才格外令人留恋;因了文字的点拨，那广袤沙漠孤烟直才分外令人遐想。相信因文字结缘的人都会欣赏雪小禅的名言：“这世间，必有一种懂得，穿越灵魂，幽幽而来。你静静无言，他默默不语。相视一笑，刹那间就有一种感动，与上帝的慈悲相遇，与彼此的精神强度连在一起。不远，不近，你说，他懂;他说，你懂!”。<\/p><p>当古道上的风轻轻掠过，或许我们，会追忆青衫对饮成三人，追忆美人幽幽葬落花，追忆白衣打马哒哒过，追忆罗衫轻解上兰舟……我们左顾迤逦烟村，右盼空城晓角，爱上夜色阑珊，也爱上暖日明霞。<\/p><p>不管你在哪里，时光的长廊上，一份季节的怀想一直延伸向有你的远方。海内存知己天涯若比邻，心若相通，无言也懂。好想，我们一直相约在花海之间，你不往左，我不向右。我们，一起观赏花开花落的美景，一起聆听风起雨落的声音，一起携文字的暗香，挽芳草的葱茏，不惊不扰，走过流年。<\/p><p>天地间的生机盎然总牵系着清风雨露，旅途上的笙歌缭绕总交织着花飞蝶舞。其实，不远不近的惦记是一种最美的情思，不即不离的陪伴是一种最美的相约。我们都知道，在相遇相知的年华里，有一种相守的温暖，有一种相念的感动，有一种相知的幸福，有一种相惜的美好，属于你，也属于我。此岸、彼岸，总有一种声音凝着真情穿越千山万水，抚慰你，也抚慰我;海角、天涯，总有一种微笑沐着春风穿越岁月流年，温暖你，也温暖我。<\/p><p>指尖染香，握一世芳华。开掌合掌，开卷闭卷，朵朵心花随风轻扬。任风云来去，但愿我们不是匆匆路过，既已相遇，我们就别相忘于江湖。我们，不要让等待输给流年，不要让用心种下的花朵在岁月里枯萎，好吗?真的希望，我们心装明镜，游目骋怀，心，靠近一点，再近一点，即使离别，依然期待下一个转角还能遇见你。<\/p><p>沧海晴天，碧水照影，此情真意，此念真心。今后，我们一起观浪漫诗意的烟花弱柳，一起赏悠悠含笑的朵朵桃花，一起撷莲花之芬芳，采流云之轻盈，约春光之明媚，一路歌，一路行。于娴静如诗的岁月里，我们折柳作笛，轻歌曼舞地走向人生的一个又一个季节，让丰盈的爱一直绽放在光阴路上。<\/p><p>高山流水，琴箫和鸣，一笺心语寄于风月，有一种温暖是陪你走过，有一种缘分是永不分离。煮一壶茶，邀你话古今，让我们，以文字之眸阅尽古往今来，用季风之弦弹拨红尘悠扬，拿真情之伞撑起生命晴天。从此，恋恋风尘，你歇我唱，你唱我和，时光不老，我们不散。<\/p>|<h1>NBA历史得分榜<\/h1><div class="para" label-module="para">NBA历史得分榜，是统计职业球员在<a target="_blank" href="http:\/\/baike.baidu.com\/item\/NBA%E5%B8%B8%E8%A7%84%E8%B5%9B">NBA常规赛<\/a>总得到的所有分数的榜单。该榜单只统计职业球员在<a target="_blank" href="http:\/\/baike.baidu.com\/item\/NBA%E5%B8%B8%E8%A7%84%E8%B5%9B">NBA常规赛<\/a>获得的总的分数，不统计职业球员在<a target="_blank" href="http:\/\/baike.baidu.com\/item\/NBA%E5%AD%A3%E5%89%8D%E8%B5%9B">NBA季前赛<\/a>、<a target="_blank" href="http:\/\/baike.baidu.com\/item\/NBA%E5%AD%A3%E5%90%8E%E8%B5%9B\/36196" data-lemmaid="36196">NBA季后赛<\/a>和<a target="_blank" href="http:\/\/baike.baidu.com\/item\/NBA%E5%85%A8%E6%98%8E%E6%98%9F%E8%B5%9B">NBA全明星赛<\/a>获得到的分数。<\/div><div class="basic-info cmn-clearfix"><dl class="basicInfo-block basicInfo-left"><dt class="basicInfo-item name">中文名<\/dt><dd class="basicInfo-item value">NBA历史得分榜<\/dd><dt class="basicInfo-item name">外文名<\/dt><dd class="basicInfo-item value">NBA All-time Regular Season Points Stats<\/dd><\/dl><dl class="basicInfo-block basicInfo-right"><dt class="basicInfo-item name">类&nbsp;&nbsp;&nbsp;&nbsp;型<\/dt><dd class="basicInfo-item value">排行榜<\/dd><dt class="basicInfo-item name">国&nbsp;&nbsp;&nbsp;&nbsp;家<\/dt><dd class="basicInfo-item value">美国<\/dd><dt class="basicInfo-item name">统计范围<\/dt><dd class="basicInfo-item value">NBA常规赛<\/dd><\/dl><\/div>|<div class="para" label-module="para">☆更新至NBA常规赛(2016-2017赛季)2017年4月13日（北京时间）比赛结束。<\/div><table log-set-param="table_view" class="table-view log-set-param"><tbody><tr><th><div class="para" label-module="para">排名<\/div><\/th><th><div class="para" label-module="para">姓名<\/div><\/th><th><div class="para" label-module="para">得分<\/div><\/th><th><div class="para" label-module="para">效力球队（现役）<\/div><\/th><\/tr><tr><td width="42" valign="top">1<\/td><td width="146" valign="top"><div class="para" label-module="para"><a target="_blank" href="http:\/\/baike.baidu.com\/item\/%E5%8D%A1%E9%87%8C%E5%A7%86%C2%B7%E9%98%BF%E5%B8%83%E6%9D%9C%E5%B0%94-%E8%B4%BE%E5%B7%B4%E5%B0%94">卡里姆·阿布杜尔-贾巴尔<\/a><\/div><\/td><td width="74" valign="top">38387<\/td><td width="127" valign="top">&#12288;<\/td><\/tr><tr><td width="43" valign="top">2<\/td><td width="146" valign="top"><div class="para" label-module="para"><a target="_blank" href="http:\/\/baike.baidu.com\/item\/%E5%8D%A1%E5%B0%94%C2%B7%E9%A9%AC%E9%BE%99">卡尔·马龙<\/a><\/div><\/td><td width="74" valign="top"><div class="para" label-module="para">36928<\/div><\/td><td width="127" valign="top">&#12288;<\/td><\/tr><tr><td width="43" valign="top">3&#12288;<\/td><td width="146" valign="top"><div class="para" label-module="para"><a target="_blank" href="http:\/\/baike.baidu.com\/item\/%E7%A7%91%E6%AF%94%C2%B7%E5%B8%83%E8%8E%B1%E6%81%A9%E7%89%B9\/318773">科比·布莱恩特<\/a><\/div><\/td><td width="74" valign="top"><div class="para" label-module="para">33643<\/div><\/td><td width="127" valign="top">&#12288;<\/td><\/tr><tr><td width="43" valign="top">4&#12288;<\/td><td width="146" valign="top"><div class="para" label-module="para"><a target="_blank" href="http:\/\/baike.baidu.com\/item\/%E8%BF%88%E5%85%8B%E5%B0%94%C2%B7%E4%B9%94%E4%B8%B9">迈克尔·乔丹<\/a><\/div><\/td><td width="74" valign="top"><div class="para" label-module="para">32292<\/div><\/td><td width="127" valign="top">&#12288;<\/td><\/tr><tr><td width="42" valign="top">5&#12288;<\/td><td width="146" valign="top"><div class="para" label-module="para"><a target="_blank" href="http:\/\/baike.baidu.com\/item\/%E5%A8%81%E5%B0%94%E7%89%B9%C2%B7%E5%BC%A0%E4%BC%AF%E4%BC%A6">威尔特·张伯伦<\/a><\/div><\/td><td width="74" valign="top"><div class="para" label-module="para">31419<\/div><\/td><td width="127" valign="top">&#12288;<\/td><\/tr><tr><td colspan="1" rowspan="1" valign="top">6<\/td><td colspan="1" rowspan="1" valign="top"><a target="_blank" href="http:\/\/baike.baidu.com\/item\/%E5%BE%B7%E5%85%8B%C2%B7%E8%AF%BA%E7%BB%B4%E8%8C%A8%E5%9F%BA">德克·诺维茨基<\/a><\/td><td colspan="1" rowspan="1" valign="top">30260<\/td><td colspan="1" rowspan="1" valign="top">现役<a target="_blank" href="http:\/\/baike.baidu.com\/item\/%E8%BE%BE%E6%8B%89%E6%96%AF%E5%B0%8F%E7%89%9B%E9%98%9F">达拉斯小牛队<\/a><\/td><\/tr><\/tbody><\/table>|<div class="result-op c-container xpath-log" srcid="91" fk="nba得分排行榜" id="1" tpl="bk_polysemy" mu="http:\/\/baike.baidu.com\/item\/NBA%E5%8E%86%E5%8F%B2%E5%BE%97%E5%88%86%E6%A6%9C\/2177038?fr=aladdin" data-op="{y:7FDDFDDE}" data-click="{&quot;p1&quot;:&quot;1&quot;,&quot;rsv_bdr&quot;:&quot;0&quot;,&quot;fm&quot;:&quot;albk&quot;,&quot;rsv_stl&quot;:&quot;0&quot;,&quot;p5&quot;:1}"><h3 class="t c-gap-bottom-small"><a href="http:\/\/www.baidu.com\/link?url=oHfQY8Qk-mk2iT_qvQYdACbwCCTEsOMDgHiywp3ae--r0zCQxm7vMf92Rxm8Y0yVo6YBX9I6RSbDg1YOvJWGWp0Yb_KFj654pm_ewQF3G9E-pbHEOv3bSngWM_Ifwy3YX-aL9c1E63Oef9X9kYzJwa&amp;wd=&amp;eqid=ad8ff174002a4bc5000000065949fb07" target="_blank"><em>NBA<\/em>历史<em>得分榜<\/em>_百度百科<\/a><\/h3><div class="c-row"><div class="c-span6"><a href="http:\/\/www.baidu.com\/link?url=oHfQY8Qk-mk2iT_qvQYdACbwCCTEsOMDgHiywp3ae--r0zCQxm7vMf92Rxm8Y0yVo6YBX9I6RSbDg1YOvJWGWp0Yb_KFj654pm_ewQF3G9E-pbHEOv3bSngWM_Ifwy3YX-aL9c1E63Oef9X9kYzJwa" target="_blank" class="op-bk-polysemy-album op-se-listen-recommend" style="_height:121px"><img class="c-img c-img6" src="https:\/\/ss1.baidu.com\/6ONXsjip0QIZ8tyhnq\/it\/u=1893883627,2053715724&amp;fm=58"><\/a><\/div><div class="c-span18 c-span-last"><p><em>NBA<\/em>历史<em>得分榜<\/em>，是统计职业球员在<em>NBA<\/em>常规赛总得到的所有分数的榜单。该榜单只统计职业球员在<em>NBA<\/em>常规赛获得的总的分数，不统计职业球员在<em>NBA<\/em>季前赛、<em>NBA<\/em>季后赛和<em>NBA<\/em>全明星赛获得到的分数。<\/p><p><a class="c-gap-right-small op-se-listen-recommend" href="http:\/\/www.baidu.com\/link?url=aEJz0juV4SlmkJyHrLO67HDF5_paIjOIzkMj7BJvW80W8pPAJl_IKrbooJTpGWhafoW_rjscapMjiJ_tvBZAUjeXg2hwh5S0hR0qkYCiZqCnMQ9GQgxSIhfl5oTr8mcyoFZqw0PgtDBQifA-q4LrqK" target="_blank" title="历史得分榜">历史<em>得分榜<\/em><\/a><\/p><p class=" op-bk-polysemy-move"><span class="c-showurl">baike.baidu.com<\/span><span class="c-tools" id="tools_4782685847164316924_1" data-tools="{title:NBA历史得分榜_百度百科,url:http:\/\/baike.baidu.com\/item\/NBA%E5%8E%86%E5%8F%B2%E5%BE%97%E5%88%86%E6%A6%9C\/2177038?fr=aladdin}"><a class="c-tip-icon"><i class="c-icon c-icon-triangle-down-g"><\/i><\/a><\/span> - <a target="_blank" href="http:\/\/open.baidu.com\/" class="op_LAMP"><\/a><\/p><\/div><\/div><div class="c-gap-top c-recommend" style=""><i class="c-icon c-icon-bear-circle c-gap-right-small"><\/i><span class="c-gray">为您推荐：<\/span><a class="" href="\/s?tn=baidu&amp;rsv_idx=1&amp;wd=nba抢断排行榜&amp;rsv_crq=6&amp;bs=nba得分排行榜" title="nba抢断排行榜" target="_blank">nba抢断排行榜<\/a><a class="c-gap-left-large" href="\/s?tn=baidu&amp;rsv_idx=1&amp;wd=nba失误排行榜&amp;rsv_crq=6&amp;bs=nba得分排行榜" title="nba失误排行榜" target="_blank">nba失误排行榜<\/a><a class="c-gap-left-large" href="\/s?tn=baidu&amp;rsv_idx=1&amp;wd=nba历史三双榜&amp;rsv_crq=6&amp;bs=nba得分排行榜" title="nba历史三双榜" target="_blank">nba历史三双榜<\/a><a class="c-gap-left-large" href="\/s?tn=baidu&amp;rsv_idx=1&amp;wd=nba档案解密&amp;rsv_crq=6&amp;bs=nba得分排行榜" title="nba档案解密" target="_blank">nba档案解密<\/a><a class="c-gap-left-large" href="\/s?tn=baidu&amp;rsv_idx=1&amp;wd=阴钰辰&amp;rsv_crq=6&amp;bs=nba得分排行榜" title="阴钰辰" target="_blank">阴钰辰<\/a><\/div><\/div>){1}//*常用文字*/,
        reg_info = /(<h1>《战狼Ⅱ》&nbsp;&nbsp;中国大陆&nbsp;126分钟&nbsp;2017年7月27日<\/h1><p>《战狼Ⅱ》是吴京执导的动作军事电影，由吴京、弗兰克·格里罗、吴刚、张翰、卢靖姗、丁海峰等主演。该片于2017年7月27日在中国内地上映 。<\/p><p>影片讲述了脱下军装的冷锋被卷入了一场非洲国家的叛乱，本来能够安全撤离的他无法忘记军人的职责，重回战场展开救援的故事<\/p><p>2017年8月11日凌晨，《战狼2》票房（含服务费）突破40亿元，打破《美人鱼》此前创下的33.92亿元记录，打破国产电影历史最高票房纪录。<\/p>|<h1>《战狼Ⅱ》剧情简介<\/h1><p>被开除军籍的冷锋本是因找寻龙小云来到非洲，但是却突然被卷入一场非洲国家的叛乱。因为国家之间政治立场的关系，中国军队无法在非洲实行武装行动撤离华侨。而作为退伍老兵的冷锋无法忘记曾经为军人的使命，本来可以安全撤离的他毅然决然地回到了沦陷区，孤身一人带领身陷屠杀中的同胞和难民，展开生死逃亡。随着斗争的持续，体内的狼性逐渐复苏，最终闯入战乱区域，为同胞而战斗<\/p>|<h1>《战狼Ⅱ》角色介绍1<\/h1><p>冷锋--吴京<\/p><p>原战狼中队的特种兵，因故被开除军籍。因为龙小云的意外失踪，前往非洲追查线索。遭遇当地发生武装叛乱，中国大使馆组织撤侨。本可以安全撤离的冷锋，却因无法忘记曾经为军人的使命。为了营救华资工厂的中国人和援非医疗专家陈博士，他孤身犯险冲回沦陷区。带领身陷屠杀中的同胞和难民，展开生死逃亡。<\/p>|<h1>《战狼Ⅱ》角色介绍2<\/h1><p>老爹--弗兰克·格里罗<\/p><p>智商、指挥能力和作战技能一流的雇佣兵组织头目，手下有一批装备精良的部下。被叛乱军首领高价雇佣而来，然而在追捕陈博士的过程中，遇到了冷锋的一再阻挠。他经过分析和判断认定，杀死冷锋抢走冷锋护送的小女孩，就可以凭借疫苗成功地统治这个国家。<\/p>|<h1>《战狼Ⅱ》角色介绍3<\/h1><p>何建国--吴刚<\/p><p>一名退伍的老侦察兵，在非洲的华资工厂担任保安主管。叛乱发生后，指挥全体员工守厂自保。当冷锋来到工厂后，与冷锋并肩战斗，一起阻击叛军和雇佣兵对工厂的袭击。 <\/p>|<h1>《战狼Ⅱ》角色介绍4<\/h1><p>卓亦凡--张翰<\/p><p>一个在非洲开厂的富二代军迷，喜欢军事却只会纸上谈兵的“熊孩子”。但是为人真诚，当叛乱部队攻击他的工厂时，勇敢地拿起武器和两位老兵并肩作战，在战火中完成了从男孩到男人的成长。 <\/p>|<h1>《战狼Ⅱ》角色介绍5<\/h1><p>RACHEL--卢靖姗<\/p><p>一名援非医生，冷静沉着，医术高超。在雇佣兵搜捕传染病专家陈博士时，试图李代桃僵掩护直正的陈博士。陈博士不幸牺牲后受陈博士的嘱托，和冷锋一起护送与治疗疫情有极大关系的Pasha撤离。<\/p>|<h1>《战狼Ⅱ》角色介绍6<\/h1><p>舰长--丁海峰<\/p><p>中国海军舰长，当叛乱发生后，受命赶往港口进行撤侨任务。然而在当地还有一个华资工厂的几十名中国同胞被困，援非医疗专家陈博士没有撤离。因为军事人员不能进入他国领土，所以只能派冷锋单独执行任务。 <\/p>){1}//*常用文字*/;


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

    /*构造函数*/
    function TestWidget() {
    }

    /*继承类*/
    function testFn() {
    }

    /*对外接口类*/
    function TestApi() {
    }


    /*公用接口--生成集合*/
    TestWidget.prototype.getMap = function (config) {
        return generateMap(config);
    };
    /*公用接口--生成集合*/
    TestWidget.prototype.getResult = function (datalist, config) {
        return generateResult(datalist, config);
    };
    /*公用接口--生成范围*/
    TestWidget.prototype.getLimit = function (config) {
        return generateLimit(config);
    };
    /*公用接口--生成正则值*/
    TestWidget.prototype.getRule = function (str) {
        return generateRule(str);
    };


    /*测试接口--普通*/
    TestWidget.prototype.test = function (config) {
        return generateResult(generateMap(config), config);
    };
    /*测试接口--生成凭证*/
    TestWidget.prototype.testToken = function (type) {
        var res,
            token = Mock.mock({
                "id": reg_id,
                "token": /([0-9a-zA-Z]{4-10}){4}/,
                "adminId": reg_id,
                "organizationId": reg_id,
                "organizationName": reg_name
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
    TestWidget.prototype.testMenu = function (config) {
        var menuobj = {
                "menu": [{
                    "modClass": "yttx-organization",
                    "modCode": "yttx-organization",
                    "modId": 10,
                    "modLink": "yttx-organization",
                    "modName": "机构",
                    "permitItem": [{
                        "funcCode": "yttx-batch-delete",
                        "funcName": "批量删除",
                        "isPermit": 1,
                        "modId": 10, "prid": 13
                    }, {
                        "funcCode": "yttx-operator-adjustment",
                        "funcName": "调整运营商",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 12
                    }, {
                        "funcCode": "yttx-organization-delete",
                        "funcName": "删除机构",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 11
                    }, {
                        "funcCode": "yttx-organization-edit",
                        "funcName": "机构编辑",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 10
                    }, {
                        "funcCode": "yttx-rolegroup-add",
                        "funcName": "添加角色组",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 9
                    }, {
                        "funcCode": "yttx-role-add",
                        "funcName": "添加角色",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 8
                    }, {
                        "funcCode": "yttx-role-edit",
                        "funcName": "角色编辑",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 7
                    }, {
                        "funcCode": "yttx-member-delete",
                        "funcName": "移除成员",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 6
                    }, {
                        "funcCode": "yttx-member-add",
                        "funcName": "添加成员",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 5
                    }, {
                        "funcCode": "yttx-user-update",
                        "funcName": "修改用户",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 4
                    }, {
                        "funcCode": "yttx-user-view",
                        "funcName": "查看用户",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 3
                    }, {
                        "funcCode": "yttx-user-add",
                        "funcName": "添加用户",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 2
                    }, {
                        "funcCode": "yttx-organization-add",
                        "funcName": "添加子机构",
                        "isPermit": 1,
                        "modId": 10,
                        "prid": 1
                    }]
                }, {
                    "modClass": "yttx-order-manager",
                    "modCode": "yttx-order-manager",
                    "modId": 30,
                    "modLink": "yttx-order-manager",
                    "modName": "订单管理",
                    "permitItem": [{
                        "funcCode": "yttx-order-details",
                        "funcName": "详情",
                        "isPermit": 1,
                        "modId": 30,
                        "prid": 15
                    }, {
                        "funcCode": "yttx-order-export",
                        "funcName": "导出",
                        "isPermit": 1,
                        "modId": 30,
                        "prid": 16
                    }]
                }, {
                    "modClass": "yttx-invoice-manager",
                    "modCode": "yttx-invoice-manager",
                    "modId": 50,
                    "modLink": "yttx-invoice-manager",
                    "modName": "发货管理",
                    "permitItem": [{
                        "funcCode": "yttx-invoice-details",
                        "funcName": "详情",
                        "isPermit": 1,
                        "modId": 50,
                        "prid": 18
                    }, {
                        "funcCode": "yttx-invoice-delivery",
                        "funcName": "发货",
                        "isPermit": 1,
                        "modId": 50,
                        "prid": 19
                    }]
                }, {
                    "modClass": "yttx-purchase-manager",
                    "modCode": "yttx-purchase-manager",
                    "modId": 70,
                    "modLink": "yttx-purchase-manager",
                    "modName": "采购管理",
                    "permitItem": [{
                        "funcCode": "yttx-purchase-audit",
                        "funcName": "采购审核",
                        "isPermit": 1,
                        "modId": 70,
                        "prid": 22
                    }, {
                        "funcCode": "yttx-purchase-stats",
                        "funcName": "采购统计",
                        "isPermit": 1,
                        "modId": 70,
                        "prid": 21
                    }, {
                        "funcCode": "yttx-purchase-details",
                        "funcName": "详情",
                        "isPermit": 1,
                        "modId": 70,
                        "prid": 20
                    }]
                }, {
                    "modClass": "yttx-warehouse-manager",
                    "modCode": "yttx-warehouse-manager",
                    "modId": 90,
                    "modLink": "yttx-warehouse-manager",
                    "modName": "仓库管理",
                    "permitItem": [{
                        "funcCode": "mall-storage-stats",
                        "funcName": "入库统计",
                        "isPermit": 1,
                        "modId": 90,
                        "prid": 28
                    }, {
                        "funcCode": "mall-inventory-status",
                        "funcName": "库存状况",
                        "isPermit": 1,
                        "modId": 90,
                        "prid": 27
                    }, {
                        "funcCode": "mall-order-stats",
                        "funcName": "订单统计",
                        "isPermit": 1,
                        "modId": 90,
                        "prid": 26
                    }, {
                        "funcCode": "mall-purchase-receiving",
                        "funcName": "收货",
                        "isPermit": 1,
                        "modId": 90,
                        "prid": 25
                    }, {
                        "funcCode": "mall-purchase-stats",
                        "funcName": "采购统计",
                        "isPermit": 1,
                        "modId": 90,
                        "prid": 24
                    }, {
                        "funcCode": "mall-warehouse-add",
                        "funcName": "添加分仓",
                        "isPermit": 1,
                        "modId": 90,
                        "prid": 23
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
    TestWidget.prototype.testSuccess = function (type) {
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
            } else if (str === 'province') {
                return Random.province();
            } else if (str === 'city') {
                return Random.city();
            } else if (str === 'country') {
                return Random.county();
            } else if (str === 'address') {
                return Random.county(true);
            } else if (str.indexOf('minmax') !== -1) {
                return (function () {
                    var temprule = str.split(',').slice(1),
                        min = parseInt(temprule[0], 10),
                        max = parseInt(temprule[1], 10);
                    return min + parseInt(Math.random() * (max - min), 10);
                }());
            } else {
                rule = reg_value;
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
                    } else {
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


    /*继承*/
    testFn.prototype = TestWidget.prototype;
    /*对外接口*/
    TestApi.prototype = new testFn();


    if (!window['testWidget']) {
        window['testWidget'] = new TestApi();
    }
}());