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

public partial class Admin_News_add : System.Web.UI.Page
{
    CSYC.BLL.News bllnews = new CSYC.BLL.News();
    CSYC.Model.News model = new CSYC.Model.News();
    CSYC.BLL.NewsType bll = new CSYC.BLL.NewsType();
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
        DataTable dt = bll.GetList().Tables[0];
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
        model.Contents = FCKeditor1.Value;
        model.LinkUrl = TextBox2.Text;
        model.PicUrl = UpFileImg1.GetFilePath;
        model.Source = TextBox3.Text;
        model.Title = TextBox1.Text;
        model.IsHome = Convert.ToInt32(rbtHome.SelectedValue);
        if (DropDownList1.Items[0].Selected == true)
        {
            Label1.Text = "请选择其类别";
            return;
        }
        else 
        {
            model.TypeID = Convert.ToInt32(DropDownList1.SelectedValue);
        }
        if (bllnews.Add(model) > 0)
            Response.Write("<script>alert('恭喜您添加成功！')</script>");
        else
            Response.Write("<script>alert('添加失败！')</script>");
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        FCKeditor1.Value = "";
        TextBox2.Text = "";
        TextBox3.Text = "";
        TextBox1.Text = "";
    }
}
