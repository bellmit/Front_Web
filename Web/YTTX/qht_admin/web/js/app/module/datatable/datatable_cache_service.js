/*表格服务*/
'use strict';
angular.module('app')
	.service('dataTableCacheService',function () {
		var self=this;

		/*table缓存*/
		this.tableCache={};
		/*更新缓存*/
		this.setCache=function (key,cache,flag) {
			if(!cache){
				return false;
			}
			var tempcache=self.getCache(key);
			if(tempcache!==null){
				self.tableCache[key]=$.extend({},tempcache,cache);
			}else{
				self.tableCache[key]=$.extend({},cache);
			}
			if(flag){
				/*是否销毁缓存*/
				cache=null;
			}
		};
		/*获取缓存*/
		this.getCache=function (key) {
			if(!key){
				return null;
			}
			if(self.isKey(key)){
				return self.tableCache[key];
			}else{
				return null;
			}
		};
		/*设置表格*/
		this.setTable=function (key,table) {
			if(!key && !table){
				return false;
			}
			if(self.isKey(key)){
				self.tableCache[key]['tablecache']=table;
			}else{
				self.tableCache[key]={};
				self.tableCache[key]['tablecache']=table;
			}
		};
		/*获取表格*/
		this.getTable=function (key) {
			if(!key){
				return null;
			}
			if(self.isKey(key)){
				if(self.tableCache[key]['tablecache']){
					return self.tableCache[key]['tablecache'];
				}else{
					return null;
				}
			}else{
				return null;
			}
		};
		/*获取某一个属性值*/
		this.getAttr=function (key,str) {
			if(!key){
				return null;
			}
			if(self.isKey(key)){
				if(self.isAttr(key,str)){
					return self.tableCache[key][str];
				}
				return null;
			}else{
				return null;
			}
		};
		/*设置某一个属性值*/
		this.setAttr=function (key,str,cache) {
			if(!key){
				return false;
			}
			if(self.isKey(key)){
				self.tableCache[key][str]=cache;
			}
		};
		/*覆盖某个索引*/
		this.setKey=function (key,cache,flag) {
			if(!key && !cache){
				return false;
			}
			self.tableCache[key]=$.extend({},cache);
			if(flag){
				/*是否销毁缓存*/
				cache=null;
			}
		};
		/*判断是否存索引*/
		this.isKey=function (key) {
			if(typeof self.tableCache[key]==='undefined'){
				return false;
			}else{
				return true;
			}
		};
		/*是否存在缓存标识,一般是搭配是否存在索引一起使用*/
		this.isAttr=function (key,str) {
			if(typeof str!=='undefined'){
				if(typeof self.tableCache[key][str]==='undefined'){
					return false;
				}else{
					if(self.tableCache[key][str]===true){
						return true;
					}else if(self.tableCache[key][str]===false || self.tableCache[key][str]===null){
						return false;
					}
					return true;
				}
			}
			return false;
		};
	});
