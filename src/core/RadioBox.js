import React,{useState,useEffect,Fragment} from 'react';


const RadioBox = ({prices,handleFilters}) => {

    const [value, setValue] = useState(0);

    const handleChange = (event) =>{       
        handleFilters(event.target.value);
        setValue(event.target.value)
    }
   
   return prices.map((price,index)=>(
       <div key={index}>
            <input name={price} className="mr-2 ml-4" onChange={handleChange} type="radio" value={`${price._id}`}/>
            <label className="form-check-label">{price.name}</label>
       </div>
   ))
}
 
export default RadioBox;
