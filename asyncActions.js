const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware



const initialState = {
    loading: false,
    users: [],
    error: '',
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

// Actions 

const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error
    }
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true
            }
            break
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
            break
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            // Response.data is the users
            const users = response.data.map((user) => user.id)
            dispatch(fetchUserSuccess(users))
        }).catch(error => {
            // Error meassage
            dispatch(fetchUserFailure(error.message))
        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))

store.subscribe (() => {
    console.log(store.getState());
})

store.dispatch(fetchUsers())