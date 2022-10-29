// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/hardhat/console.sol";

contract MarketContract721 is ERC721, Ownable {

    uint96 private serviceFee = 500;
    
    struct AuctionItem {
        uint256 id;
        address tokenAddress;
        uint256 tokenId;
        address payable seller;
        uint256 askingPrice;
        string collection;
        bool isSold;
    }

    AuctionItem[] public itemsForSale;
    
    mapping (address => mapping (uint256 => bool)) activeItems;

    event itemAdded(uint256 id, uint256 tokenId, address tokenAddress, uint256 askingPrice,string collection, bool isSold,string uri,address ownerOf, bool isOnSale);
    event itemSold(uint256 id,address buyer,address seller, uint256 tokenId, uint256 askingPrice);

    modifier OnlyItemOwner(address tokenAddress, uint256 tokenId) {
        IERC721 tokenContract = IERC721(tokenAddress);
        require(tokenContract.ownerOf(tokenId) == msg.sender, "You are not the item owner");
        _;
    }

    modifier HasTransferApproval(address tokenAddress, uint256 tokenId) {
        IERC721 tokenContract = IERC721(tokenAddress);
        require(tokenContract.getApproved(tokenId) == address(this), "Doesn't have transfer approval");
        _;
    }

    modifier ItemExists(uint256 id) {
        require(id < itemsForSale.length && itemsForSale[id].id == id, "Could not find the item");
        _;
    }

      modifier IsForSale(uint256 id) {
        require(itemsForSale[id].isSold == false, "Item is already sold");
        _;
    }

    constructor() ERC721("CreativeVault 721", "VLT") {}

    function setServiceFee(uint96 _serviceFee) public onlyOwner  {
        serviceFee = _serviceFee;
    }

    function getServiceFee() public view returns(uint96) {
        return serviceFee;
    }

    function addItemToMarket(uint256 tokenId, address tokenAddress, uint256 askingPrice,string memory collection,string memory uri) OnlyItemOwner(tokenAddress, tokenId) HasTransferApproval(tokenAddress, tokenId) external returns(uint256) {
        require(activeItems[tokenAddress][tokenId] == false, "Item is already up sale");

        uint256 newItemId = itemsForSale.length;
        itemsForSale.push(AuctionItem(newItemId, tokenAddress, tokenId, payable(msg.sender), askingPrice,collection, false));
        activeItems[tokenAddress][tokenId] = true;

        assert(itemsForSale[newItemId].id == newItemId);
        emit itemAdded(newItemId, tokenId, tokenAddress, askingPrice, collection, false,uri,msg.sender, true);

        return newItemId;
    }

    function changePrice(uint256 id, uint256 tokenId, address tokenAddress, uint256 newPrice) OnlyItemOwner(tokenAddress, tokenId) external returns(uint256) {
        require(activeItems[tokenAddress][tokenId] == true, "Item is not up sale yet");

        itemsForSale[id].askingPrice = newPrice;

        return itemsForSale[id].askingPrice;
    }


    function buyItem(uint256 id, address creator, uint256 royalty) payable external ItemExists(id) IsForSale(id) HasTransferApproval(itemsForSale[id].tokenAddress, itemsForSale[id].tokenId) {
        require(msg.value >= itemsForSale[id].askingPrice, "Not enough funds sent");
        require(msg.sender != itemsForSale[id].seller, "Owner can't buy the item");

        address payable _contractOwner = payable(owner());
        address payable _creator = payable(creator);

        itemsForSale[id].isSold = true;
        activeItems[itemsForSale[id].tokenAddress][itemsForSale[id].tokenId] = false; 
       
        // transfer funds to seller
        itemsForSale[id].seller.transfer(itemsForSale[id].askingPrice - ((itemsForSale[id].askingPrice * serviceFee / 10000) + royalty));
        // transfer funds to contract owner
        _contractOwner.transfer(itemsForSale[id].askingPrice * serviceFee / 10000);
        // transfer royalty finds to creator
        _creator.transfer(royalty);

        // If buyer sent more than price, we send them back their rest of funds
        if (msg.value > itemsForSale[id].askingPrice) {
            payable(msg.sender).transfer(msg.value - itemsForSale[id].askingPrice);
        }

        // Transfer the NFT to new owner
        IERC721(itemsForSale[id].tokenAddress).safeTransferFrom(itemsForSale[id].seller, msg.sender, itemsForSale[id].tokenId);

        emit itemSold(id, msg.sender,itemsForSale[id].seller,itemsForSale[id].tokenId, itemsForSale[id].askingPrice);
    }
}