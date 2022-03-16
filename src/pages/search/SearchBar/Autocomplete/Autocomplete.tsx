import { FindInPage, PersonSearch, Search, Tag } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../SearchBar.css';

function SearchBar({query} : {query: string}) {
    if (query.length < 3) return <div className="autocomplete" />;

    let tag = (query.includes('#') ? query.split("#")[1] : query).split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, '');

    return (
        <div className="autocomplete">
            {tag && <NavLink to={`/search/tag/${tag}`} key="tag" className="autocompleteItem">
                <Tag />
                <span>Search for <b>#{tag}</b></span>
            </NavLink>}
            <NavLink to={`/search/user/${query}`} key="person" className="autocompleteItem">
                <PersonSearch />
                <span>Search for user <b>{query}</b></span>
            </NavLink>
            <NavLink to={`/search/journal/${query}`} key="title" className="autocompleteItem">
                <FindInPage />
                <span>Search for journal <b>{query}</b></span>
            </NavLink>
        </div>
    );
}

export default SearchBar;
