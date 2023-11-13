import { styled } from "styled-components";

export const HeaderStyle = styled.header`
   width: 100%;
   height: 100%;
   display: none;
   position: fixed;
   top: 0;
   right: 0;
   background-color: #ededed;
   color: black;
   border-left: 1px solid gray;
   z-index:25;
   display: ${(props) => (props.mobilemenuopen === 'true' ? 'flex' : 'none')};
   @media screen and (min-width: 900px) {
    width: 30%;
    display: flex;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    font-size: 13vw;
    margin-bottom: 0;
  }
   .close:hover{
   color: gray;
  }
   .ul{
      text-decoration: none;
      line-height: 0;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: start;
      padding-left: 25%;
      @media screen and (max-width: 500px) {
        padding: 15%;
  }
  :hover{
    color: gray;
  }
  .li{
    .notification{
        display: flex;
    }
      button{
          font-size: 7vw;
          border:none;
          font-family:'Anton';
          text-transform: uppercase;
          padding: 0;
          margin: 0;
          cursor: pointer; 
          margin-bottom: -15px;
          background-color: transparent;
          @media screen and (min-width: 900px) {
              font-size: 3.5vw;
          }
  
      }
    }
  }

.menu-icon {
  cursor: pointer;
  font-size: 20px;
  margin: 1vw;
  position: absolute;
  right: 0;
  @media screen and (max-width: 900px) {
    margin: 6vw;
    font-size: 28px;
  }
  @media screen and (max-width: 500px) {
    margin: 8vw;
    font-size: 26px;
  }
}

.close-icon {
  cursor: pointer;
  text-align: right;
  color: black;
}

`

export const MobileButton = styled.button`
  display: flex;
  @media screen and (min-width: 900px) {
    display: none;
  }
  display: ${(props) => (props.mobilemenuopen === 'true' ? 'none' : 'flex')};
  position: ${(props) => (props.mobilemenuopen === 'true' ? '' : 'fixed')};
  cursor: pointer;
  font-size: 20px;
  padding: 20px;
  padding-right: 30px;
  background-color: transparent;
  display: flex;
  justify-content: flex-end;
  height: 70px;
  right: 0;
  font-family:'Anton';
  border: none;
  z-index: 25;
`;

export const Close = styled.button`
 display: ${(props) => (props.menuopen === 'true' ? 'flex' : 'none')};
  @media screen and (min-width: 900px) {
    display: none;
  }
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin: 20px;
  position: absolute;
  right: 0;
  font-weight: bold;
`;