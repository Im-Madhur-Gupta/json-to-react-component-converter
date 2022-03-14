import {useState, useEffect} from "react";
import Axios from "axios";

import Caraousel from "./Caraousel";
import Dashboard from "./Dashboard";

const App = ({a}) => {
const [userData, setUserData] = useState({Name:Madhur, Age:21});

const x = [1,2,3];
const y = foo;
const z = 1;

useEffect(()=>{
      z++;
    },[x,y]);
useEffect(()=>{
      console.log(z);
    },[]);

const func1 = (x,y)=>{
      return z = x + y;
    };

return(
<div className="main-cont" style={{color: 'blue'}} >
		<Caraousel />
		<Dashboard userData={userData}/>

</div>
);
}

export default App;
