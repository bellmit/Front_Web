using System;
namespace CSYC.Model
{
	/// <summary>
	/// 实体类Product 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	public class Product
	{
		public Product()
		{}
		#region Model
		private int _id;
		private int _typeid;
		private string _productname;
		private string _standards;
		private decimal _sount;
		private decimal _price;
		private string _picurl;
		private DateTime _addtime;
        private string _beiz;
		private string _details;
        private int _isshow;
		/// <summary>
		/// 产品编号
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 类别名称
		/// </summary>
		public int TypeID
		{
			set{ _typeid=value;}
			get{return _typeid;}
		}
		/// <summary>
		/// 产品名称
		/// </summary>
		public string ProductName
		{
			set{ _productname=value;}
			get{return _productname;}
		}
		/// <summary>
		/// 产品规格
		/// </summary>
		public string Standards
		{
			set{ _standards=value;}
			get{return _standards;}
		}
		/// <summary>
		/// 产品数量
		/// </summary>
        public decimal Sount
		{
			set{ _sount=value;}
			get{return _sount;}
		}
		/// <summary>
		/// 产品价格
		/// </summary>
        public decimal Price
		{
			set{ _price=value;}
			get{return _price;}
		}
		/// <summary>
		/// 产品图片url
		/// </summary>
		public string PicUrl
		{
			set{ _picurl=value;}
			get{return _picurl;}
		}
		/// <summary>
		/// 添加时间
		/// </summary>
		public DateTime AddTime
		{
			set{ _addtime=value;}
			get{return _addtime;}
		}
		/// <summary>
		/// 备注
		/// </summary>
		public string Beiz
		{
			set{ _beiz=value;}
			get{return _beiz;}
		}
		/// <summary>
		/// 产品详细信息
		/// </summary>
		public string Details
		{
			set{ _details=value;}
			get{return _details;}
		}
        /// <summary>
        /// 是否首页显示
        /// </summary>
        public int IsShow
        {
            set { _isshow = value; }
            get { return _isshow; }
        }
		#endregion Model

	}
}

