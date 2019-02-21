import bs58 from 'bs58'
import axios from 'axios'

export const privateKeyToPublicKey = (privateKey) => {
  const decodedPrivateKey = bs58.decode(privateKey).toString('hex')
  const rawPublicKey = decodedPrivateKey.slice(decodedPrivateKey.length / 2)
  const publicKey = bs58.encode(Buffer.from(rawPublicKey, 'hex'))
  return publicKey
}

// http://54.249.186.224
export const publickKeyToAccount = async (publickKey, isProd = true) => {
  const url = isProd? 'https://explorer.iost.io/': ' http://54.249.186.224/'
  const { data } = await axios.get(`${url}iost-api/accounts/${publickKey}`)
  if(data.code == 0){
    return data.data.accounts
  }
  return []
  // throw new Error('Invlid publickKey');
}