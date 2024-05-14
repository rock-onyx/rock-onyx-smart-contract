// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "../../../../interfaces/IRenzoRestakeProxy.sol";
import "../../../../interfaces/IZircuitRestakeProxy.sol";
import "./../../Base/strategies/BaseRestakingStrategy.sol";

contract RenzoZircuitRestakingStrategy is BaseRestakingStrategy {
    IWithdrawRestakingPool private renzoWithdrawRestakingPool;
    IRenzoRestakeProxy private renzoRestakeProxy;
    IZircuitRestakeProxy private zircuitRestakeProxy;
    IERC20 private stakingToken;

    function ethRestaking_Initialize(
        address _restakingToken,
        address _swapAddress,
        address _usdcAddress,
        address _ethAddress,
        address[] memory _restakingPoolAddresses
    ) internal {
        super.ethRestaking_Initialize(_restakingToken, _swapAddress, _usdcAddress, _ethAddress);

        renzoRestakeProxy = IRenzoRestakeProxy(_restakingPoolAddresses[0]);
        zircuitRestakeProxy = IZircuitRestakeProxy(_restakingPoolAddresses[1]);
    }

    function syncRestakingBalance() internal override{
        uint256 ethAmount = (zircuitRestakeProxy.balance(address(restakingToken), address(this)) + restakingToken.balanceOf(address(this))) 
                                * swapProxy.getPriceOf(address(restakingToken), address(ethToken)) / 1e18;
        restakingStratState.totalBalance = restakingStratState.unAllocatedBalance + ethAmount * swapProxy.getPriceOf(address(ethToken), address(usdcToken)) / 1e18;
    }

    function depositToRestakingProxy(uint256 ethAmount) internal override {
        _auth(ROCK_ONYX_ADMIN_ROLE);

        ethToken.approve(address(swapProxy), ethAmount);
        swapProxy.swapTo(
            address(this),
            address(ethToken),
            ethAmount,
            address(restakingToken),
            fees["RExTOKEN_ETH"]
        );

        restakingToken.approve(address(zircuitRestakeProxy), restakingToken.balanceOf(address(this)));
        zircuitRestakeProxy.depositFor(address(restakingToken), address(this), restakingToken.balanceOf(address(this)));
    }

    function withdrawFromRestakingProxy(uint256 ethAmount) internal override {
        _auth(ROCK_ONYX_ADMIN_ROLE);
        
        uint256 stakingTokenAmount = swapProxy.getAmountInMaximum(address(restakingToken), address(ethToken), ethAmount);

        zircuitRestakeProxy.withdraw(address(restakingToken), stakingTokenAmount);
        restakingToken.approve(address(swapProxy), stakingTokenAmount);
        swapProxy.swapToWithOutput(
            address(this),
            address(restakingToken),
            ethAmount,
            address(ethToken),
            fees["RExTOKEN_ETH"]
        );
    }

    function updateRenzoWithdrawRestaking(address _renzoWithdrawRestakingPoolAddress) external nonReentrant {
        _auth(ROCK_ONYX_ADMIN_ROLE);

        renzoWithdrawRestakingPool = IWithdrawRestakingPool(_renzoWithdrawRestakingPoolAddress);
    }
}