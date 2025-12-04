import "../css/Main.css";
import Menu from "../components/Menu.jsx";
import Home from "../components/home/Home.jsx";

// Page component to display the main home page layout
function Main() {
	return (
		<>
			<div className="main">
				{/* Main navigation menu with 'home' selected */}
				<Menu selected="home" />

				{/* Home page content */}
				<Home />
			</div>
		</>
	)
}

export default Main;
