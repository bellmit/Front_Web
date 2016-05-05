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

public partial class showNews : System.Web.UI.Page
{
    CSYC.BLL.News blln = new CSYC.BLL.News();
    CSYC.Model.News model = new CSYC.Model.News();
    protected void Page_Load(object sender, EventArgs e)
    {
        int id = Convert.ToInt32(Request.QueryString["ID"].ToString());
        model = blln.GetModel(id);
        txtTitle.InnerHtml = model.Title;
        txtNr.InnerHtml = model.Contents;
    }
}
