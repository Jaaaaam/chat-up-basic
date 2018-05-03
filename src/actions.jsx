export function getUsers () {
    return {
        type: 'GET_USERS'
    }
}

export function changeLoggedInUser(user) {
    return {
        type: 'CHANGE_LOGGED_IN_USER',
        payload: user
    }
}

export function changeSelectedUser(user) {
    return {
        type: 'CHANGE_SELECTED_USER',
        payload: user
    }
}