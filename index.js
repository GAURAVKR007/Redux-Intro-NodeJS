const CAKE_ORDERED = 'CAKE_ORDERED';


function orderCake() {
    return {
    type: CAKE_ORDERED,
    quantity: 1
    }
}

const initalState = {
    numOfCakes: 10,
}

// (prevState , action) => newState;

const reducer = (state = initalState,action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,                     // Spread Operator
                numOfCakes: state.numOfCakes -1,
            }
            break;
        default:
            return state
    }
}
