# simple-bitcoin-wallet
simple-bitcoin-wallet a lightweight and user-friendly solution for managing your Bitcoin transactions with ease. This repository provides a simple yet powerful foundation for building your own Bitcoin wallet application. 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Make sure you have Node.js installed. You can download it [here](https://nodejs.org/).

## Installation

To install and run this project, follow these steps:

1. **Clone the repository to your local machine:**

    ```bash
    git clone https://github.com/SulaimanAminuBarkindo/simple-bitcoin-wallet.git
    ```

    or if using ssh

    ```bash
    git clone git@github.com:SulaimanAminuBarkindo/simple-bitcoin-wallet.git
    ```

2. **Change into the project directory:**

    ```bash
    cd simple-bitcoin-wallet
    ```

3. **Install the project dependencies using npm or yarn:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

4. **Run the project:**

    ```bash
    node .
    ```

    or

    ```bash
    node index.js
    ```

## Usage

To use this script, follow these steps:

- Run the script (`node .` or `node index.js`) to interactively choose the address type.
- The script outputs the generated address, private key, and saves the details to `wallet.json`.

## Dependencies

This project uses the following dependencies:

- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) for Bitcoin-related functionalities.
- [ecpair](https://github.com/bitcoinjs/ecpair) for creating elliptic curve key pairs.
- [tiny-secp256k1](https://github.com/bitcoinjs/tiny-secp256k1) for elliptic curve cryptography operations.
- [fs](https://nodejs.org/api/fs.html) for file system operations.
- [readline](https://nodejs.org/api/readline.html) for user interaction.

## Supported Address Types

1. P2PKH (Pay-to-Public-Key-Hash)
2. P2WPKH (Pay-to-Witness-Public-Key-Hash)

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. You can also open issues with suggestions or bug reports.

## License
This project is licensed under the [Your License Name] License - see the [LICENSE](LICENSE) file for details.