import React from 'react';
import { API } from '../config';



const ShowImage = ({item,url}) => {
    return ( 
        <div className="product-img">
            <img style={{maxHeight:'100%',maxWidth:'100%'}} src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3"/>
        </div>
     );
}
 
export default ShowImage;