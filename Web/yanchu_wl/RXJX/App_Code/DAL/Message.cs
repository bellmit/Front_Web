using System;
using System.Data;
using System.Text;
using System.Data.OleDb;
using CSYC.Model;//请先添加引用
using CSYC.Oledb;

namespace CSYC.DAL
{
    /// <summary>
    /// Message 的摘要说明
    /// </summary>
    public class Message
    {
        public Message()
        { }
        #region  成员方法

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.Message model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Message(");
            strSql.Append("UserName,UserTel,UserEmail,Cname,Cadress,Contents,IsCheck,AddTime)");
            strSql.Append(" values (");
            strSql.Append("@UserName,@UserTel,@UserEmail,@Cname,@Cadress,@Contents,@IsCheck,@AddTime)");
            OleDbParameter[] parameters = {
					new OleDbParameter("@UserName", OleDbType.VarChar,50),
					new OleDbParameter("@UserTel", OleDbType.VarChar,50),
					new OleDbParameter("@UserEmail", OleDbType.VarChar,50),
					new OleDbParameter("@Cname", OleDbType.VarChar,100),
					new OleDbParameter("@Cadress", OleDbType.VarChar,100),
					new OleDbParameter("@Contents", OleDbType.VarChar,200),
                    new OleDbParameter("@IsCheck", OleDbType.Integer),
                    new OleDbParameter("@AddTime", OleDbType.Date)};
            parameters[0].Value = model.UserName;
            parameters[1].Value = model.UserTel;
            parameters[2].Value = model.UserEmail;
            parameters[3].Value = model.Cname;
            parameters[4].Value = model.Cadress;
            parameters[5].Value = model.Contents;
            parameters[6].Value = model.IsCheck;
            if (model.AddTime.ToString() != "0001-1-1 0:00:00")
                parameters[7].Value = model.AddTime;
            else
                parameters[7].Value = DateTime.Now;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Message model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Message set ");
            strSql.Append("UserName=@UserName,");
            strSql.Append("UserTel=@UserTel,");
            strSql.Append("UserEmail=@UserEmail,");
            strSql.Append("Cname=@Cname,");
            strSql.Append("Contents=@Contents,");
            strSql.Append("IsCheck=@IsCheck,");
            strSql.Append("ReContents=@ReContents");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@UserName", OleDbType.VarChar,50),
					new OleDbParameter("@UserTel", OleDbType.VarChar,50),
					new OleDbParameter("@UserEmail", OleDbType.VarChar,50),
					new OleDbParameter("@Cname", OleDbType.VarChar,100),
					new OleDbParameter("@Contents", OleDbType.VarChar,200),
                    new OleDbParameter("@IsCheck", OleDbType.Integer),
                    new OleDbParameter("@ReContents", OleDbType.VarChar),
                    new OleDbParameter("@ID", OleDbType.Integer,4)};

            parameters[0].Value = model.UserName;
            parameters[1].Value = model.UserTel;
            parameters[2].Value = model.UserEmail;
            parameters[3].Value = model.Cname;
            parameters[4].Value = model.Contents;
            parameters[5].Value = model.IsCheck;
            parameters[6].Value = model.ReContents;
            parameters[7].Value = model.ID;

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
            strSql.Append("delete from Message ");
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
        public CSYC.Model.Message GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,UserName,UserTel,UserEmail,Cname,Cadress,Contents,IsCheck,ReContents,AddTime from  Message ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.Message model = new CSYC.Model.Message();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.UserName = ds.Tables[0].Rows[0]["UserName"].ToString();
                model.UserTel = ds.Tables[0].Rows[0]["UserTel"].ToString();
                model.UserEmail = ds.Tables[0].Rows[0]["UserEmail"].ToString();
                model.Cname = ds.Tables[0].Rows[0]["Cname"].ToString();
                model.Cadress = ds.Tables[0].Rows[0]["Cadress"].ToString();
                model.Contents = ds.Tables[0].Rows[0]["Contents"].ToString();
                if (ds.Tables[0].Rows[0]["IsCheck"].ToString() != "")
                {
                    model.IsCheck = int.Parse(ds.Tables[0].Rows[0]["IsCheck"].ToString());
                }
                model.ReContents = ds.Tables[0].Rows[0]["ReContents"].ToString();
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
        public DataSet GetList(int Swhere)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append("select ID,UserName,UserTel,UserEmail,Cname,Cadress,Contents,IsCheck,ReContents,AddTime ");
            strSql.Append(" FROM Message where 1=1 ");
            if (Swhere == 1)
            {
                strSql.Append("and  IsCheck=1");
            }
            strSql.Append(" order by AddTime desc");

            return Oldb.ExecuteDataset(strSql.ToString());
        }

        /*
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        {
            SqlParameter[] parameters = {
                    new SqlParameter("@tblName", SqlDbType.VarChar, 255),
                    new SqlParameter("@fldName", SqlDbType.VarChar, 255),
                    new SqlParameter("@PageSize", SqlDbType.Int),
                    new SqlParameter("@PageIndex", SqlDbType.Int),
                    new SqlParameter("@IsReCount", SqlDbType.Bit),
                    new SqlParameter("@OrderType", SqlDbType.Bit),
                    new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
                    };
            parameters[0].Value = "Message";
            parameters[1].Value = "ID";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return SQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  成员方法
    }
}