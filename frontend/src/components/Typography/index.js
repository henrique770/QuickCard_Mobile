import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

export default function Typography({size, color, weight, overflow, maxHeight,...props}) {
  return (
    <S.Typography size={size} color={color} weight={weight} overflow={overflow} maxHeight={maxHeight} {...props} />
  );
}

Typography.propTypes = {
size: PropTypes.string,
color: PropTypes.string,
weight: PropTypes.string,
overflow: PropTypes.string,
maxHeight: PropTypes.string,
}

Typography.defaultProps = {
  color: '#000'
}
