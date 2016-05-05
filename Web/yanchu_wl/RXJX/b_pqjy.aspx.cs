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

public partial class b_pqjy : System.Web.UI.Page
{
    CSYC.BLL.News blln = new CSYC.BLL.News();
    public int count;
    protected void Page_Load(object sender, EventArgs e)
    {
        count = blln.GetCount(34);
    }
}
