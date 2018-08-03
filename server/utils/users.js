[{
    id: "kalsfj",
    name : "rhys",
    room : "game fans"
}];


// addUser(id, name, room)

// removeUser(id)

// getUser(id) <--- for sending message

// getUserList(room)

class Users {
    constructor() {
        this.users = [];
    }


    addUser(id, name, room) {
        var newUser = { id, name, room };
        this.users.push(newUser);
        return newUser;
    }


    removeUser (id) {
        var user = this.getUser(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        var retrievedUser = this.users.filter((user) => user.id === id)[0];
        return retrievedUser;
    }
    
    getUserList (room) {
        // goes through every array element, and checks if user.room === room
        // If so it returns true and as such that element is kept in the new "filteredUsers" variable
        var filteredUsers = this.users.filter((user) => user.room === room );

        // Goes through all array elements and "changes" them from a User instance into a string
        // In this case it takes the names
        var namesArray = filteredUsers.map((user) => user.name );

        return namesArray;
    }
}

module.exports = {Users}













// class Person {

//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// var me = new Person("Rhys", 21);
// console.log(me.getUserDescription());