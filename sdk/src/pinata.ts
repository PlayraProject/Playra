export async function uploadToPinata(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Помилка загрузки в Pinata');

  const data = await res.json();
  return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
}

export async function uploadJSONToPinata(metadata: Record<string, any>): Promise<string> {
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) throw new Error('Помилка загрузки metadata в Pinata');

  const data = await res.json();
  return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
}