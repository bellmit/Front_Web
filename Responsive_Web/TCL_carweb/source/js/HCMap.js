/*!  
* Author: Xu XianWei (xxw)
* Title: Map API
* Purpose: Flash Map to Javascript API Library
* Date: Tues. Mar 15th 2011
*/

(function() {
    // 转换颜色格式
    var changeColorType = function(color) {
        if (color) {
            color = color.replace("#", "0x");
        }
        return color;
    };

    // 经纬度对象
    var Latlng = function(lat, lng) {
        var latlng = new Object();
        latlng.lat = lat;
        latlng.lng = lng;
        return latlng;
    };

    // 经纬度转化 coordinate -> latlng
    var coordinateToLatlng = function(coordinate) {
        var latlng = Latlng(coordinate.Lat, coordinate.Lng);
        return latlng;
    };
    // 经纬度数组转化 coordinates -> latlngs
    var coordinatesToLatlngs = function(coordinates) {
        var latlngs = new Array();
        for (var i = 0; i < coordinates.length; i++) {
            var latlngObj = Latlng(coordinates[i].Lat, coordinates[i].Lng);
            latlngs.push(latlngObj);
        }
        return latlngs;
    };

    // 格式输入的latlngs 数组
    var inputToLatlngs = function(inputLatlngs) {
        if (inputLatlngs) {
            var latlngs = new Array();
            for (var i = 0; i < inputLatlngs.length; i++) {
                var latlngObj = Latlng(inputLatlngs[i].lat, inputLatlngs[i].lng);
                latlngs.push(latlngObj);
            }
            return latlngs;
        } else {
            return new Array();
        }
    };

    var HCMap = {
        // flash文件位置
        SeverUrl: "AsMapForJs.swf",
        // 设置地图图片服务
        Maproot: "http://mapdb.365ditu.cn/rt/mapdb/",
        // 最小等级
        MapMinZoom: 1,
        // 最大等级
        MapMaxZoom: 16,
        // 累加器
        ObjectCount: 0,
        // 对象保存数组
        ObjectAry: new Array(),

        // 设置flash文件位置
        setSeverUrl: function(url) {
            HCMap.SeverUrl = url;
        },
        // 设置地图图片服务
        setMapRoot: function(url) {
            HCMap.Maproot = url;
        },

        // 设置等级
        setMapLevel: function(minZoom, maxZoom) {
            HCMap.MapMinZoom = minZoom;
            HCMap.MapMaxZoom = maxZoom;
        },

        // 设置对象名称
        setObjectName: function(type) {
            // 累加器
            HCMap.ObjectCount++;
            // 定义名称，用于区分
            var name = type + HCMap.ObjectCount;
            return name;
        },
        // 保存对象到数组
        saveToObjectAry: function(name, obj) {
            HCMap.ObjectAry[name] = obj;
        },

        createLatlng: function(lat, lng) {
            return Latlng(lat, lng);
        },

        // 初始化地图
        createMap: function(containerId, width, height, lat, lng, zoom) {
            var name = HCMap.setObjectName("Map");
            var maplet = new Map(containerId, width, height, lat, lng, zoom, name);
            HCMap.saveToObjectAry(name, maplet);
            return maplet;
        },


        // 文本标注
        createTextMarker: function(text, lat, lng) {
            var name = HCMap.setObjectName("TextMarker");
            var marker = new TextMarker(name, text, lat, lng);
            HCMap.saveToObjectAry(name, marker);
            return marker;
        },
        // 点标注
        createPointMarker: function(lat, lng, icon, x, y) {
            var name = HCMap.setObjectName("PointMarker");
            var marker = new PointMarker(name, lat, lng, icon, x, y);
            HCMap.saveToObjectAry(name, marker);
            return marker;
        },
        // 旗子标注
        createFlagMarker: function(lat, lng, icon, x, y) {
            var name = HCMap.setObjectName("FlagMarker");
            var marker = new FlagMarker(name, lat, lng, icon, x, y);
            HCMap.saveToObjectAry(name, marker);
            return marker;
        },
        // 气球标注没有信息框
        createBalloonFalseMarker: function(lat, lng, icon, title, x, y) {
            var name = HCMap.setObjectName("BalloonFalseMarker");
            var marker = new BalloonFalseMarker(name, lat, lng, icon, title, x, y);
            HCMap.saveToObjectAry(name, marker);
            return marker;
        },
        // 气球标注
        createBalloonMarker: function(lat, lng, icon, prop, fun, x, y) {
            var name = HCMap.setObjectName("BalloonMarker");
            var marker = new BalloonMarker(name, lat, lng, icon, prop, fun, x, y);
            HCMap.saveToObjectAry(name, marker);
            return marker;
        },
        // 自定标注
        createSelfMarker: function(lat, lng, icon, swfSource, dataAry, iconX, iconY, swfX, swfY) {
            var name = HCMap.setObjectName("SelfMarker");
            var marker = new SelfMarker(name, lat, lng, icon, swfSource, dataAry, iconX, iconY, swfX, swfY);
            HCMap.saveToObjectAry(name, marker);
            return marker;
        },
        // 创建旋转标注
        createRotateMarker: function(lat, lng, icon, mX, mY, x, y) {
            var name = HCMap.setObjectName("RotateMarker");
            var marker = new RotateMarker(name, lat, lng, icon, mX, mY, x, y);
            HCMap.saveToObjectAry(name, marker);
            return marker;
        },


        // 作线
        createPathGraphics: function(latlngs, lineColor, lineWeight, lineOpacity) {
            var name = HCMap.setObjectName("PathGraphics");
            var graphics = new Path(name, latlngs, lineColor, lineWeight, lineOpacity);
            HCMap.saveToObjectAry(name, graphics);
            return graphics;
        },
        // 编辑线
        createPathEditGraphics: function(latlngs, lineColor, lineWeight, lineOpacity, sLineColor, sLineWeight, sLineOpacity, eLineColor, eLineWeight, eLineOpacity) {
            var name = HCMap.setObjectName("PathEdit");
            var graphics = new PathEdit(name, latlngs, lineColor, lineWeight, lineOpacity, sLineColor, sLineWeight, sLineOpacity, eLineColor, eLineWeight, eLineOpacity);
            HCMap.saveToObjectAry(name, graphics);
            return graphics;
        },
        // 作面
        createPolygonGraphics: function(latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            var name = HCMap.setObjectName("PolygonGraphics");
            var graphics = new Polygon(name, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, graphics);
            return graphics;
        },
        // 编辑面
        createPolygonEditGraphics: function(latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity,
                                                    sLineColor, sLineWeight, sLineOpacity, sFillColor, sFillOpacity,
                                                    eLineColor, eLineWeight, eLineOpacity, eFillColor, eFillOpacity) {
            var name = HCMap.setObjectName("PolygonEdit");
            var graphics = new PolygonEdit(name, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity,
                                                    sLineColor, sLineWeight, sLineOpacity, sFillColor, sFillOpacity,
                                                    eLineColor, eLineWeight, eLineOpacity, eFillColor, eFillOpacity);
            HCMap.saveToObjectAry(name, graphics);
            return graphics;
        },
        // 作圆
        createCircleGraphics: function(latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            var name = HCMap.setObjectName("CircleGraphics");
            var graphics = new Circle(name, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, graphics);
            return graphics;
        },


        // 创建工具管理者
        createToolManager: function() {
            var name = HCMap.setObjectName("ToolManager");
            var toolMgr = new ToolManager(name);
            HCMap.saveToObjectAry(name, toolMgr);
            return toolMgr;
        },
        // 创建作点工具
        createPointTool: function(fillColor, fillOpacity) {
            var name = HCMap.setObjectName("PointTool");
            var tool = new PointTool(name, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建作线工具
        createPathTool: function(lineColor, lineWeight, lineOpacity) {
            var name = HCMap.setObjectName("PathTool");
            var tool = new PathTool(name, lineColor, lineWeight, lineOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建作面工具
        createPolygonTool: function(lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            var name = HCMap.setObjectName("PolygonTool");
            var tool = new PolygonTool(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建作矩形工具
        createRectTool: function(lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            var name = HCMap.setObjectName("RectTool");
            var tool = new RectTool(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建作圆工具
        createCircleTool: function(lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            var name = HCMap.setObjectName("CircleTool");
            var tool = new CircleTool(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建拉框放大工具
        createRectZoomInTool: function(lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            var name = HCMap.setObjectName("RectZoomInTool");
            var tool = new RectZoomInTool(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建测距工具
        createDistanceTool: function(lineColor, lineWeight, lineOpacity) {
            var name = HCMap.setObjectName("DistanceTool");
            var tool = new DistanceTool(name, lineColor, lineWeight, lineOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建测面工具
        createAreaTool: function(lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            var name = HCMap.setObjectName("AreaTool");
            var tool = new AreaTool(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
            HCMap.saveToObjectAry(name, tool);
            return tool;
        },
        // 创建图层
        createLayer: function(url) {
            var name = HCMap.setObjectName("Layer");
            var layer = new Layer(name, url);
            HCMap.saveToObjectAry(name, layer);
            return layer;
        },


        // 创建地图监听器
        createMapEventListener: function() {
            var name = HCMap.setObjectName("MapEventListener");
            var mapEvenListener = new MapEventListener(name);
            HCMap.saveToObjectAry(name, mapEvenListener);
            return mapEvenListener;
        }

    };

    // Marker基类
    var BaseMarker = function(name, type, lat, lng, icon, x, y, title) {
        // 标注点经纬度
        this.lat = lat;
        this.lng = lng;
        // 图标路径
        this.icon = icon;
        // 标题
        this.title = title;
        // 标注点起始坐标
        this.x = x;
        this.y = y;

        // 名称
        this.name = name;
        // 类型
        this.type = type;
        // flash对象
        this.flashMap = null;

        // 获取名称
        this.getName = function() {
            return name;
        };
        // 获取类型
        this.getType = function() {
            return type;
        };

        this.setMaplet = function(flashMap) {
            this.flashMap = flashMap;
        };
        // 真正创建flash Marker对象 ，需要重写
        this.createMarker = function() {
        };
        // 更新
        this.updateMarker = function(lat, lng) {
            this.lat = lat;
            this.lng = lng;
            this.flashMap.updateMarker(this.name, this.lat, this.lng);
        };
        // 显示
        this.show = function() {
            this.flashMap.showMarker(this.name);
        };
        // 隐藏
        this.hide = function() {
            this.flashMap.hideMarker(this.name);
        };
        // 销毁
        this.destroy = function() {
            this.flashMap.destroyMarker(this.name);
        };
        // 标注自我刷新
        this.refresh = function() {
            this.flashMap.markerRefresh(this.name);
        };

        // 添加点击事件监听
        this.addMouseClickEvent = function(func) {
            this.flashMap.addMarkerClickEvent(func, this.name);
        };
        // 移除点击事件监听
        this.removeMouseClickEvent = function() {
            this.flashMap.removeMarkerClickEvent(this.name);
        };
    };
    // 文本标注
    var TextMarker = function(name, title, lat, lng) {
        var type = "TextMarker";
        BaseMarker.call(this, name, type, lat, lng, "", 0, 0, title);

        this.createMarker = function() {
            this.flashMap.createTextMarker(this.name, this.title, this.lat, this.lng);
        };

        this.updateMarker = function(lat, lng, title) {
            this.lat = lat;
            this.lng = lng;
            this.title = title;
            this.flashMap.updateTextMarker(this.name, lat, lng, title);
        };
    };
    // 点标注
    var PointMarker = function(name, lat, lng, icon, x, y) {
        var type = "PointMarker";
        BaseMarker.call(this, name, type, lat, lng, icon, x, y, "");

        this.createMarker = function() {
            if (this.icon) {
                this.flashMap.createPointMarker(this.name, this.lat, this.lng, this.icon, this.x, this.y);
            } else {
                this.flashMap.createPointMarker(this.name, this.lat, this.lng);
            }
        };
    };
    // 旗子标注
    var FlagMarker = function(name, lat, lng, icon, x, y) {
        var type = "FlagMarker";
        BaseMarker.call(this, name, type, lat, lng, icon, x, y, "");

        this.createMarker = function() {
            if (this.icon) {
                this.flashMap.createFlagMarker(this.name, this.lat, this.lng, this.icon, this.x, this.y);
            } else {
                this.flashMap.createFlagMarker(this.name, this.lat, this.lng);
            }
        };

//        // 添加单击事件监听
//        this.addClickEvent = function(fun) {
//            this.flashMap.addMarkerClickListenEvent("Flag_Marker", fun, this.name);
//        };
    };
    // 气球标注没有信息框
    var BalloonFalseMarker = function(name, lat, lng, icon, title, x, y) {
        var type = "BalloonFalseMarker";
        BaseMarker.call(this, name, type, lat, lng, icon, x, y, title);

        this.createMarker = function() {
            this.flashMap.createBalloonFalseMarker(this.name, this.lat, this.lng, this.icon, this.title, this.x, this.y);
        };
        // 显示窗口
        this.showBalloonLabel = function() {
            this.flashMap.showBalloonLabel(this.name);
        };
        // 隐藏窗口
        this.hideBalloonLabel = function() {
            this.flashMap.hideBalloonLabel(this.name);
        };
        this.updateMarker = function(lat, lng, title) {
            this.lat = lat;
            this.lng = lng;
            this.title = title;
            this.flashMap.updateBalloonFalseMarker(this.name, lat, lng, title);
        };
    };
    // 气球标注
    var BalloonMarker = function(name, lat, lng, icon, prop, fun, x, y) {
        var type = "BalloonMarker";
        BaseMarker.call(this, name, type, lat, lng, icon, x, y, "");

        this.prop = prop;
        this.fun = fun;

        this.createMarker = function() {
            this.flashMap.createBalloonMarker(this.name, this.lat, this.lng, this.icon, this.prop, this.fun, this.x, this.y);
        };
        // 显示窗口
        this.showBalloonBox = function() {
            this.flashMap.showBalloonBox(this.name);
        };
        // 隐藏窗口
        this.hideBalloonBox = function() {
            this.flashMap.hideBalloonBox(this.name);
        };
    };
    // 自定标注
    var SelfMarker = function(name, lat, lng, icon, swfSource, dataAry, iconX, iconY, swfX, swfY) {
        var type = "SelfMarker";
        BaseMarker.call(this, name, type, lat, lng, icon, iconX, iconY, "");

        this.swfX = swfX;
        this.swfY = swfY;
        this.swfSource = swfSource;
        this.dataAry = dataAry;

        this.createMarker = function() {
            this.flashMap.createSelfMarker(this.name, this.lat, this.lng, this.icon, this.swfSource, this.dataAry, this.x, this.y, this.swfX, this.swfY);
        };

        // 更新
        this.updateMarker = function(lat, lng, icon, swfSource, dataAry, iconX, iconY, swfX, swfY) {
            if (lat) {
                this.lat = lat;
            }
            if (lng) {
                this.lng = lng;
            }
            if (icon) {
                this.icon = icon;
            }
            if (swfSource) {
                this.swfSource = swfSource;
            }
            if (dataAry) {
                this.dataAry = dataAry;
            }
            if (iconX) {
                this.x = iconX;
            }
            if (iconY) {
                this.y = iconY;
            }
            if (swfX) {
                this.swfX = swfX;
            }
            if (swfY) {
                this.swfY = swfY;
            }
            this.flashMap.updateSelfMarker(this.name, this.lat, this.lng, this.icon, this.swfSource, this.dataAry, this.x, this.y, this.swfX, this.swfY);
        };
        // 显示窗口
        this.showBalloonBox = function() {
            this.flashMap.showBalloonBox(this.name);
        };
        // 隐藏窗口
        this.hideBalloonBox = function() {
            this.flashMap.hideBalloonBox(this.name);
        };
    };
    // 旋转标注
    var RotateMarker = function(name, lat, lng, icon, mX, mY, x, y) {
        var type = "RotateMarker";
        BaseMarker.call(this, name, type, lat, lng, icon, x, y, "");
        this.mX = mX;
        this.mY = mY;

        this.createMarker = function() {
            this.flashMap.createRotateMarker(this.name, this.lat, this.lng, this.mX, this.mY, this.icon, this.x, this.y);
        };

        // 调整角度
        this.rotate = function(lat1, lng1, lat2, lng2) {
            this.flashMap.rotateRotateMarker(this.name, lat1, lng1, lat2, lng2);
        };

        // 更新
        this.updateMarker = function(lat, lng, mX, mY, icon) {
            if (lat) {
                this.lat = lat;
            } else {
                lat = null;
            }
            if (lng) {
                this.lng = lng;
            } else {
                lng = null;
            }
            if (mX) {
                this.mX = mX;
            } else {
                mX = null;
            }
            if (mY) {
                this.mY = mY;
            } else {
                mY = null;
            }
            if (icon) {
                this.icon = icon;
            } else {
                icon = "";
            }
            this.flashMap.updateRotateMarker(this.name, lat, lng, mX, mY, icon);
        };
    };


    // 作图基类
    var BaseGraphics = function(name, type, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        // 线条颜色
        this.lineColor = lineColor ? changeColorType(lineColor) : changeColorType("#ff0000");
        // 线条粗细
        this.lineWeight = lineWeight ? lineWeight : 2;
        // 线条颜色透明度
        this.lineOpacity = lineOpacity ? lineOpacity : 0.8;
        // 填充颜色
        this.fillColor = fillColor ? changeColorType(fillColor) : changeColorType("#ffffff");
        // 填充颜色透明度
        this.fillOpacity = fillOpacity ? fillOpacity : 0.5;

        // 经纬度的数组

        this.latlngs = inputToLatlngs(latlngs);

        // 名称
        this.name = name;
        // 类型
        this.type = type;
        // flash对象
        this.flashMap = null;

        // 获取名称
        this.getName = function() {
            return name;
        };
        // 获取类型
        this.getType = function() {
            return type;
        };

        this.setMaplet = function(flashMap) {
            this.flashMap = flashMap;
        };
        // 真正创建flash Graphics对象 ，需要重写
        this.createGraphics = function() {
        };

        // 显示
        this.show = function() {
            this.flashMap.showPath(this.name);
        };
        // 隐藏
        this.hide = function() {
            this.flashMap.hidePath(this.name);
        };
        // 销毁
        this.destroy = function() {
            this.flashMap.destroyPath(this.name);
        };
        // 更新
        this.update = function(latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
            if (latlngs) {
                this.latlngs = inputToLatlngs(latlngs);
            }
            if (lineColor) {
                this.lineColor = changeColorType(lineColor);
            }
            if (lineWeight) {
                this.lineWeight = lineWeight;
            }
            if (lineOpacity) {
                this.lineOpacity = lineOpacity;
            }
            if (fillColor) {
                this.fillColor = changeColorType(fillColor);
            }
            if (fillOpacity) {
                this.fillOpacity = fillOpacity;
            }
            this.flashMap.updateGraphics(this.name, this.latlngs, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
        };

        // 添加点击事件监听
        this.addMouseClickEvent = function(func) {
            this.flashMap.addGraphicsClickEvent(func, this.name);
        };
        // 移除点击事件监听
        this.removeMouseClickEvent = function() {
            this.flashMap.removeGraphicsClickEvent(this.name);
        };
        // 添加MouseOver事件监听
        this.addMouseOverEvent = function(func) {
            this.flashMap.addGraphicsMouseOverEvent(func, this.name);
        };
        // 移除MouseOver事件监听
        this.removeMouseOverEvent = function() {
            this.flashMap.removeGraphicsMouseOverEvent(this.name);
        };
        // 添加MouseOut事件监听
        this.addMouseOutEvent = function(func) {
            this.flashMap.addGraphicsMouseOutEvent(func, this.name);
        };
        // 移除MouseOut事件监听
        this.removeMouseOutEvent = function() {
            this.flashMap.removeGraphicsMouseOutEvent(this.name);
        };
    };

    // 作线
    var Path = function(name, latlngs, lineColor, lineWeight, lineOpacity) {
        var type = "Path";
        BaseGraphics.call(this, name, type, latlngs, lineColor, lineWeight, lineOpacity);

        this.createGraphics = function() {
            this.flashMap.createPath(this.name, this.latlngs, this.lineColor, this.lineWeight, this.lineOpacity);
        };
    };
    // 编辑线
    var PathEdit = function(name, latlngs, lineColor, lineWeight, lineOpacity, sLineColor, sLineWeight, sLineOpacity, eLineColor, eLineWeight, eLineOpacity) {
        var type = "PathEdit";
        BaseGraphics.call(this, name, type, latlngs, lineColor, lineWeight, lineOpacity);
        // (打开)线条颜色
        if (sLineColor) {
            this.sLineColor = changeColorType(sLineColor);
        } else {
            this.sLineColor = this.lineColor;
        }
        // (打开)线条粗细
        if (sLineWeight) {
            this.sLineWeight = sLineWeight;
        } else {
            this.sLineWeight = this.lineWeight;
        }
        // (打开)线条颜色透明度
        if (sLineOpacity) {
            this.sLineOpacity = sLineOpacity;
        } else {
            this.sLineOpacity = this.lineOpacity;
        }
        // (关闭)线条颜色
        if (eLineColor) {
            this.eLineColor = changeColorType(eLineColor);
        } else {
            this.eLineColor = this.lineColor;
        }
        // (关闭)线条粗细
        if (eLineWeight) {
            this.eLineWeight = eLineWeight;
        } else {
            this.eLineWeight = this.lineWeight;
        }
        // (关闭)线条颜色透明度
        if (eLineOpacity) {
            this.eLineOpacity = eLineOpacity;
        } else {
            this.eLineOpacity = this.lineOpacity;
        }

        // 打开
        this.open = function(sLineColor, sLineWeight, sLineOpacity) {
            // (打开)线条颜色
            if (sLineColor) {
                this.sLineColor = changeColorType(sLineColor);
            }
            // (打开)线条粗细
            if (sLineWeight) {
                this.sLineWeight = sLineWeight;
            }
            // (打开)线条颜色透明度
            if (sLineOpacity) {
                this.sLineOpacity = sLineOpacity;
            }
            this.flashMap.openEditPath(this.name, this.sLineColor, this.sLineWeight, this.sLineOpacity);
        };
        // 关闭
        this.close = function(eLineColor, eLineWeight, eLineOpacity) {
            // (关闭)线条颜色
            if (eLineColor) {
                this.eLineColor = changeColorType(eLineColor);
            }
            // (关闭)线条粗细
            if (eLineWeight) {
                this.eLineWeight = eLineWeight;
            }
            // (关闭)线条颜色透明度
            if (eLineOpacity) {
                this.eLineOpacity = eLineOpacity;
            }
            var coordinates = this.flashMap.closeEditPath(this.name, this.eLineColor, this.eLineWeight, this.eLineOpacity);
            this.latlngs = coordinatesToLatlngs(coordinates);
        };

        this.createGraphics = function() {
            this.flashMap.createEditPath(this.name, this.latlngs, this.lineColor, this.lineWeight, this.lineOpacity);
        };
    };
    // 作面
    var Polygon = function(name, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        var type = "Polygon";
        BaseGraphics.call(this, name, type, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);

        this.createGraphics = function() {
            this.flashMap.createPolygon(this.name, this.latlngs, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
        };
    };
    // 编辑面
    var PolygonEdit = function(name, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity,
        sLineColor, sLineWeight, sLineOpacity, sFillColor, sFillOpacity, eLineColor, eLineWeight, eLineOpacity, eFillColor, eFillOpacity) {
        var type = "PolygonEdit";
        BaseGraphics.call(this, name, type, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);

        // (打开)线条颜色
        if (sLineColor) {
            this.sLineColor = changeColorType(sLineColor);
        } else {
            this.sLineColor = this.lineColor;
        }
        // (打开)线条粗细
        if (sLineWeight) {
            this.sLineWeight = sLineWeight;
        } else {
            this.sLineWeight = this.lineWeight;
        }
        // (打开)线条颜色透明度
        if (sLineOpacity) {
            this.sLineOpacity = sLineOpacity;
        } else {
            this.sLineOpacity = this.lineOpacity;
        }
        // (打开)填充颜色
        if (sFillColor) {
            this.sFillColor = changeColorType(sFillColor);
        } else {
            this.sFillColor = this.fillColor;
        }
        // (打开)填充颜色透明度
        if (sFillOpacity) {
            this.sFillOpacity = sFillOpacity;
        } else {
            this.sFillOpacity = this.fillOpacity;
        }

        // (关闭)线条颜色
        if (eLineColor) {
            this.eLineColor = changeColorType(eLineColor);
        } else {
            this.eLineColor = this.lineColor;
        }
        // (关闭)线条粗细
        if (eLineWeight) {
            this.eLineWeight = eLineWeight;
        } else {
            this.eLineWeight = this.lineWeight;
        }
        // (关闭)线条颜色透明度
        if (eLineOpacity) {
            this.eLineOpacity = eLineOpacity;
        } else {
            this.eLineOpacity = this.lineOpacity;
        }
        // (关闭)填充颜色
        if (eFillColor) {
            this.eFillColor = changeColorType(eFillColor);
        } else {
            this.eFillColor = this.fillColor;
        }
        // (关闭)填充颜色透明度
        if (eFillOpacity) {
            this.eFillOpacity = eFillOpacity;
        } else {
            this.eFillOpacity = this.fillOpacity;
        }

        // 打开
        this.open = function(sLineColor, sLineWeight, sLineOpacity, sFillColor, sFillOpacity) {
            // (打开)线条颜色
            if (sLineColor) {
                this.sLineColor = changeColorType(sLineColor);
            }
            // (打开)线条粗细
            if (sLineWeight) {
                this.sLineWeight = sLineWeight;
            }
            // (打开)线条颜色透明度
            if (sLineOpacity) {
                this.sLineOpacity = sLineOpacity;
            }
            // (打开)填充颜色
            if (sFillColor) {
                this.sFillColor = changeColorType(sFillColor);
            }
            // (打开)填充颜色透明度
            if (sFillOpacity) {
                this.sFillOpacity = sFillOpacity;
            }
            this.flashMap.openEditPolygon(this.name, this.sLineColor, this.sLineWeight, this.sLineOpacity, this.sFillColor, this.sFillOpacity);
        };
        // 关闭
        this.close = function(eLineColor, eLineWeight, eLineOpacity, eFillColor, eFillOpacity) {
            // (关闭)线条颜色
            if (eLineColor) {
                this.eLineColor = changeColorType(eLineColor);
            }
            // (关闭)线条粗细
            if (eLineWeight) {
                this.eLineWeight = eLineWeight;
            }
            // (关闭)线条颜色透明度
            if (eLineOpacity) {
                this.eLineOpacity = eLineOpacity;
            }
            // (关闭)填充颜色
            if (eFillColor) {
                this.eFillColor = changeColorType(eFillColor);
            }
            // (关闭)填充颜色透明度
            if (eFillOpacity) {
                this.eFillOpacity = eFillOpacity;
            }
            var coordinates = this.flashMap.closeEditPolygon(this.name, this.eLineColor, this.eLineWeight, this.eLineOpacity, this.eFillColor, this.eFillOpacity);
            var latlngs = coordinatesToLatlngs(coordinates);
            this.latlngs = latlngs;
        };

        this.createGraphics = function() {
            this.flashMap.createEditPolygon(this.name, this.latlngs, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
        };
    };

    // 作圆（latlngs为两个点的数组，第一个点为圆心，第二个点距圆心半径长度,即在圆弧上）
    var Circle = function(name, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        var type = "Circle";
        BaseGraphics.call(this, name, type, latlngs, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);

        this.createGraphics = function() {
            this.flashMap.createCircle(this.name, this.latlngs, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
        };
    };


    // 工具基类
    var BaseTool = function(name, type, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        // 线条颜色
        this.lineColor = lineColor ? changeColorType(lineColor) : changeColorType("#ff0000");
        // 线条粗细
        this.lineWeight = lineWeight ? lineWeight : 2;
        // 线条颜色透明度
        this.lineOpacity = lineOpacity ? lineOpacity : 0.8;
        // 填充颜色
        this.fillColor = fillColor ? changeColorType(fillColor) : changeColorType("#ffffff");
        // 填充颜色透明度
        this.fillOpacity = fillOpacity ? fillOpacity : 0.5;

        // 名称
        this.name = name;
        // 类型
        this.type = type;
        // 经纬度数组
        this.latlngs = new Array();
        // flash对象
        this.flashMap = null;
        this.setMaplet = function(flashMap) {
            this.flashMap = flashMap;
        };
        // 打开
        this.open = function() {
            this.flashMap.openTool(this.name);
        };
        // 关闭
        this.close = function() {
            this.flashMap.closeTool(this.name);
        };
        // 清除自己标记痕迹
        this.clearMark = function() {
            this.flashMap.clearToolMark(this.name);
        };

        this.setLatlng = function(coordinates) {
        };
        // 真正创建flash Tool对象 ，需要重写
        this.createTool = function() {
        };
        // 添加工具关闭监听，需要重写
        this.addToolCloseEvenListener = function(fun) {
        };
    };

    // 作点工具
    var PointTool = function(name, fillColor, fillOpacity) {
        var type = "PointTool";

        BaseTool.call(this, name, type, fillColor, fillOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createPointTool(this.name, this.fillColor, this.fillOpacity);
            this.addToolCloseEvenListener("");
        };
        this.addToolCloseEvenListener = function(fun) {
            this.flashMap.addPointToolCloseEvenListener(this.name, fun);
        };
    };

    // 作线工具
    var PathTool = function(name, lineColor, lineWeight, lineOpacity) {
        var type = "PathTool";

        BaseTool.call(this, name, type, lineColor, lineWeight, lineOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createPathTool(this.name, this.lineColor, this.lineWeight, this.lineOpacity);
            this.addToolCloseEvenListener("");
        };
        this.addToolCloseEvenListener = function(fun) {
            this.flashMap.addPathToolCloseEvenListener(this.name, fun);
        };
    };
    // 作面工具
    var PolygonTool = function(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        var type = "PolygonTool";

        BaseTool.call(this, name, type, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createPolygonTool(this.name, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
            this.addToolCloseEvenListener("");
        };
        this.addToolCloseEvenListener = function(fun) {
            this.flashMap.addPolygonToolCloseEvenListener(this.name, fun);
        };
    };
    // 作矩形工具 // latlngs(共两个点，0为第一下鼠标点击点，1为0的对角点)
    var RectTool = function(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        var type = "RectTool";

        BaseTool.call(this, name, type, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createRectTool(this.name, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
            this.addToolCloseEvenListener("");
        };
        this.addToolCloseEvenListener = function(fun) {
            this.flashMap.addRectToolCloseEvenListener(this.name, fun);
        };
    };
    // 作圆工具
    var CircleTool = function(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        var type = "CircleTool";

        BaseTool.call(this, name, type, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createCircleTool(this.name, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
            this.addCircleToolCloseEvenListener("");
        };
        this.addToolCloseEvenListener = function(fun) {
            this.flashMap.addCircleToolCloseEvenListener(this.name, fun);
        };
    };
    // 拉框放大
    var RectZoomInTool = function(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        var type = "RectZoomInTool";

        BaseTool.call(this, name, type, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createRectZoomInTool(this.name, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
        };
    };
    // 测距工具
    var DistanceTool = function(name, lineColor, lineWeight, lineOpacity) {
        var type = "DistanceTool";

        BaseTool.call(this, name, type, lineColor, lineWeight, lineOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createDistanceTool(this.name, this.lineColor, this.lineWeight, this.lineOpacity);
        };
        this.addToolCloseEvenListener = function(fun) {
            this.flashMap.addDistanceToolCloseEvenListener(this.name, fun);
        }
    };
    // 测面工具
    var AreaTool = function(name, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity) {
        var type = "AreaTool";

        BaseTool.call(this, name, type, lineColor, lineWeight, lineOpacity, fillColor, fillOpacity);
        this.setLatlng = function(coordinates) {
            this.latlngs = coordinatesToLatlngs(coordinates);
        };
        this.createTool = function() {
            this.flashMap.createAreaTool(this.name, this.lineColor, this.lineWeight, this.lineOpacity, this.fillColor, this.fillOpacity);
        };
        this.addToolCloseEvenListener = function(fun) {
            this.flashMap.addAreaToolCloseEvenListener(this.name, fun);
        }
    };

    // 工具管理
    var ToolManager = function() {
        // flash对象
        this.flashMap = null;
        this.setMaplet = function(flashMap) {
            this.flashMap = flashMap;
        };
        this.addBlueZoomBar = function() {
            this.flashMap.addBlueZoomBar();
        };

        // 添加工具
        this.addTool = function(tool) {
            tool.setMaplet(this.flashMap);
            tool.createTool();
            this.flashMap.addTool(tool.name);
        };
        //关闭所有工具
        this.closeAllTools = function() {
            this.flashMap.closeOtherTools();
        };

        //清除所有工具的Marker
        this.clearAllToolMarkers = function() {
            this.flashMap.clearOtherMarkers();
        };

        //添加全屏 place为json对象(left,top,right,bottom)
        this.addFullScreenButton = function(minImgUrl, maxImgUrl, place) {
            this.flashMap.addFullScreenButton(minImgUrl, maxImgUrl, place);
        }
        //移除全屏
        this.removeFullScreenButton = function() {
            this.flashMap.removeFullScreenButton();
        }

        //中心
        this.addCross = function() {
            this.flashMap.addCross();
        };

        //logo
        this.addCopyright = function() {
            this.flashMap.addCopyright();
        };

        //比例尺
        this.addImageScale = function() {
            this.flashMap.addImageScale();
        };

        //地图等级滚动条
        this.addZoomBar = function() {
            this.flashMap.addZoomBar();
        };

        //地图移动工具条
        this.addPan = function() {
            this.flashMap.addPan();
        };

        //地图鹰眼图
        this.addEagleMap = function() {
            this.flashMap.addEageleMap();
        };

        //向东平移
        this.moveEase = function() {
            this.flashMap.moveRight();
        };

        //向南平移
        this.moveSouth = function() {
            this.flashMap.moveBottom();
        };

        //向西平移
        this.moveWest = function() {
            this.flashMap.moveLeft();
        };

        //向北平移
        this.moveNorth = function() {
            this.flashMap.moveTop();
        };

        //停止移动
        this.stopMove = function() {
            this.flashMap.moveEnd();
        };

        //放大地图一个等级
        this.zoomIn = function() {
            var zoom = this.flashMap.getZoomLevel();
            this.flashMap.smoothZoomLevelWithoutEvents(zoom + 1);
        };

        //缩小地图一个等级
        this.zoomOut = function() {
            var zoom = this.flashMap.getZoomLevel();
            this.flashMap.smoothZoomLevelWithoutEvents(zoom - 1);
        };

    };

    var bulidContainer = function(containerId, width, height, lat, lng, zoom, mapname) {
        var objectId = containerId + "HCObj";
        var containerAry = new Array();
        containerAry.push('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="' + objectId + '" style="width:' + width + '; height:' + height + ';"');
        containerAry.push('codebase="http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab">');
        containerAry.push('<param name="movie" value="../../../../ResponsiveWebDesign_Web/TCL_carweb/source/js/' + HCMap.SeverUrl + '" />');
        containerAry.push('<param name="quality" value="high" />');
        containerAry.push('<param name="bgcolor" value="#fff" />');
        containerAry.push('<param name="FlashVars" value="lat=' + lat + '&lng=' + lng + '&level=' + zoom + '&maproot=' + HCMap.Maproot + '&minzoom=' + HCMap.MapMinZoom + '&maxzoom=' + HCMap.MapMaxZoom + '&mapname=' + mapname + '" />');
        containerAry.push('<param name="allowScriptAccess" value="always" />');
        containerAry.push('<param name="allowFullScreen" value="true" />');
        containerAry.push('<param name="wmode" value="opaque" />'); //div可在flash上

        containerAry.push('<embed id="' + objectId + 'FF" name="' + objectId + 'FF" src="' + HCMap.SeverUrl + '"');
        containerAry.push('quality="high" bgcolor="#fff" width="' + width + '" height="' + height + '" align="middle" play="true"');
        containerAry.push('loop="false" allowscriptaccess="always" type="application/x-shockwave-flash" FlashVars="lat=' + lat + '&lng=' + lng + '&level=' + zoom + '&maproot=' + HCMap.Maproot + '&minzoom=' + HCMap.MapMinZoom + '&maxzoom=' + HCMap.MapMaxZoom + '&mapname=' + mapname + '"');
        containerAry.push('pluginspage="http://www.adobe.com/go/getflashplayer" wmode="opaque" allowFullScreen="true"></embed>');

        containerAry.push('</object>');
        document.getElementById(containerId).innerHTML += containerAry.join("");

        if (navigator.appName.indexOf("Microsoft") != -1) {
            document.getElementById(objectId).style.height = height + "px";
            document.getElementById(objectId).style.width = width + "px";
            return document.getElementById(objectId);
        } else {
            document.getElementById(objectId + "FF").style.height = height + "px";
            document.getElementById(objectId + "FF").style.width = width + "px";
            return document.getElementById(objectId + "FF");
        }
    };

    // 图层
    var Layer = function(name, url) {
        // 名称
        this.name = name;
        // 类型
        this.type = "Layer";
        // 路径
        this.url = url;
        // flash对象
        this.flashMap = null;
        this.setMaplet = function(flashMap) {
            this.flashMap = flashMap;
        };
        // 创建
        this.createLayer = function() {
            this.flashMap.createLayer(this.name, this.url);
        };
        // 显示
        this.show = function() {
            this.flashMap.showLayer(this.name);
        };
        // 隐藏
        this.hide = function() {
            this.flashMap.hideLayer(this.name);
        };
    };

    // 地图
    var Map = function(containerId, width, height, lat, lng, zoom, name) {
        if (width && width >= 0) {
            this.width = width;
        } else {
            this.width = 600;
        }

        if (height && height >= 0) {
            this.height = height;
        } else {
            this.height = 400;
        }

        if (lat && lat >= 0) {
            this.lat = lat;
        } else {
            this.lat = 252498526;
        }

        if (lng && lng >= 0) {
            this.lng = lng;
        } else {
            this.lng = 42606225;
        }

        if (zoom && zoom >= 0) {
            this.zoom = zoom;
        } else {
            this.zoom = 9;
        }
        this.type = "Map";
        this.name = name;

        // 是否加载完成
        this.isMapLoaded = false;
        // 设置加载完成后，运行的方法
        this.initComplete = function() { };
        this.setInitComplete = function(fun) {
            this.initComplete = fun;
        };

        var flashMap = bulidContainer(containerId, this.width, this.height, this.lat, this.lng, this.zoom, this.name);


        //地图还原到初始状态
        this.reset = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.reset();
        };

        //显示地图
        this.show = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.show();
        };

        //隐藏地图
        this.hide = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.hide();
        };

        //获取地图中心点
        this.getCenter = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            var coordinate = flashMap.getCenter();
            var latlng = coordinateToLatlng(coordinate);
            return latlng;
        };

        //设置地图中心点
        this.setCenter = function(lat, lng) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.setCenter(lat, lng);
        };

        //获取当前地图等级
        this.getZoomLevel = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            var zoom = flashMap.getZoomLevel();
            return zoom;
        };

        //获取当前地图最大等级
        this.getMaxZoomLevel = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            var zoom = flashMap.getMaxZoomLevel();
            return zoom;
        };

        //设置当前地图等级
        this.setZoomLevel = function(zoom) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.setZoomLevel(zoom);
        };

        //设置最大等级
        this.setMaxZoomLevel = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            var zoom = flashMap.getMaxZoomLevel();
            flashMap.setZoomLevel(zoom);
        };

        //不激发事件设置地图等级
        this.setZoomLevelWithoutEvents = function(zoom) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.setZoomLevelWithoutEvents(zoom);
        };

        //动态设置地图等级
        this.smoothZoomLevel = function(zoom) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.smoothZoomLevel(zoom);
        };

        //不激发事件动态设置地图等级
        this.smoothZoomLevelWithoutEvents = function(zoom) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.smoothZoomLevel(zoom);
        };

        //移动地图
        this.smoothMove = function(lat, lng) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.smoothMove(lat, lng);
        };

        //移动地图,isZoom是否先缩放到合适等级再移动
        this.smoothCenterMove = function(lat, lng, isZoom) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.smoothCenterMove(lat, lng, isZoom);
        };

        //移动地图不激发事件
        this.smoothMoveWithoutEvents = function(lat, lng) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.smoothMoveWithoutEvents(lat, lng);
        };

        //移动地图，并设置等级
        this.smoothZoomMove = function(lat, lng, zoom) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.smoothZoomMove(lat, lng, zoom);
        };

        //移动地图，并设置等级，不激发事件
        this.smoothZoomMoveWithoutEvents = function(lat, lng, zoom) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.smoothZoomMoveWithoutEvents(lat, lng, zoom);
        };

        //重设地图宽高
        this.resize = function(width, height) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            if (width && width >= 0 && height && height >= 0) {
                this.width = width;
                this.height = height;
                flashMap.setSize(width, height);
                flashMap.style.width = width + "px";
                flashMap.style.height = height + "px";
            }
        };
        //获取地图类型
        this.getMapType = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            return flashMap.getMapType();
        };

        //设置地图类型
        this.setMapType = function(type) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            flashMap.setMapType(type);
        };
        //        this.moveTocCenter = function(lat,lng, url) {///////////////////////////////////////////////////////////////////////////
        //            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
        //                return null;
        //            }
        //            flashMap.moveTocCenter(lat,lng, url);
        //        };
        //        this.removeCenterImg = function() {
        //            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
        //                return null;
        //            }
        //            flashMap.removeCenterImg();
        //        };

        //得到地图边框经纬度
        this.getBounds = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            var bounds = flashMap.getMapBounds();
            var rBounds = new Object();
            var rightTop = new Object();
            var leftBottom = new Object();
            leftTop = coordinateToLatlng(bounds.LeftTop);
            rightBottom = coordinateToLatlng(bounds.RightBottom);
            rBounds.rightTop = leftTop;
            rBounds.leftBottom = rightBottom;
            return rBounds;
        };

        //经纬度转为left top
        this.getPixel = function(lat, lng) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            var leftTop = flashMap.toCoordinate(lng, lat);
            var rLeftTop = new Object();
            rLeftTop.left = leftTop.x;
            rLeftTop.top = leftTop.y;
            return rLeftTop;
        };

        //left top转为经纬度
        this.getLatLng = function(left, top) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            var coordinate = flashMap.toLatLng(left, top);
            var latlng = coordinateToLatlng(coordinate);
            return latlng;
        };

        //通过经纬度数组设置地图合适边框
        this.setMaxBoundsByLatLngs = function(latlngs) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            latlngs = inputToLatlngs(latlngs);
            flashMap.setMaxBoundsByLatLngs(latlngs);
        };

        //刷新地图
        this.refresh = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.showMarkers();
            flashMap.showStaticMarkers();
            flashMap.showPathMarkers();
            flashMap.showStaticPathMarkers();
        };

        //刷新动态标注
        this.refreshMarkers = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.showMarkers();
        };

        //刷新静态标注
        this.refreshStaticMarkers = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.showStaticMarkers();
        };

        //刷新动态图形
        this.refreshGraphics = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.showPathMarkers();
        };

        //刷新静态图形
        this.refreshStaticGraphics = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.showStaticPathMarkers();
        };

        //隐藏所有标注
        this.hideAllMarkers = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.hideMarkers();
            flashMap.hideStaticMarkers();
            flashMap.hidePathMarkers();
            flashMap.hideStaticPathMarkers();
        };

        //隐藏动态标注
        this.hideMarkers = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.hideMarkers();
        };

        //隐藏静态标注
        this.hideStaticMarkers = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.hideStaticMarkers();
        };

        //隐藏动态图形
        this.hideGraphics = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.hidePathMarkers();
        };

        //隐藏动态图形
        this.hideStaticGraphics = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.hideStaticPathMarkers();
        };

        //移除所有标注
        this.clearAll = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.clearMarkers();
            flashMap.clearStaticMarkers();
            flashMap.clearPathMarkers();
            flashMap.clearStaticPathMarkers();
        };

        //移除动态标注
        this.clearMarkers = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.clearMarkers();
        };

        //移除静态标注
        this.clearStaticMarkers = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.clearStaticMarkers();
        };

        //移除动态图形（清除地图上的Graphics标记，并不是讲Graphics对象移除地图）
        this.clearGraphics = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.clearPathMarkers();
        };

        //移除静态图形（清除地图上的Graphics标记，并不是讲Graphics对象移除地图）
        this.clearStaticGraphics = function() {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.clearStaticPathMarkers();
        };

        //是否开启键盘控制地图
        this.keyboardControl = function(isTrue) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.keyboardControl(isTrue);
        };

        //是否开启鼠标双击控制地图
        this.doubleClickMoveEnabled = function(isTrue) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.doubleClickMoveEnabled(isTrue);
        };

        //是否开启鼠标滚轮控制地图
        this.mapsMouseWheelEnabled = function(isTrue) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.mapsMouseWheelEnabled(isTrue);
        };

        //是否开启地图当当前等级不存在时自动回退一个等级
        this.isAdjustMaxZoomLevel = function(isTrue) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.isAdjustMaxZoomLevel(isTrue);
        };

        //是否开启鼠标拖动地图
        this.mapsDragEnabled = function(isTrue) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.mapsDragEnabled(isTrue);
        };

        //通过经纬度集合，返回最适合的等级与中心点
        this.getAppropriateZoomCenter = function(latlngs) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            latlngs = inputToLatlngs(latlngs);
            var retObj = flashMap.getAppropriateZoomCenter(latlngs);
            var cetrerObj = new Object();
            if (retObj) {
                var latlng = coordinateToLatlng(retObj.CenterLatLng);
                cetrerObj.lng = latlng.lng;
                cetrerObj.lat = latlng.lat;
                cetrerObj.zoom = retObj.ZoomLevel;
            }
            else {
                cetrerObj = null;
            }
            return cetrerObj;
        };

        //通过经纬度集合，返回最适合的最小等级
        this.getAppropriateMaxZoomLevel = function(latlngs) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return null;
            }
            latlngs = inputToLatlngs(latlngs);
            return flashMap.getAppropriateMaxZoomLevel(latlngs);
        };

        //返回鼠标x坐标
        this.getMouseX = function() {
            return flashMap.getMouseX();
        };

        //返回鼠标y坐标
        this.getMouseY = function() {
            return flashMap.getMouseY();
        };


        // 添加静态Marker
        this.addStaticMarker = function(marker) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            marker.setMaplet(flashMap);
            marker.createMarker();
            flashMap.addStaticMarker(marker.name);
        };
        // 添加动态Marker
        this.addMarker = function(marker) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            marker.setMaplet(flashMap);
            marker.createMarker();
            flashMap.addMarker(marker.name);
        };
        // 移除静态Marker
        this.removeStaticMarker = function(marker) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.removeStaticMarker(marker.name);
        };
        // 移除动态Marker
        this.removeMarker = function(marker) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.removeMarker(marker.name);
        };


        // 将Marker添加到 工具静态层
        this.addMarkerToToolStage = function(marker) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            marker.setMaplet(flashMap);
            marker.createMarker();
            flashMap.addMarkerToToolStage(marker.name);
        };
        // 从工具静态层 移除Marker
        this.removeMarkerToToolStage = function(marker) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.removeMarkerToToolStage(marker.name);
        };

        // 添加静态Graphics
        this.addStaticGraphics = function(graphics) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            graphics.setMaplet(flashMap);
            graphics.createGraphics();
            flashMap.addStaticPathMarker(graphics.name);
        };
        // 添加动态Graphics
        this.addGraphics = function(graphics) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            graphics.setMaplet(flashMap);
            graphics.createGraphics();
            flashMap.addPathMarker(graphics.name);
        };
        // 移除静态Graphics
        this.removeStaticGraphics = function(graphics) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.removeStaticPathMarker(graphics.name);
        };
        // 移除动态Graphics
        this.removeGraphics = function(graphics) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.removePathMarkers(graphics.name);
        };

        // 添加图层
        this.addLayer = function(layer) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            layer.setMaplet(flashMap);
            layer.createLayer();
            flashMap.addLayer(layer.name);
        };
        // 移除图层
        this.removeLayer = function(layer) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            flashMap.removeLayer(layer.name);
        };

        // 添加工具管理者
        this.addToolManager = function(toolMgr) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            toolMgr.setMaplet(flashMap);
            flashMap.addToolManager(toolMgr.name);
        };
        // 添加地图监听
        this.addMapEventListener = function(mapEvenListener) {
            if (!HCMap.RMapEventListener.CheckMapIsload(this.name)) {
                return;
            }
            mapEvenListener.setMaplet(flashMap);
        };

    };

    //地图监听对象
    var MapEventListener = function(name) {
        this.name = name;
        this.type = "MapEventListener";
        this.flashMap = null;
        this.setMaplet = function(flashMap) {
            this.flashMap = flashMap;
        };

        //地图等级开始改变
        this.addZoomLevelChangeEvent = function(callBackFun) {
            this.flashMap.addZoomLevelChangeEvent(callBackFun);
        };
        this.removeZoomLevelChangeEvent = function() {
            this.flashMap.removeZoomLevelChangeEvent();
        };
        //地图等级正在改变
        this.addZoomLevelChangingEvent = function(callBackFun) {
            this.flashMap.addZoomLevelChangingEvent(callBackFun);
        };
        this.removeZoomLevelChangingEvent = function() {
            this.flashMap.removeZoomLevelChangingEvent();
        };
        //地图等级改变完
        this.addZoomLevelChangedEvent = function(callBackFun) {
            this.flashMap.addZoomLevelChangedEvent(callBackFun);
        };
        this.removeZoomLevelChangedEvent = function() {
            this.flashMap.removeZoomLevelChangedEvent();
        };

        //地图中心点正在改变
        this.addMapCenterChangeEvent = function(callBackFun) {
            this.flashMap.addMapCenterChangeEvent(callBackFun);
        };
        this.removeMapCenterChangeEvent = function() {
            this.flashMap.removeMapCenterChangeEvent();
        };
        //地图中心正在改变
        this.addMapCenterChangingEvent = function(callBackFun) {
            this.flashMap.addMapCenterChangingEvent(callBackFun);
        };
        this.removeMapCenterChangingEvent = function() {
            this.flashMap.removeMapCenterChangingEvent();
        };
        //地图中心点改变完
        this.addMapCenterChangedEvent = function(callBackFun) {
            this.flashMap.addMapCenterChangedEvent(callBackFun);
        };
        this.removeMapCenterChangedEvent = function() {
            this.flashMap.removeMapCenterChangedEvent();
        };

        //地图大小改变
        this.addMapSizeChangedEvent = function(callBackFun) {
            this.flashMap.addMapSizeChangedEvent(callBackFun);
        };
        this.removeMapSizeChangedEvent = function() {
            this.flashMap.removeMapSizeChangedEvent();
        };

        //地图类别改变
        this.addMapTypeChangedEvent = function(callBackFun) {
            this.flashMap.addMapTypeChangedEvent(callBackFun);
        };
        this.removeMapTypeChangedEvent = function() {
            this.flashMap.removeMapTypeChangedEvent();
        };

        //鼠标双击
        this.addMapMouseDoubleClickEvent = function(callBackFun) {
            this.flashMap.addMapMouseDoubleClickEvent(callBackFun);
        };
        this.removeMapDoubleClickEvent = function() {
            this.flashMap.removeMapMouseDoubleClickEvent();
        };

        //鼠标单击
        this.addMapMouseClickEvent = function(callBackFun) {
            this.flashMap.addMapMouseClickEvent(callBackFun);
        };
        this.removeMapClickEvent = function() {
            this.flashMap.removeMapMouseClickEvent();
        };

        //鼠标移动
        this.addMapMouseMoveEvent = function(callBackFun) {
            this.flashMap.addMapMouseMoveEvent(callBackFun);
        };
        this.removeMapMouseMoveEvent = function() {
            this.flashMap.removeMapMouseMoveEvent();
        };

        //鼠标按下
        this.addMapMouseDownEvent = function(callBackFun) {
            this.flashMap.addMapMouseDownEvent(callBackFun);
        };
        this.removeMapMouseDownEvent = function() {
            this.flashMap.removeMapMouseDownEvent();
        };

        //鼠标弹起
        this.addMapMouseUpEvent = function(callBackFun) {
            this.flashMap.addMapMouseUpEvent(callBackFun);
        };
        this.removeMapMouseUpEvent = function() {
            this.flashMap.removeMapMouseUpEvent();
        };
        // 添加点击图层事件监听
        this.addLayerClickEvent = function(callBackFun) {
            this.flashMap.addLayerClickEvent(callBackFun);
        };
        // 移除点击图层事件监听
        this.removeLayerClickEvent = function() {
            this.flashMap.removeLayerClickEvent();
        };
    };

    //全局回调函数
    HCMap.RMapEventListener = {
        // 检测是否加载完成
        CheckMapIsload: function(mapname) {
            if (!HCMap.ObjectAry[mapname].isMapLoaded) {
//                alert("请等地图加载完成后再使用");
                return false;
            } else {
                return true;
            }
        },

        // 加载完成
        RunRMapLaterFun: function(mapname) {
            HCMap.ObjectAry[mapname].isMapLoaded = true;
            HCMap.ObjectAry[mapname].initComplete();
        },

        //等级开始改变
        zoomLevelChange: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },
        //等级正在改变
        zoomLevelChanging: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },
        //等级改变完
        zoomLevelChanged: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //中心点开始改变
        mapCenterChange: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },
        //中心点正在改变
        mapCenterChanging: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },
        //中心点改变完
        mapCenterChanged: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //地图大小改变
        mapSizeChanged: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //地图类别改变
        mapTypeChanged: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //鼠标双击
        mapMouseDoubleClick: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //鼠标单击
        mapMouseClick: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //鼠标移动
        mapMouseMove: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //鼠标按下
        mapMouseDown: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        //鼠标弹起
        mapMosueUp: function(callBackFun, mapname) {
            eval(callBackFun + "()");
        },

        // 工具关闭
        onToolCloseEvent: function(callBackFun, name, coordinates) {
            if (coordinates) {
                HCMap.ObjectAry[name].setLatlng(coordinates);
            }
            if (callBackFun) {
                eval(callBackFun + "()");
            }
        },
        // 图形事件回调
        GraphicsEvent: function(callBackFun, name) {
            eval(callBackFun + "('" + name + "')");
        },
        // Marker事情监听
        MarkerEvent: function(callBackFun, name) {
            eval(callBackFun + "('" + name + "')");
        },
        // 图层事件回调
        LayerEvent: function(callBackFun, idStr) {
            eval(callBackFun + "('" + idStr + "')");
        },
        //气球标注回调操作type: 1.从这里出发 2.到那里去 3周边.
        RBalloonFunction: function(callBackFun, type, poiObj) {
            eval(callBackFun + "('" + type + "','" + poiObj.cityid + "','" + poiObj.cityname + "','" + poiObj.label + "','" + poiObj.lat + "','" + poiObj.lng + "')");
        }


    };

    window.HCMap = window.$M = HCMap;

})();
