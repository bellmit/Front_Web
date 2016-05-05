using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// 业务逻辑类News 的摘要说明。
	/// </summary>
	public class News
	{
        private readonly CSYC.DAL.News dal = new CSYC.DAL.News();
		public News()
		{}
		#region  成员方法

		/// <summary>
		/// 增加一条数据
		/// </summary>
        public int Add(CSYC.Model.News model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
        public int Update(CSYC.Model.News model)
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
        public CSYC.Model.News GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
        public DataSet GetList(int TypeID, int ProductType, int Count, int IsHome)
		{
            return dal.GetList(TypeID,ProductType, Count, IsHome);
		}

        /// <summary>
        /// 上一页
        /// </summary>
        /// <returns></returns>
        public DataSet GetS(int ID)
        {
            return dal.GetS(ID);
        }

        /// <summary>
        /// 下一页
        /// </summary>
        /// <returns></returns>
        public DataSet GetX(int ID)
        {
            return dal.GetX(ID);
        }

        /// <summary>
        /// 按ID获取总条数
        /// </summary>
        /// <param name="TypeID"></param>
        /// <returns></returns>
        public int GetCount(int TypeID) 
        {
            return dal.GetCount(TypeID);
        }

        /// <summary>
        /// 点击次数
        /// </summary>
        public int viewhit(int ID) 
        {
            return dal.viewhit(ID);
        }
        /// <summary>
        /// 按条件查询文章列表
        /// </summary>
        public DataSet GetList(int current, int count, int TypeID)
        {
            return dal.GetList(current, count, TypeID);
        }
		#endregion  成员方法
	}
}

