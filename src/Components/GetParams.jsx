import React from 'react';
import { useParams } from 'react-router-dom';

//Para conseguir pasar los parametros de las rutas de App al componente.

const getParams = AnyComponent => props => {
    const params = useParams();

    return (
        <AnyComponent {...props} params={params}>

        </AnyComponent>
    )
}

export default getParams