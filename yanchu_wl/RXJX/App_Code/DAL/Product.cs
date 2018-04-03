using System;
using System.Data;
using System.Text;
using System.Data.OleDb;
using CSYC.Model;//请先添加引用
using CSYC.Oledb;

namespace CSYC.DAL
{
    /// <summary>
    /// 数据访问类Product。
    /// </summary>
    public class Product
    {
        public Product()
        { }
        #region  成员方法

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.Product model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Product(");
            strSql.Append("TypeID,ProductName,PicUrl,Details,IsShow)");
            strSql.Append(" values (");
            strSql.Append("@TypeID,@ProductName,@PicUrl,@Details,@IsShow)");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeID", OleDbType.Integer,4),
					new OleDbParameter("@ProductName", OleDbType.VarChar,50),
                    new OleDbParameter("@PicUrl", OleDbType.VarChar),
                    new OleDbParameter("@Details", OleDbType.VarChar),
                    new OleDbParameter("@IsShow", OleDbType.Integer)};
            parameters[0].Value = model.TypeID;
            parameters[1].Value = model.ProductName;
            parameters[2].Value = model.PicUrl;
            parameters[3].Value = model.Details;
            parameters[4].Value = model.IsShow;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Product model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Product set ");
            strSql.Append("TypeID=@TypeID,");
            strSql.Append("ProductName=@ProductName,");
            strSql.Append("PicUrl=@PicUrl,");
            strSql.Append("Details=@Details,");
            strSql.Append("IsShow=@IsShow");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeID", OleDbType.Integer,4),
					new OleDbParameter("@ProductName", OleDbType.VarChar,50),
					new OleDbParameter("@PicUrl", OleDbType.VarChar,50),
					new OleDbParameter("@Details", OleDbType.VarChar),
                    new OleDbParameter("@IsShow", OleDbType.Integer),
                    new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = model.TypeID;
            parameters[1].Value = model.ProductName;
            parameters[2].Value = model.PicUrl;
            parameters[3].Value = model.Details;
            parameters[4].Value = model.IsShow;
            parameters[5].Value = model.ID;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public int Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from Product ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public CSYC.Model.Product GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,TypeID,ProductName,Standards,Sount,Price,PicUrl,AddTime,Beiz,Details,IsShow from Product ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.Product model = new CSYC.Model.Product();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["TypeID"].ToString() != "")
                {
                    model.TypeID = int.Parse(ds.Tables[0].Rows[0]["TypeID"].ToString());
                }
                model.ProductName = ds.Tables[0].Rows[0]["ProductName"].ToString();
                model.Standards = ds.Tables[0].Rows[0]["Standards"].ToString();
                if (ds.Tables[0].Rows[0]["Sount"].ToString() != "")
                {
                    model.Sount = decimal.Parse(ds.Tables[0].Rows[0]["Sount"].ToString());
                }
                if (ds.Tables[0].Rows[0]["Price"].ToString() != "")
                {
                    model.Price = decimal.Parse(ds.Tables[0].Rows[0]["Price"].ToString());
                }
                model.PicUrl = ds.Tables[0].Rows[0]["PicUrl"].ToString();
                if (ds.Tables[0].Rows[0]["AddTime"].ToString() != "")
                {
                    model.AddTime = DateTime.Parse(ds.Tables[0].Rows[0]["AddTime"].ToString());
                }
                model.Beiz = ds.Tables[0].Rows[0]["Beiz"].ToString();
                model.Details = ds.Tables[0].Rows[0]["Details"].ToString();
                if (ds.Tables[0].Rows[0]["IsShow"].ToString() != "")
                {
                    model.IsShow = int.Parse(ds.Tables[0].Rows[0]["IsShow"].ToString());
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
        public DataSet GetList(int TypeID, int ProductType, int Count, int IsShow)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ");
            if (Count > 0 && Count != null)
            {
                strSql.Append(" top " + Count + " *");
            }
            else
            {
                strSql.Append(" *");
            }
            strSql.Append(" from Product where 1=1");
            if (TypeID > 0 && TypeID != null && ProductType == 0)
            {
                strSql.Append(" and TypeID=@TypeID");
            }
            if (TypeID > 0 && TypeID != null && ProductType == 1)
            {
                strSql.Append(" and TypeID in (select ID from ProductType where ParentID=@TypeID)");
            }
            if (IsShow == 1)
            {
                strSql.Append(" and IsShow=@IsShow");
            }
            strSql.Append(" order by AddTime desc");
            OleDbParameter[] parameters ={ 
                new OleDbParameter("@TypeID", TypeID),
                new OleDbParameter("@IsShow", IsShow)};
            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
        }
        public DataSet GetList()
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,TypeID,ProductName,Standards,Sount,Price,PicUrl,AddTime,Beiz,Details,IsShow ");
            strSql.Append(" FROM Product where 1=1 order by AddTime desc");

            return Oldb.ExecuteDataset(strSql.ToString());
        }

        /// <summary>
        /// 根据TypeID获取条数
        /// </summary>
        /// <param name="TypeID"></param>
        /// <returns></returns>
        public int GetCount(int TypeID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(-1) ");
            strSql.Append(" from Product where 1=1");
            if (TypeID > 0 && TypeID != null)
            {
                strSql.Append(" and TypeID = @TypeID");
            }
            OleDbParameter[] parameters ={ 
                new OleDbParameter("@TypeID", TypeID)};
            int count = (int)Oldb.ExecuteScalar(strSql.ToString(), parameters);
            return count;
        }

        /// <summary>
        /// 查询选定ID前一个ID的详细信息
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public DataSet GetX(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * ");
            strSql.Append("from Product ");
            strSql.Append("where ID=(select max(ID) from (select ID from Product where ID<@ID) as a)");
            OleDbParameter[] parameters ={
                new OleDbParameter("@ID",ID)};
            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 查询选定ID后一个ID的详细信息
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public DataSet GetS(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * ");
            strSql.Append("from Product ");
            strSql.Append("where ID=(select min(ID) from (select ID from Product where ID>@ID) as a)");
            OleDbParameter[] parameters ={
                new OleDbParameter("@ID",ID)};
            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
        }


        public DataSet GetListC(int count)
        {
            StringBuilder strSql = new StringBuilder();
            StringBuilder whereSql = new StringBuilder();
            strSql.Append("select top " + count + " ID,TypeID,ProductName,Standards,Sount,Price,PicUrl,AddTime,Beiz,Details,IsShow ");
            strSql.Append(" FROM Product where 1=1 order by id desc");
            return Oldb.ExecuteDataset(strSql.ToString());
        }

        /// <summary>
        /// 按条件查询文章列表
        /// </summary>
        public DataSet GetList(int current, int count, int TypeID)
        {
            StringBuilder strsql = new StringBuilder();
            strsql.Append("select top " + count + " * from Product");
            strsql.Append(" where 1=1");
            if (TypeID == 0)
            {
                if (current > 0)
                {
                    strsql.Append(" and ID <(select min(ID) from (select top " + current * count + " ID from Product order by ID desc) as a) order by ID desc");
                }
                else
                {
                    strsql.Append(" order by ID desc");
                }
            }
            else
            {
                if (current > 0)
                {
                    strsql.Append(" and ID <(select min(ID) from (select top " + current * count + " ID from Product where TypeID=@TypeID order by ID desc) as a) and TypeID=@TypeID order by ID desc ");
                }
                else
                {
                    strsql.Append(" and TypeID=@TypeID order by ID desc");
                }
            }
            OleDbParameter[] parameters = {
                new OleDbParameter("TypeID",TypeID)};
            return Oldb.ExecuteDataset(strsql.ToString(), parameters);
        }
        #endregion  成员方法
    }
}

