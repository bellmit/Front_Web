using System;
using System.Data;
using System.Text;
using CSYC.Model;
using CSYC.Oledb;
using System.Data.OleDb;

namespace CSYC.DAL
{
    /// <summary>
    /// Link 的摘要说明
    /// </summary>
    public class Link
    {
        public Link()
        { }
        #region 成员方法
        /// <summary>
        /// 添加一条数据
        /// </summary>
        public int Add( CSYC.Model.Link model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Link(");
            strSql.Append("LinkName,LinkUrl)");
            strSql.Append(" values (");
            strSql.Append("@LinkName,@LinkUrl)");
            OleDbParameter[] parameters={
                new OleDbParameter("@LinkName",OleDbType.VarChar,50),
                new OleDbParameter("@LinkUrl",OleDbType.VarChar)};
            parameters[0].Value = model.LinkName;
            parameters[1].Value = model.LinkUrl;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Link model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Link set ");
            strSql.Append("LinkName=@LinkName,");
            strSql.Append("LinkUrl=@LinkUrl");
            strSql.Append(" where ID=@ID");
            OleDbParameter[] parameters ={
                new OleDbParameter("@LinkName",OleDbType.VarChar,50),
                new OleDbParameter("@LinkUrl",OleDbType.VarChar),
                new OleDbParameter("@ID",OleDbType.Integer,4)};
            parameters[0].Value = model.LinkName;
            parameters[1].Value = model.LinkUrl;
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
            strSql.Append("delete from Link ");
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
        public CSYC.Model.Link GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 * from Link ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.Link model = new CSYC.Model.Link();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.LinkName = ds.Tables[0].Rows[0]["LinkName"].ToString();
                model.LinkUrl = ds.Tables[0].Rows[0]["LinkUrl"].ToString();
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
            strSql.Append(" from Link where 1=1");
            strSql.Append(" order by AddTime desc");
            return Oldb.ExecuteDataset(strSql.ToString());
        }
        #endregion 
    }
}