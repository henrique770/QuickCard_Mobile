import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Spacing({position, mt, mr, mb, ml, ds, ...props}) {
  return (
    <S.Spacing
      position={position}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      ds={ds}
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
};
