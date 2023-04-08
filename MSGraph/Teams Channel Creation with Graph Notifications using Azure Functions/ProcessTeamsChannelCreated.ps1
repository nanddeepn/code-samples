using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata)

# Response for Subscription Notification Validation. Respond back with validationToken. 
if ($Request.Query.validationToken) {
    Write-Host "Sending status code 'OK' and validationToken to Subscription Notification Validation Request" 
    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
            StatusCode = [HttpStatusCode]::OK
            Body       = $Request.Query.validationToken
        })
}

# Convert Notification Details to a PSObject
$objNotification = ($Request.RawBody | convertfrom-json).value 

if ($objNotification.clientState -ne "$($env:GRAPH_NOTIFICATION_CHANNEL_CREATED_SUBSCRIPTION_CLIENTSTATE)") { 
    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
            StatusCode = [HttpStatusCode]::BadRequest
        })
}
else {
    Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
        StatusCode = [HttpStatusCode]::Accepted
    })
}

# Output Notification to host 
Write-Host "NOTIFICATION: clientState '$($objNotification.clientState)'"
Write-Host "NOTIFICATION: changedResource '$($objNotification.resource)'"
Write-Host "NOTIFICATION: changeType '$($objNotification.changeType)'"

# The resource information ($objNotification.resource) will be as follows:
# "teams('c892d52b-954d-4348-a269-6cf3a7339306')/channels('19:3f5002df7ea3404aa8f8@thread.tacv2')"
# Use regular expression to extract the TeamID and ChannelID
$teamsPattern = "teams\('(.+?)'\)"
$channelsPattern = "channels\('(.+?)'\)"

$teamID = [regex]::Match($objNotification.resource, $teamsPattern).Groups[1].Value
$channelID = [regex]::Match($objNotification.resource, $channelsPattern).Groups[1].Value

Write-Host $teamID
Write-Host $channelID
