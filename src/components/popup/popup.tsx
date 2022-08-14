import React, {useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";
import PopupContent from "./popup.content";


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
	openedRef:any,
	// opened:boolean,
	// setOpened:React.Dispatch<React.SetStateAction<boolean>>;
	children:React.ReactNode | React.ReactNode[];
}
const Popup:React.FC<IPopupProps> = ({children, openedRef}) => {
	const [opened, setOpened] = useState<boolean>(false);
	openedRef.opened = opened;
	const closePopup = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
		event.stopPropagation();
		openedRef.current = false;
	}
	return (
		<StyledPopup opened={openedRef.current} onClick={closePopup} ref={openedRef}>
			{openedRef.current && <ScrollLock/>}
			<PopupContent>
				{children}
			</PopupContent>
		</StyledPopup>
	);
};

export default Popup;