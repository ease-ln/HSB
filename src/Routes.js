import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';


import Login from './pages/Login';
import Signup from './pages/Signup';
import Myhabits from './pages/MyHabits';
import Forgotpassword from './pages/ForgotPassword';
import Statistics from './pages/Statistics';
import home from './routes/AppNavigator';
import { Backend } from './Backend';


export default class Routes extends Component<{}> {
	state = {
      status: 'false',
   }
  handleEmail = (text) => {
      this.setState({ status: text })   
  }
   /*_storeData = async () => {
   try {
    const value = await AsyncStorage.getItem('Loginuser')
    if(value == 1) {
    	this.handleEmail(false);
    }
       }
   catch{
    alert('error')
   }}*/
              // <Scene key="home" component={home} title="home"/>

  render() {
    /*if(Backend.checkLogin())
    {
      return(
        <Router>
            <Stack key="root" hideNavBar={true}>
              <Scene key="myhabits" component={Myhabits} title="Myhabits" initial={true}/>
              <Scene key="statistics" component={Statistics} title="Statistics"/>
            </Stack>
         </Router>
        )
    }
		else*/ return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}
            on={Backend.checkLogin}
            
                          success="myhabits"
            
                          failure="login"/>
			      <Scene key="signup" component={Signup} title="Signup"/>
			      <Scene key="forgotpassword" component={Forgotpassword} title="Forgotpassword"/>
            <Scene key="myhabits" component={Myhabits} title="Myhabits"/>
            <Scene key="statistics" component={Statistics} title="Statistics"/>
			    </Stack>
			 </Router>
			)
	}
}