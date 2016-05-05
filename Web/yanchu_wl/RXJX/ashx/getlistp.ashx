<%@ WebHandler Language="C#" Class="getlistp" %>

using System;
using System.Web;
using System.Data;

public class getlistp : IHttpHandler {

    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        int cur = Convert.ToInt32(context.Request.QueryString["current"].ToString());
        int TypeID = Convert.ToInt32(context.Request.QueryString["TypeID"].ToString());
        string ress = getnewlist(cur, 12, TypeID);
        context.Response.Write(ress);
    }
    public string getnewlist(int current, int count, int TypeID)
    {
        string res = string.Empty;
        DataSet ds = bll.GetList(current, count, TypeID);
        if (ds != null && ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                res += ds.Tables[0].Rows[i]["ID"].ToString() + "," + ds.Tables[0].Rows[i]["ProductName"].ToString() + "," + ds.Tables[0].Rows[i]["PicUrl"].ToString() + "|";
            }
            return res;
        }
        else
        {
            return res;
        }
    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}