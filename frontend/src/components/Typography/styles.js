import styled from 'styled-components';

export const Typography = styled.Text`
  ${({size}) => (size ? `font-size: ${size}px;` : '')}
  ${({weight}) => (weight ? `font-weight: ${weight};` : '')}
  ${({color}) => (color ? `color: ${color};` : '')}
  ${({overflow}) => (overflow ? `overflow: ${overflow};` : '')}
  ${({maxHeight}) => (maxHeight ? `max-height: ${maxHeight}px;` : '')}
  ${({textAlign}) => (textAlign ? `text-align: ${textAlign};` : '')}
  ${({width}) => (width ? `width: ${width}px;` : '')}
`;
