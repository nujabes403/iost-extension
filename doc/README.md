How to use for dapp?


### Installation using NPM

```javascript
npm i -S iost
```

### Using IWalletJS

```javascript
import IOST from 'iost'

IWalletJS.enable().then((account) => {
    if(!account) return; // not login

    const iost = IWalletJS.newIOST(IOST)

    //transfer
    const tx = iost.transfer('iost', account, "testnetiost", "1.000", "this is memo")
    
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