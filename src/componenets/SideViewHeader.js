import React, { useState, useRef, useEffect } from 'react'

import useWindowSize from '../hooks/useWindowSize';
import { 
    StyledInnerBottomHead,
    StyledInnerBottomHeadContainer,
    StyledHorizontalNavButton,
    StyledScrollIndicator
  } from '../styles/components/homeStyles';


function SideViewHeader(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const [maxPages, setMaxPages] = useState(1);

    const size = useWindowSize();

    const sideViewHeaderContainer = useRef(null);
    const intervalRef = useRef(null);


    useEffect(() => {
        resetScrollProperties();
    }, [size.width, size.height]);

    const resetScrollProperties = () => {
        if (sideViewHeaderContainer.current){
            let { scrollHeight, clientHeight } = sideViewHeaderContainer.current;
            
            setMaxPages(Math.floor(scrollHeight / clientHeight));
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
          setMaxPages(Math.floor(scrollHeight / clientHeight));

        }
    } 

    const startMove = (distance) => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            scrollHorizontally(distance);
        }, 10)
    }

    const stopMove = (distance) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const scrollHorizontally = (distance) => {
        if (sideViewHeaderContainer.current){
            sideViewHeaderContainer.current.scrollLeft += distance;
        }
    }


    return (
        <StyledInnerBottomHeadContainer>
            <StyledScrollIndicator>
                {pageNumber}/{maxPages}
            </StyledScrollIndicator>
            <span className="divider"></span>
            <StyledHorizontalNavButton
                onMouseDown={() => startMove(-10)}
                onTouchStart={() => startMove(-10)}
                onMouseUp={stopMove}
                onMouseLeave={stopMove}
                onTouchEnd={stopMove}
            >
                {'<'}
            </StyledHorizontalNavButton>
            <StyledInnerBottomHead
                
                ref={sideViewHeaderContainer}
                onScroll={scrollContainer}
                
            >
                {props.children}
            </StyledInnerBottomHead>
            <StyledHorizontalNavButton
                onMouseDown={() => startMove(10)}
                onTouchStart={() => startMove(10)}
                onMouseUp={stopMove}
                onMouseLeave={stopMove}
                onTouchEnd={stopMove}
            >
                {'>'}
            </StyledHorizontalNavButton>
        </StyledInnerBottomHeadContainer>
        
    )
}

export default SideViewHeader


