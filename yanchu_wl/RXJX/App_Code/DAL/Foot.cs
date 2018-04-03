using System;
using System.Data;
using System.Data.OleDb;
using System.Text;
using CSYC.Model;
using CSYC.Oledb;

namespace CSYC.DAL
{
    /// <summary>
    /// Foot 的摘要说明
    /// </summary>
    public class Foot
    {
        public Foot()
        { }
        #region 成员方法
        /// <summary>
        /// 添加一条数据
        /// </summary>
        public int Add(CSYC.Model.Foot model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Foot(");
            strSql.Append("Gsm,Footc)");
            strSql.Append(" values (");
            strSql.Append("@Gsm,@Footc)");
            OleDbParameter[] parameters ={
                new OleDbParameter("@Gsm",OleDbType.VarChar,50),
                new OleDbParameter("@Footc",OleDbType.VarChar,200)};
            parameters[0].Value = model.Gsm;
            parameters[1].Value = model.Footc;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Foot model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Foot set ");
            strSql.Append("Gsm=@Gsm,");
            strSql.Append("Footc=@Footc ");
            strSql.Append(" where ID=@ID");
            OleDbParameter[] parameters ={
                new OleDbParameter("@Gsm",OleDbType.VarChar,50),
                new OleDbParameter("@Footc",OleDbType.VarChar,200),
                new OleDbParameter("@ID",OleDbType.Integer,4)};
            parameters[0].Value = model.Gsm;
            parameters[1].Value = model.Footc;
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
            strSql.Append("delete from Foot ");
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
        public CSYC.Model.Foot GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 * from Foot ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.Foot model = new CSYC.Model.Foot();
            DataSet ds = Oldb.ExecuteDataset(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.Gsm = ds.Tables[0].Rows[0]["Gsm"].ToString();
                model.Footc = ds.Tables[0].Rows[0]["Footc"].ToString();
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
            strSql.Append(" from Foot where 1=1");
            strSql.Append(" order by AddTime desc");
            return Oldb.ExecuteDataset(strSql.ToString());
        }
        #endregion 
    }
}