using System;
using System.Data;
using System.Text;
using System.Data.OleDb;
using CSYC.Model;//请先添加引用
using CSYC.Oledb;

namespace CSYC.DAL
{
	/// <summary>
	/// 数据访问类ProductType。
	/// </summary>
	public class ProductType
	{
		public ProductType()
		{}
		#region  成员方法

        public int Exists(string TypeName, out int TypeID)
        {
            StringBuilder strSql = new StringBuilder();
            StringBuilder strSql2 = new StringBuilder();
            strSql.Append("select count(1) from ProductType");
            strSql.Append(" where TypeName=@TypeName ");
            strSql2.Append("select ID from ProductType");
            strSql2.Append(" where TypeName=@TypeName ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeName", OleDbType.VarChar,20)};
            parameters[0].Value = TypeName;
            DataSet ds1 = Oldb.ExecuteDataset(strSql2.ToString(), parameters);
            int rs = 0;
            rs = (int)Oldb.ExecuteScalar(strSql.ToString(), parameters);
            if (ds1.Tables[0].Rows.Count > 0)
            {
                TypeID = int.Parse(ds1.Tables[0].Rows[0]["ID"].ToString());
                return rs;
            }
            else
            {
                TypeID = 0;
                return 0;
            }
        }
		/// <summary>
		/// 增加一条数据
		/// </summary>
        public int Add(CSYC.Model.ProductType model)
		{
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into ProductType(");
            strSql.Append("TypeName,ParentID)");
            strSql.Append(" values (");
            strSql.Append("@TypeName,@ParentID)");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeName", OleDbType.VarChar,50),
                    new OleDbParameter("@ParentID",OleDbType.Integer)};
            parameters[0].Value = model.TypeName;
            parameters[1].Value = model.ParentID;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
		}
		/// <summary>
		/// 更新一条数据
		/// </summary>
        public int Update(CSYC.Model.ProductType model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update ProductType set ");
            strSql.Append("TypeName=@TypeName");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					
			new OleDbParameter("@TypeName", OleDbType.VarChar,50),
            new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = model.TypeName;
            parameters[1].Value = model.ID;
            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery( strSql.ToString(), parameters);
            return rs;
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public int Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from ProductType ");
            strSql.Append(" where ID=@ID");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
			parameters[0].Value = ID;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery( strSql.ToString(), parameters);
            return rs;
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
        public CSYC.Model.ProductType GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,TypeName,ParentID from ProductType ");
			strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
			parameters[0].Value = ID;

            CSYC.Model.ProductType model = new CSYC.Model.ProductType();
            DataSet ds = Oldb.ExecuteDataset( strSql.ToString(), parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				if(ds.Tables[0].Rows[0]["ID"].ToString()!="")
				{
					model.ID=int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
				}
				model.TypeName=ds.Tables[0].Rows[0]["TypeName"].ToString();
                if (ds.Tables[0].Rows[0]["ParentID"].ToString() != "")
                {
                    model.ParentID = int.Parse(ds.Tables[0].Rows[0]["ParentID"].ToString());
                }
				return model;
			}
			else
			{
				return null;
			}
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
        public DataSet GetList(string key,int TypeID, int selectTpye,out int records)
		{
			StringBuilder strSql=new StringBuilder();
            StringBuilder countSql = new StringBuilder();
            StringBuilder whereSql = new StringBuilder();
            strSql.Append("select ID,TypeName,ParentID ");
            strSql.Append(" FROM ProductType where 1=1 ");
            countSql.Append("select count(-1) from ProductType where 1=1 ");
            if (key == "")
            {
                switch (selectTpye)
                {
                    case 1: whereSql.Append(" and ID=@TypeID "); break;
                    case 2: whereSql.Append(" and ParentID=@TypeID "); break;
                }
            }
            else
            {
                switch (selectTpye)
                {
                    case 1: whereSql.Append(" and TypeName like '%'+@key+'%'"); break;
                }
            }
            OleDbParameter[] parameters ={ 
                new OleDbParameter("@key", OleDbType.VarChar),
                new OleDbParameter("@TypeID", OleDbType.Integer, 4)};
            parameters[0].Value = key;
            parameters[1].Value = TypeID;
            strSql.Append(whereSql);
            countSql.Append(whereSql);
            records = 0;
            records = (int)Oldb.ExecuteScalar(countSql.ToString(), parameters);
            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(int TypeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,TypeName,ParentID ");
            strSql.Append(" FROM ProductType where 1=1 and ParentID=@TypeID");

            OleDbParameter[] parameters ={ 
                new OleDbParameter("@TypeID", OleDbType.Integer, 4)};
            parameters[0].Value = TypeID;

            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
        }

        public int GetListC(int TypeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(-1) ");
            strSql.Append(" FROM ProductType where 1=1 and ParentID=@TypeID");
            OleDbParameter[] parameters ={
                new OleDbParameter("@ParentID",TypeID)};
            int count = (int)Oldb.ExecuteScalar(strSql.ToString(), parameters);
            return count;
        }

		#endregion  成员方法
	}
}

