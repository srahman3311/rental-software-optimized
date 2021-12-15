import SearchIcon from "./SearchIcon";
import styles from "./SearchInputField.module.css";


function SearchInputField({ setSearchText }) {

    function searchData(event) {

        const searchText = event.target.value.toLowerCase();

        setSearchText(searchText)

    }

    return (
        <div className={styles.searchDiv}>
            <SearchIcon />
            <form className="searchBox">
                <input
                    className="searchInput" 
                    type = "text"
                    placeholder="Enter Name/Code to Search"
                    onChange={searchData}
                />
            </form>
        </div>
    );

}

export default SearchInputField;