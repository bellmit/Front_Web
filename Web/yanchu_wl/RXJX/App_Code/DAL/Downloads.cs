using System;
using System.Data;
using System.Data.OleDb;
using System.Text;
using CSYC.Model;
using CSYC.Oledb;

namespace CSYC.DAL
{
    /// <summary>
    /// Downloads 的摘要说明
    /// </summary>
    public class Downloads
    {
        public Downloads()
        { }
        #region 成员方法
        /// <summary>
        /// 添加一条数据
        /// </summary>
        public int Add(CSYC.Model.Downloads model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Downloads(");
            strSql.Append("Title,Durl)");
            strSql.Append(" values (");
            strSql.Append("@Title,@Durl)");
            OleDbParameter[] parameters ={
                new OleDbParameter("@Title",OleDbType.VarChar,50),
                new OleDbParameter("@Durl",OleDbType.VarChar,50)};
            parameters[0].Value = model.Title;
            parameters[1].Value = model.Durl;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Downloads model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Downloads set ");
            strSql.Append("Title=@Title,");
            strSql.Append("Durl=@Durl ");
            strSql.Append(" where ID=@ID");
            OleDbParameter[] parameters ={
                new OleDbParameter("@Title",OleDbType.VarChar,50),
                new OleDbParameter("@Durl",OleDbType.VarChar,50),
                new OleDbParameter("@ID",OleDbType.Integer,4)};
            parameters[0].Value = model.Title;
            parameters[1].Value = model.Durl;
            parameters[2].Value = model.ID;

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
            strSql.Append("delete from Downloads ");
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
        public CSYC.Model.Downloads GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 * from Downloads ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.Downloads model = new CSYC.Model.Downloads();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.Title = ds.Tables[0].Rows[0]["Title"].ToString();
                model.Durl = ds.Tables[0].Rows[0]["Durl"].ToString();
                if (ds.Tables[0].Rows[0]["AddTime"].ToString() != "")
                {
                    model.AddTime = DateTime.Parse(ds.Tables[0].Rows[0]["AddTime"].ToString());
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
        public DataSet GetList(int Count)
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
            strSql.Append(" from Downloads where 1=1");
            strSql.Append(" order by AddTime desc");
            return Oldb.ExecuteDataset(strSql.ToString());
        }
        #endregion 
    }
}