// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CampaignFactory{
    address payable[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
        address newCampaign = address(new Campaign(minimum, msg.sender));

        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployed() public view returns (address payable[] memory){
        return deployedCampaigns;
    }

}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint aprrovalCount;
        mapping (address => bool) approvals;
    }

    Request[] public requests;   
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    address public manager;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    constructor (uint minimum, address creater){
        manager = creater;
        minimumContribution = minimum;
    }

    function Contrubute() payable public{
        require(msg.value > minimumContribution );

        approvers[msg.sender] = true;
        approversCount;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted{
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.aprrovalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.aprrovalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        require (request.aprrovalCount >= (approversCount/2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);

        request.complete = true;
    }

    function getSummary() public view returns(uint , uint, uint , uint, address){
        return(
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequest() public view returns (uint){
        return requests.length;
    }
}