import React from 'react';
import TrelloCard from "./trelloCard";
import TrelloActionButton from "./TrelloActionButton"
import { Droppable,Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const ListContainer = styled.div`
        background-color:#dfe3e6;
        border-radius:3px;
        width:300px;
        padding:8px;
        height:100%;
        margin-right: 8px;
`

const TrelloList=({title,cards, listID,index})=>{
    return(
        <Draggable draggableId={String(listID)} index={index}>
        {provided =>(
            <ListContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Droppable droppableId = {String(listID)} >
        { provided =>(
            <div {...provided.droppableProps} ref={provided.innerRef}>
            <h4>
                {title}
            </h4>
            {cards.map((card,index) => (<TrelloCard text={card.text}
            index={index}
             key={card.id} id={card.id}/>))}
            <TrelloActionButton listID={listID}/>
            {provided.placeholder}
        </div>
        )}
     </Droppable>
     </ListContainer>
     )}
     </Draggable>
    )
}

export default TrelloList;