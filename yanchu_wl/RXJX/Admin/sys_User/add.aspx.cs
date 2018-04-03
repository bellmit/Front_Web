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

public partial class Admin_sys_User_add : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) 
        {
            if (Session["Name"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
        }
    }
    protected void btnAdd_Click(object sender, EventArgs e)
    {
        CSYC.Model.sys_User model = new CSYC.Model.sys_User();
        CSYC.BLL.sys_User bll = new CSYC.BLL.sys_User();
        string userName;
        string userPassword;
        if (txtName.Text == "")
        {
            labMessage.Text = "提示：用户名不能为空！";
            return;
        }
        else
        {
            userName = txtName.Text.Trim();
            model.UserName = userName;
        }
        if (bll.Exists(userName))
        {
            labMessage.Text = "提示：用户名已存在！";
            return;
        }
        if (txtPws.Text == "")
        {
            labMessage.Text = "提示:密码不能为空!!!!";
            return;
        }
        if (txtPws1.Text == "" || txtPws.Text != txtPws1.Text)
        {
            labMessage.Text = "提示:两次输入密码不一致!!!!";
            return;
        }
        else 
        {
            userPassword = CSYC.Common.DESEncrypt.Encrypt(txtPws.Text.Trim());
            model.UserPassword = userPassword;
            bll.Add(model);
            Response.Write("<script>alert('恭喜您添加成功！');location='List.aspx';</script>");

        }
        txtName.Text = "";
        txtPws.Text = "";
        txtPws1.Text = "";
        labMessage.Text = "";
    }
}
