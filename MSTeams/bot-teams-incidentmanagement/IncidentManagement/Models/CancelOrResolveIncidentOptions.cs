using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IncidentManagement.Models
{
    public class CancelOrResolveIncidentOptions
    {
        public string incidentTitle { get; set; }
        public string incidentDescription { get; set; }
        public string incidentCategory { get; set; }
        public string CreatedBy { get; set; }
        public string createdByUserID { get; set; }
        public string ServiceName { get; set; }
        public string imagePath { get; set; }
        public string incidentStatus { get; set; }
    }
}
