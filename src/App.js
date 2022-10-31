import React,{ Suspense, lazy }  from 'react';
import './style'
import {Provider} from  'react-redux'
import { Router,Switch,Route} from 'react-router-dom'
import Home from './pages/home'
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import store, {persistor} from './store/homeReducer'
import { PersistGate } from "redux-persist/integration/react";
import {history} from "./pages/login/history/history"
import ProductDisplay from "./pages/serviceDetail/test"
import PaymentSuccess from './pages/result';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';

// use to split code
const Navigation= lazy(() => import('./common/navigation/'));
const Footer= lazy(() => import('./common/footer/index'));
const signUpForm= lazy(() => import('./pages/login/component/signUpForm'));
const signInForm= lazy(() => import('./pages/login/component/signInForm'));
const Profile= lazy(() => import('./pages/profile'));
const FreelancerRegister= lazy(() => import('./freelancer/freelancerRegister'));

const freelancerRegistertest = lazy(() => import('./freelancer/freelancerRegister/index2'))
const Question1 = lazy(()=>import('./freelancer/freelancerRegister/component/question1'))
const Question2 = lazy(()=>import('./freelancer/freelancerRegister/component/question2'))
const Question3 = lazy(()=>import('./freelancer/freelancerRegister/component/question3'))
const ClientRequest= lazy(()=>import('./pages/postRequest/index'))
const FreelancerPost= lazy(()=>import('./freelancer/freelancerSell/index'))
const ServiceList= lazy(()=>import('./pages/serviceList/index'))
const ServiceListCate= lazy(()=>import('./pages/serviceListCate/index'))
const ServiceDetail= lazy(()=>import('./pages/serviceDetail/index'))
const Error =lazy(()=>import('./pages/404/index'))
const Unauthorized =lazy(()=>import('./pages/404/403'))




//stateless compoenent
const App=()=>{
  return (
    <Layout  >
   <Provider store ={store} >
   <PersistGate persistor={persistor}>

<Router history={history}>
<Suspense fallback={<div>Loading...</div>}>
<Navigation />

<Switch>
<Route path='/' exact component={Home}></Route>
<Route path='/signUp' exact component={signUpForm}></Route>
<Route path='/signIn' exact component={signInForm}></Route>
<Route path='/profile' exact component={Profile}></Route>
<Route path='/freelancerRegister' exact component={FreelancerRegister}></Route>

<Route path='/freelancerRegistertest/questionn1' exact component={Question1}></Route>
<Route path='/freelancerRegistertest/questionn2' exact component={Question2}></Route>
<Route path='/freelancerRegistertest/questionn3' exact component={Question3}></Route>
<Route path='/freelancerRegistertest' exact component={freelancerRegistertest}></Route>
<Route path='/clientrequest' exact component={ClientRequest}></Route>
<Route path='/check-out-success' exact component={PaymentSuccess}></Route>
<Route path='/freelancerpost' exact component={FreelancerPost}></Route>
<Route path='/serviceList' exact component={ServiceList}></Route>
<Route path='/serviceListCate/:id' exact component={ServiceListCate}></Route>
<Route path='/test' exact component={ProductDisplay}></Route>
<Route path='/serviceDetail/:id' exact component={ServiceDetail}></Route>


<Route path='/unauthorized' exact component={Unauthorized}></Route>
<Route path='*' exact component={Error}></Route>

{/* <Route path='/detail/:id' exact component={Detail}></Route>
<Route path='/write' exact component={Write}></Route> */}
</Switch>
<Footer />

</Suspense>
</Router>
</PersistGate>
   </Provider>
   </Layout>

)
}



export default App;
