import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css"


const SearchBar = ({ onSubmit }) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const query = event.target.elements.input.value;
        if (query === "") {
            toast.error("Hey, you forgot to print something")
            return;
        }

        onSubmit(query);
        event.target.reset()
    }


  return (
      <header>
        <div><Toaster/></div>
        <form className={css.form} onSubmit={handleSubmit}>
              <div className={css.inputWrapper}>
                <input
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    name="input"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                <button className={css.searchBtn} type="submit">🔎</button>
              </div>
        </form>
      </header>
  )
}

export default SearchBar