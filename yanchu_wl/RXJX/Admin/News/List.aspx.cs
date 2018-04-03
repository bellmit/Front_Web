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
using System.IO;

public partial class Admin_News_List : System.Web.UI.Page
{
    CSYC.BLL.News bll = new CSYC.BLL.News();
    CSYC.Model.News modeln = new CSYC.Model.News();
    CSYC.BLL.NewsType blltype = new CSYC.BLL.NewsType();
    CSYC.Model.NewsType model = new CSYC.Model.NewsType();
    public int typeid;
    public int ptID;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Name"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
            ddldata();
            BindNews();
        }
    }
    private void BindNews()
    {
        typeid = int.Parse(DropDownList1.SelectedValue);
        DataSet ds = new DataSet();
        model = blltype.GetModel(typeid);
        int count = 0;
        if (model != null)
        {
            ptID = model.ParentID;
            count = blltype.GetListC(typeid);
        }
        if (ptID == 0 && typeid != 0 && count > 0)
        {
            ds = bll.GetList(typeid, 1, 0, 0);
        }
        else
        {
            ds = bll.GetList(typeid, 0, 0, 0);
        }
        PagedDataSource pds = new PagedDataSource();
        pds.DataSource = ds.Tables[0].DefaultView;
        AspNetPager1.RecordCount = ds.Tables[0].DefaultView.Count;
        pds.AllowPaging = true;
        pds.CurrentPageIndex = AspNetPager1.CurrentPageIndex - 1;
        pds.PageSize = AspNetPager1.PageSize;
        GridView1.DataSource = pds;
        GridView1.DataBind();
        lbltotal.Text = AspNetPager1.PageCount.ToString();
        lblcurrent.Text = AspNetPager1.CurrentPageIndex.ToString();
        lblall.Text = ds.Tables[0].Rows.Count.ToString();
    }

    protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            e.Row.Cells[7].Attributes.Add("onclick", "javascript:return confirm('确实要删除吗?!')");
        }
    }
    protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowIndex != -1)
        {
            int id = e.Row.RowIndex + 1;
            e.Row.Cells[1].Text = id.ToString();
        }
    }
    protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        string url = string.Empty;
        int id = Convert.ToInt32(GridView1.DataKeys[e.RowIndex].Value);
        url = string.Format("delete.aspx?id=" + id);
        Response.Redirect(url);
    }
    protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
    {
        string url = string.Empty;
        int id = Convert.ToInt32(GridView1.DataKeys[e.NewEditIndex].Value);
        url = string.Format("edit.aspx?id=" + id);
        Response.Redirect(url);
    }
    public string Ctype(object obj)
    {
        int typeid = 0;
        string typename = string.Empty;
        if (obj.ToString() != "")
        {
            typeid = Convert.ToInt32(obj);
            model = blltype.GetModel(typeid);
            if (model != null)
            {
                typename = model.TypeName;
            }
            else
            {
                typename = "无";
            }
        }
        return typename;
    }
    private string SearchKeyword
    {
        get
        {
            if (ViewState["SearchKeyword"] == null)
                ViewState["SearchKeyword"] = "";
            return (string)ViewState["SearchKeyword"];
        }
        set
        {
            ViewState["SearchKeyword"] = value;
        }
    }
    //分类的DropDownList分类绑定
    public void ddldata()
    {
        DataTable dt = blltype.GetList().Tables[0];
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
    protected void Button2_Click(object sender, EventArgs e)
    {
        CheckBox2.Checked = false;
        for (int i = 0; i <= GridView1.Rows.Count - 1; i++)
        {
            CheckBox cbox = (CheckBox)GridView1.Rows[i].FindControl("CheckBox1");
            cbox.Checked = false;
        }
    }
    protected void CheckBox1_CheckedChanged(object sender, EventArgs e)
    {
        for (int i = 0; i <= GridView1.Rows.Count - 1; i++)
        {
            CheckBox cbox = (CheckBox)GridView1.Rows[i].FindControl("CheckBox1");
            if (CheckBox2.Checked == true)
            {
                cbox.Checked = true;
            }
            else
            {
                cbox.Checked = false;
            }
        }
    }
    protected void Button3_Click(object sender, EventArgs e)
    {
        for (int i = 0; i <= GridView1.Rows.Count - 1; i++)
        {
            CheckBox cbox = (CheckBox)GridView1.Rows[i].FindControl("CheckBox1");
            if (cbox.Checked == true)
            {
                int id = int.Parse(GridView1.Rows[i].Cells[2].Text.ToString().Trim());
                modeln = bll.GetModel(id);
                if (modeln != null)
                {
                    string url = modeln.PicUrl;
                    if (File.Exists(url))
                    {
                        File.Delete(url);
                    }
                }
                bll.Delete(id);
                string url1 = Server.MapPath("~/News/News" + id + ".htm");
                if (File.Exists(url1))
                {
                    File.Delete(url1);
                }
            }
        }
        BindNews();
    }
    protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
    {
        BindNews();
    }
    protected void AspNetPager1_PageChanged1(object src, Wuqi.Webdiyer.PageChangedEventArgs e)
    {
        AspNetPager1.CurrentPageIndex = e.NewPageIndex;
        BindNews();
    }
}
