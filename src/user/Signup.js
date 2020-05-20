import React,{useState} from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth';


const Signup = () => {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });

    const {name,email,password,error,success} = values

    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit = event =>{
        event.preventDefault()
        setValues({...values,error:false})
        signup({name,email,password})
        .then(data=>{
            console.log(data.error)
            console.log(data)
            if(data.error){                
                setValues({ ...values, error: data.error, success: false })
            }else{
                setValues({
                    ...values,name:'',email:'',password:'',error:'',success:true
                })
            }            
        })
       
    }

    const showError = ()=>{
        return (
            <div className="alert alert-danger" style={{display:error?'':'none'}}>{error}</div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>New Account was created. Please <Link to='/signin'>Signin</Link></div>
        )
    }
  

    const signUpForm = ()=>{
        return(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input value={name} onChange={handleChange('name')} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input value={password} onChange={handleChange('password')} type="password" className="form-control" />
            </div>

            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>)
    }

    return ( 
        <Layout 
            title='Signup'
            description='Signup to Caipora Games E-commerce'
            className='container col-md-8 offset-md-2'
            >
            {signUpForm()}
            {showError()}
            {showSuccess()}
        </Layout>
     );
}
 
export default Signup;