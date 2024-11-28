import React, { useContext, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
const PlaceOrder = () => {
  const {getTotalCartAmount,token,url,user_list,userItems}=useContext(StoreContext)
  const [data,setData]=useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    avatar:"",
  })
  const onChangeHandler=(event)=>
  {
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))

  }

  const placeOrder=async(event)=>{
     event.preventDefault();
     let orderItems=[];
     user_list.map((item)=>{
      if(userItems[item._id]){
        let itemInfo=item;
        itemInfo["quantity"]=userItems[item._id];
        orderItems.push(itemInfo);
      }
     })
     let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,

     }
     let response =await axios.post(url+"/api/user/list",orderData,{headers:{token}})
     if (response.data.success) {
      const{session_url}=response.data;
      window.location.replace(session_url);

     }else{
      alert("Error")
     }
  }
  return (
   <form onSubmit={placeOrder} className='place-order'>
       <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='name' />
        </div>
        <input required name='email' onChange={onChangeHandler}  value={data.email}  type="email" placeholder='Email ' />
        <input required name='phone' onChange={onChangeHandler}  value={data.phone} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='address' onChange={onChangeHandler}  value={data.address} type="text" placeholder='City' />
          <input required name='avatar' onChange={onChangeHandler}  value={data.avatar} type="text" placeholder='State' />
        </div>
          <button type='submit' >Submit</button>
       </div>   
   </form>
  )
}

export default PlaceOrder
