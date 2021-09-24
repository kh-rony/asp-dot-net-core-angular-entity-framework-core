using System;

#nullable disable

namespace ASPDotNETCoreAngularEFCore.Models
{
    public sealed partial class Reading
    {
        public int Id { get; set; }
        public int BuildingId { get; set; }
        public int ObjectId { get; set; }
        public decimal Value { get; set; }
        public DateTime? Timestamp { get; set; }

        public Building Building { get; set; }
        public Object Object { get; set; }
    }
}