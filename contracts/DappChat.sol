// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library ArrayUtils {
    function indexOf(address[] storage array, address element) internal view returns (int256) {
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] == element) {
                return int256(i);
            }
        }
        return -1;
    }
}

contract DappChat {
    struct User {
        string name;
        mapping(address => bool) blockedUsers;
        Friends[] friendList;
        address[] blockedUsersArray;
    }

    struct Friends {
        string name;
        address friendkey;
    }

    struct Message {
        address sender;
        uint256 timestamp;
        string content;
    }

    struct AllUsers {
        string name;
        address accountAddress;
    }

    AllUsers[] private allUsers;
    mapping(address => User) private users;
    mapping(bytes32 => Message[]) private allMessages;
    

    event UserCreated(address indexed userAddress, string name);
    event FriendAdded(address indexed userAddress, address friendAddress);
    event MessageSent(address indexed sender, address indexed recipient, string content);

    modifier userExists(address userAddress) {
        require(bytes(users[userAddress].name).length > 0, "User does not exist");
        _;
    }

    function createUser(string calldata name) external {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(bytes(users[msg.sender].name).length == 0, "User already exists");

        users[msg.sender].name = name;
        allUsers.push(AllUsers(name, msg.sender));

        emit UserCreated(msg.sender, name);
    }

    function getUsername(address userAddress) external view returns (string memory) {
        require(bytes(users[userAddress].name).length > 0, "User does not exist");
        return users[userAddress].name;
    }

    function addFriend(address friendAddress, string calldata name) external userExists(msg.sender) {
        require(friendAddress != msg.sender, "Users cannot add themselves as friend");
        require(bytes(users[friendAddress].name).length > 0, "Friend is not registered");
        require(!isFriend(msg.sender, friendAddress), "User is already a friend");
        require(!users[msg.sender].blockedUsers[friendAddress]);

        Friends memory friend = Friends(name, friendAddress);
        Friends memory me = Friends(users[msg.sender].name, msg.sender);
        users[msg.sender].friendList.push(friend);
        users[friendAddress].friendList.push(me);
        emit FriendAdded(msg.sender, friendAddress);
    }

    function blockUser(address userAddress) external userExists(msg.sender) {
        require(bytes(users[userAddress].name).length > 0, "User is not registered");
        require(msg.sender != userAddress, "You can't block yourself");

        for(uint256 i = 0; i < users[msg.sender].friendList.length; i++) {
        if(users[msg.sender].friendList[i].friendkey == userAddress) {
        users[msg.sender].friendList[i] = users[msg.sender].friendList[users[msg.sender].friendList.length - 1];
        users[msg.sender].friendList.pop();
        break;
    }
}
        for(uint256 i = 0; i < users[userAddress].friendList.length; i++) {
            if(users[userAddress].friendList[i].friendkey == msg.sender) {
                users[userAddress].friendList[i] = users[userAddress].friendList[users[userAddress].friendList.length - 1];
                users[userAddress].friendList.pop();
                break;
            }
        }

        users[msg.sender].blockedUsers[userAddress] = true;
        users[msg.sender].blockedUsersArray.push(userAddress);
    }

function unblockUser(address userAddress) external userExists(msg.sender) {
    require(bytes(users[userAddress].name).length > 0, "User is not registered");
    require(msg.sender != userAddress, "You can't unblock yourself");

    users[msg.sender].blockedUsers[userAddress] = false;
    int256 index = ArrayUtils.indexOf(users[msg.sender].blockedUsersArray, userAddress);
    if (index >= 0) {
        users[msg.sender].blockedUsersArray[uint256(index)] = users[msg.sender].blockedUsersArray[users[msg.sender].blockedUsersArray.length - 1];
        users[msg.sender].blockedUsersArray.pop();

        // Check if the user is already a friend
        bool isFriend = isFriend(msg.sender, userAddress);

        // Add the user as a friend if not already a friend
        if (!isFriend) {
            string memory friendName = users[userAddress].name;
            Friends memory friend = Friends(friendName, userAddress);
            Friends memory me = Friends(users[msg.sender].name, msg.sender);
            users[msg.sender].friendList.push(friend);
            users[userAddress].friendList.push(me);
            emit FriendAdded(msg.sender, userAddress);
        }
    }
}

    function isUserBlocked(address userAddress) external view userExists(msg.sender) returns (bool) {
        return users[msg.sender].blockedUsers[userAddress];
    }


    function getAllBlockedUsers() external view returns(address[] memory) {
        require(bytes(users[msg.sender].name).length > 0, "User doesn't exist");

        address[] memory blockedArray = users[msg.sender].blockedUsersArray;

        return blockedArray;
    }


    function sendMessage(address recipient, string calldata content) external userExists(msg.sender) {
        require(bytes(content).length > 0, "Message content cannot be empty");
        require(msg.sender != recipient, "You can't message yourself");
        require(isFriend(msg.sender, recipient), "User is not a friend");

        if(users[recipient].blockedUsers[msg.sender]) {
            revert("You are blocked by this user");
        }

        bytes32 chatCode = _getChatCode(msg.sender, recipient);
        Message memory newMsg = Message(msg.sender, block.timestamp, content);
        allMessages[chatCode].push(newMsg);

        emit MessageSent(msg.sender, recipient, content);
    }

    function readMessages(address friendAddress) external view userExists(msg.sender) returns (Message[] memory) {
        require(isFriend(msg.sender, friendAddress), "User is not a friend");

        bytes32 chatCode = _getChatCode(msg.sender, friendAddress);
        return allMessages[chatCode];
    }

    function getAllAppUsers() external view returns (AllUsers[] memory) {
        return allUsers;
    }

    function getFriends() external view returns(Friends[] memory) {
    require(bytes(users[msg.sender].name).length > 0, "User doesn't exist");
    
    return users[msg.sender].friendList;
    }

    function isFriend(address userAddress, address friendAddress) private view returns (bool) {
    User storage user = users[userAddress];
    for (uint256 i = 0; i < user.friendList.length; i++) {
        if (user.friendList[i].friendkey == friendAddress) {
            return true;
        }
    }
    return false;
    }

     function _getChatCode(address userAddress1, address userAddress2) private pure returns (bytes32) {
    return userAddress1 < userAddress2 ? keccak256(abi.encodePacked(userAddress1, userAddress2)) : keccak256(abi.encodePacked(userAddress2, userAddress1));
    }
}