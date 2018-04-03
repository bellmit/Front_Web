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

public partial class Admin_Product_sList : System.Web.UI.Page
{
    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    CSYC.BLL.ProductType blltype = new CSYC.BLL.ProductType();
    CSYC.Model.Product model = new CSYC.Model.Product();
    CSYC.Model.ProductType modeltype = new CSYC.Model.ProductType();
    public int typeid;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Name"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
            ddldata();
            BindProduct();
        }
    }
    private void BindProduct()
    {
        typeid = int.Parse(DropDownList1.SelectedValue);
        DataSet ds = new DataSet();
        ds = bll.GetList(typeid, 0, 0, 0);
        PagedDataSource pds = new PagedDataSource();
        pds.DataSource = ds.Tables[0].DefaultView;
        AspNetPager1.RecordCount = ds.Tables[0].DefaultView.Count;
        pds.AllowPaging = true;
        pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
        pds.PageSize = AspNetPager1.PageSize;
        R1.DataSource = pds;
        R1.DataBind();
        lbltotal.Text = AspNetPager1.PageCount.ToString();
        lblcurrent.Text = AspNetPager1.CurrentPageIndex.ToString();
        lblall.Text = ds.Tables[0].Rows.Count.ToString();
    }
    void ddldata()
    {
        int Record = 0;
        DataTable dt = blltype.GetList("", 0, 0, out Record).Tables[0];
        DropDownList1.Items.Clear();
        DropDownList1.Items.Add(new ListItem("未选择", "0"));
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
    public string Ctype(object obj)
    {
        int typeid = 0;
        string typename = string.Empty;
        if (obj.ToString() != "")
        {
            typeid = Convert.ToInt32(obj);
            modeltype = blltype.GetModel(typeid);
            if (modeltype != null)
            {
                typename = modeltype.TypeName;
            }
            else
            {
                typename = "无";
            }
        }
        return typename;
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
    protected void DropDownList1_SelectedIndexChanged1(object sender, EventArgs e)
    {
        BindProduct();
    }
    public string GetImg(string url)
    {
        if (url != "")
        {
            return "../../" + url;
        }
        else
        {
            return "../../upfile/users/wu.gif";
        }
    }
    protected void AspNetPager1_PageChanged1(object src, Wuqi.Webdiyer.PageChangedEventArgs e)
    {
        AspNetPager1.CurrentPageIndex = e.NewPageIndex;
        BindProduct();
    }
}
