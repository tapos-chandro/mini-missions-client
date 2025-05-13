
import { useEffect } from 'react';
import { Helmet, HelmetData } from 'react-helmet-async';


const ReactHelmet = ({helmetText}) => {
    useEffect(() => {
        document.title = helmetText
    }, [])

};

export default ReactHelmet;