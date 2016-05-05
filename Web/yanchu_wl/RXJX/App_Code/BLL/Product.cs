using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// 业务逻辑类Product 的摘要说明。
	/// </summary>
	public class Product
	{
        private readonly CSYC.DAL.Product dal = new CSYC.DAL.Product();
		public Product()
		{}
		#region  成员方法
		/// <summary>
		/// 增加一条数据
		/// </summary>
        public int Add(CSYC.Model.Product model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
        public int Update(CSYC.Model.Product model)
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
        public CSYC.Model.Product GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}

			/// <summary>
		/// 获得数据列表
		/// </summary>
        public DataSet GetList(int TypeID, int ProductType, int Count, int IsShow)
		{
            return dal.GetList(TypeID, ProductType, Count, IsShow);
		}
        public DataSet GetList()
        {
            return dal.GetList();
        }
        public DataSet GetListC(int count)
        {
            return dal.GetListC(count);
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
        /// 按条件查询图片列表
        /// </summary>
        public DataSet GetList(int current, int count, int TypeID)
        {
            return dal.GetList(current, count, TypeID);
        }
		#endregion  成员方法
	}
}

