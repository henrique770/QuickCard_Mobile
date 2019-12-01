import styled from 'styled-components/native';

export const Container = styled.View`
    margin-bottom: 15px;
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Right = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;


export const Title = styled.Text`
  color: #333;
  font-weight: bold;
  font-size: 16px;
`;

export const Preview = styled.Text`
    font-size: 14px;
    color: #333;
    margin-top: 4px;
`;
