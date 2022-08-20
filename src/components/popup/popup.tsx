import React, {useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import PopupContent from "./popup.content";
import {Container} from "@mui/material";
import {ToastContainer} from "react-toastify";


const StyledPopup = styled.div`
  z-index: 10000;
  display: ${({opened}:{opened:boolean}) => opened ? "block" : "none"};

  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  backdrop-filter: blur(5px);

  background-color: rgba(17,24,39, 0.4);

  @media screen and (max-width: 560px){
    width: 100%;
    height: 100%;
    
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    
    margin: 0;
  }
`;

const ScrollLock = createGlobalStyle`
  body {
    position: fixed;
  }
`;

interface IPopupProps{
	opened:boolean,
	setOpened:React.Dispatch<React.SetStateAction<boolean>>;
	children:React.ReactNode | React.ReactNode[];
}
const Popup:React.FC<IPopupProps> = ({children, opened, setOpened}) => {
	const closePopup = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.stopPropagation();
		setOpened(false);
	}
	return (
		<StyledPopup opened={opened} onClick={closePopup}>
			{opened && <ScrollLock/>}
			<PopupContent>
				{children}
			</PopupContent>
			<ToastContainer enableMultiContainer containerId={"pop-up-container"} newestOnTop limit={1}/>
		</StyledPopup>
	);
};

export default Popup;