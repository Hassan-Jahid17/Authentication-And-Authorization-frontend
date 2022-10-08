// @ts-nocheck
import React, { useContext, useState } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { isCurrentUserAuthenticate, isLoggedIn, tokenDecodedInfo } from "services/auth";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {

	const [loading, setLoading] = useState(false);
  	const [currentUser, setCurrentUser] = useLocalStorage("CurrentUser", {});
	const history = useHistory();


	// signup function
	const signup = async(body) => {
		return axios.post(process.env.REACT_APP_BASE_URL + "api/identity/signup", body);
	}

	// login function
	function login(body) {
		return axios.post(process.env.REACT_APP_BASE_URL + "api/identity/login", body);
	}

	function isAuthenticate() {
		return isCurrentUserAuthenticate(currentUser);
	}

	function getUserTokenDecodedInfo() {
		return tokenDecodedInfo(currentUser);
	}

	function isUserLoggedIn() {
		return isLoggedIn(currentUser);
	}

	function tryRefreshAccessToken() {
		console.log("Call RefreshToken => ", isLoggedIn(currentUser));
		if(!isLoggedIn(currentUser)) return false;

		axios.post(process.env.REACT_APP_BASE_URL + "api/identity/refresh", {
			"AccessToken" : currentUser.AccessToken,
			"RefreshToken" : currentUser.RefreshToken,
		})
		.then((data) => {
			console.log("Token Refresh Successfully");
			console.log(data);
			setCurrentUser({
				"AccessToken": data.data.AccessToken,
				"RefreshToken": data.data.RefreshToken,
			});
			return true;
		}).catch((error) => {
			console.log("Error Occur When token refreshing");
			console.log(error);
			return false;
		});
	}

	// logout function
	function logout() {
		setCurrentUser({});
		history.push('/');
	}

	const value = {
		currentUser,
		setCurrentUser,
		signup,
		login,
		logout,
		getUserTokenDecodedInfo,
		isAuthenticate,
		tryRefreshAccessToken,
		isUserLoggedIn,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}