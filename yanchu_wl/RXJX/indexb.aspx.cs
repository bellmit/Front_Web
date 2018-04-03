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

public partial class indexb : System.Web.UI.Page
{
    CSYC.BLL.Foot bllf = new CSYC.BLL.Foot();
    CSYC.BLL.News blln = new CSYC.BLL.News();
    CSYC.BLL.Product bllp = new CSYC.BLL.Product();

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
        //我们的设备
        DataSet dsp = bllp.GetList(29, 0, 6, 1);
        rptProd.DataSource = dsp;
        rptProd.DataBind();
        //设备的应用
        DataSet dsn1 = blln.GetList(57, 0, 4, 1);
        rptNew1.DataSource = dsn1;
        rptNew1.DataBind();

        //...
        DataSet dsp1 = bllp.GetList(29, 0, 9, 1);
        rptProd1.DataSource = dsp1;
        rptProd1.DataBind();
    }
}
