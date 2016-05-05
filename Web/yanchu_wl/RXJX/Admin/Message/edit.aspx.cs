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

public partial class Admin_Message_edit : System.Web.UI.Page
{
    CSYC.BLL.Message bll = new CSYC.BLL.Message();
    CSYC.Model.Message model = new CSYC.Model.Message();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            BindData();
        }
    }
    private void BindData()
    {
        model = bll.GetModel(Id);
        if (model != null)
        {
            lbCname.Text = model.Cname;
            lbEmail.Text = model.UserEmail;
            lbName.Text = model.UserName;
            lbTel.Text = model.UserTel;
            FCKeditor1.Value = model.Contents;
            ListItem ls = (ListItem)rbtIsCheck.Items.FindByValue(model.IsCheck.ToString());
            if (ls != null)
                ls.Selected = true;
            FCKeditor2.Value = model.ReContents;
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        model.ID = Id;
        model.IsCheck = Convert.ToInt32(rbtIsCheck.SelectedValue.ToString());
        model.Contents = FCKeditor1.Value;
        model.ReContents = FCKeditor2.Value;
        model.UserEmail = lbEmail.Text;
        model.UserName = lbName.Text;
        model.UserTel = lbTel.Text;
        model.Cname = lbCname.Text;
        if (bll.Update(model) > 0)
        {
            Response.Write("<script>alert('回复成功！');location='List.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('回复失败！')</script>");
        }
    }
}
