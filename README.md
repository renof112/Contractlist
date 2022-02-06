# Contractlist

A comprehensive list of smart contract addresses of popular DApps and Protocols
<br/>
<div align="center">
  <img src="./frontend/public/favicon.png" />
</div>

### Web App

Visit our web app https://contractlist.vercel.app

### Data Feed

#### Contract Deployments

**Mumbai Testnet**

| Contract | Deployed address  |
| :----- | :- |
| [ContractlistAPIConsumer](https://mumbai.polygonscan.com/address/0x05d98BaD04f44aca5d96dc183624762f360DC111) | `0x05d98BaD04f44aca5d96dc183624762f360DC111` |

### API

API Endpoint: https://contractlist.vercel.app/api

To search for a contract, use params:

project - name of the project or protocol

contract - contract name

chain - chain ID

##### Example Request
```
$ curl -X GET "https://contractlist.vercel.app/api?project=uniswap+v3&contract=uniswapv3factory&chain=137"
```
##### Response JSON
```
{"body":"0x1F98431c8aD98523631AE4a59f267346ea31F984","query":{"project":"uniswap v3","contract":"uniswapv3factory","chain":"137"},"cookies":{}}
```

### How to contribute

Check the [Data format](./frontend/public/contract.json)

Update [Contracts](./frontend/public/contract.json) with your contracts data and create a PR. 

We strongly encourage contributions from the community!
