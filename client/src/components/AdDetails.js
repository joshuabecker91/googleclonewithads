import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdDetails = (props) => {

    const { id } = useParams();
    console.log(id);

    const [ campaignTitle, setCampaignTitle ] = useState("");
    const [ targetAddress, setTargetAddress ] = useState("");
    const [ displayLink, setDisplayLink ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ bidForPlacement, setBidForPlacement ] = useState(0.10);
    const [ clicks, setClicks ] = useState(0);
    const [ amountBilled, setAmountBilled ] = useState(0);
    const [ status, setStatus ] = useState(true);
    const [ createdAt, setCreatedAt ] = useState();
    const [ updatedAt, setUpdatedAt ] = useState();

    // format the date
    let formattedCreatedAt = new Date(createdAt)

    const navigate = useNavigate();

    const [adNotFoundError, setAdNotFoundError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ad/${id}`)
            .then((response) => {
                console.log(response.data);
                setCampaignTitle(response.data.campaignTitle);
                setTargetAddress(response.data.targetAddress);
                setDisplayLink(response.data.displayLink);
                setDescription(response.data.description);
                setBidForPlacement(response.data.bidForPlacement);
                setClicks(response.data.clicks);
                setAmountBilled(response.data.amountBilled);
                setStatus(response.data.status);
                setCreatedAt(response.data.createdAt);
                setUpdatedAt(response.data.updatedAt);
            })
            .catch((err) => {
                console.log(err.response);
                setAdNotFoundError(`Ad not found using that ID`);
            });
    }, []);

    const handleDeleteAd = (id) => {
        axios.delete(`http://localhost:8000/api/ad/${id}`)
            .then((response) => {
                console.log("Ad Deleted");
                console.log(response);
                navigate("/dashboard");
                // const filteredAds = allAds.filter((ad) => {
                //     return ad._id !== id;
                // });
                // setAllAds(filteredAds); don't need to do this since we will immediately forward them back to the dashboard
            })
            .catch((err) => {
                console.log("Error Deleting Ad", err.response);
            });
    };

    const handleStatusAd = (id) => {
        if(status == true){
            axios.patch(`http://localhost:8000/api/ad/${id}`, {
                status: false,
            })
            .then((response) => {
                console.log(response);
                setStatus(false)
                // navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                // setErrors(err.response.data.err.errors);
            });
        } else {
            axios.patch(`http://localhost:8000/api/ad/${id}`, {
                status: true,
            })
            .then((response) => {
                console.log(response);
                setStatus(true)
                // navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                // setErrors(err.response.data.err.errors);
            });
        }
    }

    return (
        <div className="col-sm-11 col-md-10 col-lg-8 mx-auto">
            <h2 className="my-4 py-4">{campaignTitle} - Campaign Details</h2>
            <div className="col-12 d-flex justify-content-between my-4 align-items-center">
                <div className="d-flex justify-content-start col-4">
                    <Link to={"/dashboard"}>
                        <button className="btn btn-dark">See All Ads</button>
                    </Link>
                </div>
                <div className="d-flex justify-content-end col-8">
                    {/* <Link to={"/new"}>
                        <button className="btn btn-dark mx-2">User Profile</button>
                    </Link> */}
                    {/* <Link to={"/new"}>
                        <button className="btn btn-success">New Campaign</button>
                    </Link> */}
                </div>
            </div>
            {adNotFoundError ? (
                <h2>
                    {adNotFoundError} <Link to="/dashboard"><p className="text-primary">Click here to go back</p></Link>
                </h2>
            ) :
            <div className="col-12 d-flex justify-content-start">
                <div className="col-6 text-start mt-4">
                    <h5>Campaign Title</h5>
                    <p>{campaignTitle}</p>
                    <h5 className="mt-4">Target Address</h5>
                    <p>{targetAddress}</p>
                    <h5 className="mt-4">Display Link</h5>
                    <p>{displayLink}</p>
                    <h5 className="mt-4">Created On</h5>
                    <p>{formattedCreatedAt.toDateString()}</p> 
                    <h5 className="mt-4">Advertisement Preview</h5>
                    <div className="card px-3 py-2 col-10">
                        <h5 className="pt-2">{campaignTitle}</h5>
                        <a target="_blank" href={targetAddress}>{displayLink}</a>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="col-6 text-start mt-4">
                    <h5>Description</h5>
                    <p>{description}</p>
                    {/* <h5 className="mt-4">Updated At</h5>
                    <p>{updatedAt}</p> */}
                    <h5 className="mt-4">Bid For Placement</h5>
                    <p>${bidForPlacement.toFixed(2)}</p>
                    <h5 className="mt-4">Clicks</h5>
                    <p>{clicks}</p>
                    <h5 className="mt-4">Amount Billed</h5>
                    <p>${amountBilled.toFixed(2)}</p>
                    <h5 className="mt-4">Status</h5>
                    {status.toString() === "true" ? (<p>Active</p>) : <p>Paused</p>}
                    {console.log(status.toString())}
                    <div className="mt-4 col-12 d-flex justify-content-start">
                        <Link to={`/${id}`}>
                            <button className="btn btn-secondary me-2" onClick={() => handleStatusAd(id)}>{status.toString() === "true" ? "Pause" : "Resume"}</button>
                        </Link>
                        <Link to={`/${id}/update`}>
                            <button className="btn btn-warning me-2">Update</button>
                        </Link>
                        <button className="btn btn-danger me-2" onClick={() => handleDeleteAd(id)}>Delete</button>
                    </div>
                </div>
            </div>
            }
            <Link className="my-4 mx-2 d-flex justify-content-end" to={"/dashboard"}><button className="btn btn-secondary">Back</button></Link>
        </div>
    )
}

export default AdDetails;