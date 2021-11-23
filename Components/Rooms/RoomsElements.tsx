import styled from "styled-components";

export const Hotel = styled.div`
  width: 60rem;
  display: flex;
  background-color: #8247e5;
  column-gap: 2rem;
  row-gap: 1rem;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
`;

export const HotelArea = styled.div`
  width: 60rem;
  display: flex;
  margin-bottom:2rem;
  background-color: #8247e5;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  box-shadow: rgb(179 165 209 / 55%) 20px 20px 20px,
    rgb(179 165 209 / 55%) 20px 20px 20px;
`;

export const HotelName = styled.h2`
  color: black;
  font-size: 4rem;
  align-items: center;
  justify-content: center;
`;

export const Room = styled.div<{ status: String }>`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 10rem;
  width: 18rem;
  flex-direction: column;
  background-color: ${(e) => (e.status == "1" ? "#b48ff2" : "white")};
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  border-radius: 2rem;
`;

export const Address = styled.h6`
  color: black;
  position: absolute;
  bottom: 3rem;
  left: 1rem;
  display: flex;
  font-weight: 800;
  font-size: 1.5rem;
  align-items: center;
  border-radius: 6rem;
  padding: 0 1rem 0 1rem;
  background-color: rgba(165, 180, 252);
  box-shadow: rgb(179 165 209 / 45%) 0px 2px 6px,
    rgb(179 165 209 / 35%) 0px 4px 40px;
`;

export const Label = styled.h6<{ marginBottom: string }>`
  color: black;
  font-size: 1rem;
  margin-bottom: ${(e) => e.marginBottom};
  position: absolute;
  bottom: 4.5rem;
  left: 1rem;
`;

export const Owner = styled.h2`
  color: black;
  margin-top: 1rem;
  font-size: 1.5rem;
`;

export const RoomNumber = styled.h4`
  color: black;
  position: absolute;
  top: 0;
  right: 1rem;
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 999rem;
  margin-top: 1rem;
  background-color: rgba(165, 180, 252);
`;

export const DaysBooked = styled.h5`
  color: black;
  position: absolute;
  bottom: 0;
  left: 1rem;
  display: flex;
  height: 2rem;
  align-items: center;
`;

export const Time = styled.h5`
  color: black;
  position: absolute;
  bottom: 0;
  right: 1rem;
  display: flex;
  height: 2rem;
  align-items: center;
`;
