namespace DSS.Model
{
    public class Rol
    {
        public int RolId { get; set; }
        public required string rol { get; set; }
        public bool IsDelete { get; set; } = false;
        public DateTime Modified { get; set; }
        public required string ModifiedBy { get; set; }
    }
}
