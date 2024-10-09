
const ImageCard = ({ imageSrc, imageAlt }) => {
  return (
		<div>
		  <img src={imageSrc} alt={imageAlt} width="400px" height="266px"/>
		</div>
  )
}

export default ImageCard