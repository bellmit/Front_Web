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

public partial class Admin_Product_edit : System.Web.UI.Page
{
    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    CSYC.Model.Product model = new CSYC.Model.Product();
    CSYC.BLL.ProductType blltype = new CSYC.BLL.ProductType();
    protected string ProductName = "产品名称";
    protected string Standards = "产品规格";
    protected string Count = "产品数量";
    protected string Price = "产品价格";
    protected string Memo = "产品说明";
    protected string Details = "详细信息";
    protected string PicUrl = "产品图片";
    public int id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            ddldata();
            BindProduct();
        }
        string droptext = DropDownList1.SelectedValue;
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
    private void BindProduct()
    {
        model = bll.GetModel(id);
        if (model != null)
        {
            TextBox1.Text = model.ProductName;
            ListItem ls = DropDownList1.Items.FindByValue(model.TypeID.ToString());
            if (ls != null)
                ls.Selected = true;
            FCKeditor1.Value = model.Details;
            UpFileImg1.GetFilePath = model.PicUrl;
            Image img = (Image)UpFileImg1.FindControl("imgPreView");
            if (System.IO.File.Exists(Server.MapPath("~/" + model.PicUrl)))
                img.ImageUrl = "~/" + model.PicUrl;
            else
                img.ImageUrl = "~/upfile/users/yulan.jpg";
            ListItem ls1 = RadioButtonList1.Items.FindByValue(model.IsShow.ToString());
            if (ls1 != null)
                ls1.Selected = true;
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        model.ID = id;
        model.ProductName = TextBox1.Text;
        if (DropDownList1.Items[0].Selected == true)
        {
            Response.Write("<script>alert('请选择类型！')</script>");
        }
        else
        {
            model.TypeID = Convert.ToInt32(DropDownList1.SelectedValue);
        }
        model.Details = FCKeditor1.Value;
        model.PicUrl = UpFileImg1.GetFilePath;
        model.IsShow = Convert.ToInt32(RadioButtonList1.SelectedValue);
        if (bll.Update(model) > 0)
            Response.Write("<script>alert('修改成功！');location='List.aspx';</script>");
        else
            Response.Write("<script>alert('修改失败！');location='List.aspx';</script>");
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        TextBox1.Text = "";
        FCKeditor1.Value = "";
    }
}
