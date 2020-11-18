import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';


import Login from './pages/Login';
import Signup from './pages/Signup';

//ERROR: This causes the problem (App Navigator is not a React component)
import Myhabits from './routes/AppNavigator';


import Forgotpassword from './pages/ForgotPassword';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Signup"/>
			      <Scene key="myhabits" component={Myhabits} title="Myhabits"/>
			      <Scene key="forgotpassword" component={Forgotpassword} title="Forgotpassword"/>

			    </Stack>
			 </Router>
			)
	}
}