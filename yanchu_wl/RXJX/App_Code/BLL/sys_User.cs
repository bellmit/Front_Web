using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
using CSYC.Common;

namespace CSYC.BLL
{
    /// <summary>
    /// sys_User 的摘要说明
    /// </summary>
    public class sys_User
    {
        private readonly CSYC.DAL.sys_User dal = new CSYC.DAL.sys_User();
        public sys_User()
        { }
        #region  成员方法

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string UserName)
        {
            return dal.Exists(UserName);
        }
        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.sys_User model)
        {
            return dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.sys_User model)
        {
            return dal.Update(model);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public int Delete(int ID)
        {

            return dal.Delete(ID);
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public CSYC.Model.sys_User GetModel(int ID)
        {

            return dal.GetModel(ID);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            return dal.GetList(strWhere);
        }

        /// <summary>
        /// 检查登录是否成功
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="UserPassword"></param>
        /// <returns></returns>
        public bool chkAdminLogin(string userName, string UserPassword)
        {
            return dal.chkAdminLoign(userName, DESEncrypt.Encrypt(UserPassword));
        }


        #endregion  成员方法
    }
}