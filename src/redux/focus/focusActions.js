import * as focusTypes from './focusTypes';


export const changeFocus = (element) => {
    return {
        type: focusTypes.CHANGE_FOCUS,
        payload: element
    };
}


export const changeStyle = (newStyle) => {
    return {
        type: focusTypes.CHANGE_STYLE,
        payload: newStyle
    };
}

export const blurFocus = () => {
    return {
        type: focusTypes.BLUR_FOCUS
    };
}


