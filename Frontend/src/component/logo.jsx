import { Link } from 'react-router-dom'
import mysecretapp from '../assets/mysecretapp.png'

const Logo = (home) => {
    return(
        <>
            <div className="header h-fit text-center relative py-10">
                <Link className="img-link absolute left-4 top-2" to={home}>
                    <img className='w-[80px] h-[80px]' src={mysecretapp} alt="Secret Message App - Encrypted Messaging" />
                </Link>
                <h1><Link to={home}>My Secret App</Link></h1>
            </div>
        </>
    )

}

export default Logo