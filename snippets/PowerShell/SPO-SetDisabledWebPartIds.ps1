<#

#>


<#
.SYNOPSIS
	This example is used to disable a specific web part(s) at the tenant level.
	It is not meant to use as a production baseline.

	Allows administrators prevent certain, specific web parts from being added to pages or rendering on pages on which they were previously added.
	Reference: https://docs.microsoft.com/en-us/powershell/module/sharepoint-online/set-spotenant
 
 .PARAMETER tenantName
  Office 365 tenant name.
 
 .PARAMETER webPartIds
  IDs of web parts to disable.
#>
 
param
(
    [parameter(Mandatory=$true)][string]$tenantName,
    [parameter(Mandatory=$true)][string]$webPartIds
)

if (-not(Get-PSSnapin | Where { $_.Name -eq "Microsoft.SharePoint.PowerShell"})) {
	Add-PSSnapin Microsoft.SharePoint.PowerShell
}

$connected = $null
try {
	# Compose the admin URL
	$adminUrl = "https://$tenantName-admin.sharepoint.com"

	# Connecting with specific credentials
	$creds = Get-Credential
	Connect-SPOService -Url $adminUrl -Credential $creds
	$connected = $true

	Set-SPOTenant -DisabledWebPartIds webPartIds

	Get-SPOTenant | Select DisabledWebPartIds
}
catch {
	Write-Host -ForegroundColor Red $_.Exception.Message
}
finally {
	if ($connected -eq $true) { 
		Disconnect-SPOService
	}
}
