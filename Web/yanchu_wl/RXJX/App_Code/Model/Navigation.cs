using System;

namespace CSYC.Model
{
    /// <summary>
    /// Navigation 的摘要说明
    /// </summary>
    public class Navigation
    {
        public Navigation()
        { }
        #region Model
        private int _id;
        private string _nname;
        private string _nurl;
        private int _pid;
        /// <summary>
        /// 自增ID
        /// </summary>
        public int ID 
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 导航名字
        /// </summary>
        public string Nname 
        {
            set { _nname = value; }
            get { return _nname; }
        }
        /// <summary>
        /// 导航路径
        /// </summary>
        public string Nurl 
        {
            set { _nurl = value; }
            get { return _nurl; }
        }
        public int Pid 
        {
            set { _pid = value; }
            get { return _pid; }
        }
        #endregion Model
    }
}