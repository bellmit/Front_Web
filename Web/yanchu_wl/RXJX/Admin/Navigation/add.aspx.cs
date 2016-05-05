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

public partial class Admin_Navigation_Default : System.Web.UI.Page
{
    CSYC.BLL.Navigation bll = new CSYC.BLL.Navigation();
    CSYC.Model.Navigation model = new CSYC.Model.Navigation();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ddldata();
        }
    }
    protected void btnCZ_Click(object sender, EventArgs e)
    {
        TextBox1.Text = "";
        TextBox2.Text = "";
    }
    void ddldata()
    {
        int Record = 0;
        DataTable dt = bll.GetList().Tables[0];
        DropDownList1.Items.Clear();
        DropDownList1.Items.Add(new ListItem("请选择", "0"));
        DataRow[] drs = dt.Select("Pid=" + 0);
        foreach (DataRow r in drs)
        {
            string nodeid = r["ID"].ToString();
            string text = r["Nname"].ToString();
            text = "╉" + text;
            DropDownList1.Items.Add(new ListItem(text, nodeid));
            int sonparentid = int.Parse(nodeid);
            string blank = "├";
            BindNode(sonparentid, dt, blank);

        }
        this.DropDownList1.DataBind();
    }
    private void BindNode(int parentid, DataTable dt, string blank)
    {
        DataRow[] drs = dt.Select("Pid= " + parentid);

        foreach (DataRow r in drs)
        {
            string nodeid = r["ID"].ToString();
            string text = r["Nname"].ToString();
            text = blank + text;
            this.DropDownList1.Items.Add(new ListItem(text, nodeid));
            int sonparentid = int.Parse(nodeid);
            string blank2 = blank + "-";
            BindNode(sonparentid, dt, blank2);
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        model.Nname = TextBox1.Text.Trim();
        model.Nurl = TextBox2.Text.Trim();
        model.Pid = Convert.ToInt32(DropDownList1.SelectedValue);
        if (bll.Add(model) > 0)
        {
            Response.Write("<script>alert('恭喜您添加成功！')</script>");
            TextBox1.Text = "";
            TextBox2.Text = "";
        }
        else
        {
            Response.Write("<script>alert('添加失败！')</script>");
            TextBox1.Text = "";
            TextBox2.Text = "";
        }
    }
}
