How to use for dapp?


### Installation using NPM

```javascript
npm i -S iost
```

### Using IWallet

```javascript
import IOST from 'iost'

IWallet.enable().then((account) => {
    if(!account) return; // not login

    const iost = IWallet.newIOST(IOST)

    //transfer
    const tx = iost.transfer('iost', account, "testiost1", "1.000", "this is memo")
    
    iost.signAndSend(tx)
    .on('pending', (trx) => {
      console.log(trx, 'trx')
    })
    .on('success', (result) => {
      console.log(result, 'result')
    })
    .on('failed', (failed) => {
      console.log(failed, 'failed')
    })

    const ctx = iost.callABI('contractAddress', "hello", ['args']);

    iost.signAndSend(ctx)
    ...
})


```