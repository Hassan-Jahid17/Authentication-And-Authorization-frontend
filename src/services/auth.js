import jwtDecode from "jwt-decode";

function isCurrentUserExpired(currentUser) {
	if(isInvalidCurrentUser()) return true;

	const decodedInfo = tokenDecodedInfo(currentUser);
	return isExpired(decodedInfo);
}

function tokenDecodedInfo(currentUser) {

	try{
		return jwtDecode(currentUser?.AccessToken);
	}catch(error) {
		console.log("Error Occur When decoded token");
		return null;
	}
}

function isCurrentUserAuthenticate(currentUser) {
	if(isInvalidCurrentUser(currentUser)) return false;

	const decodedInfo = tokenDecodedInfo(currentUser);
	if(isInvalidDecodedInfo(decodedInfo)) return false;

	if(isExpired(decodedInfo)) return false;
	
	return true;
}

function isLoggedIn(currentUser) {
	return !isInvalidCurrentUser(currentUser);
}

/* All Private Methods */
function isExpired(decodedInfo) {
	const date = new Date();
	return decodedInfo.exp < date.getTime() / 1000;
}

function isInvalidCurrentUser(currentUser) {
	if(!currentUser || !currentUser.AccessToken || !currentUser.RefreshToken) return true;
	return false;
}

function isInvalidDecodedInfo(decodedInfo) {
	if(!decodedInfo || !decodedInfo.Email || !decodedInfo.UserName) return true;
	return false;
}

/* Private Method ends */



export {
	isCurrentUserExpired,
	tokenDecodedInfo,
	isCurrentUserAuthenticate,
	isLoggedIn,
}