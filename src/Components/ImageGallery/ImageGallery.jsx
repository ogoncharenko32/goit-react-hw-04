import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css"

const ImageGallery = ({ images, onElementClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
          <li key={image.id} onClick={() => { onElementClick(image) }}>
          <ImageCard imageSrc={image.urls.small} imageAlt={image.alt_description} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery