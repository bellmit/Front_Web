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

public partial class Admin_Navigation_Listt : System.Web.UI.Page
{
    CSYC.BLL.Navigation bll = new CSYC.BLL.Navigation();
    CSYC.Model.Navigation modle = new CSYC.Model.Navigation();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindType();
        }
    }
    private void BindType()
    {
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
                typename = modle.Nname;
            }
            else
            {
                typename = "无";
            }
        }
        return typename;
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
}
