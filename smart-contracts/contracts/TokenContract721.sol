// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "../node_modules/hardhat/console.sol";

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

    struct AuctionItem {
        uint256 id;
        string uri;
        uint256 askingPrice;
        address payable creator;
        bool inMinted;
    }

    AuctionItem[] public itemsForSale;

    mapping (uint256 => Item) public Items;

   function directMint(string memory uri) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);
        Items[newItemId] = Item(newItemId, msg.sender, uri);        
        return (newItemId);
    }


    function createItem(string memory uri, uint256 askingPrice, bool isLazy) public returns (uint256) {
    
        id = itemsForSale.length;
       

        if(!isLazy) {
            itemsForSale.push(AuctionItem(id, uri, askingPrice, payable(msg.sender), false));
            uint256 newItemId = directMint(uri);
             console.log("create id", id);
            console.log("returned id", newItemId);
            return (newItemId);

        } else {
            itemsForSale.push(AuctionItem(id, uri, askingPrice, payable(msg.sender), false));
             console.log("create id", id);

            return id;
        }

    }

    function lazyMint(uint256 _id) public payable returns (uint256){
        require(msg.value >= itemsForSale[_id].askingPrice , "Amount of ether sent not correct."); 

        itemsForSale[_id].creator.transfer(itemsForSale[_id].askingPrice);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        return (newItemId);
        
    }

    function getId() public view returns (uint256){
        return id;
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