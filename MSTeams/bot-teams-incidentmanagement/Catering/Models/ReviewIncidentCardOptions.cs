namespace IncidentManagement.Models
{
    public class ReviewIncidentCardOptions
    {
        public string createdBy { get; set; }
        public string createdUtc { get; set; }
        public string serviceName { get; set; }
        public string imagePath { get; set; }
        public string imageAlt { get; set; }
        public string profileImage { get; set; }
        public string assignedToName { get; set; }
        public string incidentTitle { get; set; }
        public string incidentDescription { get; set; }
        public string incidentCategory { get; set; }
        public string userMRI { get; set; }
    }
}
