import React, { useEffect, useRef, useState } from 'react'

import {
    NavItem,
    InputGroup,
    Button,
    Input
} from 'reactstrap';
import { searchBlogByTitle } from '../services/blogServices';
import { Link } from 'react-router-dom';

export default function SearchBar() {
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    //chat GPT DICHE, karon BLUR handle korar somoy instantly <ul></ul> off hoye jacchilo.
    //eta use korchi time gap er jonno
    const blurTimeoutRef = useRef([]);

    const handleSearchFocus = () => {
        console.log("Focused");
        setSearchExpanded(true);
    }

    const handleSearchBlur = () => {
        console.log("Blurred");
        blurTimeoutRef.current = setTimeout(() => {
            setSearchExpanded(false);
        }, 200);
        // setSearchExpanded(false);
    }

    const handleSearchChange = (e) => {
        let search_text = e.target.value;
        setSearchQuery(search_text);
        clearTimeout(blurTimeoutRef.current);
    }


    useEffect(() => {
        console.log("search query : " + searchQuery)
        if (searchQuery !== "") {
            searchBlogByTitle(searchQuery)
                .then((data) => {
                    console.log(data.content)
                    setSearchResult(data.content);
                })
                .catch((err) => {
                    console.log("error in search " + err)
                })

        } else {
            setSearchResult([]);
        }

    }, [searchQuery])


    let SearchResults = () => {
        return (
            searchResult.map((result) => <li key={result.id} className='nav_search_item'><Link to={"/blog/"+result.id} className='nav_search_link'>{result.blogTitle}</Link></li>)
        )
    }


    return (
        <NavItem id='search_bar'>
            <InputGroup>
                <Input style={{backgroundColor:"transparent", color:"white"}} name='search_query' placeholder="Search" id='search_field' autoComplete='off' onChange={handleSearchChange} onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
                <Button color="primary">Search</Button>
            </InputGroup>
            {searchResult != null && <ul id='nav_search_results' className={searchExpanded ? 'expanded' : 'collapsed'}>
                {searchResult.length === 0 ?
                    <li className='text-danger p-2'> Nothing found</li> : <SearchResults></SearchResults>
                }
            </ul>}
        </NavItem>
    )
}
