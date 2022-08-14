import React from 'react';
import styled from "styled-components";

const StyledAuthMessage = styled.div`
  	display: flex;
  	align-items: center;
  	justify-content: space-around;
	width: 100%;
  	height: calc(100% - 80px);
  
  	background-color: rgba(17,24,39, 1);
  	& p{
	  font-size: 24px;
	  font-weight: bold;
	  color: #fff;
    }
  
`;
const MainPageAuthMessage = () => {
	return (
		<StyledAuthMessage>
			<p>Вам нужно авторизоваться через дискорд для получения доступа к админ панели репортов!</p>
		</StyledAuthMessage>
	);
};

export default MainPageAuthMessage;