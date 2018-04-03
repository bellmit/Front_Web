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
using System.Data.SqlClient;
using System.Data.OleDb;
using CSYC.BLL;

public partial class Admin_Default : System.Web.UI.Page
{
    CSYC.BLL.sys_User bll = new sys_User();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        string UserName = txtName.Text.Trim();
        string UserPassword = txtPass.Text.Trim();
        Session["Name"] = txtName.Text.Trim();
        if (bll.chkAdminLogin(UserName, UserPassword))
        {
            Response.Redirect("Main.aspx");
        }
        else
        {
            Response.Write("<script>alert('登录失败，帐号或密码有误！')</script>");
            return;
        }

    }
}
