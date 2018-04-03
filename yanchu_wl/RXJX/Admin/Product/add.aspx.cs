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

public partial class Admin_Product_add : System.Web.UI.Page
{
    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    CSYC.BLL.ProductType blltype = new CSYC.BLL.ProductType();
    CSYC.Model.Product model = new CSYC.Model.Product();

    protected string ProductName = "名称";
    protected string Standards = "规格";
    protected string Count = "数量";
    protected string Price = "价格";
    protected string Memo = "说明";
    protected string Details = "详细信息";
    protected string PicUrl = "图片";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Name"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
            ddldata();
        }

    }
    void ddldata()
    {
        int Record = 0;
        DataTable dt = blltype.GetList("", 0, 0, out Record).Tables[0];
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
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (DropDownList1.Items[0].Selected == true)
        {
            Response.Write("<script>alert('请选择类别！')</script>");
            return;
        }
        else
        {
            model.TypeID = Convert.ToInt32(DropDownList1.SelectedValue);
        }
        model.ProductName = TextBox1.Text.Trim();
        model.PicUrl = UpFileImg1.GetFilePath;
        model.Details = FCKeditor1.Value;
        model.IsShow = Convert.ToInt32(RadioButtonList1.SelectedValue);
        if (bll.Add(model) > 0)
            Response.Write("<script>alert('恭喜您添加成功！')</script>");
        else
            Response.Write("<script>alert('添加失败！')</script>");
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        TextBox1.Text = "";
        FCKeditor1.Value = "";
    }
}
