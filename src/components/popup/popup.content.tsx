import React from 'react';
import styled from "styled-components";


const StyledPopupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 65%;

  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25vh;

  background-color: rgba(17,24,39, 0.95);
  border-radius: 10px;

  padding: 25px;
  
  @media screen and (max-width: 560px){
    width: 100%;
    height: 90vh;
    //margin: auto 0 0 0;
    border-radius: 20px 20px 0 0;
    margin-top: 10vh;
  }
`;

interface IPopupContent{
	children:React.ReactNode | React.ReactNode[];
}

const PopupContent:React.FC<IPopupContent> = ({children}) => {
	return (
		<StyledPopupContent onClick={(e) =>{e.stopPropagation()}}>
			{children}
		</StyledPopupContent>
	);
};

export default PopupContent;