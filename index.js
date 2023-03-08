const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_STOCK = 'CAKE_STOCK'

// Action
function orderCake() {
    return {
    type: CAKE_ORDERED,
    payload: 1
    }
}

function stockCake(qty = 1) {
    return {
        type: CAKE_STOCK,
        payload: qty
    }
}

const initalState = {
    numOfCakes: 10,
}

// (prevState , action) => newState;

// Reducer
const reducer = (state = initalState,action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,                     // Spread Operator
                numOfCakes: state.numOfCakes -1,
            }
            break;

            case CAKE_STOCK:
                return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
                }
                break
        default:
            return state
    }
}

const store = createStore(reducer)
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(()=> console.log('Update state', store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(stockCake())
// store.dispatch(stockCake(5))

const actions = bindActionCreators({orderCake,stockCake},store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.stockCake()
actions.stockCake(5)



unsubscribe()