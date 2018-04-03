using System;

namespace CSYC.Model
{
    /// <summary>
    ///实体类sys_User 。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    public class sys_User
    {
        public sys_User()
        { }
        #region Model
        private int _id;
        private string _userName;
        private string _userPassword;
        private DateTime _sys_date;
        /// <summary>
        /// 自增ID
        /// </summary>
        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }
        /// <summary>
        /// 管理员帐号
        /// </summary>
        public string UserName
        {
            get { return _userName; }
            set { _userName = value; }
        }
        /// <summary>
        /// 管理员密码
        /// </summary>
        public string UserPassword
        {
            get { return _userPassword; }
            set { _userPassword = value; }
        }
        /// <summary>
        /// 申请时间
        /// </summary>
        public DateTime Sys_date
        {
            get { return _sys_date; }
            set { _sys_date = value; }
        }
        #endregion Model
    }
}