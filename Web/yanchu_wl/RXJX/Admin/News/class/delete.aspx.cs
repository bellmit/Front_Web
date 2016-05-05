using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

public partial class Admin_News_class_delete : System.Web.UI.Page
{
    CSYC.BLL.NewsType bll = new CSYC.BLL.NewsType();
    protected void Page_Load(object sender, EventArgs e)
    {
        string url = string.Empty;
        int id = Convert.ToInt32(Request.QueryString["ID"].ToString());
        if (bll.Delete(id) > 0)
        {
            Response.Write("<script>alert('删除成功！');location='List.aspx';</script>");
        }
        else 
        {
            Response.Write("<script>alert('删除失败！');location='List.aspx';</script>");
        }
    }
}
