// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract HotelBooking {
   
    uint[] public roomNumbers = [1,2];
   
    //mapping(uint => Room) public rooms ;
    //better use array if mapping's key is a uint
    Room[] public rooms ;
   
    enum Statuses { Free, Occupied }
   
    struct Room{
        uint daysBooked;
        Statuses status;
        address nameBooking;
        uint roomNumber;
        uint bookedTime;
    }

    uint public room;
   
    //event
    //Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in
    //the transaction’s log - a special data structure in the blockchain. These logs are associated with the address
    //of the contract, are incorporated into the blockchain, and stay there as long as a block is accessible
    //(forever as of now, but this might change with Serenity).
    //The Log and its event data is not accessible from within contracts (not even from the contract that created them).
   
    event Occupy( address _occupant, uint _value, uint _roomNumber);
   
    //payable makes it that it can transfer/send eth
    address payable public owner;
   
    constructor() {
        owner = payable(msg.sender);
        for(uint i=0;i<roomNumbers.length;i++){
            rooms.push(Room(0, Statuses.Free, owner, roomNumbers[i],0));
        }
       
    }
   
   
    function checkFreeRoom() public view returns(uint){
        for(uint i=0; i<roomNumbers.length; i++){
            if(rooms[i].status == Statuses.Free){
                return rooms[i].roomNumber;
            }
        }
        //if return 0 means no available rooms;
        return 0;
    }
   
    function bookRoom(address _address, uint _daysBooked) public payable returns (uint){
        refreshRoomsStatus();
        uint _roomNumber = checkFreeRoom();
       
        require(_roomNumber > 0, "No available rooms");
       
        rooms[_roomNumber-1] = Room( _daysBooked, Statuses.Occupied, _address, _roomNumber, block.timestamp);
        room = _roomNumber;
        return _roomNumber;
    }
   
   function refreshRoomsStatus() public {
       for(uint i=0;i<roomNumbers.length;i++){
            if(block.timestamp > (rooms[i].bookedTime + rooms[i].daysBooked * 1 days) ){
                rooms[i] = Room(0, Statuses.Free, owner, roomNumbers[i],0);
            }
        }
   }
   
   modifier costs(uint daysBooked) {
        if (msg.value == daysBooked) {
            _;
        }
    }
    
   
    function hotelStatus() public view returns (Room [] memory){
        return rooms;
    }
 
    receive() external payable{
        require(msg.value > 1,"pay!!");
        room = bookRoom(msg.sender, msg.value); //wei
        owner.transfer(msg.value);
        emit Occupy(msg.sender, msg.value,room );
    }
}