# iost-extension

## What is iost-extension?

It is an extension for accessing IOST-enabled Dapps in your Chrome browser.

\*IOST: Internet of Service (http://iost.io)

The extension injects the iost.js, enabling to use IOST blockchain API in every website javascript context.

IOST Extension also lets the user sign transaction while doesn't exposing any secure information to website.

Because it adds functionality to the browser, IOST Extension requires the permission to read and write to any webpage. You can always "view the source" of IOST Extension the way you do any Chrome extension, or view the source code on Github:

## Tech Docs
[Doc](doc/README.md)

### How to run this code in my chrome browser?

1. clone this repository  `git clone ...`
2. install npm packages  `npm install`
3. build the codes`npm run build:local`
4. Go to [chrome://extensions/](chrome://extensions/)
5. Turn on `developer mode` at the top right corner
6. Drag your `/dist` folder which generated from step 3 to the page.

### How to use for dapp?
Here is a dapp sample. [iost-helloworld-dapp](https://github.com/lucusfly/iost-helloworld-dapp)
Here is [another full featured defi/game DAPP](https://pumpkindefi.com/). You can use chrome dev tool to view to source code of the frontend of this DAPP.

### Community

Please join our [telegram group](https://t.me/iostdev) for more info.


<!-- const iost = IOSTJS.iost(IOST) -->
