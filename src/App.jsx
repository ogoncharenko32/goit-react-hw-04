import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import LoadMoreBtn from './Components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import ImageModal from './Components/ImageModal/ImageModal';

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [errorHtml, setErrorHtml] = useState('');
  const loadMoreBtnRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
    setModalImage(null);
  };

  const onSubmit = (newQuery) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]); 
    }
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onElementClick = (image) => {
    setIsOpen(true);
    setModalImage(image);
  };

  const fetchImages = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setErrorHtml('');

    try {
      const accessKey = 'NabULvd345v9_XItWTWuBI28g1UanV6BDGwO8AhN7n8';
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          client_id: accessKey,
          page,
          query,
          per_page: 12,
          orientation: 'landscape',
        },
      });

      const imagesData = response.data.results;
      if (response.data.total === 0) {
        toast(`Sorry, no photos found with ${query}`);
        setLoadMoreBtn(false);
        setImages([]);
      } else {
        setImages((prevImages) => (page === 1 ? imagesData : [...prevImages, ...imagesData]));
        setLoadMoreBtn(page < response.data.total_pages);
      }
    } catch (error) {
      setImages([]);
      setErrorHtml(error.message);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

    useEffect(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth', 
      });
  }, [images]);

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery images={images} onElementClick={onElementClick} />}
      {errorHtml && <ErrorMessage errorHtml={errorHtml} />}
      {loading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            justifyContent: 'center',
          }}
        />
      )}
      {loadMoreBtn && (
        <div ref={loadMoreBtnRef}>
          <LoadMoreBtn onLoadMore={onLoadMore} />
        </div>
      )}
      {modalIsOpen && modalImage && (
        <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} image={modalImage} />
      )}
    </div>
  );
}

export default App;
