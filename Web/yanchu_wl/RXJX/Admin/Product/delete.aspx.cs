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
using System.IO;

public partial class Admin_Product_delete : System.Web.UI.Page
{
    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    CSYC.Model.Product model = new CSYC.Model.Product();
    protected void Page_Load(object sender, EventArgs e)
    {
        string url = string.Empty;
        int id = Convert.ToInt32(Request.QueryString["ID"].ToString());
        model = bll.GetModel(id);
        if (model != null)
        {
            url = model.PicUrl;
            if (File.Exists(url)) 
            {
                File.Delete(url);
            }
        }
        if (bll.Delete(id) > 0)
        {
            string url1 = Server.MapPath("~/Product/Product" + id + ".htm");
            if (File.Exists(url1))
            {
                File.Delete(url1);
            }
            if (System.IO.File.Exists(Server.MapPath("~/" + url)))
            {
                System.IO.File.Delete(Server.MapPath("~/" + url));
            }
            Response.Write("<script>alert('删除成功！');location='List.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('删除失败！');location='List.aspx';</script>");
        }
    }
}
