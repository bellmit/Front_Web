using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

/// <summary>
/// ranK 的摘要说明
/// </summary>
public class ranK
{
	public ranK()
	{
		//
		// TODO: 在此处添加构造函数逻辑
		//
	}
    public static string SubString(int top, string str)
    {
        if (str.Length < top)
        {
            return str;
        }
        else
        {
            return str.Substring(0, top) + "..."; ;
        }
    }
}
