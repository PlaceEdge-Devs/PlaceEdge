export async function getSettings(type) {
  const res = await fetch(`http://localhost:3001/settings/${type}`);
  return await res.json();
}

export async function saveSettings(type, data) {
  const res = await fetch(`http://localhost:3001/settings/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
}
