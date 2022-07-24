import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { Button, message, Steps, Progress } from 'antd';
import Question1 from "./component/question1";
import Question2 from "./component/question2";
import Question3 from "./component/question3";
import axios from "axios";
import { apiURL } from "../../api";
import { actionCreators } from "../../pages/profile/store";
import { actionCreators as freeAction } from './store'

import jwt_decode from "jwt-decode"; 
const jwt2 = localStorage.getItem("jwt")
 const decode = jwt_decode(jwt2)




const App = () => {
    const [current, setCurrent] = useState(0);

   
    return (
        <>

            <Steps
                type="navigation"
                current={current}
                onChange={setCurrent}
                className="site-navigation-steps">
                <Steps.Step title={<Link to="/freelancerRegistertest/questionn1">Peeopl1 </Link>} status="finish" />
                <Steps.Step title={<Link to="/freelancerRegistertest/questionn2"> Peeopl2</Link>} status="finish" />
                <Steps.Step title={<Link to="/freelancerRegistertest/questionn3">Peeopl3 </Link>} status="finish" />
              
            </Steps>


            <Switch>
                <Route
                path="/freelancerRegistertest/questionn1"
                exact
                render={()=><Question1 />}/>
                 <Route
                path="/freelancerRegistertest/questionn2"
                exact
                render={()=><Question2 />}/>
             
                 <Route
                path="/freelancerRegistertest/questionn3"
                exact
                render={()=><Question3 />}/>
            
              
            </Switch>

        </>
    );
};

export default App;