import styled from "styled-components";



export const Hotel = styled.div`
  width: 60rem;
  display: flex;
  height: 50rem;
  background-color: red;
  column-gap: 2rem;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Room = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 10rem;
  width: 18rem;
  flex-direction: column;
  background-color: blue;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
`;

export const Address = styled.h6`
  color: yellow;
  background: black;
  font-size: 0.7rem;
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 0rem;
`;

export const Label = styled.h6<{marginBottom: string}>`
  color: yellow;
  background: black;
  font-size: 0.7rem;
  margin-bottom: ${(e) =>e.marginBottom};
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const Owner = styled.h2`
  color: purple;
`;
