import { useState } from "react"
import { Link } from "react-router-dom"

const Generate = ({ setGetMessage }) => {
    const [ link, setLink ] = useState(null)
    const setMessage = () =>{
        setGetMessage(true)

    }

    return(
        <>
            <div className="page-container">
                <div className="head">
                    <h3>Message Board</h3>
                </div>
                
                <div className="mb-3 info-container">
                    <p>Thanks For Your Participation</p>
                    <p>Your Message Sent Successfully!</p>
                    <p>Click on the link below to generate your secret link</p>

                    <button className="btn btn-primary"><Link to="/">Generate your link</Link></button>
                    <button className="btn btn-primary" onClick={setMessage}>Send New</button>
                </div>
            </div>
        </>
    )

}

export default Generate