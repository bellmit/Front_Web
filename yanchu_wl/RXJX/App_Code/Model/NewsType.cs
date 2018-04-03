using System;
namespace CSYC.Model
{
	/// <summary>
	/// 实体类NewsType 。(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	public class NewsType
	{
		public NewsType()
		{}
		#region Model
		private int _id;
		private string _typename;
        private int parentid;
        private int _rootid;
		/// <summary>
		/// 编号
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 类别名
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
        public int RootID
        {
            set { _rootid = value; }
            get { return _rootid; }
        }
		#endregion Model

	}
}

