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
    /// TopImg 的摘要说明
    /// </summary>
    public class TopImg
    {
        public TopImg()
        { }
        #region Model
        private int _id;
        private string _topname;
        private string _topurl;
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
        /// 图片名字
        /// </summary>
        public string Topname 
        {
            set { _topname = value; }
            get { return _topname; }
        }
        /// <summary>
        /// 图片路径
        /// </summary>
        public string TopUrl 
        {
            set { _topurl = value; }
            get { return _topurl; }
        }
        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime Addtime 
        {
            set { _addtime = value; }
            get { return _addtime; }
        }
        #endregion Model
    }
}