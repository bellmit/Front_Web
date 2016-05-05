/*正则常量*/
function c_Regular(){
	var c_regular={};
	c_regular.Mobile=/^(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/;
	c_regular.Email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	c_regular.UserName=/^[0-9A-Za-z_\u2E80-\u9FFF]{2,32}/;
	c_regular.ZHUserName=/^[\u2E80-\u9FFF]{2,16}/;
	c_regular.Phone=/^((0[0-9]{2,3})(\-{0,1}))([2-9][0-9]{6,7})$/;
	return c_regular;
}