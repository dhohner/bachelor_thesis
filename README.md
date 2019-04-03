# Decentralized Company (DApp)

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

<!-- ABOUT THE PROJECT -->

## About The Project

Blockchain technologies posess a vast potential to automate, decentralize and secure other fields of activity like e.g. Finance or Energy, while also making the specific line of work more transparent. Unfortunately there have already been many negative examples in the field of blockchain, that demonstrate, how an implementation of an idea has failed. In order to prevent such mistakes, an understanding for the basics of blockchain and smart contracts are presented in this thesis. Furthermore general patterns are developed, which can be applied to prevent mistakes. The development of general patterns describes a process, which is useful to prevent known and even some unknown errors. However the application of some patterns has unwanted side effects, which results in a negative user experience, as more tasks have to be performed by the user while using the product. In order to evaluate the presented patterns better a decentralized company was implemented, which enables freelancers to be paid automatically and securely when finishing a bounty they previously accepted. Moreover new developments, that could improve the performance of a blockchain in regards to transaction throughput, are analyzed. These developments could lead to a significant increase in performance, if first test results can be applied to real world blockchains.

### Built With

- [LaTeX](https://www.latex-project.org/)
- [Node 10](https://nodejs.org/en/)
- [Truffle](https://truffleframework.com/truffle)
- [Vue.js](https://vuejs.org/)
- [web3.js](https://web3js.readthedocs.io/en/1.0/getting-started.html)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

These are the requisites you need, in order to use the software and instructions, on how to install them.

- [Node.js](https://nodejs.org/en/):

  - macOS:
    - Install [Homebrew](https://brew.sh/):
      ```sh
      /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
      ```
    - Update Homebrew:
      ```sh
      brew update
      ```
    - Check if Homebrew is ready to brew:
      ```sh
      brew doctor
      ```
    - Install Node.js:
      ```sh
      brew install node
      ```
    - Test that Node.js was installed by running:
      ```sh
      node --version
      ```
  - Windows:
    - Install [Chocolatey](https://chocolatey.org/install):
      - via cmd.exe:
        ```sh
        @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
        ```
      - via PowerShell.exe:
        ```sh
        Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
        ```
    - Install Node.js:
      ```sh
      choco install nodejs
      ```
    - Test that Node.js was installed by running:
      ```sh
      node --version
      ```

- [npm](https://www.npmjs.com/)

  - Install npm:

    ```sh
    npm install npm -g
    ```

  - Test that npm was installed by running:

    ```sh
    npm --version
    ```

- [yarn](https://yarnpkg.com/en/docs/getting-started)

  - macOS:
    ```sh
    brew install yarn
    ```
  - Windows:
    ```sh
    choco install yarn
    ```
  - Test that yarn was installed by running:
    ```sh
    yarn --version
    ```

- [Ganache](https://truffleframework.com/ganache)
- [Truffle](https://truffleframework.com/truffle)
  - Install Truffle:
    ```sh
    npm install truffle -g
    ```
  - Test that truffle was installed by running:
    ```sh
    truffle version
    ```

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/dhohner/bachelor_thesis.git
   ```

2. Switch to company folder

   ```sh
   cd company
   ```

3. Run Ganache on port 8545

   ```sh
   Ganache -> Settings -> Server -> Port Number -> 8545
   ```

4. Compile & Migrate Smart Contracts

    * via script
      ```sh
      ./deploy.sh
      ```
    
    * manually:
      1. Delete build artifacts
          ```sh
          rm -rf build/
          ```
      2. Compile contracts
          ```sh
          truffle compile
          ```
      3. Deploy contracts to local blockchain
          ```sh
          truffle migrate --reset --network development
          ```
    

5. Switch to frontend folder

   ```sh
   cd frontend
   ```

6. Install frontend dependencies

   ```sh
   yarn install
   ```

7. Start frontend

   ```sh
   yarn serve
   ```

8. Open the dApp in your favorite browser

   ```sh
   localhost:8080
   ```
