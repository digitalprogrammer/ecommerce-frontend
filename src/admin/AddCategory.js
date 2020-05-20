import React,{useState} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';

const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user,token} = isAuthenticated()

    const handleChange = (event)=>{
        setError('')
        setName(event.target.value)
    }

    const handleSubmit = event =>{
        event.preventDefault()
        setError('')
        setSuccess(false)

        //api request to create category
        createCategory(user._id,token,{name})
        .then(data=>{
            if(data.error){
                setError(true)
            }else{
                setError('')
                setSuccess(true)
            }
        })
    }

    const showSuccess = () =>{
        if(success){
            return <h3 className="text-success">{name} category was created!</h3>
        }
    }

    const showError = () =>{
        if(error){
            return <h3 className="text-danger">{name} category already exists!</h3>
        }
    }

    const goBack = () => {
        return (<div className="mt-5">
            <Link to="/admin/dashboard"><button className="btn btn-outline-warning">ADMIN DASHBOARD</button></Link>
        </div>)
    }

    const newCategoryForm = () =>{
       return(<form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input required value={name} autoFocus onChange={handleChange} type="text" className="form-control"/>
            </div>

            <button className="btn btn-outline-primary">Create Category</button>
        </form>)
    }

    return ( 
        <Layout
            title="Add a new category"
            description={`Hello ${user.name}, here you can create new categories.`}
         
        >
         <div className="row">
            <div className="col-md-8 offset-md-2">
                {showError()}
                {showSuccess()}
                {newCategoryForm()}
                {goBack()}
            </div>
        </div>   
        </Layout>
     );
}
 
export default AddCategory;