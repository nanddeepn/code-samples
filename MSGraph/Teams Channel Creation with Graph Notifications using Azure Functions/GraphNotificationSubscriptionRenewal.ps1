# Input bindings are passed in via param block.
param($Timer)

# Get the current universal time in the default string format.
$currentUTCtime = (Get-Date).ToUniversalTime()

# The 'IsPastDue' property is 'true' when the current function invocation is later than scheduled.
if ($Timer.IsPastDue) {
    Write-Host "PowerShell timer is running late!"
}

$ClientID = ""
$ClientSecret = ""
$TenantID = ""

# Get Access Token
$accessToken = (Invoke-RestMethod -uri "https://login.microsoftonline.com/$($TenantID)/oauth2/v2.0/token" `
        -Method Post `
        -Headers @{"Content-Type" = "application/x-www-form-urlencoded" } `
        -Body "grant_type=client_credentials&client_id=$($ClientID)&scope=https://graph.microsoft.com/.default&client_secret=$($ClientSecret)").access_token

# Get Subscription
$notificationSubscription = $null

try {
    $notificationSubscription = Invoke-RestMethod -method GET `
        -Uri "https://graph.microsoft.com/v1.0/subscriptions/$($env:GRAPH_NOTIFICATION_CHANNEL_CREATED_SUBSCRIPTION_ID)" `
        -Headers @{Authorization = "Bearer $($accessToken)"; "content-type" = "application/json" }
}
catch {	
}

if ($notificationSubscription) {        
    # Update Subscription 
    $expiryHours = 1
    $notificationExpiry = (get-date).addHours($expiryHours).ToUniversalTime() 
    $utcExpiry = Get-Date $notificationExpiry -Format yyyy-MM-ddTHH:mm:ss.0000000Z

    $updateSubscriptionBody = @{
        expirationDateTime = $utcExpiry
    }

    $extendNotificationSubscription = Invoke-RestMethod -method PATCH `
        -Uri "https://graph.microsoft.com/v1.0/subscriptions/$($env:GRAPH_NOTIFICATION_CHANNEL_CREATED_SUBSCRIPTION_ID)" `
        -body ($updateSubscriptionBody | convertTo-json) `
        -Headers @{Authorization = "Bearer $($accessToken)"; "content-type" = "application/json" }

    Write-Host "New Subscription Expiry: $($extendNotificationSubscription.expirationDateTime)"
    Write-Host "Subscription ClientState: $($extendNotificationSubscription.clientState)"
}
else {
    Write-Host "Notification not found"
}

# Write an information log with the current time.
Write-Host "PowerShell timer trigger function ran! TIME: $currentUTCtime"
