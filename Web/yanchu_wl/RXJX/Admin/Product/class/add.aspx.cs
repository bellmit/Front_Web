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

public partial class Admin_Product_class_add : System.Web.UI.Page
{
    CSYC.BLL.ProductType bll = new CSYC.BLL.ProductType();
    CSYC.Model.ProductType model = new CSYC.Model.ProductType();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ddldata();
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        model.TypeName = TextBox1.Text;
        model.ParentID = Convert.ToInt32(DropDownList1.SelectedValue);
        if (bll.Add(model) > 0)
        {
            Response.Write("<script>alert('恭喜您添加成功！')</script>");
            TextBox1.Text = "";
        }
        else
            Response.Write("<script>alert('添加失败！')");
    }
    void ddldata()
    {
        int Record = 0;
        DataTable dt = bll.GetList("", 0, 0, out Record).Tables[0];
        DropDownList1.Items.Clear();
        DropDownList1.Items.Add(new ListItem("请选择", "0"));
        DataRow[] drs = dt.Select("ParentID=" + 0);
        foreach (DataRow r in drs)
        {
            string nodeid = r["ID"].ToString();
            string text = r["TypeName"].ToString();
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
        DataRow[] drs = dt.Select("ParentID= " + parentid);

        foreach (DataRow r in drs)
        {
            string nodeid = r["ID"].ToString();
            string text = r["TypeName"].ToString();
            text = blank + text;
            this.DropDownList1.Items.Add(new ListItem(text, nodeid));
            int sonparentid = int.Parse(nodeid);
            string blank2 = blank + "-";
            BindNode(sonparentid, dt, blank2);
        }
    }
}
