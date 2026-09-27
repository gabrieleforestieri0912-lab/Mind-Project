# Sincronizza le variabili di .env su Vercel (production, preview, development).
# I valori vengono letti da .env a runtime: NON vengono mai stampati nei log.
$ErrorActionPreference = 'Continue'
$root = 'C:\Users\Utente\Documenti\Vertex\Mind-Project'
$log = Join-Path $root 'scripts\vercel-env-sync.log'
"=== sync start $(Get-Date -Format o) ===" | Out-File $log
$skip = @('PORT')
$targets = @('production', 'preview', 'development')
$vars = [ordered]@{}
Get-Content (Join-Path $root '.env') | ForEach-Object {
  $line = $_.Trim()
  if (-not $line -or $line.StartsWith('#')) { return }
  $i = $line.IndexOf('=')
  if ($i -lt 1) { return }
  $k = $line.Substring(0, $i).Trim()
  $v = $line.Substring($i + 1).Trim()
  if (($skip -contains $k) -or [string]::IsNullOrEmpty($v)) {
    "SKIP $k (vuota o non necessaria su Vercel)" | Out-File $log -Append
    return
  }
  $vars[$k] = $v
}
"keys: $($vars.Keys -join ', ')" | Out-File $log -Append
Push-Location $root
foreach ($k in $vars.Keys) {
  foreach ($t in $targets) {
    vercel env rm $k $t --yes 2>&1 | Out-Null
    $out = $vars[$k] | vercel env add $k $t 2>&1
    if ($LASTEXITCODE -eq 0) { "OK $k -> $t" | Out-File $log -Append }
    else { "FAIL $k -> $t :: $out" | Out-File $log -Append }
  }
}
Pop-Location
"=== sync done $(Get-Date -Format o) ===" | Out-File $log -Append
