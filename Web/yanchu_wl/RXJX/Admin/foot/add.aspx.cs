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

public partial class Admin_foot_foot : System.Web.UI.Page
{
    CSYC.BLL.Foot bll = new CSYC.BLL.Foot();
    CSYC.Model.Foot model = new CSYC.Model.Foot();
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
    protected void Button1_Click(object sender, EventArgs e)
    {
        model.Gsm = TextBox1.Text.Trim();
        model.Footc = FCKeditor1.Value;
        if (bll.Add(model) > 0) 
        {
            Response.Write("<script>alert('恭喜您添加成功！');location='List.aspx';</script>");
        }
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        TextBox1.Text = "";
        FCKeditor1.Value = "";
    }
}
