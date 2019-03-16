## A Note from the Author (nujabes403, Mar 17 2019):

Hi! I created iost-extension about 1 month ago.  
The version in this repository were supporting IOST testnet (Everest v2.0). (You can see what iost extension was looked like in Everest 2.0 testnet version at this [link](https://www.youtube.com/watch?v=lSgMofBbdj4))  
About a month after that, [IOST](http://iost.io) successfully launched mainnet (Olympus v1.0) and the [main developer](https://github.com/lucusfly) of iost forked this repository for mainnet use and renamed it to `iWallet`. So if you are finding a recent version of iWallet repository, go to this [repository](https://github.com/lucusfly/iost-extension). Thank you :)

![iwallet](https://lh3.googleusercontent.com/urggnmIjA3eVon1y7d0tKDL8ctd-6gpQDLqJgoken03_T0G6heUqhMuZmb2wxqbhChrsK-yReg=w128-h128-e365)

# iost-extension (iwallet)

## What is iost-extension?

It is an extension for accessing IOST-enabled Dapps in your Chrome browser.

\*IOST: Internet of Service (http://iost.io)

The extension injects the iost.js, enabling to use IOST blockchain API in every website javascript context.

IOST Extension also lets the user sign transaction while doesn't exposing any secure information to website.

Because it adds functionality to the browser, IOST Extension requires the permission to read and write to any webpage. You can always "view the source" of IOST Extension the way you do any Chrome extension, or view the source code on Github:

### How to run this code in my chrome browser?

1. clone this repository  `git clone ...`
2. install npm packages  `npm install`
3. build the codes`npm run build:local`
4. Go to [chrome://extensions/](chrome://extensions/)
5. Turn on `developer mode` at the top right corner
6. Drag your `/dist` folder which generated from step 3 to the page.

### How to use for dapp?
Here is a dapp sample. [iost-helloworld-dapp](https://github.com/nujabes403/iost-helloworld-dapp)

### Community

Please join our [telegram group](https://t.me/IOSTWallet) for more info.


<!-- const iost = IOSTJS.iost(IOST) -->
