using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;

public partial class showProduct : System.Web.UI.Page
{
    CSYC.BLL.Product bllp = new CSYC.BLL.Product();
    CSYC.Model.Product model = new CSYC.Model.Product();
    protected void Page_Load(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["ID"].ToString());
        model = bllp.GetModel(id);
        img.Src = model.PicUrl;
        txtName.InnerHtml = model.ProductName;
        txtNr.InnerHtml = model.Details;
    }
}
