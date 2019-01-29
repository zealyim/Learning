param ([string]$Username, [hashtable]$Attributes)

try {
    ## Attempt to find the username
    $UserAccount = Get-AdUser -Identity $Username
    if (!$UserAccount) {
        ## If the username isn't found throw an error and exit
        Write-Error "The username '$Username' does not exist"
        return
    }
} catch {

}

## The $Attributes parameter will contain only the parameters for the Set-Aduser cmdlet other than 
##password. If this is in $Attributes it needs to be treated differently
if($Attributes.ContainsKey('Password')) {
    $UserAccount | Set-AdAccountPassword -Reset - NewPassword (ConvertTo-SecureString -AsPlainText $Attricutes.Password -Force)
    ## Remove the password key because we'll be passing this hashtable directly to Set-AdUser later
    $Attributes.Remove('Password')
}

$UserAccount | Set-ADUser $Attributes