import React,{Component} from 'react';
import TrelloList from "./trelloList";
import { connect } from "react-redux";
import TrelloActionButton from "./TrelloActionButton";
import { DragDropContext,Droppable } from "react-beautiful-dnd"; 
import { sort } from "../actions";
import styled from "styled-components";

const ListContainer = styled.div`

  display:flex;
  flex-direction: row;
  
`

class App extends Component {
  onDragEnd=(result)=>{
    const {destination , source , draggableId,type } = result;
    console.log("from func", type);
    if(!destination){
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    )
  };

  render(){
  const {lists} = this.props;
  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
      <div className="App">
        <h2>
          Hello Habibi
        </h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {provided=>(
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
          {lists.map((list,index) => (
            <TrelloList title={list.title} 
            listID={list.id}
             key={list.id}
              cards={list.cards}
              index={index} />
          ))}
          <TrelloActionButton list/>
        </ListContainer>
        )}
        </Droppable>
      </div>
      </DragDropContext>
    );
  }
}


const mapStateToProps = state => ({
  lists : state.lists
})

export default connect(mapStateToProps)(App);
