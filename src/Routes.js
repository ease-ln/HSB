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

  render() {
    return(
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