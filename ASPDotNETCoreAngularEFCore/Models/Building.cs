using System.Collections.Generic;

#nullable disable

namespace ASPDotNETCoreAngularEFCore.Models
{
    public sealed partial class Building
    {
        public Building()
        {
            Objects = new HashSet<Object>();
            Readings = new HashSet<Reading>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }

        public ICollection<Object> Objects { get; set; }
        public ICollection<Reading> Readings { get; set; }
    }
}