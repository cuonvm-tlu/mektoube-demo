import './style.css';

// const Header = () => {

//   return (
//       <a className='a_style1' href="/signup/"> Pas de Compete? </a>
//   );
// };

// export default Header;

export  const Header: React.FC<{content:string, url:string}> = ({content, url}) => {
      return (
        // <a className='a_style1' href="/signup/"> Pas de Compete? </a>
        <a className='a_style1' href={url}> {content} </a>
    )
}