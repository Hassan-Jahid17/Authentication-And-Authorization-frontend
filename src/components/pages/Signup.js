import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import classes from "../../styles/Signup.module.css";
import Button from "components/shared/Button";
import Checkbox from "components/shared/Checkbox";
import Form from "components/shared/Form";
import TextInput from "components/shared/TextInput";
import { Snackbar } from "@mui/material";


export default function Signup() {
	console.log("Rendered Signup");


	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agree, setAgree] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [snackBarMessage, setSnackBarMessage] = useState(false);

	const { signup } = useAuth();
	const history = useHistory();


	async function handleSubmit(e) {
		e.preventDefault();
		console.log("submitted");

		if(password !== confirmPassword) {
			return setError("Password don't match");
		}

		try {
			setError("");
			setLoading(true);
			signup({
				"UserName" : username,
				"Email" : email,
				"Password" : password
			}).then((data) => {
				setSnackBarMessage(true);
				history.push('/login');
			}).catch((error) => {
				console.log(error);
				setError(error.response.data.message);
			}).finally(() => {
				setLoading(false);
			});
			
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}


	return (
		<div style={{ margin : "100px 0" }}>
			<h1 style={{ textAlign : "center" }}>Create an account</h1>

			<Form className={`${classes.signup}`} onSubmit={handleSubmit}>
				<TextInput 
					type="text" 
					placeholder="Enter name" 
					icon="person"
					required
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

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

				<TextInput
					type="password"
					placeholder="Confirm password"
					icon="lock_clock"
					required
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<Checkbox 
					text="I agree to the Terms &amp; Conditions" 
					required
					value={agree}
					onChange={(e) => setAgree(e.target.value)}
				/>

				<Button disabled={loading}>
					<span>Submit Now</span>
				</Button>

				{error && <p className="error">{error}</p>}

				<div className="info">
					Already have an account? <Link to="/login">Login</Link> instead.
				</div>
			</Form>
			<Snackbar
				open={snackBarMessage}
				anchorOrigin={{ vertical : "top", horizontal : "center"}}
				autoHideDuration={3000}
				onClose={() => {
					setSnackBarMessage(false);
				}}
				message="Account Created SuccessFully"
				
			/>
		</div>
  	);
}