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

public partial class Admin_News_class_list : System.Web.UI.Page
{
    CSYC.BLL.NewsType bll = new CSYC.BLL.NewsType();
    CSYC.Model.NewsType modle = new CSYC.Model.NewsType();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindType();
        }
    }
    private void BindType()
    {
        int records = 0;
        int k = 0;
        if (SearchKeyword == "")
            k = 0;
        else
            k = 1;
        DataSet ds = new DataSet();
        ds = bll.GetList();
        GridView1.DataSource = ds;
        GridView1.DataBind();
    }
    public string Ctype(object obj)
    {
        int typeid = 0;
        string typename = string.Empty;
        if (obj.ToString() != "")
        {
            typeid = Convert.ToInt32(obj);
            modle = bll.GetModel(typeid);
            if (modle != null)
            {
                typename = modle.TypeName;
            }
            else
            {
                typename = "无";
            }
        }
        return typename;
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
    protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowIndex != -1)
        {
            int id = e.Row.RowIndex + 1;
            e.Row.Cells[0].Text = id.ToString();
        }
    }
    protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            e.Row.Cells[5].Attributes.Add("onclick", "javascript:return confirm('确实要删除吗?!')");
        }
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
    protected void AspNetPager1_PageChanged(object sender, EventArgs e)
    {
        BindType();
    }
}
