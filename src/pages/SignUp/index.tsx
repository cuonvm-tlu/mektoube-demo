import React, {useEffect} from "react";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import {Header} from '../../components/Header/index';
import { Noti } from  '../../components/Noti/index';
import { Origin } from  '../../components/Origin/index';
import { Pays } from  '../../components/Pays/index';

import { showNoti} from '../../Action/notiActions'
import { useDispatch } from 'react-redux'

import axios from 'axios';
import moment, { months } from 'moment';


import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


import "./style.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',            
      paddingBottom: 0,
      marginTop: '10px',
      fontWeight: 500,
      borderBottom: '1px solid white',
      marginBottom: '0px'
  },
  textField2: {
    width: '40px',
    marginLeft: 'auto',
    marginRight: 'auto',            
    paddingBottom: 0,
    marginTop: 0,
    borderBottom: '1px solid white',
  },
  textField3: {
    width: '60px',
    marginLeft: 'auto',
    marginRight: 'auto',            
    paddingBottom: 0,
    marginTop: 0,
    borderBottom: '1px solid white',

  },
  input: {
      color: 'white',
      paddingBottom: '0px',
      fontWeight: 400,
      fontSize: '15px',
      fontFamily: 'Avenir Next Condensed'
  },
  }),
);

type Inputs = {
  firstname: string;
	email: string;
	password: string;
	affiliate: 1;
	mailing: 1;
	Birthday: Date;
	gender: number;
	origin: number;
	geoname_id: string,
  postcode: number,
  condition1: boolean,
  condition2: boolean,
  day: string,
  month: string,
  year: string,
};

const signupSchema = yup.object().shape({
  firstname: yup.string().required().min(5, "firstname is Too Short!").max(10, "firstname is Too Long!"),
  password: yup.string().required().min(5, "password is Too Short!").max(10, "password is Too Long!"),
  email: yup.string().email().required(),
  gender: yup.number().required(),
  postcode: yup.number().required(),
  origin: yup.number().required(),
  condition1: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  condition2: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  geoname_id: yup.string().required(),
  month: yup.number().required(),
  year: yup.number().required(),
  day: yup.number().required(),
})

export default function SignUp() {
  const { register, handleSubmit, watch, errors} = useForm<Inputs>({
    resolver: yupResolver(signupSchema)
  });
  const classes = useStyles();

  const [redBorderGender, setRedBorderGender] = React.useState<any>('')
  const [redBorderOrigin, setRedBorderOrigin] = React.useState<any>(false)
  const [redBorderDay, setRedBorderDay] = React.useState<any>(false)
  const [redBorderMonth, setRedBorderMonth] = React.useState<any>(false)
  const [redBorderYear, setRedBorderYear] = React.useState<any>(false)
  const [redBorderPlace, setRedBorderPlace] = React.useState<any>(false)
  const [redBorderEmail, setRedBorderEmail] = React.useState<any>(false)
  const [redBorderUserName, setRedBorderUserName] = React.useState<any>(false)
  const [redBorderPassWord, setRedBorderPassWord] = React.useState<any>(false)
  const [redBorderPostCode, setRedBorderPostCode] = React.useState<any>(false)
  const [redBorderCondition1, setRedBorderCondition1] = React.useState<any>('')
  const [redBorderCondition2, setRedBorderCondition2] = React.useState<any>('')


  const onSubmit: SubmitHandler<Inputs> = data => {
  const signUpForm ={
    firstname: data.firstname,
    password: data.password,
    gender: data.gender,
    geoname_id: data.geoname_id,
    mailing: 1,
    affiliate: 1,
    origin: data.origin,
    birthday: `${data.day}-${data.month}-${data.year}`,
  }
  console.log(signUpForm)

  axios.post('https://responsive-staging.ltservices2.ovh/api/pool/.json?new_key_signup=true', signUpForm)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
        dispatch(action)
  });
  }; // your form submit function which will invoke after successful validation
  
  const dispatch = useDispatch()
  const action = showNoti()

  useEffect(() => {
    if (errors.condition1 !== undefined)
      setRedBorderCondition1('input-checkbox-red')
    else
      setRedBorderCondition1('input-checkbox-white')

    if (errors.condition2 !== undefined)
      setRedBorderCondition2('input-checkbox-red')
    else
      setRedBorderCondition2('input-checkbox-white')

    if (errors.firstname !== undefined)
      setRedBorderUserName(true)
    else
      setRedBorderUserName(false)

  
    if (errors.email !== undefined)
      setRedBorderEmail(true)
    else
      setRedBorderEmail(false)

    
    if (errors.password !== undefined)
      setRedBorderPassWord(true)
    else
      setRedBorderPassWord(false)

    if (errors.postcode !== undefined)
      setRedBorderPostCode(true)
    else
      setRedBorderPostCode(false)

    if (errors.gender !== undefined)
      setRedBorderGender('input-red-border')
    else
      setRedBorderGender('input-white-border')

    if (errors.geoname_id !== undefined)
      setRedBorderPlace(true)
    else
      setRedBorderPlace(false)

    if (errors.day !== undefined)
      setRedBorderDay(true)
    else
      setRedBorderDay(false)

    if (errors.month !== undefined)
      setRedBorderMonth(true)
    else
      setRedBorderMonth(false)

    if (errors.year !== undefined)
      setRedBorderYear(true)
    else
      setRedBorderYear(false)
    
    if (errors.origin !== undefined)
      setRedBorderOrigin(true)
    else
      setRedBorderOrigin(false)


    console.log(errors)
  });


  return (
    <div className='background-color'> 
      <Noti content={"There is an error"}/>
      <form className='full-height' onSubmit={handleSubmit(onSubmit)}>
        <Header content={"deja un compete?"} url={"/"}/>
        <h2 className="signup-h2"> Inscription </h2>

{/* ------------------------------------ GENDER ----------------------------------- */}
        <div className='signup-container'> 
          <label className="signup-gender-label-style"> Je sius </label>
          <input className={redBorderGender} type="radio" name="gender" value={1} ref={register}/> 
          <label className="signup-gender-label-style" >Un homme</label>
          <input className={redBorderGender} type="radio" name="gender" value={2} ref={register}/>
          <label  className="signup-gender-label-style" > Un femme</label>
        </div>
        {errors.gender && <p>Gender must be chosen</p>}
{/* ------------------------------------ GENDER ----------------------------------- */}
{/* ------------------------------------ DOB ----------------------------------- */}
        <div className="signup-container"> 
          <label className='signup-dob-style'> Date de naissance: </label>
          <TextField error={redBorderDay} name="day" defaultValue="JJ" className={classes.textField2} margin="normal" inputProps={{ maxLength : 2 , style: { textAlign: 'center' }}}  InputProps={{className: classes.input,}} inputRef={register} />
          <label className='signup-dob-style'> / </label>
          <TextField error={redBorderMonth} name="month" defaultValue="MM" className={classes.textField2} margin="normal" inputProps={{maxLength : 2, style: { textAlign: 'center' }}} InputProps={{className: classes.input,}}  inputRef={register}/>
          <label className='signup-dob-style'> / </label>
          <TextField error={redBorderYear} name="year" defaultValue="AAAA" className={classes.textField3} margin="normal" inputProps={{maxLength : 4, style: { textAlign: 'center' }}} InputProps={{className: classes.input,}} inputRef={register}/>
        </div>
{/* ------------------------------------ DOB ----------------------------------- */}
{/* ------------------------------------ ORIGIN ----------------------------------- */}
        <Origin isError={redBorderOrigin} register={register}/>
        {errors.origin && <p>Please pick your origin</p>}
{/* ------------------------------------ ORIGIN ----------------------------------- */}

{/* ------------------------------------ Email ----------------------------------- */}
      <TextField error={redBorderEmail} name="email" defaultValue="Email" className={classes.textField} margin="normal" InputProps={{ className: classes.input,}} inputRef={register} fullWidth/>
      {errors.email && <p>{errors.email.message}</p>}
{/* ------------------------------------ Location ----------------------------------- */}    
      <Pays isError={redBorderPlace} register={register}/>
      {errors.geoname_id && <p>You must pick city</p>}
{/* ------------------------------------ Postcode ----------------------------------- */}
      <TextField error={redBorderPostCode} name="postcode" defaultValue="Code postal" className={classes.textField} margin="normal" InputProps={{ className: classes.input,}} inputRef={register} fullWidth/>  
      {errors.postcode && <p>Postcode must be a number</p>}
{/* ------------------------------------ Name ----------------------------------- */}  
      <TextField error={redBorderUserName} name="firstname" defaultValue="Pseudo" className={classes.textField} margin="normal" InputProps={{ className: classes.input,}} inputRef={register} fullWidth/>
      {errors.firstname && <p>{errors.firstname.message}</p>}
{/* ------------------------------------ Passowrd ----------------------------------- */}
      <TextField error={redBorderPassWord} name="password" type="password" defaultValue="Mot De pas" className={classes.textField} margin="normal" InputProps={{className: classes.input,}} inputRef={register({ required: true})} fullWidth/>
      {errors.password && <p>{errors.password.message}</p>}
{/* ------------------------------------ Condition ----------------------------------- */}
      <div className='signup-container-condition1'> 
        <input className={redBorderCondition1} type="checkbox" name="condition1" ref={register}/>
        <label className="signup-checkbox-label-style1" >Je cerfifie etre majeur et j'accepte les conditions generales d'utilisation</label>
      </div>
      {errors.condition1 && <p>{errors.condition1.message}</p>}
      <div className='signup-container-condition2'> 
        <input className={redBorderCondition2} type="checkbox" name="condition2" ref={register}/>
        <label className="signup-checkbox-label-style2" >J'accept les conditions generales de la charte privee</label>
      </div>
      {errors.condition2 && <p>{errors.condition2.message}</p>}
        <button className="signup-button"> <i className="fa fa-check" aria-hidden="true"> </i>  Creer mon compte </button>
  
      </form>
    </div>
  );
}

