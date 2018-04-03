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

public partial class Admin_foot_List : System.Web.UI.Page
{
    CSYC.BLL.Foot bll = new CSYC.BLL.Foot();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Name"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
            BindFoot();
        }
    }
    private void BindFoot()
    {
        DataSet ds = new DataSet();
        ds = bll.GetList(0);
        GridView1.DataSource = ds;
        GridView1.DataBind();
    }

    protected void GridView1_RowCreated(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            e.Row.Cells[6].Attributes.Add("onclick", "javascript:return confirm('确实要删除吗?!')");
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
}
