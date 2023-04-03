import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faTrashAlt, faUndo, faRedo, faCopy, faSave } from '@fortawesome/free-solid-svg-icons';

const Button = styled.button`
  border: none;
  background: none;
  position: ${props => props.iconType === 'save' ? 'relative' : 'none'};
  bottom: ${props => props.iconType === 'save' ? '26px' : '0px'};;
  right: ${props => props.iconType === 'save' ? '9px' : '0px'};
  outline: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 3px;
  color: ${props => props.iconType === 'save' ? props.theme.whiteIcon : props.theme.grayIcon};
  font-size: ${props => props.fontSize || ''};
  opacity: ${props => props.disabled ? '0.5' : '1'};
  &:hover {
    ${props => !props.disabled && css`
      background-color: ${props.iconType === 'save' ? props.theme.greenHover : props.theme.grayHover};
      color: ${props => props.iconType === 'save' ? props.theme.primary : props.theme.grayIcon};
    `};

  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  top: ${props => props.top || '2px'};
  right: ${props => props.right || '3px'};
`;

const getIconForType = type => {
  switch (type) {
    case 'edit':
      return faPen;
    case 'confirm':
      return faCheck;
    case 'delete':
      return faTrashAlt;
    case 'save':
      return faSave;
    case 'redo':
      return faRedo;
    case 'copy':
      return faCopy;
    default:
      return null;
  }
};

const IconButton = props => {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={getIconForType(props.iconType)} />
    </Button>
  );
};
IconButton.propTypes = {
  iconType: PropTypes.oneOf(['edit', 'confirm', 'delete', 'undo', 'redo', 'copy']),
};
IconButton.ButtonContainer = ButtonContainer;

export default IconButton;
