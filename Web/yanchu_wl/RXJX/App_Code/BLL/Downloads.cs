using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;

namespace CSYC.BLL
{
    /// <summary>
    /// Downloads 的摘要说明
    /// </summary>
    public class Downloads
    {
        private readonly CSYC.DAL.Downloads dal = new CSYC.DAL.Downloads();
        public Downloads()
        {}
        #region  成员方法

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.Downloads model)
        {
            return dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Downloads model)
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
        public CSYC.Model.Downloads GetModel(int ID)
        {

            return dal.GetModel(ID);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(int Count)
        {
            return dal.GetList(Count);
        }
        #endregion  成员方法
    }
}