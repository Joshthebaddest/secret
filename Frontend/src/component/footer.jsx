import { Link } from 'react-router-dom'

const Footer = () => {
    return(
        <>
            <footer>
                <p>Thank you for visiting my website! you can check out my 
                    <Link style={{textDecoration : "underline", color: "rgb(61, 20, 195)"}} to="https://joshportfolio-eight.vercel.app"> portfolio </Link> 
                    I hope you enjoyed exploring my work and learning more about my skills and experiences. If you have any questions, project inquiries, or just want to connect, feel free to reach out using the 
                    <Link style={{textDecoration: "underline", color: "green"}} to="https://wa.me/message/57IXET2G6T44L1"><i className="fa-brands fa-whatsapp" style={{marginRight: "5px"}}></i> whatsapp </Link> 
                    link here. Let's collaborate and create something amazing together!
                </p> <br />
                <span>© 2023 Okem Marvelous. All rights reserved.</span>
            </footer>
        </>
    )

}

export default Footer