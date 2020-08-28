pragma solidity ^0.5.12;
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
    function totalSupply() public view returns (uint256);
    function balanceOf(address who) public view returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}


contract ERC20 is ERC20Basic {
    function allowance(address owner, address spender) public view returns (uint256);
    function transferFrom(address from, address to, uint256 value) public returns (bool);
    function approve(address spender, uint256 value) public returns (bool);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract Multisend is Ownable {
    using SafeMath for uint256;

    event etherMultisended(address from, uint256 total);
    event tokenMultisended(address from, uint256 total, address tokenAddress);


    function send(address payable[] memory destinations, uint256[] memory amounts) public payable {
        require(destinations.length <= 200, "Array is too large");
        require(destinations.length == amounts.length, "the length of both destinations and amounts arrays are not matching");
        uint256 total = 0;
        for (uint256 i = 0; i < destinations.length; i += 1)
        {
            destinations[i].transfer(amounts[i]);
            total += amounts[i];
        }
        emit etherMultisended(msg.sender, total);
    }

    // Needs to approve the contract before multisend
    function multisendToken(address token, address[] memory _contributors, uint256[] memory _balances)
    public payable {
        require(_contributors.length <= 200, "Array is too large");
        require(_contributors.length == _balances.length, "the length of both destinations and amounts arrays are not matching");
        uint256 total = 0;
        ERC20 erc20token = ERC20(token);
        for (uint256 i = 0 ; i < _contributors.length; i++) {
            erc20token.transferFrom(msg.sender, _contributors[i], _balances[i]);
            total += _balances[i];
        }
        emit tokenMultisended(msg.sender, total, token);
    }

    // Needs sender to approve the contract before multisend, we will call
    function delegateMultisendToken(address token, address sender, address[] memory _contributors, uint256[] memory _balances)
    public onlyOwner {
        require(_contributors.length <= 200, "Array is too large");
        require(_contributors.length == _balances.length, "the length of both destinations and amounts arrays are not matching");
        uint256 total = 0;
        ERC20 erc20token = ERC20(token);
        for (uint256 i = 0 ; i < _contributors.length; i++) {
            erc20token.transferFrom(sender, _contributors[i], _balances[i]);
            total += _balances[i];
        }
        emit tokenMultisended(sender, total, token);
    }

    // Just in case of bad things happened in `send`,
    // as the owner we can still withdraw balance in contract
    function withdraw(uint256 amount) public onlyOwner {
        address(msg.sender).transfer(amount);
    }

    function withdrawAll() public onlyOwner {
        withdraw(address(this).balance);
    }

}