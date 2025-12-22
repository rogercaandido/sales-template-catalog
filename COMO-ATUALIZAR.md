# 📝 Como Atualizar Templates

## Método Rápido (Recomendado)

### 1. Edite o arquivo `templates.json`

Abra o arquivo e adicione/edite seus templates:

```json
{
  "icosmetologia": [
    {
      "name": "novo_template_v1",
      "message": "Sua mensagem aqui com emojis 😃 e *formatação*"
    }
  ]
}
```

### 2. Execute o script de atualização

```powershell
.\update-templates.ps1
```

O script vai:
1. ✅ Atualizar automaticamente o `index.html`
2. ✅ Fazer commit no git
3. ✅ Fazer deploy na Netlify
4. ✅ Seu site estará atualizado em segundos!

---

## Estrutura do JSON

```json
{
  "consulfarma": [
    {
      "name": "nome_do_template",
      "message": "Texto completo da mensagem"
    }
  ],
  "icosmetologia": [...],
  "hinutrition": [...]
}
```

### Dicas:
- **name**: Identificador curto (aparece em uppercase no card)
- **message**: Mensagem completa que será copiada
- Use `{{1}}` para placeholder de nome
- Use `*texto*` para negrito (WhatsApp)
- Emojis funcionam normalmente 😃

---

## Adicionar Nova Empresa

1. Adicione a empresa no `templates.json`:
```json
{
  "consulfarma": [...],
  "icosmetologia": [...],
  "hinutrition": [...],
  "novaempresa": [
    {
      "name": "template1",
      "message": "Mensagem do template"
    }
  ]
}
```

2. Edite o `index.html` e adicione:

**No array COMPANIES** (linha ~305):
```javascript
const COMPANIES = [
  { id: 'consulfarma', label: 'Consulfarma' },
  { id: 'icosmetologia', label: 'ICosmetologia' },
  { id: 'hinutrition', label: 'Hi Nutrition' },
  { id: 'novaempresa', label: 'Nova Empresa' }  // ← Adicione aqui
];
```

**No CSS de cores** (linha ~30):
```css
body.theme-novaempresa {
  --theme-color: #3b82f6; /* blue-500 */
  --theme-color-bg: rgba(59, 130, 246, 0.1);
}
```

3. Execute `.\update-templates.ps1`

---

## Deploy Manual (sem script)

Se preferir fazer manualmente:

```bash
# 1. Edite templates.json
# 2. Atualize index.html manualmente OU execute o script
# 3. Commit
git add .
git commit -m "chore: update templates"

# 4. Deploy
netlify deploy --prod --dir=.
```

---

## Links Úteis

- 🌐 **Site em Produção**: https://sales-template-catalog.netlify.app
- 🎛️ **Dashboard Netlify**: https://app.netlify.com/projects/sales-template-catalog
- 📦 **Repositório Local**: `templates usuarios/`

---

## Troubleshooting

### O script não executa
```powershell
# Permitir execução de scripts (executar como Admin)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Deploy falhou
```bash
# Verificar status
netlify status

# Re-login se necessário
netlify login

# Deploy novamente
netlify deploy --prod --dir=.
```

### JSON inválido
- Use um validador: https://jsonlint.com/
- Verifique vírgulas e aspas
- Não deixe vírgula no último item do array
