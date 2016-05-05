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

public partial class Admin_News_edit : System.Web.UI.Page
{
    CSYC.BLL.News bllnews = new CSYC.BLL.News();
    CSYC.Model.News model = new CSYC.Model.News();
    CSYC.BLL.NewsType bll = new CSYC.BLL.NewsType();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id)) 
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            ddldata();
            BindNews();
        }
    }
    private void BindNews()
    {
        model = bllnews.GetModel(this.Id);
        FCKeditor1.Value = model.Contents;
        TextBox2.Text = model.LinkUrl;
        ViewState["src"] = model.PicUrl;
        UpFileImg1.GetFilePath = model.PicUrl;
        Image img = (Image)UpFileImg1.FindControl("imgPreView");
        if (System.IO.File.Exists(Server.MapPath("~/" + model.PicUrl)))
            img.ImageUrl = "~/" + model.PicUrl;
        else
            img.ImageUrl = "~/upfile/users/yulan.jpg";
        TextBox3.Text = model.Source;
        TextBox1.Text = model.Title;
        ListItem ls = DropDownList1.Items.FindByValue(model.TypeID.ToString());
        if (ls != null)
        {
            ls.Selected = true;
        }
        ListItem ls1 = rbtHome.Items.FindByValue(model.IsHome.ToString());
        if (ls1 != null)
        {
            ls1.Selected = true;
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
    private string Src
    {
        get
        {
            if (ViewState["src"] == null)
                ViewState["src"] = "";
            return (string)ViewState["src"];
        }
        set
        {
            ViewState["src"] = value;
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        model.ID = this.Id;
        model.Contents = FCKeditor1.Value;
        model.LinkUrl = TextBox2.Text;
        model.PicUrl = UpFileImg1.GetFilePath;
        model.Source = TextBox3.Text;
        model.Title = TextBox1.Text;
        model.IsHome = Convert.ToInt32(rbtHome.SelectedValue);
        if (DropDownList1.Items[0].Selected == true)
        {
            Response.Write("<script>alert('请选择其类别！')</script>");
        }
        else
        {
            model.TypeID = Convert.ToInt32(DropDownList1.SelectedValue);
        }
        if ( bllnews.Update(model) > 0)
        {
            if (UpFileImg1.GetFilePath != Src && System.IO.File.Exists(Server.MapPath("~/" + Src)))
                System.IO.File.Delete(Server.MapPath("~/" + Src));
            Response.Write("<script>alert('修改成功！');location='List.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('修改失败！')</script>");
        }
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        FCKeditor1.Value = "";
        TextBox2.Text = "";
        TextBox3.Text = "";
        TextBox1.Text = "";
    }
}
