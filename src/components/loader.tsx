import React from 'react';
import styled from "styled-components";
import {CircularProgress} from "@mui/material";

const StyledLoaderBlock = styled.div`
  	display: flex;
  	justify-content: space-around;
	width: 100%;
  	height: 100%;
`
const Loader = () => {
	return (
		<StyledLoaderBlock>
			<CircularProgress/>
		</StyledLoaderBlock>
	);
};

export default Loader;