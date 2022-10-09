const SET_USERS = 'SET_USERS'

export let setUsers = (value) => {
    return({
        type: SET_USERS,
        value
    })
}

let initialState = {
    users: [
        {
            id: 0,
            name: 'Name',
            castleName: 'Castle name',
            coins: 100,
            nft: 100,
            castleLevel: 10
        }
    ],
}

let adminReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS: {
            return({
                ...state,
                users: action.value
            })
        }
        default: {
            return({
                ...state
            })
        }
    }
} 

export default adminReducer