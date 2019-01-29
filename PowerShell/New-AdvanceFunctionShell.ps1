function New-AdvanceFuntion {
    <#
    .SYNOPSIS
    .EXAMPLE

    .PARAMETER Param1
        This param does this thing.
    .PARAMETER
    .PARAMETER
    .PARAMETER#>
    [CmdletsBinding()]
    param (
        [string]$Param1

    )
    begin {

    }
    process {
        try {

        } catch {
            Write-Error "$($_.Exception.Message) - Line Number: $($_.InvocationInfo.ScriptLineNumber)"
        }
    }
    end {
     
    }
}