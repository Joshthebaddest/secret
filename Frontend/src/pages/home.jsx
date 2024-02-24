import { useEffect, useState } from "react"
import { Link } from "../component"
import axios from 'axios'

const Home = () => {
    const [message, setMessage ] = useState(null)
    const [ data, setData ] = useState(null)
    const [ link, setLink ] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(()=>{
        const getLink = async () =>{
            try{
                const response = await axios.get('http://localhost:3000/', { withCredentials: true });
                setData(response.data)
                setLink(false)
            }catch(err){
                setLink(false)
            }
        }
        getLink()
    },[link])

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/', formData, { withCredentials: true })
            if(response.status === 201){
                setLink(true)
            }
        }
        catch(err){
            if(err.response.status === 422 || err.response.status === 409){
                const { message } = err.response.data
                setMessage(message)
            }
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    }
    
    return (
    <>
        {!data ? <div>
            <div className="form p-10" >
                <p>With Secret Message App, you can securely send encrypted messages to your contacts. Our app ensures that your conversations remain private and confidential, giving you peace of mind.</p>
                
                <ul>
                    <li>End-to-end encryption</li>
                    <li>Secure message delivery</li>
                    <li>User-friendly interface</li>
                </ul>
            </div>

            <form className="form" action="" method="post" onSubmit={handleSubmit}>
                <div className="head">
                    <h3>Create Your Secret Message</h3>
                </div>
                
                <div className="mb-3 info-container">
                    <ul className="text">
                        <li>Enter your name, secret message link and share with your friends on Whatsapp, Facebook.</li>
                        <li>Get unknown feedback from your friends, co-worker, and Fans.</li>
                        <li>Once your friends send you a message, you will see the result on a Message board.</li>
                    </ul>

                    <input type="text" name="name" className="textArea" id="exampleInputName" aria-describedby="emailHelp" value={formData.name} onChange={handleInputChange} />
                    {message && <span className="text-red text-md"><i>{message}</i></span>}
                            
                    <div id="nameHelp" className="form-text text-white">We'll never share your name with anyone else.</div>
                    <input type="checkbox" defaultChecked /><span>I agree to <a href="">Terms and Codition</a> of website</span>
                
                    <button type="submit" className="bg-blue">Create your link</button>
                </div>
            </form>
        </div>
        : <Link data={data} />}
    </>

    )

}

export default Home