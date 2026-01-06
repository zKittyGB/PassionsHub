import "../../css/HomeContent.css";
import PassionsView from "../PassionsView.jsx";

// Component to render the list of passions or a detailed view
function HomeContent({ passions }) {
	return (
		<div className="home-content">
			<PassionsView items={passions} />
		</div>
	);
}

export default HomeContent;
