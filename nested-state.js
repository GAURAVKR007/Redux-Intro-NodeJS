const redux = require('redux')
const createStore = redux.createStore
const produce = require('immer').produce

const initialState = {
    name: 'Roronoa Zoro',
    address: {
        street: 'Nala road',
        city: 'laughtale',
        state: 'Ohio'
    },
}

const STREET_UPDATED = 'STREET_UPDATED'

// Actions 

function updateStreet(street) {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

// Reducer 

const reducer = (state = initialState,action) => {
    switch(action.type){
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     },
            // }

            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        break
        
        default:
            return state
    }
}

const store  = redux.createStore(reducer)
console.log('Initial State',store.getState());

const unsubscribe = store.subscribe(()=> {
    console.log('Updated State',store.getState());
})

store.dispatch(updateStreet('Gola Road'))

unsubscribe()