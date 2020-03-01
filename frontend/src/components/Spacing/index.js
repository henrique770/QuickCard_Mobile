import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Spacing({
  position,
  mt,
  mr,
  mb,
  ml,
  ds,
  top,
  right,
  bottom,
  left,
  width,
  ...props
}) {
  return (
    <S.Spacing
      position={position}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      ds={ds}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      width={width}
      {...props}
    />
  );
}

Spacing.propTypes = {
  position: PropTypes.string,
  mt: PropTypes.string,
  mr: PropTypes.string,
  mb: PropTypes.string,
  ds: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  width: PropTypes.string,
};
