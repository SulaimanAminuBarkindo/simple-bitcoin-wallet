const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').default;
const ecc = require('tiny-secp256k1');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const ECPair = ECPairFactory(ecc);
const network = bitcoin.networks.testnet;

const supportedAddressTypes = {
  1: 'P2PKH (Pay-to-Public-Key-Hash)',
  2: 'P2WPKH (Pay-to-Witness-Public-Key-Hash)',
};

async function createWallet() {
  try {
    console.log('Welcome to the simple Bitcoin wallet!');
    console.log('Please choose the type of address you want to generate:');

    for (const [key, value] of Object.entries(supportedAddressTypes)) {
      console.log(`${key}. ${value}`);
    }

    let selectedType;
    let isValidChoice = false;

    while (!isValidChoice) {
      const choice = await promptUser('Enter your choice (1-2): ');
      selectedType = parseInt(choice);

      isValidChoice = validateUserChoice(selectedType);
    }

    const keyPair = ECPair.makeRandom({ network: network });
    const { address, privateKey } = generateAddress(selectedType, keyPair);

    displayResult(address, privateKey, supportedAddressTypes[selectedType]);

    saveToWalletJSON(address, privateKey, supportedAddressTypes[selectedType]);

    console.log('Wallet created and saved to wallet.json');
  } catch (error) {
    console.error(error);
  } finally {
    readline.close();
  }
}

function promptUser(question) {
  return new Promise((resolve) => {
    readline.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function validateUserChoice(selectedType) {
  if (!supportedAddressTypes[selectedType]) {
    console.error('Invalid address type selected. Please choose a valid option (1-2).');
    return false;
  }
  return true;
}

function generateAddress(selectedType, keyPair) {
  switch (selectedType) {
    case 1:
      return generateP2PKHAddress(keyPair);
    case 2:
      return generateP2WPKHAddress(keyPair);
    default:
      throw new Error('Unexpected address type');
  }
}

function generateP2PKHAddress(keyPair) {
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: network });
  const privateKey = keyPair.toWIF();
  return { address, privateKey };
}

function generateP2WPKHAddress(keyPair) {
  const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: network });
  const privateKey = keyPair.toWIF();
  return { address, privateKey };
}

function displayResult(address, privateKey, addressType) {
  console.log(`| Address Type       | ${addressType} |`);
  console.log(`| Public Address     | ${address} |`);
  console.log(`| Private Key        | ${privateKey} |`);
}

function saveToWalletJSON(address, privateKey, addressType) {
  const wallet = {
    address: address,
    privateKey: privateKey,
    addressType: addressType
  };

  const walletJSON = JSON.stringify(wallet, null, 4);

  fs.writeFileSync('wallet.json', walletJSON);
}

createWallet();
