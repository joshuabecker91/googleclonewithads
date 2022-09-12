import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdCreate = () => {

    const [ campaignTitle, setCampaignTitle ] = useState("");
    const [ targetAddress, setTargetAddress ] = useState("");
    const [ displayLink, setDisplayLink ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ bidForPlacement, setBidForPlacement ] = useState(0.10);
    // Don't actually need these here as a default value is provided in the model
    // const [ clicks, setClicks ] = useState(0);
    // const [ amountBilled, setAmountBilled ] = useState(0);
    // const [ status, setStatus ] = useState(true);
    // const [ createdAt, setCreatedAt ] = useState();
    // const [ updatedAt, setUpdatedAt ] = useState();

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const createAdHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/ad", { 
            campaignTitle,
            targetAddress,
            displayLink,
            description,
            bidForPlacement,
        })
            .then((response) => {
                console.log(response);
                navigate("/dashboard");
            })
            .catch((err) => {
                console.log(err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };

    return (
        <div className="col-sm-11 col-md-10 col-lg-8 mx-auto">
            <h2 className="my-4 py-4">Create New Campaign</h2>
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
            <div className="col-12 d-flex justify-content-start">
                <form className="col-12 mt-4 d-flex justify-content-start" onSubmit={createAdHandler}>
                    <div className="col-5 form-group text-start mt-4">
                        <label className="mb-2" htmlFor="campaignTitle">Campaign Title</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setCampaignTitle(e.target.value)} value={campaignTitle} />
                        {errors.campaignTitle ? <p className="text-danger mt-2">{errors.campaignTitle.message}</p> : null}

                        <label className="mb-2" htmlFor="targetAddress">Target Address</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setTargetAddress(e.target.value)} value={targetAddress} />
                        {errors.targetAddress ? <p className="text-danger mt-2">{errors.targetAddress.message}</p> : null}

                        <label className="mb-2" htmlFor="displayLink">Display Link</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setDisplayLink(e.target.value)} value={displayLink} />
                        {errors.displayLink ? <p className="text-danger mt-2">{errors.displayLink.message}</p> : null}

                        <h5 className="mt-4">Advertisement Preview</h5>
                        <div className="card px-3 py-2 col-12">
                            <h5 className="pt-2">{campaignTitle}</h5>
                            <a target="_blank" href={targetAddress}>{displayLink}</a>
                            <p>{description}</p>
                        </div>
                    </div>

                    <div className="col-1"></div>

                    <div className="col-5 form-group text-start mt-4">
                        <label className="mb-2" htmlFor="description">Description</label>
                        <textarea type="text" className="form-control mb-2" onChange={(e) => setDescription(e.target.value)} value={description} />
                        {errors.description ? <p className="text-danger mt-2">{errors.description.message}</p> : null}

                        <label className="mb-2" htmlFor="bidForPlacement">Bid For Placement</label>
                        <input type="text" className="form-control mb-2" onChange={(e) => setBidForPlacement(e.target.value)} value={bidForPlacement} />
                        {errors.bidForPlacement ? <p className="text-danger mt-2">{errors.bidForPlacement.message}</p> : null}

                        <p className="mb-2">Suggested bid between $0.10 - $2.00</p>

                        <button className="btn btn-primary my-4" type="submit">Submit</button>
                    </div>

                    <div className="col-1"></div>

                </form>
            </div>
            <Link className="my-4 mx-2 d-flex justify-content-end" to={"/dashboard"}><button className="btn btn-secondary">Cancel</button></Link>
        </div>
    )
}

export default AdCreate;