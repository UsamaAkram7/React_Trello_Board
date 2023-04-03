import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CardListHeader as StyledCardListHeader } from '../styles/CardList.styles';
import OutsideClickHandler from './OutsideClickHandler';
import ContentEditable from './ContentEditable';
import IconButton from './IconButton';
import * as UtilsHelper from '../helpers/utils';

const CardListHeader = props => {
  const ref = useRef(null);
  const [onHover, setOnHover] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState(props.listName);
  useEffect(() => {
    setListName(props.listName);
  }, [props.listName]);

  useEffect(() => {
    if (editMode) {
      UtilsHelper.focusCursorToEnd(ref);
    }
  }, [editMode]);

  const onClickOutside = () => {
    setEditMode(false);
  };
  return (
    <OutsideClickHandler
      shouldListenClick={editMode}
      onClickOutside={onClickOutside}
    >
      <StyledCardListHeader
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <ContentEditable
          innerRef={ref}
          html={listName}
          style={{ paddingRight: 24 }}
        />
      </StyledCardListHeader>
    </OutsideClickHandler>
  );
};

CardListHeader.propTypes = {
  listName: PropTypes.string,
};

export default CardListHeader;
