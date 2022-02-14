﻿using AdaptiveCards;
using AdaptiveCards.Templating;
using IncidentManagement.Cards;
using IncidentManagement.Models;
using Microsoft.Bot.AdaptiveCards;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Teams;
using Microsoft.Bot.Schema;
using Microsoft.Bot.Schema.Teams;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace IncidentManagement
{

    public class IncidentManagementBot : ActivityHandler
    {
        private BotState _userState;
        private readonly IConfiguration _configuration;
        private string serviceName = string.Empty;
        private string imagePath = string.Empty;
        private static string imageBasePath = "https://raw.githubusercontent.com/nanddeepn/code-samples/master/MSTeams/bot-teams-incidentmanagement/IncidentManagement/Images/";
        private List<MemberDetails> memberDetails = new List<MemberDetails> { };

        public IncidentManagementBot(UserState userState, IConfiguration configuration)
        {
            _userState = userState;
            _configuration = configuration;
        }

        public override async Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken = default(CancellationToken))
        {
            await base.OnTurnAsync(turnContext, cancellationToken);

            await _userState.SaveChangesAsync(turnContext, false, cancellationToken);
        }

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            var input = turnContext.Activity.Text?.Trim();
            if (input.ToLower().Contains("raise", StringComparison.InvariantCultureIgnoreCase))
            {
                serviceName = "Office 365";
                imagePath = $"{imageBasePath}/office365_logo.jpg";

                if (input.ToLower().Contains("sharepoint", StringComparison.InvariantCultureIgnoreCase))
                {
                    serviceName = "SharePoint";
                    imagePath = $"{imageBasePath}/sharepoint_logo.png";
                }
                else if (input.ToLower().Contains("teams", StringComparison.InvariantCultureIgnoreCase))
                {
                    serviceName = "MS Teams";
                    imagePath = $"{imageBasePath}/teams_logo.png";
                }

                var member = await TeamsInfo.GetMemberAsync(turnContext, turnContext.Activity.From.Id, cancellationToken);
                await SendHttpToTeams(HttpMethod.Post, MessageFactory.Attachment(new CardResource("InitialCard.json").AsAttachment(
                            new
                            {
                                createdByUserID = member.Id,
                                createdBy = turnContext.Activity.From.Name,
                                serviceName = serviceName,
                                imagePath = imagePath
                            })), turnContext.Activity.Conversation.Id);
            }
            else
            {
                await turnContext.SendActivityAsync(MessageFactory.Text("Invalid parameter"), cancellationToken);
            }
        }

        protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
        {
            if (AdaptiveCardInvokeValidator.IsAdaptiveCardAction(turnContext) && (turnContext.Activity.Name == "adaptiveCard/action"))
            {
                var userSA = _userState.CreateProperty<User>(nameof(User));
                var user = await userSA.GetAsync(turnContext, () => new User() { Id = turnContext.Activity.From.Id });

                try
                {
                    AdaptiveCardInvoke request = AdaptiveCardInvokeValidator.ValidateRequest(turnContext);

                    if (request.Action.Verb == "initialRefresh")
                    {
                        var members = new List<TeamsChannelAccount>();
                        string continuationToken = null;

                        do
                        {
                            var currentPage = await TeamsInfo.GetPagedMembersAsync(turnContext, 100, continuationToken, cancellationToken);
                            continuationToken = currentPage.ContinuationToken;
                            members.AddRange(currentPage.Members);
                        }
                        while (continuationToken != null);

                        foreach (var member in members)
                        {
                            if (member.AadObjectId != turnContext.Activity.From.AadObjectId)
                            {
                                var newMemberInfo = new MemberDetails { value = member.Id, title = member.Name };
                                memberDetails.Add(newMemberInfo);
                            }
                        }

                        var cardOptions = AdaptiveCardInvokeValidator.ValidateAction<InitialCardOptions>(request);
                        var responseBody = await ProcessCreateIncident(cardOptions, turnContext);
                        return CreateInvokeResponse(responseBody);
                    }
                    else if (request.Action.Verb == "createIncident")
                    {
                        var cardOptions = AdaptiveCardInvokeValidator.ValidateAction<CreateIncidentCardOptions>(request);
                        var responseBody = await ProcessReviewIncident(cardOptions, turnContext);
                        return CreateInvokeResponse(responseBody);
                    }
                    else if (request.Action.Verb == "editOrResolveIncident")
                    {
                        var cardOptions = AdaptiveCardInvokeValidator.ValidateAction<ReviewIncidentCardOptions>(request);

                        if (cardOptions.createdByUserID == turnContext.Activity.From.Id)
                        {
                            var responseBody = await ProcessCancelOrResolveIncident("CancelIncident.json", cardOptions, turnContext);
                            return CreateInvokeResponse(responseBody);
                        }
                        else if (cardOptions.assignedToUserID == turnContext.Activity.From.Id)
                        {
                            var responseBody = await ProcessCancelOrResolveIncident("ResolveIncident.json", cardOptions, turnContext);
                            return CreateInvokeResponse(responseBody);
                        }
                    }
                    else if (request.Action.Verb == "cancelIncident" || request.Action.Verb == "resolveIncident")
                    {
                        var cardOptions = AdaptiveCardInvokeValidator.ValidateAction<CancelOrResolveIncidentOptions>(request);
                        var responseBody = await CloseIncident(request.Action.Verb, cardOptions, turnContext);
                        return CreateInvokeResponse(responseBody);
                    }
                    else
                    {
                        AdaptiveCardActionException.VerbNotSupported(request.Action.Type);
                    }
                }
                catch (AdaptiveCardActionException e)
                {
                    return CreateInvokeResponse(HttpStatusCode.OK, e.Response);
                }
            }

            return null;
        }

        private async Task<AdaptiveCardInvokeResponse> ProcessCreateIncident(InitialCardOptions cardOptions, ITurnContext<IInvokeActivity> turnContext)
        {
            return CardResponse("CreateIncident.json", new
            {
                serviceName = cardOptions.serviceName,
                imagePath = cardOptions.imagePath,
                imageAlt = cardOptions.serviceName,
                createdBy = cardOptions.createdBy,
                createdByUserID = cardOptions.createdByUserID,
                assignees = memberDetails
            });
        }

        private async Task<InvokeResponse> ProcessReviewIncident(CreateIncidentCardOptions cardOptions, ITurnContext<IInvokeActivity> turnContext)
        {
            var cardData = new
            {
                createdBy = cardOptions.createdBy,
                createdByUserID = cardOptions.createdByUserID,
                createdUtc = DateTime.Now.ToString("dddd, dd MMMM yyyy"),
                serviceName = cardOptions.serviceName,
                imagePath = cardOptions.imagePath,
                imageAlt = cardOptions.serviceName,
                profileImage = $"{imageBasePath}/profile_image.png",
                assignedToUserID = cardOptions.assignedToUserID,
                incidentTitle = cardOptions.incidentTitle,
                incidentDescription = cardOptions.incidentDescription,
                incidentCategory = cardOptions.incidentCategory
            };

            string cardJson;
            string[] reviewIncidentCard = { ".", "Resources", "ReviewIncident.json" };
            var responseAttachment = GetResponseAttachment(reviewIncidentCard, cardData, out cardJson);

            Activity pendingActivity = new Activity();
            pendingActivity.Type = "message";
            pendingActivity.Id = turnContext.Activity.ReplyToId;
            pendingActivity.Attachments = new List<Attachment> { responseAttachment };
            await turnContext.UpdateActivityAsync(pendingActivity);

            JObject response = JObject.Parse(cardJson);
            AdaptiveCardInvokeResponse adaptiveCardResponse = new AdaptiveCardInvokeResponse()
            {
                StatusCode = 200,
                Type = AdaptiveCard.ContentType,
                Value = response
            };

            return CreateInvokeResponse(adaptiveCardResponse);
        }

        private async Task<AdaptiveCardInvokeResponse> ProcessCancelOrResolveIncident(string cardName, ReviewIncidentCardOptions cardOptions, ITurnContext<IInvokeActivity> turnContext)
        {
            string userMRI = string.Empty;
            if (cardName == "CancelIncident.json")
            {
                userMRI = cardOptions.createdByUserID;
            }
            else if (cardName == "ResolveIncident.json")
            {
                userMRI = cardOptions.assignedToUserID;
            }

            var cardData = new
            {
                createdBy = cardOptions.createdBy,
                createdByUserID = cardOptions.createdByUserID,
                createdUtc = DateTime.Now.ToString("dddd, dd MMMM yyyy"),
                serviceName = cardOptions.serviceName,
                imagePath = cardOptions.imagePath,
                imageAlt = cardOptions.serviceName,
                assignedToUserID = cardOptions.assignedToUserID,
                profileImage = $"{imageBasePath}/profile_image.png",
                incidentTitle = cardOptions.incidentTitle,
                incidentDescription = cardOptions.incidentDescription,
                incidentCategory = cardOptions.incidentCategory,
                userMRI = userMRI
            };

            return CardResponse(cardName, cardData);
        }

        private Attachment GetResponseAttachment(string[] filepath, object data, out string cardJsonString)
        {
            var adaptiveCardJson = File.ReadAllText(Path.Combine(filepath));
            AdaptiveCardTemplate template = new AdaptiveCardTemplate(adaptiveCardJson);

            cardJsonString = template.Expand(data);
            var adaptiveCardAttachment = new Attachment()
            {
                ContentType = "application/vnd.microsoft.card.adaptive",
                Content = JsonConvert.DeserializeObject(cardJsonString),
            };

            return adaptiveCardAttachment;
        }

        private async Task<InvokeResponse> CloseIncident(string verb, CancelOrResolveIncidentOptions cardOptions, ITurnContext<IInvokeActivity> turnContext)
        {
            var cardData = new
            {
                createdBy = cardOptions.CreatedBy,
                createdByUserID = cardOptions.createdByUserID,
                createdUtc = DateTime.Now.ToString("dddd, dd MMMM yyyy"),
                serviceName = cardOptions.ServiceName,
                imagePath = cardOptions.imagePath,
                imageAlt = cardOptions.ServiceName,
                profileImage = $"{imageBasePath}/profile_image.png",
                incidentTitle = cardOptions.incidentTitle,
                incidentDescription = cardOptions.incidentDescription,
                incidentCategory = cardOptions.incidentCategory,
                incidentStatus = cardOptions.incidentStatus
            };

            string cardJson;
            string[] reviewIncidentCard = { ".", "Resources", "ClosedIncident.json" };
            var responseAttachment = GetResponseAttachment(reviewIncidentCard, cardData, out cardJson);

            Activity pendingActivity = new Activity();
            pendingActivity.Type = "message";
            pendingActivity.Id = turnContext.Activity.ReplyToId;
            pendingActivity.Attachments = new List<Attachment> { responseAttachment };
            await turnContext.UpdateActivityAsync(pendingActivity);

            JObject response = JObject.Parse(cardJson);
            AdaptiveCardInvokeResponse adaptiveCardResponse = new AdaptiveCardInvokeResponse()
            {
                StatusCode = 200,
                Type = AdaptiveCard.ContentType,
                Value = response
            };

            return CreateInvokeResponse(adaptiveCardResponse);
        }

        private static InvokeResponse CreateInvokeResponse(HttpStatusCode statusCode, object body = null)
        {
            return new InvokeResponse()
            {
                Status = (int)statusCode,
                Body = body
            };
        }

        #region Cards As InvokeResponses

        private AdaptiveCardInvokeResponse CardResponse(string cardFileName)
        {
            return new AdaptiveCardInvokeResponse()
            {
                StatusCode = 200,
                Type = AdaptiveCard.ContentType,
                Value = new CardResource(cardFileName).AsJObject()
            };
        }

        private AdaptiveCardInvokeResponse CardResponse<T>(string cardFileName, T data)
        {
            return new AdaptiveCardInvokeResponse()
            {
                StatusCode = 200,
                Type = AdaptiveCard.ContentType,
                Value = new CardResource(cardFileName).AsJObject(data)
            };
        }

        private AdaptiveCardInvokeResponse ConfirmationCardResponse()
        {
            return CardResponse("Confirmation.json");
        }

        private async Task<string> GetAccessToken()
        {
            var app = ConfidentialClientApplicationBuilder.Create(_configuration["MicrosoftAppId"])
                       .WithClientSecret(_configuration["MicrosoftAppPassword"])
                       .WithAuthority(new System.Uri($"{_configuration["MicrosoftLoginUri"]}/{"botframework.com"}"))
                       .Build();

            var authResult = await app.AcquireTokenForClient(new string[] { _configuration["BotFrameworkUri"] + ".default" }).ExecuteAsync();
            return authResult.AccessToken;
        }

        private async Task<string> SendHttpToTeams(HttpMethod method, IActivity activity, string convId, string messageId = null)
        {
            var token = await GetAccessToken();
            var requestAsString = JsonConvert.SerializeObject(activity);

            var headers = new Dictionary<string, string>
            {
                { "User-Agent", "UniversalBot" },
                { "Authorization", $"Bearer {token}" }
            };

            var path = $"/conversations/{convId}/activities";

            // The Bot Service Url needs to be dynamically fetched (and stored) from the Team. Recommendation is to capture the serviceUrl from the bot Payload and later re-use it to send proactive messages.
            string requestUri = _configuration["BotServiceUrl"] + path;

            HttpRequestMessage request = new HttpRequestMessage(method, requestUri);

            if (headers != null)
            {
                foreach (KeyValuePair<string, string> entry in headers)
                {
                    request.Headers.TryAddWithoutValidation(entry.Key, entry.Value);
                }
            }

            request.Content = new StringContent(requestAsString, System.Text.Encoding.UTF8, "application/json");

            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.SendAsync(request);
            var payloadAsString = await response.Content.ReadAsStringAsync();
            var payload = JsonConvert.DeserializeObject<ResourceResponse>(payloadAsString);
            return payload.Id;
        }
        #endregion
    }
}