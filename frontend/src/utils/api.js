export async function generateCaption(data) {
  try {
    const response = await fetch('http://localhost:3001/caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const result = await response.json();
    return result.caption;
  } catch (error) {
    console.error('Error generating caption:', error);
    throw error;
  }
}

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
