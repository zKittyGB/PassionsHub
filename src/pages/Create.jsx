import "../css/Main.css";
import Menu from "../components/Menu.jsx";
import CreateBody from "../components/create/CreateBody.jsx";

// Page component to display the create passion form
function Create() {
	return (
		<>
			<div className="main">
				{/* Main navigation menu with 'create' selected */}
				<Menu selected="create" />

				{/* Form to create a new passion */}
				<CreateBody />
			</div>
		</>
	)
}

export default Create;
