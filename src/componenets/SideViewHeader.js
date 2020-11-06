import React, { useState, useRef, useEffect, Fragment } from 'react'

import useWindowSize from '../hooks/useWindowSize';
import { 
    StyledInnerBottomHead,
    StyledInnerBottomHeadContainer
  } from '../styles/components/homeStyles';


function SideViewHeader(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    //const [lastScrollTop, setLastScrollTop] = useState(0);
    //const [canScroll, setCanScroll] = useState(true);

    const size = useWindowSize();

    const sideViewHeaderContainer = useRef(null);


    useEffect(() => {
        resetScrollProperties();
    }, [size.width, size.height]);

    const resetScrollProperties = () => {
        if (sideViewHeaderContainer.current){
            let { scrollHeight, clientHeight, scrollTop } = sideViewHeaderContainer.current;
            
            setMaxPages(scrollHeight / clientHeight);
            //setPageNumber(Math.floor(scrollTop / clientHeight) + 1);
            //setLastScrollTop(0);
            sideViewHeaderContainer.current.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }


    const scrollContainer = (e) => {
        
        if (sideViewHeaderContainer.current){
          let { scrollTop, clientHeight, scrollHeight } = sideViewHeaderContainer.current;
          
          setPageNumber(Math.floor(scrollTop / clientHeight) + 1);
          setMaxPages(scrollHeight / clientHeight);

        }
    } 


    return (
        <StyledInnerBottomHeadContainer>
            <div 
                style={pageIndicatorStyle}
            >
                {pageNumber}/{maxPages}
            </div>
            <StyledInnerBottomHead
                
                ref={sideViewHeaderContainer}
                onScroll={scrollContainer}
                
            >
                {props.children}
            </StyledInnerBottomHead>
            
        </StyledInnerBottomHeadContainer>
        
    )
}

export default SideViewHeader


const pageIndicatorStyle = {
    
    color:'#fff',
    borderRadius: '5px',
    border: '2px solid grey',
    padding: '5px',
    margin: '5px',
}
