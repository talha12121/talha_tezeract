import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
function Index() {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/userform')
    },[])
    return (
        <div>
            Home
        </div>
    );
}

export default Index;