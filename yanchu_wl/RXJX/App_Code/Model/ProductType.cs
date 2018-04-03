using System;
namespace CSYC.Model
{
	/// <summary>
	/// 实体类ProductType 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	public class ProductType
	{
		public ProductType()
		{}
		#region Model
		private int _id;
		private string _typename;
        private int parentid;
		/// <summary>
		/// 产品类别编号
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 产品类别名称
		/// </summary>
		public string TypeName
		{
			set{ _typename=value;}
			get{return _typename;}
		}
        /// <summary>
        /// 父类编号
        /// </summary>
        public int ParentID
        {
            set { parentid = value; }
            get { return parentid; }
        }
		#endregion Model

	}
}

