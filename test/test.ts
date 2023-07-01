pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ChatDapp.sol";

contract TestChatDapp {
    ChatDapp private chatDapp;
    address private user1;
    address private user2;

    function beforeEach() public {
        chatDapp = new ChatDapp();
        user1 = address(0x1);
        user2 = address(0x2);
    }

    function testCreateUser() public {
        chatDapp.createUser("User1");
        string memory userName = chatDapp.getUsername(user1);
        Assert.equal(userName, "User1", "User should be created with the provided name");
    }

    function testAddFriend() public {
        chatDapp.createUser("User1");
        chatDapp.createUser("User2");
        chatDapp.addFriend(user2, "User2");
        ChatDapp.Friends[] memory friends = chatDapp.getFriends();
        Assert.equal(friends.length, 1, "User1 should have one friend after adding");
        Assert.equal(friends[0].pubkey, user2, "User2 should be added as a friend");
    }

    function testBlockUser() public {
        chatDapp.createUser("User1");
        chatDapp.createUser("User2");
        chatDapp.addFriend(user2, "User2");
        chatDapp.blockUser(user2);
        Assert.isTrue(chatDapp.isUserBlocked(user2), "User2 should be blocked");
    }

    function testSendMessage() public {
        chatDapp.createUser("User1");
        chatDapp.createUser("User2");
        chatDapp.addFriend(user2, "User2");
        bytes32 chatCode = chatDapp._getChatCode(user1, user2);
        chatDapp.sendMessage(user2, "Hello");
        ChatDapp.Message[] memory messages = chatDapp.readMessages(user2);
        Assert.equal(messages.length, 1, "User2 should have one message");
        Assert.equal(messages[0].content, "Hello", "The message content should be 'Hello'");
        Assert.equal(messages[0].sender, user1, "The sender of the message should be User1");
    }
}
