using System;
using System.Data;
using System.Text;
using System.Data.OleDb;
using CSYC.Model;//请先添加引用
using CSYC.Oledb;

namespace CSYC.DAL
{
    /// <summary>
    /// 数据访问类sys_User 
    /// </summary>
    public class sys_User
    {
        public sys_User()
        {}

        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string userName)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Sys_User");
            strSql.Append(" where UserName=@UserName ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@UserName", OleDbType.VarWChar,50)};
            parameters[0].Value = userName;

            return Oldb.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.sys_User model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Sys_User(");
            strSql.Append("UserName,UserPassword)");
            strSql.Append(" values (");
            strSql.Append("@UserName,@UserPassword)");
            OleDbParameter[] parameters = {
					new OleDbParameter("@UserName", OleDbType.VarChar),
                    new OleDbParameter("@UserPassword", OleDbType.VarChar)};
            parameters[0].Value = model.UserName;
            parameters[1].Value = model.UserPassword;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.sys_User model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Sys_User set ");
            strSql.Append("UserName=@UserName,");
            strSql.Append("UserPassword=@UserPassword");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@UserName", OleDbType.VarChar),
					new OleDbParameter("@UserPassword", OleDbType.VarChar),
                    new OleDbParameter("@ID", OleDbType.Integer,4)};
            
            parameters[0].Value = model.UserName;
            parameters[1].Value = model.UserPassword;
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
            strSql.Append("delete from Sys_User ");
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
        public CSYC.Model.sys_User GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,UserName,UserPassword,Sys_date from Sys_User ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.sys_User model = new CSYC.Model.sys_User();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }

                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                model.UserPassword = ds.Tables[0].Rows[0]["UserPassword"].ToString();
                if (ds.Tables[0].Rows[0]["Sys_date"].ToString() != "")
                {
                    model.Sys_date = DateTime.Parse(ds.Tables[0].Rows[0]["Sys_date"].ToString());
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
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,UserName,UserPassword,Sys_date ");
            strSql.Append(" FROM Sys_User ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return Oldb.ExecuteDataset(strSql.ToString());
        }

        /// <summary>
        /// 检查登录用户
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="UserPassword"></param>
        /// <returns></returns>
        public bool chkAdminLoign(string UserName, string UserPassword)
        {
            string strSql = "select count(*) from Sys_User where UserName=@UserName and UserPassword=@UserPassword";
            OleDbParameter[] parameters = {
                new OleDbParameter("@UserName",OleDbType.VarWChar,30),
                new OleDbParameter("@UserPassword", OleDbType.VarWChar,50)};
            parameters[0].Value = UserName;
            parameters[1].Value = UserPassword;
            return Oldb.Exists(strSql, parameters);
        }
        #endregion 成员方法
    }
}