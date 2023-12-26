// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "../../interfaces/IAevo.sol";
import "../../interfaces/IOptionsVendorProxy.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract AevoOptions is IOptionsVendorProxy {
    IAevo internal AEVO;
    uint256 internal gasLimit;
    address public immutable asset;

    constructor(
        address _asset,
        address aevoAddress) {
        AEVO = IAevo(aevoAddress);
        gasLimit = 1000000;
        asset = _asset;
    }

    function depositToVendor(
        address receiver,
        uint256 amount,
        address connector
    ) external {
        require(amount > 0, "INVALID_DEPOSIT_AMOUNT");
        console.log("Depositing to vendor from %s", msg.sender);

        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        IERC20(asset).approve(address(AEVO), amount);
        console.log("Approved transaction for %s balance %s", address(AEVO), IERC20(asset).balanceOf(address(this)));

        AEVO.depositToAppChain(receiver, amount, gasLimit, connector);
    }

    function withdrawFromVendor(uint256 amount) external {
        // Implementation of withdrawFromVendor
    }
}
