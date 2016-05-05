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

public partial class index : System.Web.UI.Page
{
    CSYC.BLL.Foot bllf = new CSYC.BLL.Foot();
    CSYC.BLL.Navigation bllna = new CSYC.BLL.Navigation();
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
        //导航
        DataSet dsna = bllna.GetList();
        rptNa.DataSource = dsna;
        rptNa.DataBind();
        //聘请精英
        DataSet dsn = blln.GetList(34, 0, 6, 1);
        rptNew.DataSource = dsn;
        rptNew.DataBind();
        //工程案例
        DataSet dsp = bllp.GetList(17, 0, 6, 1);
        rptProd.DataSource = dsp;
        rptProd.DataBind();
        //新闻
        DataSet dsn1 = blln.GetList(32, 0, 9, 1);
        rptNew1.DataSource = dsn1;
        rptNew1.DataBind();
        //代理展示
        DataSet dsp1 = bllp.GetList(19, 0, 2, 1);
        rptProd1.DataSource = dsp1;
        rptProd1.DataBind();
        //工程展示
        DataSet dsp2 = bllp.GetList(18, 0, 10, 1);
        rptProd2.DataSource = dsp2;
        rptProd2.DataBind();
    }
}
