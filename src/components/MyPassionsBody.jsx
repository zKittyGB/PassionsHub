import PassionsView from "./PassionsView.jsx";

// Component to display the body of t he user's passions page
function MyPassionsBody({ myPassions }) {
	
	return (
		<div className="myPassions-body">
			<PassionsView items={myPassions} />
		</div>
	) 
}

export default MyPassionsBody;
