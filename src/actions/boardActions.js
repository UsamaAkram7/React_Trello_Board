import * as types from "../constants/ActionTypes";
import axios from "axios";
import { randomId } from "../helpers/utils";
import { CARD_APIS_URL } from "../api/apiRoutes";

export const addList = (name) => {
  return (dispatch) => {
    dispatch({ type: types.ADD_LIST, data: name });
  };
};

export const addNewCard = (listId, cardContent, cardIndex) => {
  return (dispatch) => {
    const cardPayload = {
      cardId: randomId(),
      cardContent,
      index: cardIndex,
      status: listId,
    };
    return axios.post(`${CARD_APIS_URL}/add`, cardPayload).then(
      (result) =>
        dispatch({
          type: types.ADD_CARD,
          data: {
            listId: cardPayload.status,
            cardContent: cardPayload.cardContent,
            cardId: cardPayload.cardId,
          },
        }),
      (err) => console.log("Error!!!")
    );
  };
};

export const addCard = (listId, cardId, cardContent) => {
  return (dispatch) => {
    dispatch({ type: types.ADD_CARD, data: { listId, cardContent, cardId } });
  };
};

export const removeCard = (listId, cardIndex, cardId) => {
  return (dispatch) => {
    return axios.post(`${CARD_APIS_URL}/delete`, { cardId }).then(
      (response) =>
        dispatch({ type: types.REMOVE_CARD, data: { listId, cardIndex } }),
      (err) => console.log("Error!!!")
    );
  };
};

export const updateCardDetails = (
  listId,
  cardIndex,
  cardId,
  cardContent,
  isUpdateState
) => {
  return (dispatch) => {
    const updatedCard = {
      cardId,
      cardContent,
      cardIndex,
      status: listId,
    };
    return axios.put(`${CARD_APIS_URL}/update`, updatedCard).then(
      (response) => {
        if (!isUpdateState)
          dispatch({
            type: types.UPDATE_CARD_DETAILS,
            data: { listId, cardIndex, cardContent },
          });
      },

      (err) => {
        console.log("Error!!!");
      }
    );
  };
};

export const reOrderCards = (
  listId,
  cardId,
  cardSourceIndex,
  cardDestinationIndex
) => {
  return (dispatch) => {
    dispatch({
      type: types.RE_ORDER_CARDS,
      data: {
        listId,
        cardSourceIndex,
        cardDestinationIndex,
      },
    });
  };
};

export const moveCardToList = (
  sourceListId,
  cardId,
  destinationListId,
  cardDestinationIndex
) => {
  return (dispatch) => {
    const updatedCard = {
      cardId,
      cardIndex: cardDestinationIndex,
      status: destinationListId,
    };
    return axios.put(`${CARD_APIS_URL}/update`, updatedCard).then(
      (response) =>
        dispatch({
          type: types.MOVE_CARD_TO_LIST,
          data: {
            sourceListId,
            cardId,
            destinationListId,
            cardDestinationIndex,
          },
        }),
      (err) => console.log("Error!!!")
    );
  };
};
