import { useForm, SubmitHandler } from "react-hook-form";
import React, {useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import "./style1.css";

import { showNoti} from '../../Action/notiActions'
import {Header} from '../../components/Header/index'
import { useDispatch } from 'react-redux'


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Noti } from  '../../components/Noti/index'
import { error } from "console";
type Inputs = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField1: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: '0px',
      marginBottom: '0px',
      fontWeight: 500,
      borderBottom: '1px solid white',
  },
    textField2: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: '50px',
      marginBottom: '0px',
      fontWeight: 500,
      borderBottom: '1px solid white',
  },
  input: {
      color: 'white',
      fontFamily: 'Avenir Next Condensed'
  }
  }),
);

export default function SignIn() {
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    resolver: yupResolver(schema)
  });
  const classes = useStyles();
  const [redBorderUserName, setRedBordeUserName] = React.useState<any>(false)
  const [redBorderPassWord, setRedBordePassWord] = React.useState<any>(false)

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(1)
    axios
    .post(`https://responsive-staging.ltservices2.ovh/api/gate/moderateur.json`,
      {
        "login" : data.username.toString(), 
        "password": data.username.toString(),
        "validitySeconds" : "7776000"
      }, 
      {
        headers: {
        "Content-type": "multipart/form-data"
        }
      }
    )
    .then((response) => {
        console.log("login factory", response);
    })
    .catch((error) => {
        console.log("login factory error", error.response.data.errors[0].message);
        dispatch(action)
    })
  }; // your form submit function which will invoke after successful validation
  const dispatch = useDispatch()
  const action = showNoti()
  useEffect(() => {
    if (errors.username!==undefined)
    setRedBordeUserName(true)
    else
    setRedBordeUserName(false)

    if (errors.password!==undefined)
    setRedBordePassWord(true)
    else
    setRedBordePassWord(false)

  });
  return (
    <div className='div'> 
    <form className='full-height' onSubmit={handleSubmit(onSubmit)}>
      <Noti content={"Le nom d'ultilisator est incorrect"}/> 
      <Header content={"Pas de Compete?"} url={"/signup/"}/>
      <h2 className='signin-h2'> Connexion </h2>
      <h6 className="signin-h6" > Nom d'utilisateur</h6>
      <TextField
        name="username"
        error={redBorderUserName}
        type='text'
        defaultValue="Benjamin"
        className={classes.textField1}
        margin="normal"
        InputProps={{
            className: classes.input,
        }}
        inputRef={register}
        fullWidth
      />
      {errors.username && <p>{errors.username.message}</p>}
      {/* {(errors.username !== undefined) ? setRedBorder(true) : setRedBorder(false)} */}
      <TextField
        name="password"
        error={redBorderPassWord}
        type="password"
        defaultValue="Mot De pas"
        className={classes.textField2}
        margin="normal"
        InputProps={{
            className: classes.input,
        }}
        inputRef={register}
        fullWidth
      />
      {errors.password && <p>{errors.password.message}</p>}
      <div> 
        <a className='signin-a' href="/signup/"> Mot de passes oublie? </a>
      </div>
      <h5 className="signin-h5"> - OU - </h5>
      <button className="signin-button1"> <i className="fa fa-facebook-square" aria-hidden="true"></i> Connexion Avec Facebook </button>
      <button className="signin-button2"> <i className="fa fa-check" aria-hidden="true"> </i>  Me Connector </button>
    </form>
    </div>
  );
}
