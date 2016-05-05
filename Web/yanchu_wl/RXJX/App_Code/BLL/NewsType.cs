using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// 业务逻辑类NewsType 的摘要说明。
	/// </summary>
	public class NewsType
	{
        private readonly CSYC.DAL.NewsType dal = new CSYC.DAL.NewsType();
		public NewsType()
		{}
		#region  成员方法

		/// <summary>
		/// 增加一条数据
		/// </summary>
        public int Add(CSYC.Model.NewsType model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
        public int Update(CSYC.Model.NewsType model)
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
        public CSYC.Model.NewsType GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
        public DataSet GetList(int TypeID)
		{
			return dal.GetList(TypeID);
		}
        public DataSet GetList()
        {
            return dal.GetList();
        }

        public int GetListC(int TypeID) 
        {
            return dal.GetListC(TypeID);
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

