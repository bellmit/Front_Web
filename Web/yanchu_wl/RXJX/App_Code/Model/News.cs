using System;
namespace CSYC.Model
{
    /// <summary>
    /// 实体类News 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class News
    {
        public News()
        { }
        #region Model
        private int _id;
        private int _typeid;
        private int _userid;
        private string _title;
        private string _linkurl;
        private DateTime _createtime;
        private string _picurl;
        private string _contents;
        private string _source;
        private int _viewcount;
        private int _ishome;
        /// <summary>
        /// 编号
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 类别编号
        /// </summary>
        public int TypeID
        {
            set { _typeid = value; }
            get { return _typeid; }
        }
        /// <summary>
        /// 用户编号
        /// </summary>
        public int UserID
        {
            set { _userid = value; }
            get { return _userid; }
        }
        /// <summary>
        /// 新闻标题
        /// </summary>
        public string Title
        {
            set { _title = value; }
            get { return _title; }
        }
        /// <summary>
        /// 标题链接路径
        /// </summary>
        public string LinkUrl
        {
            set { _linkurl = value; }
            get { return _linkurl; }
        }
        /// <summary>
        /// 新闻添加时间
        /// </summary>
        public DateTime CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        /// <summary>
        /// 图片URl
        /// </summary>
        public string PicUrl
        {
            set { _picurl = value; }
            get { return _picurl; }
        }
        /// <summary>
        /// 新闻内容
        /// </summary>
        public string Contents
        {
            set { _contents = value; }
            get { return _contents; }
        }
        /// <summary>
        /// 来源
        /// </summary>
        public string Source
        {
            set { _source = value; }
            get { return _source; }
        }
        /// <summary>
        /// 浏览次数
        /// </summary>
        public int ViewCount
        {
            set { _viewcount = value; }
            get { return _viewcount; }
        }
        public int IsHome
        {
            set { _ishome = value; }
            get { return _ishome; }
        }
        #endregion Model

    }
}

