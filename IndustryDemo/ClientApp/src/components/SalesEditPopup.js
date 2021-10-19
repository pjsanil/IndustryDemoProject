import React, { useEffect, useState,Component } from 'react'
import { Button, Header, Image, Modal, Form, Dropdown, DateInput } from 'semantic-ui-react'
//import SalesCustomerDropdown from './SalesCustomerDropdown'
import axios from 'axios'
//import Calendar from 'react-calendar'
//import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import moment from "moment";

export default function SalesEditPopup(props) {
  //const [open, setOpen] = React.useState(false)
  const { open, custom ,cust,prodct,stre,editPopupFunction,cus1,prd1,str1,dat1,id} = props
  
const [cus,setCus]=useState(0)
const [pro,setPro]=useState(0)
const [stor,setStor]=useState(0)
const[dto,setDto]=useState(0)
  console.log("Custom value")
  console.log(custom)

  const customerDropDown = cust.map((r) => (
    {
      key: r.id,
      text: r.name,
      value: r.id,
     

    }))
    const productDropDown = prodct.map((r) => (
      {
        key: r.id,
        text: r.name,
        value: r.id,
       
  
      }))
      const storeDropDown = stre.map((r) => (
        {
          key: r.id,
          text: r.name,
          value: r.id,
         
    
        }))

       

         
  const createSale = (cusid1,productid1,storeid1,dto1) => {
   console.clear()
    console.log("0000000")
    console.log(props.soldDate)
    console.log(dto1)
    console.log(storeid)
    console.log(cusid1)
    console.log(productid1)
   if(cusid1===0)
   {
     console.log("1")
     cusid1=props.custid;
   }

   if(productid1===0)
   {
     console.log("2")
     productid1=props.prodid;
   }
   if(storeid1===0)
   {
     console.log("3")
     storeid1=props.storeid;
   }

   if(dto1==="")
   {
     console.log("114")
     dto1=props.soldDate;
   }
   console.log("115")
     console.log(props.saleId)
     console.log(dto1)
    console.log(storeid)
    console.log(cusid1)
    console.log(productid1)
    axios.put(`sales/PutSales/${props.saleId}`,{
        Id:props.saleId,
        Productid:productid1,
        Customerid:cusid1,
        Storeid:storeid1,
        //DateSold:new Date(moment(Date.now()).format("L"))
        DateSold:dto1
    } )
    .then(res => {
      console.log("qwerty" + res.data);
      returnpagefunction(false)

  })
  .catch(err => console.log(err.response))
  
}
  





const handleDropdownCustomer = (event, data1) => {
  setCustId(data1.value);
 // cust.map((c) => (c.name === cus ? (cusid = c.id) : {}));
 console.log("cid value")
 console.log(cusid)
  
  
};
console.log("cus test")
console.log(cus)

const handleDropdownProduct = (event, data2) => {
  setProdId(data2.value)
    
  };

  const handleDropdownStore = (event, data3) => {
    setStoreId(data3.value)
      
    };
    
    const cancelSale=()=>
    { //console.log("firsthit")
      returnpagefunction(false)
    }

    
  return (
    <Modal

      open={open}
    >
      <Modal.Header>Edit customer </Modal.Header>
      <Modal.Content image>

        <Modal.Description>
          <Form style={{ width: '30%' }}>

            <Form.Field>
            <label>Date Sold</label>
            <input type="date" name="DateSold" defaultValue={new Date(soldDate).toLocaleDateString("en-CA")} max={new Date().toISOString().slice(0, 10)} onChange={handleDateChange}/>

      {/* <input  placeholder={dat1} onChange={e=>setDto(e.target.value)}/> */}
    </Form.Field>   

</Form>
          <Form>
            <label>Customer</label>
          
            <Dropdown
                            fluid
                            
                            placeholder={customerName}
                            selection={customerName}
                              options={customerDropDown}
                            onChange={handleDropdownCustomer}
                        />


          </Form>


          <Form>
            <label>Product</label>
          
            <Dropdown
                            fluid
                            selection={productName}
                            placeholder={productName}
                            options={productDropDown}
                            onChange={handleDropdownProduct}
                        />


          </Form>
          <Form>
            <label>Sales</label>
          
            <Dropdown
                            fluid
                            selection={storeName}
                            placeholder={storeName}
                            options={storeDropDown}
                            onChange={handleDropdownStore}
                        />


          </Form>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick ={()=>cancelSale()}>
          Cancel
        </Button>
        <Button color='green' onClick={() => createSale(cusid,productid,stoid,dto)}  >
          Edit
        </Button>

      </Modal.Actions>
    </Modal>
  )
}
