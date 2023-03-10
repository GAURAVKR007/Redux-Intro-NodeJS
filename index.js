const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_STOCK = 'CAKE_STOCK'
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_STOCK = "ICECREAM_STOCK"

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

function orderIcecream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function stockIcecream(qty = 1){
    return {
        type: ICECREAM_STOCK,
        payload: qty
    }
}

// const initalState = {
//     numOfCakes: 10,
//     numOfIcecream: 10
// }

const initialCakeState = {
    numOfCakes: 10
}

const initalIcecreamState = {
    numOfIcecream: 10
}

// (prevState , action) => newState;

// Reducer

const cakeReducer = (state = initialCakeState,action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes -1
            }
            break

            case CAKE_STOCK:
                return {
                    ...state,
                    numOfCakes: state.numOfCakes + action.payload
                }
                break
            default:
                return state
    }
}


const IcecreamReducer = (state = initalIcecreamState,action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,                     // Spread Operator
                numOfIcecream: state.numOfIcecream - action.payload,
            }
            break;
        
                case ICECREAM_STOCK:
                    return {
                        ...state,
                        numOfIcecream: state.numOfIcecream + action.payload,
                    }
                    break
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: IcecreamReducer
})

const store = createStore(rootReducer,applyMiddleware(logger))
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(()=> {})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(stockCake())
// store.dispatch(stockCake(5))

const actions = bindActionCreators({orderCake,stockCake,stockIcecream,orderIcecream},store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.stockCake()
actions.stockCake(5)
actions.orderIcecream(2)
actions.orderIcecream(3)
actions.stockIcecream(7)



unsubscribe()