﻿namespace DSS.Model
{
    public class UserType
    {
       public int UserTypeId { get; set; }
       public virtual required User User { get; set; }
       public virtual required Rol type { get; set; }
       public bool IsDelete { get; set; } = false;
        public DateTime Modified { get; set; }
        public required string ModifiedBy { get; set; }
    }
}
