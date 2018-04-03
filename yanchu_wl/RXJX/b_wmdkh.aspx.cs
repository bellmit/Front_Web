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

public partial class b_wmdkh : System.Web.UI.Page
{
    CSYC.BLL.News blln = new CSYC.BLL.News();

    public string txtNr;
    protected void Page_Load(object sender, EventArgs e)
    {
        DataSet ds = blln.GetList(58, 0, 1, 1);
        if (ds.Tables[0].Rows.Count > 0) 
        {
            txtNr = ds.Tables[0].Rows[0]["Contents"].ToString();
        }
    }
}
