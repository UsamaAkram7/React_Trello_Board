import * as types from '../constants/ActionTypes';
import * as BoardHelper from '../helpers/boardHelper';
import { randomId } from '../helpers/utils';
import initialListData from '../helpers/initialListData';

const initialState = {
  lists: initialListData,
};

const board = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case types.ADD_LIST:
      newState = [
        ...state.lists,
        {
          id: randomId(),
          name: action.data,
          cards: []
        }
      ];
      return {
        ...state,
        lists: newState,
        offset: state.offset + 1
      };

    case types.ADD_CARD:
      return {
        ...state,
        lists: state.lists.map((list, listIndex) => {
          if (list.id !== action.data.listId) {
            return list;
          }
          return {
            ...list,
            cards: [...list.cards, {
              id: action.data.cardId,
              content: action.data.cardContent
            }]
          };
        })
      };

    case types.REMOVE_CARD:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id !== action.data.listId) {
            return list;
          }
          const newCards = [...list.cards];
          newCards.splice(action.data.cardIndex, 1);
          return {
            ...list,
            cards: newCards
          };
        })
      };

    case types.UPDATE_CARD_DETAILS:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id !== action.data.listId) {
            return list;
          }
          return {
            ...list,
            cards: list.cards.map((card, cardIndex) => {
              if (cardIndex !== action.data.cardIndex) {
                return card;
              }
              return {
                ...card,
                content: action.data.cardContent
              };
            })
          };
        })
      };

    case types.RE_ORDER_CARDS:
      const listIndex = state.lists.findIndex(list => list.id === action.data.listId);
      const list = state.lists[listIndex];
      const orderedListCards = BoardHelper.reOrderList(
        list.cards,
        action.data.cardSourceIndex,
        action.data.cardDestinationIndex
      );
      newState = [...state.lists];
      newState[listIndex] = {
        ...newState[listIndex],
        cards: orderedListCards
      };
      return {
        ...state,
        lists: newState
      };

    case types.MOVE_CARD_TO_LIST:
      const sourceListIndex = state.lists.findIndex(cardList => cardList.id === action.data.sourceListId);
      const sourceList = state.lists[sourceListIndex];
      const destinationListIndex = state.lists.findIndex(
        cardList => cardList.id === action.data.destinationListId
      );
      const destinationList = state.lists[destinationListIndex];
      const cardSourceIndex = sourceList.cards.findIndex(item => item.id === action.data.cardId);
      const { newSourceList, newDestinationList } = BoardHelper.moveCardToList(
        sourceList.cards,
        destinationList.cards,
        cardSourceIndex,
        action.data.cardDestinationIndex
      );

      newState = [...state.lists];
      newState[sourceListIndex] = {
        ...newState[sourceListIndex],
        cards: newSourceList
      };
      newState[destinationListIndex] = {
        ...newState[destinationListIndex],
        cards: newDestinationList
      };
      return {
        ...state,
        lists: newState
      };
    default:
      return state;
  }
};

export default board;
