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

public partial class tools_flexsc_add : System.Web.UI.Page
{
    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    CSYC.Model.Product model = new CSYC.Model.Product();
    CSYC.BLL.ProductType blltype = new CSYC.BLL.ProductType();
    public string TableSink = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //if (Session["Name"] == null)
            //{
            //    Response.Redirect("../../Admin/Login.aspx");
            //}

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
    
    protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
    {
        Session["typeid_img"] = DropDownList1.SelectedValue;
    }
}
