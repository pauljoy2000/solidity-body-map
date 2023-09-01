const {compiledContract} = require('../compile.js');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const clearTextPassword = "password";
let accounts;
let deployedBodyMapContracts;

beforeEach(async() => 
{
    accounts = await web3.eth.getAccounts();
    deployedBodyMapContracts = await new web3.eth.Contract(compiledContract.abi)
    .deploy(
    {
        data: compiledContract.evm.bytecode.object, 
        arguments: [clearTextPassword]
    })
    .send(
    {
        from: accounts[0], 
        gas: '1000000'
    });
});

describe('Bodymap', () => 
{
    it('deploys', () => 
    {
        assert.ok(deployedBodyMapContracts.options.address);
        console.log(deployedBodyMapContracts.options.address);
    })

    it('changes bodymap', async () => 
    {
        await deployedBodyMapContracts.methods.setBodyMaps
            (clearTextPassword, "new basic body map", "new tailor body map")
            .send(
                {
                    from: accounts[0],
                    gas: 5000000
                }
            );
        const updatedBasicBodyMap = await deployedBodyMapContracts.methods.basicBodyMap().call();
        const updatedTailorBodyMap = await deployedBodyMapContracts.methods.tailorBodyMap().call();
        assert.equal("new basic body map", updatedBasicBodyMap);
        assert.equal("new tailor body map", updatedTailorBodyMap);
    })

    it("can't change bodymap with wrong passowrd", async () => 
    {
        await deployedBodyMapContracts.methods.setBodyMaps
            ("wrong password", "new basic body map", "new tailor body map")
            .send(
                {
                    from: accounts[0],
                    gas: 5000000
                }
            );
        const updatedBasicBodyMap = await deployedBodyMapContracts.methods.basicBodyMap().call();
        const updatedTailorBodyMap = await deployedBodyMapContracts.methods.tailorBodyMap().call();
        assert.notEqual("new basic body map", updatedBasicBodyMap);
        assert.notEqual("new tailor body map", updatedTailorBodyMap);
    })
});