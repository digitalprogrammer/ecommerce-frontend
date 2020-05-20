import React,{useEffect,useState} from 'react';

const Checkbox = ({categories,handleFilters}) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = category =>() => {
        //return the first index or -1
        const currentCategoryId = checked.indexOf(category)
        const newCheckedCategoryId = [...checked]

        //if currently cecked was not already in checked state - push it
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(category)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }
    return ( 
        categories.map((category,index)=>(
            <li key={index} className="list-unstyled">
                <input value={checked.indexOf(category._id === -1)} onChange= {handleToggle(category._id)} type="checkbox" className="form-check-input"/>
                <label className="form-check-label">{category.name}</label>
            </li>
        ))
     );
}
 
export default Checkbox;