import { useState } from "react"
import { Generate, Message } from "../component"

const Secret = () => {
    const [ getMessage, setGetMessage ] = useState(true)

    return(
        <>
            {!getMessage ? <Generate setGetMessage={setGetMessage} /> :
            <Message setGetMessage={setGetMessage} />}
        </>
    )

}

export default Secret