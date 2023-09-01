const path = require('path');
const fs = require('fs');
const contractToCompileName = "bodymap.sol";
const contractPath = path.resolve(__dirname, 'contracts', contractToCompileName);
const contractSource = fs.readFileSync(contractPath, 'utf-8');
const solc = require('solc');
var input = 
{
    language: 'Solidity',
    sources: 
        {
            [contractToCompileName]: 
            {
                content: contractSource
            }
        },
    settings: 
        {
            outputSelection: 
            {
                '*': 
                {
                    '*': ['*']
                }
            }
        }
};

const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(compiledContracts);
const compiledContract = compiledContracts.contracts[contractToCompileName]["BodyMap"];
console.log(compiledContract);
module.exports = 
{
    compiledContract
};