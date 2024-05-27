const owner = 'freyZ81';
const repo = 'kpop';
const path = 'test.js';
const token = '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';

async function getFileSha() {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data.sha;
  } else {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }
}


async function updateFile(content) {
    const sha = await getFileSha();
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Update file content via API',
        content: btoa(content),
        sha: sha
      })
    });
  
    if (response.ok) {
      console.log('File updated successfully');
    } else {
      throw new Error(`Failed to update file: ${response.statusText}`);
    }
  }
  
  // Beispiel: Dateiinhalt überschreiben
  const newContent = 'Neuer Inhalt der Datei';
  updateFile(newContent).catch(console.error);
  