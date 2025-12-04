import "../../css/HomeContent.css";

// Component to display individual cards
function Cards(props) {
	return (
		<div className={`card ${props.passion.hidden ? "hidden" : ""}`}>
			{/* Card header displaying the cover image */}
			<div className="card-header">
				<img src={"../../pictures/" + props.passion.cover_picture} alt={props.passion.title} />
			</div>

			{/* Card main content including title, description and meta info */}
			<div className="card-content">
				<h2>{props.passion.title}</h2>
				<p>{props.passion.description}</p>

				{/* Wrapper for category and likes */}
				<div className="card-meta-wrapper">
					<span className="card-category">{props.passion.category}</span>
					<span className="card-likes"><i className="fa-solid fa-thumbs-up"></i> {props.passion.likes}</span>
				</div>

				{/* Display the author of the passion */}
				<p>par {props.passion.author.username}</p>
			</div>
		</div>
	);
}

// Component to display the list of passions
function HomeContent(props) {
	return (
		<div className="home-content">
			{/* Check if passions array exists and has items */}
			{Array.isArray(props.passions) && props.passions.length > 0 ? (
				// Map through each passion and display a card
				props.passions.map((passion) => (
					<Cards key={passion.id} passion={passion} />
				))
			) : (
				// Message when no passions are available
				<p>Aucune passion à afficher</p>
			)}
		</div>
	);
}

export default HomeContent;
