import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import axios from "axios"

const Message = () => {
    const [name, setName] = useState(null)
    const [message, setMessage] = useState(null)
    const { id } = useParams()
    useEffect(()=>{
        const getLink = async () =>{
            try{
                const response = await axios.get(`http://localhost:3000/secret/${id}`, { withCredentials: true });
                const { name, message } = response.data
                setName(name)
                setMessage(message)
            }catch(err){
                console.log(err)
            }
        }
        getLink()
    },[])

    return(
        <>
            <form className="form" action="" method="post">
                <div className="head">
                    <h3>Message Board</h3>
                </div>
                
                <div className="mb-3 info-container">
                    <ul className="text">
                        <li>Let's play a game and have fun with { name }.</li>
                        <li>Send your message secretly to { name }.</li>
                        <li>{ name } will never know who message.</li>
                    </ul>

                    <textarea name="message" id="" placeholder="Enter Your Thought"></textarea>
                    <span className="text-red ftext-md"><i>{ message }</i></span>
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
            </form>
        </>
    )
}

export default Message