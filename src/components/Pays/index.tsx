import React, {useEffect} from 'react';

import "./style.css";
import 'font-awesome/css/font-awesome.min.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

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
    }
  }),
);


export const Pays: React.FC<{register:any, isError:boolean}> = ({register, isError}) => {
    const [countries, setCountries] = React.useState([]);
    const [country, setCountry] = React.useState<any>(null);
    const [regions, setRegions] = React.useState<any>([]);
    const [region, setRegion] = React.useState<any>(null);
    const [cities, setCities] = React.useState([]);
    const classes = useStyles();
    const [border, setBorder] = React.useState('styled-select-white');
    useEffect(()=> {
      if (isError===true)
        setBorder('styled-select-red')
      else
        setBorder('styled-select-white')
    })
    useEffect(() => {
        fetch("https://responsive-staging.ltservices2.ovh/api/static/atlas/countries.json")
          .then(res => res.json())
          .then(
            (result) => {
              // setCountry(data.map((a:any) => a.name));
              var data = result.CONTENT.ALL.countries
              setCountries(data)
            },
            (error) => {
              console.log(error);
            }
          )
      }, [])

    const OnCountryChange = (e:any) => {
        setCountry(e.target.value)
        fetch(`https://responsive-staging.ltservices2.ovh/api/static/atlas/${e.target.value}/regions.json`)
        .then(res => res.json())
        .then( 
          (result) => {
            // setCountry(data.map((a:any) => a.name));
            var data = result.CONTENT.regions
            setRegions(data)
          },
          (error) => {
            console.log(error);
          }
        )
    }

    const OnRegionChange = (e:any) => {
        setRegion(e.target.value)
        fetch(`https://responsive-staging.ltservices2.ovh/api/static/atlas/${country}/${e.target.value}/cities.json`)
        .then(res => res.json())
        .then( 
          (result) => {
            // setCountry(data.map((a:any) => a.name));
            var data = result.CONTENT.ALL.cities
            setCities(data)
          },
          (error) => {
            console.log(error);
          }
        )
    }

    return (
        <div className="select">
        {!country ?
        <select className={border} name="geoname_id" onChange={OnCountryChange} ref={register} >
          <option> Pays</option>
            { 
                countries.map(place => (
                <option key={place["id"]} value={place["id"]} ref={register}>   
                    {place['name']}
                </option>
                ))
            } 
        </select>
        : !region  ?
        <select className={border} name="geoname_id" onChange={OnRegionChange} ref={register} >
            {
            regions.map((place:any) => (
                <option key={place["id"]} value={place["id"]} ref={register}>   
                    {place['name']}
                </option>
                ))
            }
        </select>
        :
        <select className={border} name="geoname_id" ref={register} >
            {
            cities.map((place:any) => (
                <option key={place["id"]} value={place["id"]} ref={register}>   
                    {place['name']}
                </option>
                ))
            }
        </select>
        }
      </div>
    );
}



