import bs58 from 'bs58'
import axios from 'axios'

export const privateKeyToPublicKey = (privateKey) => {
  const decodedPrivateKey = bs58.decode(privateKey).toString('hex')
  const rawPublicKey = decodedPrivateKey.slice(decodedPrivateKey.length / 2)
  const publicKey = bs58.encode(Buffer.from(rawPublicKey, 'hex'))
  return publicKey
}

// http://54.249.186.224
export const publickKeyToAccount = async (publickKey) => {
  const { data } = await axios.get(`https://explorer.iost.io/iost-api/accounts/${publickKey}`)
  if(data.code == 0){
    return data.data.accounts
  }
  throw new Error('Invlid publickKey');
}