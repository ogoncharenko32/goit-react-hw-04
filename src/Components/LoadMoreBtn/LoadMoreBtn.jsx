import css from "./LoadMoreBtn.module.css"

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button className={css.btn} onClick={onLoadMore} type='button'>Load More</button>
  )
}

export default LoadMoreBtn