# Teams Incident Management Bot

MS Teams Incident Management Bot sample.

This bot has been created using [Bot Framework](https://dev.botframework.com), it shows how to create a simple incidence and resolution using Adaptive Cards v1.4.

## Prerequisites

- [.NET Core SDK](https://dotnet.microsoft.com/download) version 3.1

  ```bash
  # determine dotnet version
  dotnet --version
  ```

## Summary
Teams Incident Management bot is a sample app for handling incidents in Microsoft Teams using Adaptive Cards. Below are the actors on this:
- Nanddeep Nachan (Left window): Incident creator
- Debra Berger (middle window): Incident resolver
- Smita Nachan (right window): Member of Microsoft Teams channel. 
This sample makes use of Teams platform capabilities like `Universal Bots`. 

<img src="https://nanddeepnachanblogs.com/media/2021-07-05-universal-actions-adaptive-cards-teams/preview.gif" alt="sequential order" width="600" height="300">

## Frameworks

![drop](https://img.shields.io/badge/.NET&nbsp;Core-3.1-green.svg)
![drop](https://img.shields.io/badge/Bot&nbsp;Framework-3.0-green.svg)

## Prerequisites

* [Office 365 tenant](https://developer.microsoft.com/en-us/microsoft-365/dev-program)

* To test locally, you'll need [Ngrok](https://ngrok.com/download) 
Make sure you've downloaded and installed the ngrok on your local machine. ngrok will tunnel requests from the Internet to your local computer and terminate the SSL connection from Teams.

    * ex: `https://subdomain.ngrok.io`.
    
	 NOTE: A free Ngrok plan will generate a new URL every time you run it, which requires you to update your Azure AD registration, the Teams app manifest, and the project configuration. A paid account with a permanent Ngrok URL is recommended.

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

Step 1: Setup bot in Service
====================================
1. Create new bot channel registration resource in Azure.
2. Create New Microsoft App ID and Password.
3. Navigate to channels and add "Microsoft Teams" channel.

Step 2: Update configuration    
1. **Edit** the `manifest.json` contained in the `Manifest` folder to replace your Microsoft App Id (that was created when you registered your bot earlier) *everywhere* you see the place holder string `<<YOUR-MICROSOFT-APP-ID>>` (depending on the scenario the Microsoft App Id may occur multiple times in the `manifest.json`).
2. Update appsettings.json file with Microsoft App Id, App Secret.
3. **Zip** up the contents of the `Manifest` folder to create a `manifest.zip`
4. **Upload** the `manifest.zip` to Teams (in the Apps view click "Upload a custom app")

Step 3: Run the app locally 
====================================
## To try this sample

1. Run the bot from a terminal or from Visual Studio:

  A) From a terminal, navigate to `bot-teams-incidentmanagement` folder

  ```bash
  # run the bot
  dotnet run
  ```

  B) Or from Visual Studio

  - Launch Visual Studio
  - File -> Open -> Project/Solution
  - Navigate to `bot-teams-incidentmanagement\IncidentManagement` folder
  - Select `IncidentManagement.csproj` file
  - Press `F5` to run the project

2. Update the appsettings.json files. 

  "MicrosoftAppId: `<<Your Microsoft Bot_Id>>`

  "MicrosoftAppPassword": `<<Your Microsoft Bot_Secret>>`

4. Press F5 to run the project in the Visual studio.

5. Run Ngrok to expose your local web server via a public URL. Make sure to point it to your Ngrok URI. For example, if you're using port 2978 locally, run:

		ngrok http -host-header=rewrite 2978

6. Update messaging endpoint in the Azure Bots Channel Registration. Open the Bot channel registration, click on Configuration/Settings on the left pane, whichever is available and update the messaging endpoint to the endpoint that bot app will be listening on. Update the ngrok URL in the below format for the messaging endpoint.

		ex: https://<subdomain>.ngrok.io/api/messages.
