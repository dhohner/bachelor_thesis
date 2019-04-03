# dCompany Contracts

## General Information
See further details in the readme located in the parent directory

## Compile and Migrate contracts to local blockchain

### Use Script
```sh
./deploy.sh
```

### Manually
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

### Run your tests
```
truffle test
```
