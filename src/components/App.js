import { BrowserRouter as Router,Route, Switch } from "react-router-dom";
import "../styles/App.css";
import { AuthProvider } from "context/AuthContext";
import Layout from "./shared/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PublicRoute from "Route/PublicRoute";
import PrivateRoute from "Route/PrivateRoute";
import Video from "./pages/Video";


function App() {
	console.log("Rendered App");
	return (
		<Router>
			<AuthProvider>
				<Layout>
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/video" component={Video} />
						<PublicRoute exact path="/signup" component={Signup} />
						<PublicRoute exact path="/login" component={Login} />
					</Switch>
				</Layout>
			</AuthProvider>
		</Router>
	);
}

export default App;