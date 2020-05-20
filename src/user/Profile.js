import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';




const Profile = (props) => {

    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:false,
        success:false
    });

    const {name,email,password,error,success} = values
    const {token} = isAuthenticated()

    const init = (userId) =>{
        read(userId,token)
        .then(data=>{
            if(data.error){
                setValues({...values,error:true})
            }else{
                setValues({...values,name:data.name,email:data.email})
            }
        })
    }

    useEffect(() => {
        init(props.match.params.userId)
    }, []);

    const handleChange = name => event =>{
        setValues({...values,error:false,[name]:event.target.value})
    }

    const handleSubmit = event =>{       
        event.preventDefault();
        update(props.match.params.userId,token,{name,email,password})
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                updateUser(data,()=>{
                    setValues({...values,name:data.name,email:data.email,success:true})
                })
            }
        })           
        
    }

    const redirectUser = success =>{
        if(success){
            return <Redirect to="/"/>
        }
    }


    const profileUpdate = (name,email,password)=>{
        return (<form>
            <div className="form-group">
                <lebel className="text-muted">Name</lebel>
                <input 
                    value={name} 
                    className='form-control' 
                    type="text" 
                    onChange={handleChange('name')}/>
            </div>

            <div className="form-group">
                <lebel className="text-muted">Email</lebel>
                <input
                    value={email}
                    className='form-control'
                    type="email"
                    onChange={handleChange('email')} />
            </div>

            <div className="form-group">
                <lebel className="text-muted">Password</lebel>
                <input
                    value={password}
                    className='form-control'
                    type="password"
                    onChange={handleChange('password')} />
            </div>

            <buttun onClick={handleSubmit} className="btn btn-primary">Submit</buttun>
        </form>)
    }

    return ( 
        <Layout 
            className="container-fluid" 
            title='Profile' 
            description='Here you can update your profile'>
           {profileUpdate(name,email,password)}
            {redirectUser(success)}
        </Layout>
     );
}
 
export default Profile;