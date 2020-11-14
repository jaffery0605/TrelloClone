import { CONSTANTS } from "../actions"

let listID = 3;
let cardID = 8;

const initialState = [
    {
        title: "Last Episode",
        id: `list-$(0)`,
        cards:[
            {
                id:`card-$(0)`,
                text:"we created a static list and a static card 1"
            },
            {
                id:`card-$(1)`,
                text:"we created a static list and a static card 2"
            },
        ]
    },
    {
        title: "This Episode",
        id:`list-$(1)`,
        cards:[
            {
                id:`card-$(2)`,
                text:"we created a static list and a static card 3"
            },
            {
                id:`card-$(3)`,
                text:"we created a static list and a static card 4"
            },
            {
                id:`card-$(4)`,
                text:"we created a static list and a static card 5"
            },
        ]
    },
    {
        title: "That Episode",
        id:`list-$(2)`,
        cards:[
            {
                id:`card-$(5)`,
                text:"we created a static list and a static card 6"
            },
            {
                id:`card-$(6)`,
                text:"we created a static list and a static card 7"
            },
            {
                id:`card-$(7)`,
                text:"we created a static list and a static card 8"
            },
            {
                id:`card-$(8)`,
                text:"we created a static list and a static card 9"
            },
        ]
    },
];





const listReducer=(state = initialState,action)=>{
    switch(action.type){
        case CONSTANTS.ADD_LIST:
            const newList ={
                title: action.payload,
                cards:[],
                id: `list-$(listID)`,
            }
            listID += 1;
            return [...state,newList];

            case CONSTANTS.ADD_CARD:
            {
            const newCard ={
                text: action.payload.text,
                id: `card-$(cardID)`,
            }
            cardID += 1;
            const newState = state.map(list => {
                if(list.id === action.payload.listID){
                    return {
                        ...list,
                        cards:[...list.cards ,newCard]
                    }
                }
                else{
                    return list;
                }
            });
            return newState;
            }   

            case CONSTANTS.DRAG_HAPPENED:
                const {
                    droppableIdStart,
                    droppableIdEnd,
                    droppableIndexStart,
                    droppableIndexEnd,
                    type
                    } = action.payload;
                    const newState=[...state];
                    //dragging lists arround
                    if(type === "list"){
                        const list = newState.splice(droppableIndexStart,1)
                        newState.splice(droppableIndexEnd, 0 ,...list);
                        return newState;

                    }

                    //in the same list
                if(droppableIdStart === droppableIdEnd ){
                    const list = state.find(list => droppableIdStart === list.id)
                    const card = list.cards.splice(droppableIndexStart, 1)
                    list.cards.splice(droppableIndexEnd, 0 , ...card)
                }
                //other list
                if(droppableIdStart !== droppableIdEnd ){
                    //find the list Where drag Happened
                    const listStart = state.find(list => droppableIdStart === list.id)

                    //pull out the card from the list
                    const card = listStart.cards.splice(droppableIndexStart, 1);

                    //find the list where drag ended

                    const listEnd = state.find(list => droppableIdEnd === list.id)
                    //pull the card in the new list
                    listEnd.cards.splice(droppableIndexEnd, 0 , ...card)
                }

                return newState;

        default:
            return state;
    }
}

export default listReducer;