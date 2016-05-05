using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

public partial class UploadFile : System.Web.UI.Page
{
    CSYC.BLL.Product bll = new CSYC.BLL.Product();
    CSYC.Model.Product model = new CSYC.Model.Product();
    protected void Page_Load(object sender, EventArgs e)
    {
        Random myrd = new Random();
        string filename;
        string fileExtension;
        HttpFileCollection file = Request.Files;

        DataSet myds = new DataSet();
        DataTable mydt = new DataTable("img");
        DataRow mydr;
        mydt.Columns.Add(new DataColumn("ID"));
        mydt.Columns.Add(new DataColumn("ProductName"));
        mydt.Columns.Add(new DataColumn("PicUrl"));
        int i;
        for (i = 0; i < file.Count; i++)
        {
            
            //随机生成文件名
            filename = DateTime.Now.ToString().Replace("-", "").Replace(":", "").Replace(" ", "") + myrd.Next(1000).ToString();
            //取得文件的扩展名
            fileExtension = System.IO.Path.GetExtension(file[i].FileName.ToString()).ToLower();
            //file[i].SaveAs(Server.MapPath(".") + "\\" + file[i].FileName);
            file[i].SaveAs(Server.MapPath("~") + "\\"+"upfile"+"\\"+"users"+"\\" + filename+fileExtension);
            model.ProductName = System.IO.Path.GetFileNameWithoutExtension(file[i].FileName.ToString());   
            model.PicUrl = "upfile/users/" + filename + fileExtension;
            model.TypeID = int.Parse(Session["typeid_img"].ToString());
            bll.Add(model);
            
        }
        
        //DataSet ds = bll.GetList(abc);
        //Session["imgcount"] = ds;
    }
}
