// eslint-disable-next-line quotes
import React, { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BoardContainer, Container } from '../styles/Board.styles';
import CardList from '../components/CardList';
import {
  addCard,
  removeCard,
  moveCardToList,
  addNewCard,
  updateCardDetails,
  reOrderCards,
} from '../actions/boardActions';
import { CARD_APIS_URL } from "../api/apiRoutes";

const Board = (props) => {
  const [cards, setCards] = useState([]);
  const [isfetched, setIsFetched] = useState(false);
  useEffect(() => {
    axios
      .get(`${CARD_APIS_URL}/get`)
      .then((response) => {
        setCards(response.data.data);
        setIsFetched(true);
      })
      .catch((error) => {
        setCards([])
        setIsFetched(true)
      })
  }, []);
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      // Dropped in the same list
      props.reOrderCardsInList(
        source.droppableId,
        draggableId,
        source.index,
        destination.index
      );
    } else {
      // Drop in other list
      props.moveCardToList(
        source.droppableId,
        draggableId,
        destination.droppableId,
        destination.index
      );
    }
  };
  return (
    <div>
      <Container>
        <BoardContainer countColumns={props.lists.length + 1}>
          <DragDropContext onDragEnd={onDragEnd}>
            {isfetched
              && props.lists.map((list) => (
                <CardList
                  key={list.id}
                  droppableId={list.id}
                  list={list}
                  cards={cards}
                  onChangeCardContent={(cardIndex, cardId, cardContent) => props.onChangeCardContent(
                    list.id,
                    cardIndex,
                    cardId,
                    cardContent
                  )}
                  onAddCard={(cardId, cardContent) => props.onAddCard(list.id, cardId, cardContent)}
                  onAddNewCard={(cardContent) => props.onAddNewCard(list.id, cardContent, list.cards.length)}
                  onRemoveCard={(cardIndex, cardId) => props.onRemoveCard(list.id, cardIndex, cardId)}
                />
              ))}
          </DragDropContext>
        </BoardContainer>
      </Container>
    </div>
  );
};

Board.propTypes = {
  reOrderCardsInList: PropTypes.func,
  moveCardToList: PropTypes.func,
  lists: PropTypes.array,
  onChangeCardContent: PropTypes.func,
  onAddCard: PropTypes.func,
  onAddNewCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
};
const mapStateToProps = (state) => ({
  lists: state.board.lists,
});

const mapDispatchToProps = (dispatch) => ({
  removeCard: bindActionCreators(removeCard, dispatch),
  reOrderCardsInList: bindActionCreators(reOrderCards, dispatch),
  moveCardToList: bindActionCreators(moveCardToList, dispatch),
  onChangeCardContent: bindActionCreators(updateCardDetails, dispatch),
  onAddCard: bindActionCreators(addCard, dispatch),
  onAddNewCard: bindActionCreators(addNewCard, dispatch),
  onRemoveCard: bindActionCreators(removeCard, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
