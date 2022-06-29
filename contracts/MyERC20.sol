// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// @title Custom ERC20 token with mint and burn implementation
/// @author M. Dichenko
/// @dev All function except _mint and _burn are  EIP-20 standart
contract MyERC20 {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    uint8 tokenDecimals;
    address public owner;
    string public tokenName;
    string public tokenSymbol;
    uint256 tokenTotalSupply;

    constructor(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint8 _tokenDecimals,
        uint256 _initialAmount
    ) {
        owner = msg.sender;
        tokenName = _tokenName;
        tokenSymbol = _tokenSymbol;
        tokenDecimals = _tokenDecimals;
        tokenTotalSupply = _initialAmount;
        balances[msg.sender] = _initialAmount;
        emit Transfer(address(0), msg.sender, _initialAmount);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You are not an owner");
        _;
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    ///@dev Returns the name of token
    ///@return tokenName string, name of Token

    function name() public view returns (string memory) {
        return tokenName;
    }

    ///@dev Returns the symbol of token
    ///@return tokenSymbol string, symbol of Token

    function symbol() public view returns (string memory) {
        return tokenSymbol;
    }

    ///@dev Returns decimals
    ///@return tokenDecimals uint8

    function decimals() public view returns (uint8) {
        return tokenDecimals;
    }

    ///@dev Returns tokenTotal supply of token
    ///@return tokenTotalSupply uint256

    function totalSupply() public view returns (uint256) {
        return tokenTotalSupply;
    }

    ///@dev Returns the amount of tokens owned by `account`.
    ///@param _user account address
    ///@return uint256 balance of accaunt

    function balanceOf(address _user) public view returns (uint256) {
        return balances[_user];
    }

    ///@dev Moves `amount` tokens from the caller's account to `recipient`.
    ///@param _to address
    ///@param _value uint256
    ///@return success bool a boolean value indicating whether the operation succeeded.
    ///@custom:emit  a Transfer event.

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balances[msg.sender] >= _value, "Not enough tokens");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    ///@dev Moves `amount` tokens from the 'spender' account to `recipient`.
    ///@param _to address
    ///@param _value uint256
    ///@return success bool a boolean value indicating whether the operation succeeded.
    ///@custom:emit  a Transfer event.

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(allowed[_from][msg.sender] >= _value, "Not approved");
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        return allowed[_owner][_spender];
    }

    function mint(uint256 _value) public onlyOwner returns (bool success) {
        balances[owner] += _value;
        tokenTotalSupply += _value;
        emit Transfer(address(0), owner, _value);
        return true;
    }

    function burn(uint256 _value) public onlyOwner returns (bool success) {
        balances[owner] -= _value;
        tokenTotalSupply -= _value;
        emit Transfer(owner, address(0), _value);
        return true;
    }
}
