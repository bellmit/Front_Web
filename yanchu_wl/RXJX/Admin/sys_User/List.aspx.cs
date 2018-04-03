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

public partial class Admin_sys_User_list : System.Web.UI.Page
{
    CSYC.BLL.sys_User bll = new CSYC.BLL.sys_User();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) 
        {
            if (Session["Name"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
            BindUser();
        }
    }
    private void BindUser()
    {
        DataSet ds = new DataSet();
        ds = bll.GetList("");
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
                bll.Delete(id);
            }
        }
        BindUser();
    }
    protected void AspNetPager1_PageChanged1(object src, Wuqi.Webdiyer.PageChangedEventArgs e)
    {
        BindUser();
    }
}
