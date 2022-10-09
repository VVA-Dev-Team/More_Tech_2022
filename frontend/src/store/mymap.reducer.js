const SET_BUILDS = 'SET_BUILDS'

export let setUsers = (value) => {
    return({
        type: SET_BUILDS,
        value
    })
}

let initialState = {
    users: [
        {
            id: 0,
            name: 'Name',
            
        }
    ],
}

let mapReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_BUILDS: {
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

export default mapReducer