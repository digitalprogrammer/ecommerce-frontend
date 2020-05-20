import React,{useState,useEffect} from 'react';
import { getCategories, list } from './apiCore';
import Card from './Card';


const Search = () => {

    const [data, setData] = useState({
        categories:[],
        search:'',
        category:'',
        results:[],
        searched:false
    });

    const loadCategories = ()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setData({...data,categories:data})
            }
        })
    }

    const {categories,category,search,results,searched} = data

    useEffect(() => {
        loadCategories()    
    }, []);

    const handleSubmit = (event)=>{
        event.preventDefault()
        searchData()
    }

    const searchData = () =>{
        if(search){
            list({search:search || undefined,category:category})
            .then(res =>{
                if(res.error){
                   console.log(res.error)
                }else{
                    setData({...data,results:res,searched:true})
                }
            })
        }
    }

    const handleChange = name => event =>{
        setData({...data,[name]:event.target.value,searched:false})
    
    }

    const searchMessage = (searched,results)=>{
        if(searched && results.length > 0){
            return <div className='text-success'>{`Found ${results.length} products`}</div>
        }
        if(searched && results.length < 1){
            return <div className='text-warning'>No products found!</div>
        }
    }

    const searchedProducts = (results = []) =>{
        return (
           <div>
               <h2 className="mt-4 mb-4">
                   {searchMessage(searched,results)}
               </h2>
                <div className="row">
                    {results.map((product, index) => (
                        <Card key={index} product={product} />
                    ))}
                </div>
           </div>
        )
    }

    const searchForm = ()=>{
       return (<form onSubmit={handleSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select onChange={handleChange('category')} className="btn mr-2">
                            <option value="All">All Categories</option>
                            {categories.map((category,index)=>(
                                <option key={index} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <input placeholder='Search by name'
                        onChange={handleChange('search')}
                        type="search" className="form-control" />
                </div>
                <div style={{border:'none'}} className="btn input-group-append">
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>)
    }


    return ( 
        <div>
            <div className="container mb-3">
                {searchForm()}                
            </div>

            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
     );
}
 
export default Search;