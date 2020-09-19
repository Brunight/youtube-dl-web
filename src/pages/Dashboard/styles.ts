import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  place-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  margin-top: 48px;
  width: 100%;
  max-width: 700px;

  img {
    margin-bottom: 48px;
  }

  h1,
  h3 {
    margin-bottom: 24px;
  }

  input {
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    width: 100%;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }

    & + input {
      margin-top: 8px;
    }
  }
`;
