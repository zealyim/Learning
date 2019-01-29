param ([string]$Computername, [hashtable]$Attributes)

try {
    ## Attempt to find the Computername
    $Computer = Get-AdComputer -Identity $Computername
    if (!$Computer) {
        ## If the Computername isn't found throw an error and exit
        Write-Error "The Computername '$Computername' does not exist"
        return
    }
} catch {

}

$Computer | Set-ADComputer $Attributes