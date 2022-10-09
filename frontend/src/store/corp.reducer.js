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
    tasks: [
        {
            id: 0,
            name: 'Task`s name',
            desc: 'Very long description',
            
        }
    ],
    tests: [
        {
            id: 0,
            name: 'Test`s name',
            text: 'Very long text',
            questions: [
                {
                    id: 0,
                    text: 'Text_1',
                    answers: [
                        {
                            id: 0,
                            value: 'Answer_1'
                        },
                        {
                            id: 1,
                            value: 'Answer_2'
                        }
                    ],
                    right: 1
                }
            ]
            
        }
    ]
}

let corpReducer = (state = initialState, action) => {
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

export default corpReducer