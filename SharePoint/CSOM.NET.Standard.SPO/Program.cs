using Microsoft.Identity.Client;
using Microsoft.SharePoint.Client;
using System;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace CSOM.NET.Standard.SPO
{
    class Program
    {
        static async Task Main(string[] args)
        {
            string siteUrl = "https://nachan365.sharepoint.com/sites/SPDemo";
            string clientId = "4880fe20-f156-4673-9e64-1dca3dd781ff"; //e.g. 01e54f9a-81bc-4dee-b15d-e661ae13f382

            string certThumprint = "62D913AC57F6896580496DABF9350D6E5557CDAD"; // e.g. 2EE4C1FA809152EC8ED73B513AE70149B140F079

            // For SharePoint app only auth, the scope will be the SharePoint tenant name followed by /.default
            var scopes = new string[] { "https://tenant.sharepoint.com/.default" };

            // Tenant id can be the tenant domain or it can also be the GUID found in Azure AD properties.
            string tenantId = "nachan365.onmicrosoft.com";

            var accessToken = await GetApplicationAuthenticatedClient(clientId, certThumprint, scopes, tenantId);
            var clientContext = GetClientContextWithAccessToken(siteUrl, accessToken);

            Web web = clientContext.Web;
            clientContext.Load(web);
            clientContext.ExecuteQuery();

            Console.WriteLine(web.Title);
        }

        internal static async Task<string> GetApplicationAuthenticatedClient(string clientId, string certThumprint, string[] scopes, string tenantId)
        {
            X509Certificate2 certificate = GetAppOnlyCertificate(certThumprint);
            IConfidentialClientApplication clientApp = ConfidentialClientApplicationBuilder
                                            .Create(clientId)
                                            .WithCertificate(certificate)
                                            .WithTenantId(tenantId)
                                            .Build();

            AuthenticationResult authResult = await clientApp.AcquireTokenForClient(scopes).ExecuteAsync();
            string accessToken = authResult.AccessToken;
            return accessToken;
        }

        public static ClientContext GetClientContextWithAccessToken(string targetUrl, string accessToken)
        {
            ClientContext clientContext = new ClientContext(targetUrl);
            clientContext.ExecutingWebRequest +=
                delegate (object oSender, WebRequestEventArgs webRequestEventArgs)
                {
                    webRequestEventArgs.WebRequestExecutor.RequestHeaders["Authorization"] =
                        "Bearer " + accessToken;
                };

            return clientContext;
        }

        private static X509Certificate2 GetAppOnlyCertificate(string thumbPrint)
        {
            X509Certificate2 appOnlyCertificate = null;
            using (X509Store certStore = new X509Store(StoreName.My, StoreLocation.CurrentUser))
            {
                certStore.Open(OpenFlags.ReadOnly);
                X509Certificate2Collection certCollection = certStore.Certificates.Find(X509FindType.FindByThumbprint, thumbPrint, false);
                
                if (certCollection.Count > 0)
                {
                    appOnlyCertificate = certCollection[0];
                }
                
                certStore.Close();
                return appOnlyCertificate;
            }
        }
    }
}
