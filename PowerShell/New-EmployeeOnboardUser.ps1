 param($FirstName, $MiddleInitial, $LastName, $Location = 'OU=Corporate Users', $Title)

$DefaultPassword = 'password' 
$DomainDN = (Get-ADDomain).DistinguishedName
$DefaultGroup = 'Company Group'

### Generate username
$Username = "$($FirstName.SubString(0,1))$LastName"
$EaPrefBefore = $ErrorActionPreference
$ErrorActionPreference = 'SilentlyContinue'
try{
    if (Get-ADUser $Username) {
     $Username = "$($FirstName.SubString(0,1))$MiddleInitial$LastName"
     if (Get-ADUser $Username) {
        Write-Host "No acceptable username schema could be created"
        return
        }
    }
}catch {

}

$ErrorActionPreference = $EaPrefBefore

### Create the user account 
$NewUserParams = @{
'UserPrincipalName' = $Username
'Name' = $Username
'GivenName' = $FirstName
'Surname' = $LastName
'Title' = $Title
'SamAccountName' = $Username
'AccountPassword' = (ConvertTo-SecureString $DefaultPassword -AsPlainText -Force)
'Enabled' = $true
'Initials' = $MiddleInitial
'Path' = "$Location,$DomainDn"
'ChangePasswordAtLogon' = $true
}

New-ADUser @NewUserParams

### add the user account to the company standard group
Add-ADGroupMember -Identity $DefaultGroup -Members $Username
