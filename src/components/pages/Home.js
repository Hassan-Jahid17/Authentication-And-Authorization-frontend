import { Link } from "react-router-dom";
import Video from "./Video";

export default function Home() {
	
	console.log("Rendered Home Component");

	return (
		<div>
			This is Home Component
			<Link to="/video">
				<Video />
			</Link>
		</div>
	);
}