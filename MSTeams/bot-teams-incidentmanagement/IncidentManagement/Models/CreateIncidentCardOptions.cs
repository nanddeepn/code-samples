namespace IncidentManagement.Models
{
    public class CreateIncidentCardOptions
    {
        public string incidentTitle { get; set; }
        public string incidentDescription { get; set; }
        public string incidentCategory { get; set; }
        public string createdBy { get; set; }
        public string serviceName { get; set; }
        public string imagePath { get; set; }
    }
}
