const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");

describe("Prime Number NFT", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployPrimeNumber() {

        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const PrimeNumberToken = await ethers.getContractFactory("PrimeNumberToken");
        const token = await PrimeNumberToken.deploy();

        return {token, owner, otherAccount};
    }

    describe("Deployment", function () {

        it("Should mint prime token", async function () {
            const {token, owner} = await loadFixture(deployPrimeNumber);
            expect(await token.balanceOf(owner.address)).to.equal(0);
            await token.save(2);
            expect(await token.balanceOf(owner.address)).to.equal(1);
        });

        it("Shouldn't mint non prime token", async function () {
            const {token, owner} = await loadFixture(deployPrimeNumber);
            expect(await token.balanceOf(owner.address)).to.equal(0);
            await expect(token.save(4)).to.be.revertedWith("Number is not prime");
            expect(await token.balanceOf(owner.address)).to.equal(0);
        });

        it("Shouldn't mint token if number is already minted", async function () {
            const {token, owner} = await loadFixture(deployPrimeNumber);
            expect(await token.balanceOf(owner.address)).to.equal(0);
            await token.save(2);
            expect(await token.balanceOf(owner.address)).to.equal(1);
            await expect(token.save(2)).to.be.revertedWith("Number is already minted");
            expect(await token.balanceOf(owner.address)).to.equal(1);
        });
    });
});
