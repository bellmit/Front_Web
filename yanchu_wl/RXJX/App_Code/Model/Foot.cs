using System;

namespace CSYC.Model
{
    /// <summary>
    /// Foot 的摘要说明
    /// </summary>
    public class Foot
    {
        public Foot()
        { }
        #region Model
        private int _id;
        private string _gsm;
        private string _footc;
        private DateTime _addtime;
        public int ID 
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 公司名称
        /// </summary>
        public string Gsm 
        {
            set { _gsm = value; }
            get { return _gsm; }
        }
        /// <summary>
        /// 网站底部
        /// </summary>
        public string Footc 
        {
            set { _footc = value; }
            get { return _footc; }
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