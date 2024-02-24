import mysecretapp from '../assets/mysecretapp.png'

const Logo = (home) => {
    return(
        <>
            <div className="header h-fit text-center relative py-10">
                <a className="img-link absolute left-4 top-2" href={home}>
                    <img className='w-[80px] h-[80px]' src={mysecretapp} alt="Secret Message App - Encrypted Messaging" />
                </a>
                <h1><a href={home}>My Secret App</a></h1>
            </div>
        </>
    )

}

export default Logo