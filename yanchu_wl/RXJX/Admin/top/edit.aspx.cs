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

public partial class Admin_top_edit : System.Web.UI.Page
{
    CSYC.BLL.TopImg bll = new CSYC.BLL.TopImg();
    CSYC.Model.TopImg model = new CSYC.Model.TopImg();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            BindTopImg();
        }
    }
    private void BindTopImg()
    {
        model = bll.GetModel(this.Id);
        txtName.Text = model.Topname;
        UpFileImg1.GetFilePath = model.TopUrl;
        Image img = (Image)UpFileImg1.FindControl("imgPreView");
        if (System.IO.File.Exists(Server.MapPath("~/" + model.TopUrl)))
            img.ImageUrl = "~/" + model.TopUrl;
        else
            img.ImageUrl = "~/upfile/users/yulan.jpg";
    }
    protected void btnTJ_Click(object sender, EventArgs e)
    {
        model.ID = this.Id;
        model.Topname = txtName.Text.Trim();
        model.TopUrl = UpFileImg1.GetFilePath;
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
    }
}
