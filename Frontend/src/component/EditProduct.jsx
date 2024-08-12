import React , {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import productService from '../service/product.service';

const EditProduct = () => {

  const[product , setProduct] = useState(
      {  id : "",
          productName: "",
          description:"",
          price:"",
          status:""
      }
  );

  const {id} = useParams();
  const [msg , setMsg] = useState("");

  useEffect(()=>
  {
    productService.getProductById(id).then((res) => {
      setProduct(res.data);
    })
    .catch((error) =>{
      console.log(error);
    });
  } , [] 
);
 
  const handleChange = (e)=>{
      const value = e.target.value;
      setProduct({...product , [e.target.name] : value });
  };

  const ProductUpdate=(e)=>{
      e.preventDefault();
     productService.editProduct(product).then((res) =>{
      console.log("Product Added Sucessfully");
      setMsg("Product Added Sucessfully"); 

      setProduct({
          productName: "",
          description:"",
          price:"",
          status:""
      });
     }).catch((err)=>{
      console.log("Error");
     })
  }

return (
  <>
  <div className='container'>
      <div className="row">
          <div className='col-md-6 offset-md-3'>
              <div className="card">
                  <div className="card-header fs-3 text-center">Edit Product</div>
                  {
                      msg && 
                      <p className='fs-4 text-center text-success'>{msg}</p>
                  }
                  
                  <div className="card-body">
                      <form action="" onSubmit={(e)=>ProductUpdate(e)}>
                          <div className="mb-3">
                              <label>Enter Product Name: </label>
                              <input type='text' name='productName' onChange={(e) => handleChange(e)} value={product.productName} className='form-control'/>
                          </div>

                          <div className="mb-3">
                              <label>Enter Description: </label>
                              <input type='text' name='description'  onChange={(e) => handleChange(e)} value={product.description}   className='form-control'/>
                          </div>

                          <div className="mb-3">
                              <label>Enter Price: </label>
                              <input type='text' name='price'  onChange={(e) => handleChange(e)} value={product.price}   className='form-control'/>
                          </div>

                          <div className="mb-3">
                              <label>Enter Status: </label>
                              <input type='text' name='status'  onChange={(e) => handleChange(e)} value={product.status}  className='form-control'/>
                          </div>

                          <button className='btn btn-primary col-md-12'>Update</button>
                      </form>
                  </div>
              </div>
          </div>
    </div>
  </div>
  </>
)
}

export default EditProduct
