// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Hotel{
        string hotelName;
        uint roomNumbers;
}
    
struct HotelContract{
        Hotel hotel;
        address hotelContract;
}

contract Master{
   address payable public masterOwner;
    // info of the hotels on the blockchain
    HotelContract[] public hotels;
    
    // fee to create Hotel to masterOwner
    constructor() {
        masterOwner=payable(0x14B3D1D05D90E7Bb9EF9847E92cA11DbA10D1fcB);
    }
    // function to create new hotels
    function createHotel(string memory _hotelName, uint _roomNumbers) public payable returns(address){
        require(msg.value > 1,"pay!!");
       address hotelContract  = address(new HotelBooking(_roomNumbers,msg.sender));
       hotels.push(HotelContract(Hotel(_hotelName,_roomNumbers),hotelContract));
       masterOwner.transfer(msg.value);
       return hotelContract;
   }
   
   // function to return all the hotels array
   function returnHotels() public view  returns(HotelContract[] memory) {
       return hotels;
   }
}

contract HotelBooking {
    
    uint[] public roomNumbers;
   
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
   
    constructor(uint _roomNumber,address _owner) payable{
        owner = payable(_owner);
        // set how many rooms per hotel
        for(uint i=0;i<_roomNumber;i++){
            roomNumbers.push(i+1);
        }
        //hotels.push(Hotel(_hotel.hotelName,_hotel.roomNumbers));
        
        for(uint i=0;i<roomNumbers.length;i++){
            rooms.push(Room(0, Statuses.Free, owner, roomNumbers[i],0));
        }
       
    }
   uint y;
    fallback() external {  y = 2; }

   
   
    function checkFreeRoom() public view returns(uint){
        for(uint i=0; i<roomNumbers.length; i++){
            if(rooms[i].status == Statuses.Free){
                return rooms[i].roomNumber;
            }
        }
        //if return 0 means no available rooms;
        return 0;
    }
   
    function bookRoom(uint _daysBooked) public payable returns (uint){
        require(msg.value > 1,"pay!!");
        refreshRoomsStatus();
        uint _roomNumber = checkFreeRoom();
       
        require(_roomNumber > 0, "No available rooms");
       
        rooms[_roomNumber-1] = Room( _daysBooked, Statuses.Occupied, msg.sender, _roomNumber, block.timestamp);
        room = _roomNumber;
        owner.transfer(msg.value);
        emit Occupy(msg.sender, msg.value,room );
        return _roomNumber;
    }
   
   function refreshRoomsStatus() public {
       for(uint i=0;i<roomNumbers.length;i++){
            if(block.timestamp > (rooms[i].bookedTime + rooms[i].daysBooked * 1 days) ){
                rooms[i] = Room(0, Statuses.Free, owner, roomNumbers[i],0);
            }
        }
   }
   
  
   
   /*modifier costs(uint daysBooked) {
        if (msg.value == daysBooked) {
            _;
        }
    }*/
    
   
    function hotelStatus() public view returns (Room [] memory){
        return rooms;
    }
 
    
}









