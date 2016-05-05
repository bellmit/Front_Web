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

public partial class Admin_foot_edit : System.Web.UI.Page
{
    CSYC.BLL.Foot bll = new CSYC.BLL.Foot();
    CSYC.Model.Foot model = new CSYC.Model.Foot();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            BindFoot();
        }
    }
    private void BindFoot()
    {
        model = bll.GetModel(this.Id);
        TextBox1.Text = model.Gsm;
        FCKeditor1.Value = model.Footc;
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        model.ID = this.Id;
        model.Gsm = TextBox1.Text.Trim();
        model.Footc = FCKeditor1.Value;
        if (bll.Update(model) > 0)
        {
            Response.Write("<script>alert('修改成功！');location='List.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('修改失败！');location='List.aspx';</script>");
        }
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        TextBox1.Text = "";
        FCKeditor1.Value = "";
    }
}
