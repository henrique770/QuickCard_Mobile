import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container, TInput} from './styles';

function Input({style, icon, ...rest}, ref) {
  return (
    <Container style={style}>
      {icon && (
        <IconMc name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />
      )}
      <TInput {...rest} ref={ref} />
    </Container>
  );
}

Input.PropTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(Input);
