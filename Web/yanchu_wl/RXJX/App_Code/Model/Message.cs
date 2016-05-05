using System;

namespace CSYC.Model
{
    /// <summary>
    /// Message 的摘要说明
    /// </summary>
    public class Message
    {
        public Message()
        {}
        #region Model
        private int _id;
        private string _username;
        private string _usertel;
        private string _useremail;
        private string _cname;
        private string _cadress;
        private string _contents;
        private DateTime _addtime;
        private int _ischeck;
        private string _recontent;
        /// <summary>
        /// 
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserName
        {
            set { _username = value; }
            get { return _username; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserTel
        {
            set { _usertel = value; }
            get { return _usertel; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string UserEmail
        {
            set { _useremail = value; }
            get { return _useremail; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Cname
        {
            set { _cname = value; }
            get { return _cname; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Cadress
        {
            set { _cadress = value; }
            get { return _cadress; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Contents
        {
            set { _contents = value; }
            get { return _contents; }
        }


        public DateTime AddTime
        {
            set { _addtime = value; }
            get { return _addtime; }
        }
        public int IsCheck
        {
            set { _ischeck = value; }
            get { return _ischeck; }
        }

        public string ReContents
        {
            set { _recontent = value; }
            get { return _recontent; }
        }
        #endregion Model
    }
}