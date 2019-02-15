import bs58 from 'bs58'

export const privateKeyToPublicKey = (privateKey) => {
  const decodedPrivateKey = bs58.decode(privateKey).toString('hex')
  const rawPublicKey = decodedPrivateKey.slice(decodedPrivateKey.length / 2)
  const publicKey = bs58.encode(Buffer.from(rawPublicKey, 'hex'))
  return publicKey
}
