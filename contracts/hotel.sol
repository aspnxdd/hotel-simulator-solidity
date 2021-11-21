// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

struct Hotel {
    string hotelName;
    uint256 roomNumbers;
}

struct HotelContract {
    Hotel hotel;
    address hotelContract;
}

contract Master {
    HotelContract[] public hotels;

    function createHotel(string memory _hotelName, uint256 _roomNumbers)
        public
        returns (address)
    {
        address hotelContract = address(
            new HotelBooking(_roomNumbers, msg.sender)
        );
        hotels.push(
            HotelContract(Hotel(_hotelName, _roomNumbers), hotelContract)
        );
        return hotelContract;
    }

    function returnHotels() public view returns (HotelContract[] memory) {
        return hotels;
    }
}

contract HotelBooking {
    uint256[] public roomNumbers;

    // array containing all the rooms numbers of the hotel
    Room[] public rooms;

    // enum dont seem to work well in web3, they render as 0, 1, 2...
    enum Statuses {
        Free,
        Occupied
    }

    struct Room {
        uint256 daysBooked;
        Statuses status;
        address nameBooking;
        uint256 roomNumber;
        uint256 bookedTime;
    }

    uint256 public room;

    //event
    //Events are inheritable members of contracts. When you call them, they cause the arguments to be stored in
    //the transaction’s log - a special data structure in the blockchain. These logs are associated with the address
    //of the contract, are incorporated into the blockchain, and stay there as long as a block is accessible
    //(forever as of now, but this might change with Serenity).
    //The Log and its event data is not accessible from within contracts (not even from the contract that created them).

    event Occupy(address _occupant, uint256 _value, uint256 _roomNumber);

    //payable makes it that it can transfer/send eth
    address payable public owner;


    constructor(uint256 _roomNumber, address _owner) {
        // converts the address executing the SC the owner of this hotel
        owner = payable(_owner);

        // set how many rooms per hotel
        for (uint256 i = 0; i < _roomNumber; i++) {
            roomNumbers.push(i + 1);
        }
        
        // set rooms to the initial state
        for (uint256 i = 0; i < roomNumbers.length; i++) {
            rooms.push(Room(0, Statuses.Free, owner, roomNumbers[i], 0));
        }
    }

    // fallback
    uint256 y;

    fallback() external {
        y = 2;
    }

    //loops through all the rooms and returns the first one that is not occupied
    function checkFreeRoom() public view returns (uint256) {
        for (uint256 i = 0; i < roomNumbers.length; i++) {
            if (rooms[i].status == Statuses.Free) {
                return rooms[i].roomNumber;
            }
        }
        //if return 0 means no available rooms;
        return 0;
    }

    //
    function bookRoom(address _address, uint256 _daysBooked)
        public
        payable
        returns (uint256)
    {
        require(msg.value > 1, "pay!!");
        refreshRoomsStatus();
        uint256 _roomNumber = checkFreeRoom();

        require(_roomNumber > 0, "No available rooms");

        rooms[_roomNumber - 1] = Room(
            _daysBooked,
            Statuses.Occupied,
            _address,
            _roomNumber,
            block.timestamp
        );
        room = _roomNumber;
        owner.transfer(msg.value);
        emit Occupy(msg.sender, msg.value, room);
        return _roomNumber;
    }

    function refreshRoomsStatus() public {
        for (uint256 i = 0; i < roomNumbers.length; i++) {
            if (
                block.timestamp >
                (rooms[i].bookedTime + rooms[i].daysBooked * 1 days)
            ) {
                rooms[i] = Room(0, Statuses.Free, owner, roomNumbers[i], 0);
            }
        }
    }

    /*modifier costs(uint daysBooked) {
        if (msg.value == daysBooked) {
            _;
        }
    }*/

    function hotelStatus() public view returns (Room[] memory) {
        return rooms;
    }
}
