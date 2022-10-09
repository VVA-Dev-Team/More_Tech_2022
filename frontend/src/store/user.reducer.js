const SET_USER = 'SET_USER'
const SET_BATTLE = 'SET_BATTLE'

export let setUser = (id, role) => {
    return ({
        type: SET_USER,
        id,
        role
    })
}

export let setBattle = (flag, id) => {
    return ({
        type: SET_BATTLE,
        id,
        flag
    })
}

let initialState = {
    user: {
        id: -1,
        role: 'USER'
    },
    battle: {
        flag: false,
        id: -1
    }
}

let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return ({
                ...state,
                user: {
                    id: action.id,
                    role: action.role
                }

            })
        }
        case SET_BATTLE: {
            return ({
                ...state,
                battle: {
                    id: action.id,
                    flag: action.flag
                }
            })
        }
        default: {
            return ({
                ...state
            })
        }
    }
}

export default userReducer