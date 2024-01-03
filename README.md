## Learn how you can connect your website to Signum XT Wallet
All communication with the Signum XT Wallet is already implemented, so devs can be more productive when building their dApps.

| List of Examples     | Demo URL                                                              |
|----------------------|-----------------------------------------------------------------------|
| Vanilla Javascript   | [View Demo](https://xt-wallet-web-demo-vanilla.vercel.app/)            |
| Vanilla (Typescript) | [View Demo](https://xt-wallet-web-demo-vanilla-typescript.vercel.app/) |
| React (Typescript)   | [View Demo](https://xt-wallet-web-demo-react-typescript.vercel.app/)   |
---------

## SignumJS
`@signumjs/wallets` is the package which provides tools to interact with wallets remotely.

- https://github.com/signum-network/signumjs
- https://signum-network.github.io/signumjs/modules/wallets.html

# Getting Started
This project uses Vite to make development and deployment a breeze.

It is required that you have NodeJS (18+) installed on your machine, such you can take full advantage of

* Development with Live Reload (HMR)
* Optimized, Bundled, Minified static site
* Once cloned this repo and having NodeJS installed just:

1. Access the example of your preference
2. run `npm i`
3. run `npm run dev`
4. Open brower at "http://localhost:5173"
5. Start hacking

Good reasons for using Vite, can be read [here](https://vitejs.dev/guide/why.html#the-problems)

# Deployment
If you choose the modern tooling method, just run `npm run build` - it creates an optimized static site in `./dist` folder, that can be hosted anywhere.

# Good to know (Tips)
SignumJS is entirely written in Typescript. Using modern tooling, i.e. decent IDEs like VSCode or WebStorm and package manager will give you full support of typing, making development with SignumJS easier and more productive.

The wallet stores the keys in an extra protected "backend" area of the extension and never provides any secret. The keys are encrypted by the users secret he provided when installed the extension. Between a DApp and the wallet only public information like accounts public key and current selected node host is transmitted.

### How to choose a network to work with
- `Signum` This network refers to MainNet, it will make your dApp compatible with only MainNet network
- `Signum-TESTNET` This network refers to TestNet, it will make your dApp compatible with only TestNet network

### Additional References
- https://github.com/ohager/signum-xt-wallet-react-demo
- https://github.com/ohager/signum-xt-wallet-vanilla-demo

<span>
<img src="https://user-images.githubusercontent.com/3920663/157106727-35a214b8-07bb-4c75-8c4f-c4aec072683c.svg" width="128" height="48" alt="Powered by Signum" >
<img src="https://user-images.githubusercontent.com/3920663/157106713-c459eb43-1da8-442d-b725-7263a6a8c48f.svg" width="42" height="42" alt="SignumJS Logo" >
</span>
