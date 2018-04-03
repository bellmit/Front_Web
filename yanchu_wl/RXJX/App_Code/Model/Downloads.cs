using System;

namespace CSYC.Model
{
    /// <summary>
    /// Downloads 的摘要说明
    /// </summary>
    public class Downloads
    {
        public Downloads()
        { }
        #region Model
        private int _id;
        private string _title;
        private string _durl;
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
        /// 上传文件标题
        /// </summary>
        public string Title 
        {
            set { _title = value; }
            get { return _title; }
        }
        /// <summary>
        /// 上传的路径
        /// </summary>
        public string Durl 
        {
            set { _durl = value; }
            get { return _durl; }
        }
        /// <summary>
        /// 上传的时间
        /// </summary>
        public DateTime AddTime 
        {
            set { _addtime = value; }
            get { return _addtime; }
        }
        #endregion Model
    }
}