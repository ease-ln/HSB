import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "@react-navigation/native";
import Home from '../screens/home';
import Details from '../screens/details';
import reportScreen from '../screens/statsNav';


const screens = {
    // the screen at the top is the default
    Home: {
        screen: Home
    },
    Details: {
        screen: Details
    },
    reportScreen: {
        screen: reportScreen
    },
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);