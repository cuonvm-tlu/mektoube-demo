import { Noti, SHOW_NOTI, HIDE_NOTI, NotiActionTypes } from '../Action/notiTypes'

const initialState: Noti = {
  isShowed: false
}

const notiReducer = (state = initialState, action: NotiActionTypes) => {
    switch (action.type) {
        case SHOW_NOTI:
            return {...state, isShowed: true};
        case HIDE_NOTI:
            return {...state, isShowed: false};
        default:
            return state;
    }
}

export default notiReducer