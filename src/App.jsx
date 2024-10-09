import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './Components/SearchBar/SearchBar'
import ImageGallery from './Components/ImageGallery/ImageGallery';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './Components/LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage';
import ImageModal from './Components/ImageModal/ImageModal';



function App() {
  
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [page, setPage] = useState(1)
  const [errorHtml, setErrorHtml] = useState("")
  
  function closeModal() {
    setIsOpen(false);
    setModalImage(null);
  }
  
  const onSubmit = async (newQuery) => {
    setPage(1)
    setQuery(newQuery)
  }

  const onLoadMore = () => {
    setPage(() => {
      return page + 1;
    })
  }

  const onElementClick = (image) => {
    setIsOpen(true)
    console.log(image)
    setModalImage(image)
  }
  
  useEffect(() => {
    setErrorHtml("")
    if (query === undefined) {
      return
    }
    async function fetchData() {
      axios.defaults.baseURL = 'https://api.unsplash.com/';
      const accessKey = "NabULvd345v9_XItWTWuBI28g1UanV6BDGwO8AhN7n8"
  
      try {
        setLoading(true)


        const responce = await axios.get('/search/photos', {
          params: {
            client_id: accessKey,
            page: page,
            query: query,
            per_page: 12,
            orientation: "landscape",
          }
        }
        )
        const imagesData = responce.data.results;
        page === 1 ? setImages([...imagesData]) : setImages([...images, ...imagesData])
        
        responce.data.total === 0 && toast(`Sorry, no photos found with ${query}`) && setImages([]) && setQuery()
        page < responce.data.total_pages ? setLoadMoreBtn(true) : setLoadMoreBtn(false) && setPage(1)
      } catch (error) {
        setImages([]);
        setErrorHtml(error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchData();

  }, [query, page])


  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {images.length > 0 && <ImageGallery images={images} onElementClick={onElementClick } />}
      {errorHtml && <ErrorMessage errorHtml={errorHtml} />}
      {loading && <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
                    justifyContent: "center",
                  }}
      />}
      {loadMoreBtn && <LoadMoreBtn onLoadMore={onLoadMore} />}  
      <div>
        {modalIsOpen && modalImage &&  (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          image={modalImage}
        />
        )}
      </div>
    </div>
  )
}

export default App
