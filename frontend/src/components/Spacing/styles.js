import styled from 'styled-components/native';

export const Spacing = styled.View`
  ${({position}) => (position ? `position: ${position};` : ``)}
  ${({mt}) => (mt ? `margin-top: ${mt}px;` : ``)}
  ${({mr}) => (mr ? `margin-right: ${mr}px;` : ``)}
  ${({mb}) => (mb ? `margin-bottom: ${mb}px;` : ``)}
  ${({ml}) => (ml ? `margin-left: ${ml}px;` : ``)}
  ${({ds}) => (ds ? `display: ${ds};` : ``)}
`;
