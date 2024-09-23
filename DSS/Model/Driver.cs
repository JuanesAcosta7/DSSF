namespace DSS.Model
{
   public class Driver
    {
        public int DriverId { get; set; }
        public required string DriverName { get; set; }
        public int LicenseNumber { get; set; }
        public required string Phone { get; set; }
        public bool IsDelete { get; set; } = false;
   }
}
