
// SPDX-License-Identifier: MIT
pragma solidity ^0.4.17;


contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{
       address newCampaign = new Campaign(minimum, msg.sender);
       deployedCampaigns.push(newCampaign);
    }

    function getDeployed() public view returns(address[]){
        return deployedCampaigns;
    }

}

contract Campaign {
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    } // its a definition not the instance

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum,address creater) public {
        manager = creater;
        minimumContribution = minimum;
    }

    function Contribute() public payable {
        require(msg.value >= minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint value, address recipient)
     public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        // rhs is responsible for storage and lhs is the creating the instance

        // Request newRequest = Request(description, value, recipient, false);
        //we need consistance order to use this

        requests.push(newRequest);
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        require(!request.complete);
        require(request.approvalCount > (approversCount/2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
