import { uploadToPinata, uploadJSONToPinata } from './pinata';
import { makeMetaplex } from './metaplex';
import { walletAdapterIdentity } from "@metaplex-foundation/js";

export async function mintRewardNFT(imageFile: File, wallet: any, score: number) {
  if (!wallet) {
    throw new Error('Кошелёк не подключён');
  }

  const metaplex = makeMetaplex(walletAdapterIdentity(wallet));

  // 1. Загружаем изображение на IPFS
  const imageUri = await uploadToPinata(imageFile);

  // 2. Генерим metadata
  const metadata = {
    name: 'Playra Achievement NFT',
    symbol: 'PLAY',
    description: 'NFT за достижение!',
    image: imageUri,
    attributes: [{ trait_type: 'Очки', value: score }],
  };

  // 3. Загружаем metadata на IPFS
  const metadataUri = await uploadJSONToPinata(metadata);

  // 4. Минтим NFT
  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: 'Playra NFT',
    sellerFeeBasisPoints: 0,
    symbol: 'PLAY',
    isMutable: false,
    maxSupply: 1,
  });

  return nft;
}