// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";


import "../node_modules/hardhat/console.sol";

contract TokenContract1155 is ERC1155, Ownable, ERC1155Supply,ERC1155Burnable {
    string public name;
    string public symbol;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    mapping(uint256 => string) private _uris;

    constructor(string memory _name,string memory _symbol) ERC1155("") {
        name = _name;
        symbol = _symbol;
    }

      modifier OnlyItemOwner(uint256 tokenId) {
        ERC1155 token = ERC1155(address(this));
        require(token.balanceOf(msg.sender, tokenId) > 0, "NFT must be owned by the caller");
        _;
    }

    function createItem(address account, uint256 amount, string memory tokenUri) public  returns (uint256){

         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(account, newItemId, amount, "");
        setUri(newItemId,tokenUri);

        return newItemId;
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return(_uris[tokenId]);
    }

     function setUri(uint256 tokenId, string memory tokenUri ) public OnlyItemOwner(tokenId)   {
         require(bytes(_uris[tokenId]).length == 0, "Cannot set uri twice");
        _uris[tokenId] = tokenUri;
    }

    function burn(address account, uint256 id, uint256 amount) public override{
        require(msg.sender == account);
        _burn(account, id, amount);
    }

    function getApprovalForContract(address contractAddress) public {
        setApprovalForAll(contractAddress, true);
    }

    
    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
