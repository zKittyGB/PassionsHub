import "../css/Main.css";
import Menu from "../components/Menu.jsx";
import Home from "../components/Home.jsx";

function Main() {

	return (
		<>
			<div className="main">
				<Menu />
				<Home />
			</div>
		</>
	)
}

export default Main;