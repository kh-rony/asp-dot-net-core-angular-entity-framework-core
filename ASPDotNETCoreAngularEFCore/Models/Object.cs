using System.Collections.Generic;

#nullable disable

namespace ASPDotNETCoreAngularEFCore.Models
{
    public partial class Object
    {
        public Object()
        {
            Readings = new HashSet<Reading>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int BuildingId { get; set; }

        public virtual Building Building { get; set; }
        public virtual ICollection<Reading> Readings { get; set; }
    }
}