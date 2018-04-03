using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

public partial class MasterPage2 : System.Web.UI.MasterPage
{
    CSYC.BLL.Foot bllf = new CSYC.BLL.Foot();
    CSYC.BLL.News blln = new CSYC.BLL.News();

    public string top, foot;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack) 
        {
            bind();
        }
    }
    public void bind() 
    {
        DataSet dsf = bllf.GetList(1);
        if (dsf.Tables[0].Rows.Count > 0)
        {
            top = dsf.Tables[0].Rows[0]["Gsm"].ToString();
            foot = dsf.Tables[0].Rows[0]["Footc"].ToString();
        }
        //聘请精英
        DataSet dsn = blln.GetList(34, 0, 6, 1);
        rptNew.DataSource = dsn;
        rptNew.DataBind();
    }
}
