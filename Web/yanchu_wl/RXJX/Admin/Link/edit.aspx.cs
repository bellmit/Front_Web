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

public partial class Admin_Link_edit : System.Web.UI.Page
{
    CSYC.BLL.Link bll = new CSYC.BLL.Link();
    CSYC.Model.Link model = new CSYC.Model.Link();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            BindNews();
        }
    }
    private void BindNews()
    {
        model = bll.GetModel(this.Id);
        txtName.Text = model.LinkName;
        txtUrl.Text = model.LinkUrl;
    }
    protected void btnTJ_Click(object sender, EventArgs e)
    {
        model.ID = this.Id;
        model.LinkName = txtName.Text.Trim();
        model.LinkUrl = txtUrl.Text.Trim();
        if (bll.Update( model) > 0)
        {
            Response.Write("<script>alert('修改成功！');location='List.aspx';</script>");
        }
        else 
        {
            Response.Write("<script>alert('修改失败！');location='List.aspx';</script>");
        }
    }
    protected void btnCZ_Click(object sender, EventArgs e)
    {
        txtName.Text = "";
        txtUrl.Text = "";
    }
}
