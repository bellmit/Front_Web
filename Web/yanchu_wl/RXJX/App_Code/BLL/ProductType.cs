using System;
using System.Data;
using System.Collections.Generic;
using CSYC.Model;
namespace CSYC.BLL
{
	/// <summary>
	/// 业务逻辑类ProductType 的摘要说明。
	/// </summary>
	public class ProductType
	{
        private readonly CSYC.DAL.ProductType dal = new CSYC.DAL.ProductType();
		public ProductType()
		{}
		#region  成员方法

        public int Exists(string TypeName, out int TypeID)
        {
            return dal.Exists(TypeName, out TypeID);
        }
		/// <summary>
		/// 增加一条数据
		/// </summary>
        public int Add(CSYC.Model.ProductType model)
		{
			return dal.Add(model);
		}

		/// <summary>
		/// 更新一条数据
		/// </summary>
        public int Update(CSYC.Model.ProductType model)
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
        public CSYC.Model.ProductType GetModel(int ID)
		{
			
			return dal.GetModel(ID);
		}
		/// <summary>
		/// 获得数据列表
		/// </summary>
        public DataSet GetList(string key, int TypeID, int selectTpye, out int records)
		{
			return dal.GetList(key, TypeID,  selectTpye, out  records);
		}
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(int TypeID)
        {
            return dal.GetList(TypeID);
        }

        public int GetListC(int TypeID) 
        {
            return dal.GetListC(TypeID);
        }


		#endregion  成员方法
	}
}

