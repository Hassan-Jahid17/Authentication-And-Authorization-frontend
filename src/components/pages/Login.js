import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import classes from "../../styles/Login.module.css";
import Button from "components/shared/Button";
import Form from "components/shared/Form";
import TextInput from "components/shared/TextInput";

export default function Login() {
	console.log("Rendered Login");

	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const { login, setCurrentUser } = useAuth();
  	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
	
		try {
			setError("");
			setLoading(true);

			login({
				"Email" : email,
				"Password" : password
			})
			.then((data) => {
				console.log("Set current User that comes from Api");
				setCurrentUser({
					"AccessToken": data.data.AccessToken,
					"RefreshToken": data.data.RefreshToken,
				});
				
				history.push("/");
			})
			.catch((error) => {
				setLoading(false);
				setError(error.response.data.message);
			})

		} catch (err) {
			console.log(err);
			setLoading(false);
			setError("Failed to login!");
		}
	}
	
	return (
		<div style={{ margin : "100px 0" }}>
			<h1 style={{ textAlign : "center" }}>Login to your account</h1>

			<Form className={`${classes.login}`} onSubmit={handleSubmit}>
				<TextInput
					type="text"
					placeholder="Enter email"
					icon="alternate_email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<TextInput 
					type="password" 
					placeholder="Enter password" 
					icon="lock"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button disabled={loading}>
					<span>Submit Now</span>
				</Button>

				{error && <p className="error">{error}</p>}

				<div className="info">
					Don't have an account? <Link to="/signup">Signup</Link> instead.
				</div>
			</Form>
		</div>
	);
}