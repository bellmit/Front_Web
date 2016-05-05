using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace CSYC.BLL
{
    /// <summary>
    /// Navigation 的摘要说明
    /// </summary>
    public class Navigation
    {
        private readonly CSYC.DAL.Navigation dal = new CSYC.DAL.Navigation();
        public Navigation()
        { }
        #region  成员方法

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(CSYC.Model.Navigation model)
        {
            return dal.Add(model);
        }

        /// <summary>
        /// 更新一条数据
        /// </summary>
        public int Update(CSYC.Model.Navigation model)
        {
            return dal.Update(model);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public int Delete(int ID)
        {

            return dal.Delete(ID);
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public CSYC.Model.Navigation GetModel(int ID)
        {

            return dal.GetModel(ID);
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(int Pid)
        {
            return dal.GetList(Pid);
        }
        public DataSet GetList()
        {
            return dal.GetList();
        }

        #endregion  成员方法
    }
}