namespace DSS.Model
{
   public class Infracction
    {
        public int InfracctionId { get; set; }
       public required string Date { get; set; }
       public required string Ubication { get; set; }
        public int RecordedSpeed { get; set; }
       public int LimitedSpeed { get; set; }
        public required Driver Driver { get; set; }
        public required Vehicles Vehicle { get; set; }
       public required string PaymentStatus { get; set; }
       public bool IsDelete { get; set; } = false;

   }
}