using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
    /// <summary>
    /// Message 的摘要说明
    /// </summary>
    public class Message
    {
        private readonly CSYC.DAL.Message dal = new CSYC.DAL.Message();
        public Message()
        {}
        #region  成员方法

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.Message model)
        {
            return dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Message model)
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
        public CSYC.Model.Message GetModel(int ID)
        {

            return dal.GetModel(ID);
        }



        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(int Swhere)
        {
            return dal.GetList(Swhere);
        }


        /// <summary>
        /// 获得数据列表
        /// </summary>
        //public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        //{
        //return dal.GetList(PageSize,PageIndex,strWhere);
        //}

        #endregion  成员方法
    }
}