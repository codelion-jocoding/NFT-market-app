import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, COUNT_CONTRACT_ADDRESS, CHAIN_ID } from '../constants';
const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
    },
    {name: "x-chain-id", value: CHAIN_ID}
  ]
}

const caver =  new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

export const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}

export const setCount = async (newCount) => {
  // 사용할 account 설정
  try {
    const privatekey = '0x26c8485748a7f9e9ae637a5c014f9955c2be9aa24ca8f1674e7e98c7123c9a4d';
    const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
    caver.wallet.add(deployer);
    // 스마트 컨트랙트 실행 트랜젝션 날리기
    // 결과 확인

    const receipt = await CountContract.methods.setCount(newCount).send({
      from: deployer.address, // address
      gas: "0x4bfd200"//
    })
    console.log(receipt);
  } catch(e) {
    console.log(`[ERROR_SET_COUNT]${e}`);
  }
  
}