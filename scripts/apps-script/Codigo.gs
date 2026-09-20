/**
 * Recebe os leads da calculadora e grava na aba "Leads".
 *
 * Este arquivo não faz parte do build: é a cópia versionada do script que roda
 * dentro da planilha. Para publicar:
 *
 *   1. Planilha → Extensões → Apps Script → cole este conteúdo.
 *   2. Implantar → Nova implantação → App da Web.
 *      Executar como: eu · Quem pode acessar: qualquer pessoa.
 *   3. Copie a URL /exec para VITE_LEADS_ENDPOINT.
 *
 * Toda vez que este arquivo mudar, é preciso criar uma NOVA implantação
 * (ou "Gerenciar implantações → editar → Nova versão") para a mudança valer.
 */

// Precisa ser igual ao VITE_LEADS_TOKEN do front-end.
var TOKEN = 'GAMETRUCK.CALC@leads'

var SHEET_NAME = 'Leads'

// Ordem das colunas na planilha. A linha de cabeçalho segue esta mesma ordem.
var COLUMNS = [
  'data',
  'name',
  'empresa',
  'cargo',
  'whatsapp',
  'email',
  'state',
  'consent',
  'savingsPerYear',
]

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: 'Corpo da requisição vazio.' })
    }

    var payload = JSON.parse(e.postData.contents)

    if (payload.token !== TOKEN) {
      return json({ ok: false, error: 'Token inválido.' })
    }

    var sheet = getSheet()
    var row = COLUMNS.map(function (key) {
      var value = payload[key]
      return value === undefined || value === null ? '' : value
    })

    // O lock evita que dois envios simultâneos escrevam na mesma linha.
    var lock = LockService.getScriptLock()
    lock.waitLock(20000)
    try {
      sheet.appendRow(row)
    } finally {
      lock.releaseLock()
    }

    return json({ ok: true })
  } catch (error) {
    return json({ ok: false, error: String(error) })
  }
}

// Permite abrir a URL no navegador para conferir se a implantação está no ar.
function doGet() {
  return json({ ok: true, status: 'online' })
}

function getSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = spreadsheet.getSheetByName(SHEET_NAME)

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME)
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS)
    sheet.setFrozenRows(1)
  }

  return sheet
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
