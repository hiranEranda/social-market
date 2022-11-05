// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenContract721 is ERC721, Ownable, ERC721Enumerable ,ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

   constructor(string memory name,string memory symbol) ERC721(name, symbol) {}

    uint256 id;

    struct Item {
        uint256 id;
        address creator;
        string uri;
    }

    mapping (uint256 => Item) public Items;

    function directMint(string memory uri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        Items[newItemId] = Item(newItemId, msg.sender, uri);        
        return (newItemId);
    }
    
    function lazyMint(address creator, uint256 askingPrice,string memory uri) public payable returns (uint256){
        require(msg.value >= askingPrice , "Amount of ether sent not correct."); 

        address payable _creator = payable(creator);

        _creator.transfer(askingPrice);

      	_tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        Items[newItemId] = Item(newItemId, msg.sender, uri);        
        return (newItemId);
        
    }

    function lazyMintCustom(address creator, uint256 askingPrice, string memory uri, address payToken) public payable returns (uint256){
        // require(msg.value >= askingPrice , "Amount of ether sent not correct."); 

        address payable _creator = payable(creator);

        IERC20 paymentToken = IERC20(payToken);
        paymentToken.transferFrom(msg.sender, _creator, askingPrice);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        Items[newItemId] = Item(newItemId, msg.sender, uri);        
        return (newItemId);
      
    }

    function tokenURI(uint256 tokenId) public view  override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    return Items[tokenId].uri;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

  
}