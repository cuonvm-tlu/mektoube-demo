import React, { useEffect } from 'react';

import "./style.css";
import 'font-awesome/css/font-awesome.min.css';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    select: {
      borderBottom: '1px solid white',
      color: 'white',
      fontFamily: 'Avenir Next Condensed'
    },
    input: {
      color: 'white',
      fontFamily: 'Avenir Next Condensed'
    }
  }),
);

export const Origin: React.FC<{register:any, isError: boolean}> = ({register, isError}) => {
    const classes = useStyles();
    const [border, setBorder] = React.useState('styled-select-white');
    useEffect(()=> {
      if (isError===true)
        setBorder('styled-select-red')
      else
        setBorder('styled-select-white')
    })
    return (
        <div className="custom-select">
        <select className={border} name="origin" ref={register}>
          <option> Origine:</option>
          <option value={0} ref={register} >Peu importe</option>
          <option value={1} ref={register} >Algérien</option>
          <option value={2} ref={register} >Marocain</option>
          <option value={3} ref={register} >Tunisien</option>
          <option value={4} ref={register}>Autre</option>
          <option value={5} ref={register}>Je la garde pour moi</option>
        </select>
      </div>
    );
}




