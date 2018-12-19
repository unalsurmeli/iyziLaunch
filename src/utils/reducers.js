import { combineReducers } from 'redux';
import LoginReducer from '../reducers/LoginReducer';
import RegisterReducer from '../reducers/RegisterReducer';
import FavoriteReducer from '../reducers/FavoriteReducer';

export default combineReducers({
	loginReducer: LoginReducer,
	registerReducer: RegisterReducer,
	favoriteReducer: FavoriteReducer,
});
