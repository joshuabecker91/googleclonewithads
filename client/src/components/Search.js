import React, { useState, useEffect } from 'react';
import './Search.css';
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';
// import axios from axios;

const Search = (props) => {

    const [{term}, dispatch] = useStateValue();

    const [ input, setInput ] = useState('');

    const navigate = useNavigate(); 

    let { hideButtons = false } = props;

    useEffect(() => {
        setInput(term);
    }, [term]);


    const search = e => {
        e.preventDefault();
        console.log(`You hit the search button and you searched for ${input}`)
        if (input){
            dispatch({
                type: actionTypes.SET_SEARCH_TERM,
                term: input,
            })
            navigate('/search') 
        } else {
            dispatch({
                type: actionTypes.SET_SEARCH_TERM,
                term: null,
            })
        }
        // could also do it this way - pass via props navigate(`/search/${input}`)
        // old way of doing it history.push('/search')
        // then when it goes to /search route that component will fetch the term via useStateValue
    }

    return (
        <form className='search'>
            <div className='search__input'>
                <SearchIcon className='search__inputIcon'/>
                <input value={input} name="input" onChange={e => setInput(e.target.value)}/>
                <MicIcon className='search__micIcon'/>
            </div>

            {hideButtons? (
            <input className='hiddenSubmit' type='submit' onClick={search} ></input>
            ):null}

            {!hideButtons? (
            <div className='search__buttons'>
                <Button type='submit' onClick={search} variant='outlined'>Google Search</Button>
                <Button variant='outlined'>I'm Feeling Lucky</Button>
            </div>
            ):null}

            {!hideButtons? (
            <div className='search__techbutton'>
                <a target="_blank" href="https://github.com/joshuabecker91/googleclonewithads">
                    <Button variant='outlined'>Project Information</Button>
                </a>
            </div>
            ):null}

        </form>
    )
}

export default Search;