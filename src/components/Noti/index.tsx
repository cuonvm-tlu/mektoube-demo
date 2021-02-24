import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { hideNoti } from '../../Action/notiActions'
import "./style2.css";
import 'font-awesome/css/font-awesome.min.css';

type noti = {
  noti: any
}

export const Noti: React.FC<{content:string}> = ({content}) => {
  const selectIsOn = (state: noti) => state.noti
  const displayState = useSelector(selectIsOn)
  var isShowed = displayState.isShowed
  const dispatch = useDispatch()
  const action = hideNoti()
  if (isShowed) {
    return (
        // <button className='button' onClick={()=> dispatch(action)} > <i className="fa fa-times-circle"></i> Le nom d'ultilisator est incorrect  </button> 
        <button className='button' onClick={()=> dispatch(action)} > <i className="fa fa-times-circle"></i> {content} </button> 
    );
  }
  return <> </>;
}



