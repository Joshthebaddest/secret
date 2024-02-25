import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"

const Message = ({ setGetMessage }) => {
    const navigate = useNavigate()
    const [name, setName] = useState(null)
    const [ message, setMessage ] = useState(null)
    const [ formData, setFormData ] = useState({
        message: ''
    })
    const { id } = useParams()
    useEffect(()=>{
        const getLink = async () =>{
            try{
                const response = await axios.get(`http://localhost:3000/secret/${id}`, { withCredentials: true });
                const { name, message } = response.data
                
                setName(name)
                setMessage(message)
            }catch(err){
                if(err.response.status === 401){
                    navigate('/')
                }
                console.log(err)
            }
        }
        getLink()
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const response = await axios.post(`http://localhost:3000/secret/${id}`, formData, { withCredentials: true });
            if(response.status === 200){
                setGetMessage(false)
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleInputChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    }

    return(
        <>
            <form className="form" action="" method="post" onSubmit={handleSubmit}>
                <div className="head">
                    <h3>Message Board</h3>
                </div>
                
                <div className="mb-3 info-container">
                    <ul className="text">
                        <li>Let's play a game and have fun with { name }.</li>
                        <li>Send your message secretly to { name }.</li>
                        <li>{ name } will never know who message.</li>
                    </ul>

                    <textarea className="text-black" name="message" id="" placeholder="Enter Your Thought" value={formData.message} onChange={handleInputChange}></textarea>
                    <span className="text-red ftext-md"><i>{ message }</i></span>
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
            </form>
        </>
    )
}

export default Message