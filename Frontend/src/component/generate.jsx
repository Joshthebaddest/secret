import { useState } from "react"

const Generate = () => {
    const [ link, setLink ] = useState(null)
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

                    <button className="btn btn-primary"><a href="/">Generate your link</a></button>
                    <button className="btn btn-primary"><a href={ link }>Send New</a></button>
                </div>
            </div>
        </>
    )

}

export default Generate