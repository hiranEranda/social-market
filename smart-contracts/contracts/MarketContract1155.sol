// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

//import "hardhat/console.sol";


contract MarketContract1155 is ERC1155, Ownable {

    string public name;
    string public symbol;
    uint96 private serviceFee = 500;

    struct AuctionItem {
        uint256 id;
        address tokenAddress;
        uint256 tokenId;
        address payable seller;
        uint256 askingPrice;
        bool isSold;
    }
   constructor() ERC1155("") {
        name = "CreativeVault 1155";
        symbol = "VLT";
    }

    AuctionItem[] public itemsForSale;
    mapping (address => mapping (uint256 => bool)) activeItems;

    event itemAdded(uint256 id, uint256 tokenId, address tokenAddress, uint256 askingPrice, bool isSold, address ownerOf, string tokenUri, uint amount, bool isOnSale);
    event itemSold(uint256 id, address buyer, address seller, uint256 tokenId, uint256 askingPrice);

    modifier OnlyItemOwner(address contractAddress, uint256 tokenId) {
        ERC1155 token = ERC1155(contractAddress);
        require(token.balanceOf(msg.sender, tokenId) > 0, "NFT must be owned by the caller");
        _;
    }

    modifier IsContractApproved(address contractAddress) {
        ERC1155 token = ERC1155(contractAddress);
        require(token.isApprovedForAll(msg.sender, address(this)), "Contract must be approved");
        _;
    }

    modifier ItemExists(uint256 id) {
        require(id < itemsForSale.length && itemsForSale[id].id == id, "Could not find the item!");
        _;
    }

    modifier IsForSale(uint256 id) {
        require(itemsForSale[id].isSold == false, "Item is already sold!");
        _;
    }

    function setServiceFee(uint96 _serviceFee) public onlyOwner  {
        serviceFee = _serviceFee;
    }

    function getServiceFee() public view returns(uint96) {
        return serviceFee;
    }

    function addItemToMarket(uint256 tokenId, address tokenAddress, uint256 askingPrice, string memory tokenUri, uint256 amount) OnlyItemOwner(tokenAddress, tokenId) IsContractApproved(tokenAddress) external returns (uint256) {
        uint256 newItemId = itemsForSale.length;
        itemsForSale.push(AuctionItem(newItemId, tokenAddress, tokenId, payable(msg.sender), askingPrice, false));
        activeItems[tokenAddress][tokenId] = true;

        assert(itemsForSale[newItemId].id == newItemId);
        emit itemAdded(newItemId, tokenId, tokenAddress, askingPrice, false, msg.sender, tokenUri, amount,true);

        return newItemId;
    }

      function changePrice(uint256 id, uint256 tokenId, address tokenAddress, uint256 newPrice) OnlyItemOwner(tokenAddress, tokenId) external returns (uint256) {

        itemsForSale[id].askingPrice = newPrice;

        return itemsForSale[id].askingPrice;
      }

    function buyItem( uint256 id, uint256 amount,uint256 royalty, address creator) payable external ItemExists(id) IsForSale(id)  {
        require(msg.value >= itemsForSale[id].askingPrice, "Not enough funds sent!");
        require(msg.sender != itemsForSale[id].seller,"Owner can't buy the item");

        address payable _buyer = payable(msg.sender);
        address payable _contractOwner = payable(owner());
        address payable _creator = payable(creator);

        itemsForSale[id].isSold = false;
        activeItems[itemsForSale[id].tokenAddress][itemsForSale[id].tokenId] = false;

        // transfer funds to seller
        itemsForSale[id].seller.transfer(itemsForSale[id].askingPrice - ((itemsForSale[id].askingPrice * serviceFee / 10000) + royalty));
        // transfer funds to contract owner
        _contractOwner.transfer(itemsForSale[id].askingPrice * serviceFee / 10000);
        // transfer royalty finds to creator
        _creator.transfer(royalty);
        
        // If buyer sent more than price, we send them back their rest of funds
        if (msg.value > itemsForSale[id].askingPrice) {
            _buyer.transfer(msg.value - itemsForSale[id].askingPrice);
        }

        // Transfer the NFT to new owner
        ERC1155(itemsForSale[id].tokenAddress).safeTransferFrom(itemsForSale[id].seller, msg.sender, itemsForSale[id].tokenId, amount, "0x00");
        
        emit itemSold(id, msg.sender,itemsForSale[id].seller,itemsForSale[id].tokenId, itemsForSale[id].askingPrice);
    }
}
