namespace DSS.Model
{
   public class Vehicles
    {
        public int VehicleId { get; set; }
        public required string VehiclePlate { get; set; }
        public required string VehicleModel { get; set; }
        public int VehicleYear { get; set; }
       public required Driver Driver { get; set; }
       public bool IsDelete { get; set; } = false;
        public DateTime Modified { get; set; }
        public required string ModifiedBy { get; set; }
    }
}
