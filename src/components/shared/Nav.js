import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import classes from "../../styles/Nav.module.css";
import Account from "./Account";


export default function Nav() {
	console.log("Rendered Nav");
	return (
	<nav className={classes.nav}>
		<ul>
			<li>
				<Link to="/" className={classes.brand}>
				<img src={logo} alt="logo images" />
				<h3>Feel Good Today</h3>
				</Link>
			</li>
		</ul>
		<Account />
	</nav>
	);
}