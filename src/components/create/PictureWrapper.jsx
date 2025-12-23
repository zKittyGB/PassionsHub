// Component to render a single picture upload input with preview
function PictureWrapper({ ID, pictures, setPictures, setErrors }) {
	const currentPicture = pictures[ID];

	return (
		<div className="picture-wrapper">
			{/* Hidden file input for image upload */}
			<input
				type="file"
				id={`picture_${ID}`}
				name={`picture_${ID}`}
				accept="image/*"
				onChange={(e) => {
					// Update the selected picture in the state
					setPictures(prev => {
						const copy = [...prev];
						copy[ID] = e.target.files[0];
						return copy.filter(Boolean);
					});
					// Clear picture-related errors
					setErrors(prev => ({ ...prev, pictures: [] }));
				}}
			/>

			{/* Label used as clickable area for file input */}
			<label htmlFor={`picture_${ID}`}>
				{/* Display camera icon if no image is selected */}
				{!currentPicture && <i className="fa-solid fa-camera"></i>}

				{/* Display preview of selected image */}
				{currentPicture && (
					<img
						src={URL.createObjectURL(currentPicture)}
						alt="photo"
						className="profile-picture"
					/>
				)}
			</label>
		</div>
	);
}

export default PictureWrapper;
