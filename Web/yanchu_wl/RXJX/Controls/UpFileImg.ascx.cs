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

public partial class Controls_UpFileImg : System.Web.UI.UserControl
{
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
            imgPreView.ImageUrl = value;
            txtPic.Text = value;
        }
    }

    /// <summary>
    /// 文件上传
    /// </summary>
    /// <returns>文件上传到服务器的路径</returns>
    void UpFile()
    {
        #region
        Random myrd = new Random();
        string path, filename, upfilepath;	//上传文件路径,上传文件名称
        path = Server.MapPath(Page.ResolveUrl("~/upfile/users/"));
	    filename=DateTime.Now.ToString("yyyyMMddmmssfff");
        //filename = DateTime.Now.ToString().Replace("-", "").Replace(":", "").Replace(" ", "") + myrd.Next(1000).ToString();		//上传文件名称
        //取得文件的扩展名
        string fileExtension = System.IO.Path.GetExtension(this.FupdImg.PostedFile.FileName.ToString()).ToLower();
        path = path + filename + fileExtension;
        if (fileExtension != ".jpg" && fileExtension != ".gif" && fileExtension != ".jpeg" && fileExtension != ".bmp" && fileExtension != ".swf")
        {
            Response.Write("<script language='javascript'>alert('错误!!文件类型必须为图片或flash!')</script>");
        }
        else if (FupdImg.PostedFile.ContentLength > 1024 * 1024)
            Response.Write("<script language='javascript'>alert('错误!!文件大小不能超过1M！')</script>");
        else
        {
            upfilepath = "upfile/users/" + filename + fileExtension;
            FupdImg.PostedFile.SaveAs(path);
            txtPic.Text = upfilepath;
            imgPreView.ImageUrl = "~/" + upfilepath;
        }
        #endregion
    }
}
