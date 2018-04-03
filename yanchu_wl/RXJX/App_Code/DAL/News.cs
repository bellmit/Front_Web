using System;
using System.Data;
using System.Text;
using System.Data.OleDb;
using CSYC.Model;//请先添加引用
using CSYC.Oledb;

namespace CSYC.DAL
{
    /// <summary>
    /// 数据访问类News。
    /// </summary>
    public class News
    {
        public News()
        { }
        #region  成员方法

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.News model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into News(");
            strSql.Append("TypeID,UserID,Title,LinkUrl,PicUrl,Contents,Source,IsHome)");
            strSql.Append(" values (");
            strSql.Append("@TypeID,@UserID,@Title,@LinkUrl,@PicUrl,@Contents,@Source,@IsHome)");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeID", OleDbType.Integer,4),
					new OleDbParameter("@UserID", OleDbType.Integer,4),
					new OleDbParameter("@Title", OleDbType.VarChar,50),
					new OleDbParameter("@LinkUrl", OleDbType.VarChar,50),
					new OleDbParameter("@PicUrl", OleDbType.VarChar,50),
					new OleDbParameter("@Contents", OleDbType.VarChar),
                    new OleDbParameter("@Source", OleDbType.VarChar,50),
                    new OleDbParameter("@IsHome", OleDbType.Integer)};
            parameters[0].Value = model.TypeID;
            parameters[1].Value = model.UserID;
            parameters[2].Value = model.Title;
            parameters[3].Value = model.LinkUrl;
            parameters[4].Value = model.PicUrl;
            parameters[5].Value = model.Contents;
            parameters[6].Value = model.Source;
            parameters[7].Value = model.IsHome;

            int rs = 0;
            rs = (int)Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
            return rs;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.News model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("Update News set ");
            strSql.Append("TypeID=@TypeID,");
            strSql.Append("Title=@Title,");
            strSql.Append("LinkUrl=@LinkUrl,");
            strSql.Append("PicUrl=@PicUrl,");
            strSql.Append("Contents=@Contents,");
            strSql.Append("Source=@Source,");
            strSql.Append("IsHome=@IsHome");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@TypeID", OleDbType.Integer,4),
					new OleDbParameter("@Title", OleDbType.VarChar,50),
					new OleDbParameter("@LinkUrl", OleDbType.VarChar,50),
					new OleDbParameter("@PicUrl", OleDbType.VarChar,50),
					new OleDbParameter("@Contents", OleDbType.VarChar),
                    new OleDbParameter("@Source", OleDbType.VarChar,50),
                    new OleDbParameter("@IsHome", OleDbType.Integer),
            		new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = model.TypeID;
            parameters[1].Value = model.Title;
            parameters[2].Value = model.LinkUrl;
            parameters[3].Value = model.PicUrl;
            parameters[4].Value = model.Contents;
            parameters[5].Value = model.Source;
            parameters[6].Value = model.IsHome;
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
            strSql.Append("delete from News ");
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
        public CSYC.Model.News GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,TypeID,UserID,Title,LinkUrl,CreateTime,PicUrl,Contents,Source,ViewCount,IsHome from News ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = {
					new OleDbParameter("@ID", OleDbType.Integer,4)};
            parameters[0].Value = ID;

            CSYC.Model.News model = new CSYC.Model.News();
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
                if (ds.Tables[0].Rows[0]["UserID"].ToString() != "")
                {
                    model.UserID = int.Parse(ds.Tables[0].Rows[0]["UserID"].ToString());
                }
                model.Title = ds.Tables[0].Rows[0]["Title"].ToString();
                model.LinkUrl = ds.Tables[0].Rows[0]["LinkUrl"].ToString();
                if (ds.Tables[0].Rows[0]["CreateTime"].ToString() != "")
                {
                    model.CreateTime = DateTime.Parse(ds.Tables[0].Rows[0]["CreateTime"].ToString());
                }
                model.PicUrl = ds.Tables[0].Rows[0]["PicUrl"].ToString();
                model.Contents = ds.Tables[0].Rows[0]["Contents"].ToString();
                model.Source = ds.Tables[0].Rows[0]["Source"].ToString();
                if (ds.Tables[0].Rows[0]["ViewCount"].ToString() != "")
                {
                    model.ViewCount = int.Parse(ds.Tables[0].Rows[0]["ViewCount"].ToString());
                }
                if (ds.Tables[0].Rows[0]["IsHome"].ToString() != "")
                {
                    model.IsHome = int.Parse(ds.Tables[0].Rows[0]["IsHome"].ToString());
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
        public DataSet GetList(int TypeID,int ProductType, int Count, int IsHome)
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
            strSql.Append(" from News where 1=1");
            if (TypeID > 0 && TypeID != null && ProductType==0) 
            {
                strSql.Append(" and TypeID = @TypeID ");
            }
            if (TypeID > 0 && TypeID != null && ProductType == 1)
            {
                strSql.Append(" and TypeID in (select ID from NewsType where ParentID=@TypeID)");
            }
            if (IsHome == 1)
            {
                strSql.Append(" and IsHome=@IsHome");
            }
            strSql.Append(" order by CreateTime desc");
            OleDbParameter[] parameters ={ 
                new OleDbParameter("@TypeID", TypeID),
                new OleDbParameter("@IsHome", IsHome)};
            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
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
            strSql.Append("from News ");
            strSql.Append("where ID=(select max(ID) from (select ID from News where ID<@ID) as a)");
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
            strSql.Append("from News ");
            strSql.Append("where ID=(select min(ID) from (select ID from News where ID>@ID) as a)");
            OleDbParameter[] parameters ={
                new OleDbParameter("@ID",ID)};
            return Oldb.ExecuteDataset(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 增加浏览次数
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int viewhit(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update News set ");
            strSql.Append(" ViewCount=ViewCount+1 ");
            strSql.Append(" where ID=@ID ");
            OleDbParameter[] parameters = { new OleDbParameter("@ID", OleDbType.Integer, 4) };
            parameters[0].Value = ID;
            return Oldb.ExecuteNonQuery(strSql.ToString(), parameters);
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
            strSql.Append(" from News where 1=1");
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
        /// 获取满足条件的条数
        /// </summary>
        /// <returns></returns>
        public int GetCount(string Title)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(-1) ");
            strSql.Append(" from News where 1=1");
            strSql.Append(" and Title like '%'+@Title+'%'");
            OleDbParameter[] parameters ={ 
                new OleDbParameter("@Title", Title)};
            int count = (int)Oldb.ExecuteScalar(strSql.ToString(), parameters);
            return count;
        }

        /// <summary>
        /// 模糊查询
        /// </summary>
        /// <returns></returns>
        public DataSet GetLike(string Title)
        {


            StringBuilder strSql = new StringBuilder();
            strSql.Append("select *");
            strSql.Append(" from News where 1=1");

            strSql.Append(" and Title like '%'+@Title+'%'");

            OleDbParameter[] parameters ={ 
                new OleDbParameter("@Title", Title)};
            return Oldb.ExecuteDataset(strSql.ToString(), parameters);

        }
        /// <summary>
        /// 按条件查询文章列表
        /// </summary>
        public DataSet GetList(int current, int count, int TypeID)
        {
            StringBuilder strsql = new StringBuilder();
            strsql.Append("select top " + count + " * from News");
            strsql.Append(" where 1=1");
            if (TypeID == 0)
            {
                if (current > 0)
                {
                    strsql.Append(" and ID <(select min(ID) from (select top " + current * count + " ID from News order by ID desc) as a) order by ID desc");
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
                    strsql.Append(" and ID <(select min(ID) from (select top " + current * count + " ID from News where TypeID=@TypeID order by ID desc) as a) and TypeID=@TypeID order by ID desc ");
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

