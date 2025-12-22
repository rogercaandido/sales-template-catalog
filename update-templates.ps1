# Script para atualizar templates no index.html e fazer deploy na Netlify
# Uso: .\update-templates.ps1

Write-Host "🔄 Atualizando templates..." -ForegroundColor Cyan

# Ler o arquivo JSON
$templatesJson = Get-Content "templates.json" -Raw
$templates = $templatesJson | ConvertFrom-Json | ConvertTo-Json -Compress

# Ler o index.html
$indexPath = "index.html"
$content = Get-Content $indexPath -Raw

# Encontrar e substituir o objeto TEMPLATES
$pattern = '(?s)const TEMPLATES = \{.*?\};'
$replacement = "const TEMPLATES = $templates;"

$newContent = $content -replace $pattern, $replacement

# Salvar o arquivo atualizado
$newContent | Set-Content $indexPath -NoNewline

Write-Host "✅ Templates atualizados no index.html" -ForegroundColor Green

# Perguntar se quer fazer deploy
$deploy = Read-Host "Fazer deploy na Netlify agora? (s/n)"

if ($deploy -eq "s" -or $deploy -eq "S") {
    Write-Host "🚀 Fazendo deploy na Netlify..." -ForegroundColor Yellow

    # Commit das mudanças
    git add index.html templates.json
    $commitMsg = Read-Host "Mensagem do commit (Enter para mensagem padrão)"

    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "chore: update templates"
    }

    git commit -m $commitMsg

    # Deploy na Netlify
    netlify deploy --prod --dir=.

    Write-Host "✅ Deploy completo!" -ForegroundColor Green
    Write-Host "🌐 Site: https://sales-template-catalog.netlify.app" -ForegroundColor Cyan
} else {
    Write-Host "⏭️  Deploy cancelado. Execute 'netlify deploy --prod --dir=.' quando quiser publicar." -ForegroundColor Yellow
}
