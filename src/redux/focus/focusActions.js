import * as focusTypes from './focusTypes';


const outlineElementStyle = (element, style) => {
    return element
        ? {
              width: `${element.offsetWidth}px`,
              height: `${element.offsetHeight}px`,
              transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop + 5}px)`,
            
        }
        : style;
};

export const changeFocus = (element) => {
    return {
        type: focusTypes.CHANGE_FOCUS,
        payload: element
    };
}


export const changeStyle = (newStyle = "not_specified") => {
    if (newStyle === "not_specified") {
		return (dispatch, getState) => {
			dispatch({
				type: focusTypes.CHANGE_STYLE,
				payload: getState().focus.currentFocusedElm?outlineElementStyle(getState().focus.currentFocusedElm.current, getState().focus.style): null,
			});
        }
    } else {
        return (dispatch, getState) => {
			dispatch({ type: focusTypes.CHANGE_STYLE, payload: newStyle });
		};
    } 
}

export const blurFocus = () => {
    return {
        type: focusTypes.BLUR_FOCUS
    };
}


