const expect = require("expect");
const {Users} = require("./users");

describe("Users" , () => {

    var users;
    // Remember: beforeEach happens before EVERY SINGLE TEST
    // so 1 test doesnt effect the next one etc.
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "Node Course"
        }, 
        {
            id: "2",
            name: "Jen",
            room: "Spice room"
        },
        {
            id: "3",
            name: "Rhys",
            room: "Node Course"
        }];
    });


    it("Should add new user", () => {
        var users = new Users();
        var user = testUser = {
            id: "123",
            name: "rhys",
            room: "Hello"
        };

        var result = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("Should remove a user", () => {
        var id = "2";
        var user = users.removeUser(id);
        expect(user.id).toEqual(id);
        expect(users.users.length).toBe(2);
    });

    it("Should not remove a user", () => {
        var id = "_______";
        var user = users.removeUser(id);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it("Should find a user by ID", () => {
        var userId = "1";
        var result = users.getUser(userId);
        expect(result).toBe(users.users[0]);
    });

    it("Should not find a user by 'unused' ID", () => {
        var result = users.getUser("______");
        expect(result).toBeFalsy();
    });



    it("Should return names for node course", () => {
        var userList = users.getUserList("Node Course");

        expect(userList).toEqual(["Mike", "Rhys"]);

    });

    it("Should return names for Spice room", () => {
        var userList = users.getUserList("Spice room");

        expect(userList).toEqual(["Jen"]);
    });
})