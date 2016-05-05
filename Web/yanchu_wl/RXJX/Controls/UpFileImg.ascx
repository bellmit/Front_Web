<%@ Control Language="C#" AutoEventWireup="true" CodeFile="UpFileImg.ascx.cs" Inherits="Controls_UpFileImg" %>
<table border="0">
    <tr>
        <td>
            <asp:TextBox ID="txtPic" runat="server" Width="180px" ></asp:TextBox></td>
        <td  style="margin-left:5px;margin-right:5px;padding-left:5px;padding-right:5px;">
            <asp:Image ID="imgPreView" runat="server"  Width="50px" ImageUrl="~/upfile/users/yulan.jpg" Height="50px" /></td>
    </tr>
    <tr>
        <td >
            <asp:FileUpload ID="FupdImg" runat="server" Width="180px" /></td><td style="margin-left:5px;margin-right:5px;padding-left:5px;padding-right:5px;">
            <asp:Button ID="btnUpFile" runat="server" Width="50px" OnClick="btnUpFile_Click" Text="上传" CausesValidation="False" /></td>
    </tr>
</table>
