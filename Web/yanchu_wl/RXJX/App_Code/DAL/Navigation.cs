using System;
using System.Data;
using CSYC.Model;
using CSYC.Oledb;
using System.Text;
using System.Data.OleDb;

namespace CSYC.DAL
{
    /// <summary>
    /// Navigation 的摘要说明
    /// </summary>
    public class Navigation
    {
        public Navigation()
        { }
        #region 成员方法
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int Add(CSYC.Model.Navigation model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Navigation (");
            strSql.Append("Nname,Nurl,Pid)");
            strSql.Append(" values (");
            strSql.Append("@Nname,@Nurl,@Pid)");
            OleDbParameter[] parameters = {
            new OleDbParameter("@Nname",OleDbType.VarChar,50),
            new OleDbParameter("@Nurl",OleDbType.VarChar,50),
            new OleDbParameter("@Pid",OleDbType.Integer,4)};
            parameters[0].Value = model.Nname;
            parameters[1].Value = model.Nurl;
            parameters[2].Value = model.Pid;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Navigation model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("Update Navigation set ");
            strSql.Append("Nname=@Nname,");
            strSql.Append("Nurl=@Nurl");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@Nname", OleDbType.VarChar,50),
					new OleDbParameter("@Nurl", OleDbType.VarChar,50),
            		new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = model.Nname;
            parameters[1].Value = model.Nurl;
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
            strSql.Append("delete from Navigation ");
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
        public CSYC.Model.Navigation GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 * from Navigation ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.Navigation model = new CSYC.Model.Navigation();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }

                model.Nname = ds.Tables[0].Rows[0]["Nname"].ToString();
                model.Nurl = ds.Tables[0].Rows[0]["Nurl"].ToString();
                if (ds.Tables[0].Rows[0]["Pid"].ToString() != "")
                {
                    model.Pid = int.Parse(ds.Tables[0].Rows[0]["Pid"].ToString());
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
        public DataSet GetList(int Pid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * ");
            strSql.Append(" FROM Navigation where 1=1 and Pid=@Pid");

            OleDbParameter[] parameters ={ 
                new OleDbParameter("@Pid", Pid)};
            parameters[0].Value = Pid;

            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList()
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * ");
            strSql.Append(" FROM Navigation where 1=1");
            return Oldb.ExecuteDataset(strSql.ToString());
        }
        #endregion 成员方法
    }
}