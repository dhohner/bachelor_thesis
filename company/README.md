# Contracts

## General Information
See further details in Readme in main directory

## Compiles and Migrates contracts to local blockchain

### Use Script
```sh
./deploy.sh
```

### Manually
```sh
rm -rf build/
```
```sh
truffle compile
```
```sh
truffle migrate --reset --network development
```

### Run your tests
```
truffle test
```
