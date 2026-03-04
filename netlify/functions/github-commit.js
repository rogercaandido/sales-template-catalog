// Netlify serverless function — proxies GitHub API commits using server-side token.
// Token is stored in Netlify environment variable GITHUB_TOKEN (never in source code).

const GITHUB_OWNER = 'rogercaandido';
const GITHUB_REPO = 'sales-template-catalog';
const GITHUB_BRANCH = '001-template-catalog-react';
const GITHUB_FILE_PATH = 'index.html';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return { statusCode: 500, body: JSON.stringify({ error: 'GITHUB_TOKEN não configurado no Netlify.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Body inválido.' }) };
  }

  const { newDataBlock } = body;
  if (!newDataBlock) {
    return { statusCode: 400, body: JSON.stringify({ error: 'newDataBlock é obrigatório.' }) };
  }

  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };

  // GET current file to obtain SHA and content
  const getResp = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, { headers });
  if (!getResp.ok) {
    const err = await getResp.json().catch(() => ({}));
    return { statusCode: getResp.status, body: JSON.stringify({ error: err.message || `GitHub GET falhou: ${getResp.status}` }) };
  }

  const data = await getResp.json();
  const currentContent = Buffer.from(data.content.replace(/\n/g, ''), 'base64').toString('utf8');

  if (!currentContent.includes('// ADMIN_DATA_START') || !currentContent.includes('// ADMIN_DATA_END')) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Marcadores ADMIN_DATA_START / ADMIN_DATA_END não encontrados.' }) };
  }

  const newContent = currentContent.replace(
    /    \/\/ ADMIN_DATA_START\n[\s\S]*?    \/\/ ADMIN_DATA_END\n/,
    newDataBlock
  );

  const encoded = Buffer.from(newContent, 'utf8').toString('base64');
  const today = new Date().toISOString().slice(0, 10);

  const putResp = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `chore: update template data via admin panel (${today})`,
      content: encoded,
      sha: data.sha,
      branch: GITHUB_BRANCH
    })
  });

  if (!putResp.ok) {
    const err = await putResp.json().catch(() => ({}));
    return { statusCode: putResp.status, body: JSON.stringify({ error: err.message || `GitHub PUT falhou: ${putResp.status}` }) };
  }

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
