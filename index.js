import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

console.disableYellowBox = true;

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Warning: Module RCTImageLoader requires']);

AppRegistry.registerComponent(appName, () => App);
