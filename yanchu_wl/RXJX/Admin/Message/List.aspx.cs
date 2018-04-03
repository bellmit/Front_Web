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

public partial class Admin_message_add : System.Web.UI.Page
{
    CSYC.BLL.Message bll = new CSYC.BLL.Message();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Name"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
            BindMessage();
        }
    }
    private void BindMessage()
    {
        DataSet ds = new DataSet();
        ds = bll.GetList(0);
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

    protected void AspNetPager1_PageChanged1(object src, Wuqi.Webdiyer.PageChangedEventArgs e)
    {
        AspNetPager1.CurrentPageIndex = e.NewPageIndex;
        BindMessage();
    }
    protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        string url = string.Empty;
        int id = Convert.ToInt32(GridView1.DataKeys[e.RowIndex].Value);
        url = string.Format("delete.aspx?id=" + id);
        Response.Redirect(url);
    }
    protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            e.Row.Cells[5].Attributes.Add("onclick", "javascript:return confirm('确实要删除吗?!')");
        }
    }
    protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
    {
        string url = string.Empty;
        int id = Convert.ToInt32(GridView1.DataKeys[e.NewEditIndex].Value);
        url = string.Format("edit.aspx?id=" + id);
        Response.Redirect(url);
    }
    protected string SubString(int top, string str)
    {
        if (str.Length < top)
        {
            return str;
        }
        else
        {
            return str.Substring(0, top) + "..."; ;
        }
    }
    public string Ccheck(object obj)
    {
        string aaa;
        int ischeck = Convert.ToInt32(obj.ToString());
        if (ischeck == 1)
        {
            aaa = "是";
        }
        else
        {
            aaa = "否";
        }
        return aaa;
    }
}
