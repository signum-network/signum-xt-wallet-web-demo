## Available networks to work with
- `Signum` This network refers to MainNet, it will make your dApp compatible with only MainNet network
- `Signum-TESTNET` This network refers to TestNet, it will make your dApp compatible with only TestNet network

## Features on this demo
- Pick network of your preference
- Make transactions
- Connect/Unlink accounts (Detect connection status)
- Detect account changes
- Detect node changes
- Show dialog when user is going to sign a transaction
- Check for compatible wallets

## How to assign the dApp name
- Go to the file `src/lib/config.ts`
- Modify the variable `appName` to your preference

## How to choose a network to work with
- Go to the file `src/lib/wallet.ts`
- Modify the variable `window.network` to your preference

<span>
<img src="https://user-images.githubusercontent.com/3920663/157106727-35a214b8-07bb-4c75-8c4f-c4aec072683c.svg" width="128" height="48" alt="Powered by Signum" >
<img src="https://user-images.githubusercontent.com/3920663/157106713-c459eb43-1da8-442d-b725-7263a6a8c48f.svg" width="42" height="42" alt="SignumJS Logo" >
</span>