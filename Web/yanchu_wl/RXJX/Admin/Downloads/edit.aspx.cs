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

public partial class Admin_Downloads_edit : System.Web.UI.Page
{
    CSYC.BLL.Downloads bll = new CSYC.BLL.Downloads();
    CSYC.Model.Downloads model = new CSYC.Model.Downloads();
    public int Id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!int.TryParse(Request.Params["id"] as string, out this.Id))
        {
            Response.Write("<script>alert('信息有误！')</script>");
        }
        if (!IsPostBack)
        {
            Bind();
        }
    }
    private void Bind()
    {
        model = bll.GetModel(this.Id);
        txtT.Text = model.Title;
        txtPic.Text = model.Durl;
    }
    protected void btn_Click(object sender, EventArgs e)
    {
        model.ID = Id;
        model.Title = txtT.Text.Trim();
        model.Durl = txtPic.Text.Trim();
        if (bll.Update(model) > 0) 
        {
            Response.Write("<script>alert('修改成功！');location='List.aspx';</script>");
        }
    }
    protected void btnUpFile_Click(object sender, EventArgs e)
    {
        Random myrd = new Random();
        string path, filename, upfilepath;	//上传文件路径,上传文件名称
        path = Server.MapPath(Page.ResolveUrl("~/upfile/zip/"));
        filename = DateTime.Now.ToString("yyyyMMddmmssfff");
        //filename = DateTime.Now.ToString().Replace("-", "").Replace(":", "").Replace(" ", "") + myrd.Next(1000).ToString();		//上传文件名称
        //取得文件的扩展名
        string fileExtension = System.IO.Path.GetExtension(this.FupdImg.PostedFile.FileName.ToString()).ToLower();
        path = path + filename + fileExtension;
        if (fileExtension != ".zip" && fileExtension != ".doc" && fileExtension != ".rar")
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
}
