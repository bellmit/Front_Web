using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace CSYC.Model
{
    /// <summary>
    /// Link 的摘要说明
    /// </summary>
    public class Link
    {
        public Link()
        { }
        #region Model
        private int _id;
        private string _linkname;
        private string _linkurl;
        private DateTime _addtime;
        /// <summary>
        /// 自增ID
        /// </summary>
        public int ID 
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 链接名称
        /// </summary>
        public string LinkName 
        {
            set { _linkname = value; }
            get { return _linkname; }
        }
        /// <summary>
        /// 链接路径
        /// </summary>
        public string LinkUrl 
        {
            set { _linkurl = value; }
            get { return _linkurl; }
        }
        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddTime
        {
            set { _addtime = value; }
            get { return _addtime; }
        }
        #endregion Model
    }
}