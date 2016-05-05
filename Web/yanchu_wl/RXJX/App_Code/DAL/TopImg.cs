using System;
using System.Data;
using System.Text;
using CSYC.Model;
using CSYC.Oledb;
using System.Data.OleDb;

namespace CSYC.DAL
{
    /// <summary>
    /// TopImg 的摘要说明
    /// </summary>
    public class TopImg
    {
        public TopImg()
        { }
        #region 成员方法
        /// <summary>
        /// 添加一条数据
        /// </summary>
        public int Add(CSYC.Model.TopImg model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into TopImg(");
            strSql.Append("Topname,TopUrl)");
            strSql.Append(" values (");
            strSql.Append("@Topname,@TopUrl)");
            OleDbParameter[] parameters ={
                new OleDbParameter("@Topname",OleDbType.VarChar,50),
                new OleDbParameter("@TopUrl",OleDbType.VarChar)};
            parameters[0].Value = model.Topname;
            parameters[1].Value = model.TopUrl;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.TopImg model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update TopImg set ");
            strSql.Append("Topname=@Topname,");
            strSql.Append("TopUrl=@TopUrl");
            strSql.Append(" where ID=@ID");
            OleDbParameter[] parameters ={
                new OleDbParameter("@Topname",OleDbType.VarChar,255),
                new OleDbParameter("@TopUrl",OleDbType.VarChar),
                new OleDbParameter("@ID",OleDbType.Integer,4)};
            parameters[0].Value = model.Topname;
            parameters[1].Value = model.TopUrl;
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
            strSql.Append("delete from TopImg ");
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
        public CSYC.Model.TopImg GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 * from TopImg ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.TopImg model = new CSYC.Model.TopImg();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.Topname = ds.Tables[0].Rows[0]["Topname"].ToString();
                model.TopUrl = ds.Tables[0].Rows[0]["TopUrl"].ToString();
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
            strSql.Append(" from TopImg where 1=1");
            strSql.Append(" order by Addtime desc");
            return Oldb.ExecuteDataset(strSql.ToString());
        }
        #endregion
    }
}