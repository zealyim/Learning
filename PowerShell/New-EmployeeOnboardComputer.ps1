param($Computername, $Location = 'OU=Corporate Computers')

if (Get-AdComputer $Computername) {
    Write-Error "The computer name '$Computername' already exists"
    return
}

$DomainDN = (Get-ADDomain).DistinguishedName
$DefualtOuPath = "$Location,$DomainDn"

New-ADComputer -Name $Computername - Path $DefualtOuPath
