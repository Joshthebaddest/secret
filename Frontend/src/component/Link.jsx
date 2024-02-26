import axios from "axios"
import { useRef, useState } from "react"
import { Link } from "react-router-dom";

const PageLink = ({ data, setLink }) => {
      // Create a ref to the input element
    const inputRef = useRef(null);
    const {id, message, whatsapp } = data
    const link = `${window.location}secret/${id}`

    const handleSubmit = async(message) => {
        const response = await axios.post('http://localhost:3000/delete', { message }, { withCredentials: true })
        if(response.status === 200){
            setLink(true)
        }
    }

    const copyText = () => {
        // Access the input element's value using the ref
        const inputValue = inputRef.current.value;
 
        // Copy the text to the clipboard
        navigator.clipboard.writeText(inputValue)
        .then(() => {
            alert('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
   };


    return(
        <>
            <div className="alert">Text copied the to clipboard</div>


            <div className="form" action="" method="post">
                <div className="head">
                    <h3>Your Message</h3>
                </div>
                <div className="mb-3 info-container">
                {message.length > 0 && message.map((text)=>(
                    <div className="h-fit mb-3 pl-3 relative" style={{border: "1px solid rgb(196, 196, 196)"}}>
                        <p className="m-0"><strong>Message:</strong></p>
                        <p>{text.message}</p>
                        <p>- Anonymous [{ text.date}]</p>
                        <div className="absolute top-0 right-0">
                            <button className="bg-transparent border-0 text-red text-md" onClick={()=>handleSubmit(text.message)}>x</button>
                        </div>
                    </div>
                     ))}
                </div>
                {message.length < 1 && <p>no feedbacks from your friends yet</p>}
            </div>


            <div className="page-container">
                <div className="head">
                    <h3>Create Your Secret Message</h3>
                </div>
                
                <div className="mb-3 info-container">
                    <p>your link has been generated Successfully</p>
                    <p className="text-md"><i>Now share your link with your friends</i></p>

                    <input type="text" className="textArea" defaultValue={link} ref={inputRef}/>
                    <button onClick={copyText} style={{backgroundImage: "linear-gradient(to right, rgb(176, 255, 112), rgb(127, 253, 127))"}} className="btn btn-primary">
                        <i className="fa-solid fa-copy mr-3"></i> copy your link
                    </button>
                    <button style={{backgroundImage: "linear-gradient(to right, rgb(0, 90, 0), rgb(124, 255, 124))"}} className="btn btn-primary">
                        <i className="fa-brands fa-whatsapp mr-3"></i>
                        <Link to={`${whatsapp}${link}${id}`}> share on Whatsapp </Link>
                    </button>
                    <button style={{backgroundImage: "linear-gradient(to right, rgb(186, 0, 34), rgb(0, 42, 253))"}} className="btn btn-primary">
                        <i className="fa-solid fa-share-nodes mr-3"></i> More To Share
                    </button>
                </div>
                
            </div>
            Lin
        </>
    )
}

export default PageLink