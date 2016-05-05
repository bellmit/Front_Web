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

public partial class Admin_Navigation_edit : System.Web.UI.Page
{
    CSYC.BLL.Navigation bll = new CSYC.BLL.Navigation();
    CSYC.Model.Navigation model = new CSYC.Model.Navigation();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            Bind();
        }
    }
    private void Bind()
    {
        model = bll.GetModel(this.Id);
        txtName.Text = model.Nname;
        txtUrl.Text = model.Nurl;
    }
    protected void btnTJ_Click(object sender, EventArgs e)
    {
        model.ID = this.Id;
        model.Nname = txtName.Text.Trim();
        model.Nurl = txtUrl.Text.Trim();
        if (bll.Update(model) > 0)
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
