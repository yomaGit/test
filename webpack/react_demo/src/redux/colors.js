import {v4} from "uuid";

//- action对应关系
const C={
    ADD_COLOR:'ADD_COLOR',
    RATE_COLOR:'RATE_COLOR',
    REMOVE_COLOR:'REMOVE_COLOR'
}

//- actions

export const addColor = (title, color) =>
    ({
        type: C.ADD_COLOR,
        id: v4(),
        title,
        color,
        rating:0
    })

export const removeColor = id =>
    ({
        type: C.REMOVE_COLOR,
        id
    })

export const rateColor = (id, rating) =>
    ({
        type: C.RATE_COLOR,
        id,
        rating
    })

//- reducers
export const colors = (state = [], action) => {
    switch (action.type) {
        case C.ADD_COLOR:
            return [...state,
                    {
                        id: action.id,
                        title: action.title,
                        color: action.color,
                        rating: 0
                    }
                ]

        case C.RATE_COLOR:
            return state.map(
                c => c.id !== action.id ?
                    c :
                    {
                        ...c,
                        rating: action.rating
                    }
            )
        case C.REMOVE_COLOR:
            return state.filter(
                c => c.id !== action.id
            )
        default:
            return state;
    }
}
