import React from "react";
import { Card,Typography,CardContent } from '@material-ui/core';
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
        margin-bottom: 8px;
`

const TrelloCard=({text,id,index})=>{
    return(
    <Draggable draggableId={String(id)} index={index}>
    {provided =>(
      <CardContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
        <Card>
          <CardContent >
            <Typography gutterBottom>
              {text}
            </Typography>
          </CardContent>
        </Card>
      </CardContainer>
    )}
    </Draggable>
    )
}


export default TrelloCard;