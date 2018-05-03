
export default function (state = {
    users: [
        {
            id: 1,
            name: 'Patricia Jamille Silvestre',
            img: '1.jpg',
            lastMessage: 'Hello! How are you?'
        },
        {
            id: 2,
            name: 'Jane Anne Smith',
            img: '2.jpg',
            lastMessage: 'Are you still there?'
        },
        { 
            id: 3,
            name: 'John Paul Doe',
            img: '3.jpg',
            lastMessage: 'Message me. ASAP'
        },
        { 
            id: 4,
            name: 'Jacob James Black',
            img: 'friend.jpg',
            lastMessage: 'Thanks!'
        },
    ],
    loggedInUser: { id: 1, name: 'Patricia Jamille Silvestre', img: '1.jpg', socketId: null},
    selectedUser: {}

}, action = {}) {
    let newState = {...state};

    const factory = {
        GET_USERS: getUsers,
        CHANGE_LOGGED_IN_USER: changeLoggedInUser,
        CHANGE_SELECTED_USER: changeSelectedUser,
        returnState: returnState
    };

    function getUsers() {
        return state;
    }

    function changeLoggedInUser() {
        newState.loggedInUser = action.payload

        return newState
    }

    function changeSelectedUser() {
        console.log('action.payload', action.payload)
        newState.selectedUser = action.payload

        return newState
    }

    function returnState() {
        return state;
    }

    return (factory[action.type] || factory.returnState)(state, action);
}

