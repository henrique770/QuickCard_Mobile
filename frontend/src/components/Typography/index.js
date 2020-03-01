import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

export default function Typography({
  size,
  color,
  weight,
  overflow,
  maxHeight,
  textAlign,
  width,
  ...props
}) {
  return (
    <S.Typography
      size={size}
      color={color}
      weight={weight}
      overflow={overflow}
      maxHeight={maxHeight}
      textAlign={textAlign}
      width={width}
      {...props}
    />
  );
}

Typography.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  overflow: PropTypes.string,
  maxHeight: PropTypes.string,
  textAlign: PropTypes.string,
  width: PropTypes.string,
};

Typography.defaultProps = {
  color: '#333',
};
