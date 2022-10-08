import { Link } from "react-router-dom";
import classes from "../../styles/Account.module.css";
import { useAuth } from "context/AuthContext";

export default function Account() {
	console.log("Rendered Account");

	const { logout, isAuthenticate, getUserTokenDecodedInfo, isUserLoggedIn } = useAuth();

	console.log("isAuthenticate => ", isAuthenticate());
	console.log("isUserLoggedIn => ", isUserLoggedIn());

	return (
		<div className={classes.account}>

			{isUserLoggedIn() && isAuthenticate() && (
				<>
					<span className="material-icons-outlined" title="Account">
						account_circle
					</span>
					<span>{getUserTokenDecodedInfo().UserName}</span>
					<span
						className="material-icons-outlined"
						title="Logout"
						onClick={logout}
					>
						{" "}
						logout{" "}
					</span>
				</>
			)}

			{(!isUserLoggedIn() || !isAuthenticate()) && (
				<div>
					<Link to="/signup">Signup </Link>
					<Link to="/login">Login</Link>
				</div>
			)}

		</div>
	);
}