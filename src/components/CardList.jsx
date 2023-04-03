import React, {useEffect } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { CardListContainer, CardListWrapper } from '../styles/CardList.styles';
import CardListHeader from './CardListHeader';
import AddForm from './AddForm';

const CardList = props => {

  useEffect(() => {
    if(props.cards.length){
      props.cards.forEach((card) => {
        if(props.list.id === card.status){
        props.onAddCard(card.cardId, card.cardContent);
        }
      });
    }
  }, [props.cards]);

  return (
    <CardListWrapper>
      <CardListHeader
        listName={props.list.name}
      />
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <CardListContainer
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.list.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onChangeCardContent={content => props.onChangeCardContent(index, card.id, content)}
                onRemoveCard={() => props.onRemoveCard(index, card.id)}
                onDuplicateCard={() => props.onAddNewCard(card.content)}
              />
            ))}
            {provided.placeholder}
            <AddForm
              onConfirm={props.onAddNewCard}
              placeholder="+ Add new card"
              focusPlaceholder="Enter card content"
              darkFont
              width="auto"
              gray
            />
          </CardListContainer>
        )}
      </Droppable>
    </CardListWrapper>
  );
};

CardList.propTypes = {
  list: PropTypes.object,
  onChangeCardContent: PropTypes.func,
  droppableId: PropTypes.string,
  onAddCard: PropTypes.func,
  onAddNewCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
};
export default CardList;
