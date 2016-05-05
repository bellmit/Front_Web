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

public partial class Admin_top_add : System.Web.UI.Page
{
    CSYC.BLL.TopImg bll = new CSYC.BLL.TopImg();
    CSYC.Model.TopImg model = new CSYC.Model.TopImg();
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
    protected void btnTJ_Click(object sender, EventArgs e)
    {
        model.Topname = txtName.Text.Trim();
        model.TopUrl = UpFileImg1.GetFilePath;
        if (bll.Add(model) > 0)
        {
            Response.Write("<script>alert('恭喜您添加成功！')</script>");
        }
        else
        {
            Response.Write("<script>alert('添加失败！');location='List.aspx';</script>");
        }
    }
    protected void btnCZ_Click(object sender, EventArgs e)
    {
        txtName.Text = "";
        UpFileImg1.GetFilePath = "";
    }
}
