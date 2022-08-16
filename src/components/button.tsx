import React from 'react';
import styled from "styled-components";

const StyledButton = styled.button`
  	display: flex;
  	align-items: center;
  	
  	padding: 5px 15px 5px 15px;
  	border-radius: 5px;
	background-color: ${({color}:{color:string}) => color};
  	
  	font-size: 18px;
  	font-weight: 500;
  	color: white;
`;

type buttonType = "ACCEPT" | "REJECT" | "TAKE";

interface IButtonProps{
	type:buttonType
};

const ButtonTypesSettings:{[key:string]:{color:string, text:string}} = {
	"ACCEPT": {
		color: "#56f000",
		text: "ПОДТВЕРДИТЬ"
	},
	"REJECT": {
		color: "#ff3838",
		text: "ОТКЛОНИТЬ"
	},
	"TAKE": {
		color: "#2dccff",
		text: "ВЗЯТЬ"
	}
};


const Button:React.FC<IButtonProps> = ({type}) => {
	return (
		<StyledButton color={ButtonTypesSettings[type].color}>
			{ButtonTypesSettings[type].text}
		</StyledButton>
	);
};

export default Button;