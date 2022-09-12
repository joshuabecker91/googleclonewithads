import React, { useState, useEffect } from 'react';
import './SearchPage.css'
import { Link, useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import VideoIcon from '@material-ui/icons/VideoCallOutlined';
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import { useStateValue } from '../StateProvider';
import UseGoogleSearch from '../components/UseGoogleSearch';
import axios from 'axios';
// import Response from '../Response';

const SearchPage = () => {

    const [{term}, dispatch] = useStateValue();

    const navigate = useNavigate(); 

    // LIVE API CALL
    const { data } = UseGoogleSearch(term);
    console.log(data)

    // UNCOMMENT DURING DEVELOPMENT - avoid unnecessary api calls during development
    // const data = Response;
    // console.log(data)

    const [allAds, setAllAds] = useState([]);

    // Avoid searching a null when refresh or when user clicks back in their browser
    useEffect(() => {
        if(term == null){
            navigate('/')
        };
    }, [term]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/ad')
        .then((response) => {
            console.log(response.data);
            // Check all the ads and filter to only select the ones that are active.
            const newList = response.data.filter((ad)=>{
                return ad.status == true
            })
            console.log(newList);
            // Grab 5 ads randomly
            const shuffled = newList.sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 5);
            console.log(selected);
            // up to 5 ads are stored in state at random. They are rendered below and listed with preference according to their bid amount.
            // Ads are rendered and listed from highest bidder decending to lowest bidder.
            setAllAds(selected);
            // setAllAds(newList); // to set all that are true and not do math.random
            // setAllAds(response.data); // to simply set all ads without filtering anything
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, [term]);


    const handleClickAd = (id, index) => {
        axios.patch(`http://localhost:8000/api/ad/${id}`, {
            clicks: (allAds[index].clicks + 1),
            amountBilled: (allAds[index].amountBilled + allAds[index].bidForPlacement).toFixed(2),
            // Could pass these variables up or access them from state directly
            // clicks: clicks + 1,
            // amountBilled: ad.amountBilled + ad.bidForPlacement;
        })
        .then((response) => {
            console.log(response);
            console.log("link clicked")
            console.log(allAds[index].targetAddress);
            window.open(allAds[index].targetAddress,"_blank"); 
            // window.location.href = "http://www.yahoo.com";  // testing - this works
            // window.location.href = allAds[index].targetAddress; // this works
            // cannot use navigate('') because it wants to stay in the local directory and routes localhost:3000/http://www.link.com
            // navigate("http://www.yahoo.com")
            // navigate(allAds[index].targetAddress);
        })
        .catch((err) => {
            console.log(err.response.data.err.errors);
            // setErrors(err.response.data.err.errors);
        });
    }

    return (
        <div className="searchPage">
            <div className='searchPage__header'>
                <Link className='searchPage__headerLeft' to="/"><img className="searchPage__logo" src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' alt=''></img></Link>
                <div className='searchPage__headerBody'>
                    <Search hideButtons/>
                </div>
            </div>
            <div className='searchPage__options'>
                <div className='searchPage__optionsLeft'>
                    <div className='searchPage__option'>
                        <SearchIcon/>
                        <Link to="/all">All</Link>
                    </div>
                    <div className='searchPage__option'>
                        <ImageIcon/>
                        <Link to="/images">Images</Link>
                    </div>
                    <div className='searchPage__option'>
                        <LocalOfferIcon/>
                        <Link to="/shopping">Shopping</Link>
                    </div>
                    <div className='searchPage__option'>
                        <VideoIcon/>
                        <Link to="/videos">Videos</Link>
                    </div>
                    <div className='searchPage__option'>
                        <DescriptionIcon/>
                        <Link to="/news">News</Link>
                    </div>
                    <div className='searchPage__option'>
                        <MoreVertIcon/>
                        <Link to="/more">More</Link>
                    </div>
                </div>
                <div className='searchPage__optionsRight'>
                    <div className='searchPage__option'>
                        <Link to="/tools">Tools</Link>
                    </div>
                </div>
            </div>
            <div className='break'></div>

            <div className="d-flex justify-content-start">
            {true && (
                <div className='searchPage__results'>
                    <p className='searchPage__resultCount'>
                        About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}
                    </p>

                    {data?.items.map(item => (
                        <div className='searchPage__result'>
                            <div className='searchPage__resultText'>
                                <a href={item.link}>
                                    <p>{item.displayLink}</p>
                                    <h2 className='searchPage__resultTitle' href={item.link}>{item.title}</h2>
                                </a>
                                <p className='searchPage__resultSnippet'>{item.snippet}</p>
                            </div>

                            <div>
                            {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                <img className='searchPage__resultImage' src={item.pagemap?.cse_image[0]?.src} alt=''></img>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
                <div className="col-sm-5 col-md-4 col-lg-3 ads">
                    {allAds
                    // Sort the ads by type - highest bidder gets preference
                    .sort((a, b) => {
                        if (a.bidForPlacement > b.bidForPlacement) return -1;
                        if (a.bidForPlacement < b.bidForPlacement) return 1;
                        return 0;
                    })
                    .map((ad, index) => {
                        return (
                            <div className="m-4 adCard">
                                <div className="card px-3 py-2 col-10 ad" key={ad._id}>
                                    <h5 className="adTitle pt-3">{ad.campaignTitle}</h5>
                                    {/* <p>Bid: {ad.bidForPlacement}</p> */}
                                    <a className="adLink" onClick={() => handleClickAd(ad._id, index)}>{ad.displayLink}</a>
                                    <p>{ad.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* <h1>{term}</h1> */}

        </div>
    )
}

export default SearchPage;