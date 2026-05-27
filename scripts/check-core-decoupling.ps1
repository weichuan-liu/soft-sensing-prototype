$terms = @("Dicastal", "Line 6", "DC-01", "DC-02", "dc-01", "dc-02", "dicastal")
$matches = @()

foreach ($term in $terms) {
  $result = Select-String -Path "src/core/*.ts" -Pattern $term -SimpleMatch -ErrorAction SilentlyContinue
  if ($result) {
    $matches += $result
  }
}

if ($matches.Count -gt 0) {
  $matches | ForEach-Object { Write-Error "$($_.Path):$($_.LineNumber) contains customer-specific term '$($_.Pattern)'" }
  exit 1
}

Write-Host "Core decoupling check passed."
