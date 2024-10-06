namespace DSS.Model
{
    public class User
    {
        public int UserId { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public bool IsDelete { get; set; } = false;
        public DateTime Modified { get; set; }
        public required string ModifiedBy { get; set; }

    }
}
