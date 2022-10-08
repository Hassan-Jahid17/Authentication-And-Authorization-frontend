import { Redirect, Route } from "react-router-dom";
import { useAuth } from "context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
	const { isUserLoggedIn, isAuthenticate, tryRefreshAccessToken } = useAuth();

	if(isUserLoggedIn() && !isAuthenticate()) {
		tryRefreshAccessToken();
	}

	console.log("isUserLoggedIn => ", isUserLoggedIn());
	console.log("isAuthenticate => ", isAuthenticate());

	return (
		<>
			{(isUserLoggedIn() && isAuthenticate()) && (
				<Route {...rest}>{(props) => <Component {...props} />}</Route>
			)}
			
			{(!isUserLoggedIn() || !isAuthenticate()) && (
				<Redirect to="/login" />
			)}
		</>
	)
}