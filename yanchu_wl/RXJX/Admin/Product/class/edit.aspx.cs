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

public partial class Admin_Product_class_edit : System.Web.UI.Page
{
    CSYC.BLL.ProductType bll = new CSYC.BLL.ProductType();
    CSYC.Model.ProductType model = new CSYC.Model.ProductType();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            BindType();
        }
    }
    public void BindType()
    {
        model = bll.GetModel(Id);
        TextBox1.Text = model.TypeName;
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        model.TypeName = TextBox1.Text.Trim();
        model.ID = this.Id;
        if (bll.Update(model) > 0)
        {
            Response.Write("<script>alert('修改成功！');location='List.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('修改失败！');location='List.aspx';</script>");
        }
    }
}
