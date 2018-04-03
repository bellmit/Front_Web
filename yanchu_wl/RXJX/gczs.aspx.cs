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

public partial class gczs : System.Web.UI.Page
{
    CSYC.BLL.Product bllp = new CSYC.BLL.Product();
    public int count;
    protected void Page_Load(object sender, EventArgs e)
    {
        count = bllp.GetCount(18);
    }
}
