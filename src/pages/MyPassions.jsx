import "../css/Main.css";
import Menu from "../components/Menu.jsx";

// Page component to display the user's passions
function MyPassions() {
	return (
		<>
			<div className="main">
				{/* Main navigation menu with 'myPassions' selected */}
				<Menu selected="myPassions" />

				{/* Content for user's passions can be added here */}
			</div>
		</>
	)
}

export default MyPassions;
