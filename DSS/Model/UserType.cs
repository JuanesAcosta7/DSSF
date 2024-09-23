using System.ComponentModel;

namespace DSS.Model
{
    public class UserType
    {
        public int UserTypeId { get; set; }
        public virtual required User User { get; set; }
        public virtual required Rol type { get; set; }
    }
}
