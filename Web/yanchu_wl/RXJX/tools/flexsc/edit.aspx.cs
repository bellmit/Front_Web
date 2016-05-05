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

public partial class tools_flexsc_edit : System.Web.UI.Page
{
    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    public string TableSink = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            bind(10);
        }
    }
    public string GetImg(object imgurl)
    {
        string url = imgurl.ToString();
        if (url != "")
        {
            url = "../../" + url;
        }
        else
        {
            url = "../../upfile/users/wu.gif";
        }
        return url;
    }
    public void bind(int count)
    {
        try
        {
            DataSet ds = bll.GetListC(count);
            Repeater1.DataSource = ds;
            Repeater1.DataBind();
        }
        catch
        {
            Response.Write("抱歉出错了！");
            Response.Redirect("www.baidu.com");
        }
    }
    protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
    {
        if (DropDownList1.SelectedValue != "0")
        {
            bind(int.Parse(DropDownList1.SelectedValue));
        }
        else
        {
            int records = 0;
            DataSet ds1 = bll.GetList(0, 0, 0, 0);
            Repeater1.DataSource = ds1;
            Repeater1.DataBind();
        }
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        CSYC.BLL.Product bll = new CSYC.BLL.Product();
        CSYC.Model.Product model = new CSYC.Model.Product();
        int count = Repeater1.Items.Count;
        int state = 1;
        for (int i = 0; i < count; i++)
        {
            Label lb = (Label)Repeater1.Items[i].FindControl("ID");
            model = bll.GetModel(int.Parse(lb.Text));
            model.ProductName = TextBox1.Text;
            model.Details = TextBox2.Text;
            if (bll.Update(model) <= 0)
            {
                state = state * 0;
            }
        }
        if (state == 1)
        {
            Response.Write("<script>alert('恭喜您修改成功！');location='../../Admin/Product/List.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('有部分修改失败！');location='../../Admin/Product/List.aspx';</script>");
        }
    }
    protected void button1_Click(object sender, EventArgs e)
    {
        CSYC.BLL.Product bll = new CSYC.BLL.Product();
        CSYC.Model.Product model = new CSYC.Model.Product();
        int count = Repeater1.Items.Count;
        int state = 1;
        for (int i = 0; i < count; i++)
        {
            Label lb = (Label)Repeater1.Items[i].FindControl("ID");
            model = bll.GetModel(int.Parse(lb.Text));
            TextBox tb1 = (TextBox)Repeater1.Items[i].FindControl("Name");
            model.ProductName = tb1.Text;
            TextBox tb2 = (TextBox)Repeater1.Items[i].FindControl("Description");
            model.Details = tb2.Text;
            if (bll.Update(model) <= 0)
            {
                state = state * 0;
            }
        }
        if (state == 1)
        {
            Response.Write("<script>alert('恭喜您修改成功！');location='../../Admin/Product/List.aspx';</script>");
        }
        else
        {
            Response.Write("<script>alert('有部分修改失败！');location='../../Admin/Product/List.aspx';</script>");
        }
    }
}
