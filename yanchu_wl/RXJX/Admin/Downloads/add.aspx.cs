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

public partial class Admin_Downloads_ass : System.Web.UI.Page
{
    CSYC.BLL.Downloads blld = new CSYC.BLL.Downloads();
    CSYC.Model.Downloads model = new CSYC.Model.Downloads();

    private string filepath = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnUpFile_Click(object sender, EventArgs e)
    {
        UpFile();
    }
    /// <summary>
    /// 文件路径
    /// </summary>
    public string GetFilePath
    {
        get
        {
            return filepath = txtPic.Text;
        }

        set
        {
            txtPic.Text = value;
        }
    }
    /// <summary>
    /// 文件上传
    /// </summary>
    /// <returns>文件上传到服务器的路径</returns>
    void UpFile()
    {
        Random myrd = new Random();
        string path, filename, upfilepath;	//上传文件路径,上传文件名称
        path = Server.MapPath(Page.ResolveUrl("~/upfile/zip/"));
        filename = DateTime.Now.ToString("yyyyMMddmmssfff");
        //filename = DateTime.Now.ToString().Replace("-", "").Replace(":", "").Replace(" ", "") + myrd.Next(1000).ToString();		//上传文件名称
        //取得文件的扩展名
        string fileExtension = System.IO.Path.GetExtension(this.FupdImg.PostedFile.FileName.ToString()).ToLower();
        path = path + filename + fileExtension;
        if (fileExtension != ".zip" && fileExtension != ".doc" && fileExtension != ".rar" )
        {
            Response.Write("<script language='javascript'>alert('错误!!文件类型必须为压缩文件或Word!')</script>");
        }
        else if (FupdImg.PostedFile.ContentLength > 1024 * 1024)
            Response.Write("<script language='javascript'>alert('错误!!文件大小不能超过1M！')</script>");
        else
        {
            upfilepath = "upfile/users/" + filename + fileExtension;
            FupdImg.PostedFile.SaveAs(path);
            txtPic.Text = upfilepath;
            message.Text = "上传成功";
        }
    }
    protected void btn_Click(object sender, EventArgs e)
    {
        model.Title = txtT.Text.Trim();
        model.Durl = txtPic.Text.Trim();
        if (blld.Add(model) > 0) 
        {
            Response.Write("<script>alert('添加成功')</script>");
        }
    }
}
