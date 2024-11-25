const GITHUB_TOKEN = '';
const REPO_OWNER = 'freyz81';
const REPO_NAME = 'kpop';
const FILE_PATH = 't_konto_daten.js';
const BRANCH = 'develop';
let newMembers;

async function updateFile(newContent) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  // Dateiinhalt (bestehend) abrufen, um die `sha` zu erhalten
  const getFileResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!getFileResponse.ok) {
    throw new Error('Fehler beim Abrufen der Datei.');
  }

  const fileData = await getFileResponse.json();

  // Neue Datei hochladen
  const updatedFileResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Update members.json',
      content: btoa(JSON.stringify(newContent, null, 2)), // Inhalt Base64-codieren
      sha: fileData.sha, // SHA der bestehenden Datei
      branch: BRANCH,
    }),
  });

  if (updatedFileResponse.ok) {
    console.log('Datei erfolgreich aktualisiert!');
  } else {
    console.error('Fehler beim Aktualisieren der Datei:', await updatedFileResponse.json());
  }
}

// Beispiel-Daten aktualisieren
newMembers = [{ name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charles' }]

;
updateFile(newMembers);

/*
  let daten = [
    {
      name: "Testname",
      zahlungen: [
        {
          "bezeichnung": "Testbezeichnung",
          "jahr": 2024,
          "monat": 12,
          "preis": 12.99,
          "monatlich": false,
          "ratenzahlung": false,
          "verlust": true
        },
        {
          "bezeichnung": "Testbezeichnung2",
          "jahr": 2024,
          "monat": 12,
          "preis": 19.99,
          "monatlich": true,
          "ratenzahlung": false,
          "verlust": true
        }

      ]
    },
  ]


  bezeichnung
  jahr
  monat
  preis
  monatlich: boolean
  ratenzahlung: boolean
  verlust: boolean //bei false ist es Gewinn
*/