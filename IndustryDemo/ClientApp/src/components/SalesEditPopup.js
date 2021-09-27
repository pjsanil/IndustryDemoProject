import React, { useState } from 'react'
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



//axios gona come here+-
  const createSale = () => {
    let d=moment(Date.now()).format("YYYY-MM-DD ")

    axios.put(`sales/PutSales/${id}`,{
        Id:id,
        Productid:pro,
        Customerid:cus,
        Storeid:stor,
        DateSold:new Date(moment(Date.now()).format("L"))
    } )
    editPopupFunction(false)
  }
  
//date stuff
  const [date, setDate] = useState(null);
//  const handleDateChange = (event, data) => setDate(data.value);
 console.log("the entered date is")

//console.log(moment(Date.now()).format("L"))

//dropdown stuff
const handleDropdownCustomer = (event, data1) => {
console.log("the new way")
  console.log(data1.value)
  // console.log("the value of event is ")
  // console.log(event)
  setCus(data1.value)
  
};

const handleDropdownProduct = (event, data2) => {
  console.log("the new way")
    console.log(data2.value)
    // console.log("the value of event is ")
    // console.log(event)
    setPro(data2.value)
    
  };

  const handleDropdownStore = (event, data3) => {
    console.log("the new way")
      console.log(data3.value)
      // console.log("the value of event is ")
      // console.log(event)
      setStor(data3.value)
      
    };
    
    const cancelSale=()=>
    { console.log("firsthit")
    editPopupFunction(false)
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
      <input  placeholder={dat1} onChange={e=>setDto(e.target.value)}/>
    </Form.Field>

      {/* <pre>
        Selected date:
        <br />
        {date ? date.toString() : 'None'}
      </pre> */}

</Form>
          <Form>
            <label>Customer</label>
          
    <Dropdown
      fluid
     selection
      placeholder={cus1}
      options={customerDropDown}
      onChange={handleDropdownCustomer}
    />

          </Form>



          <Form>
            <label>Product</label>
          
    <Dropdown
      fluid
     selection
      placeholder={prd1}
      options={productDropDown}
      onChange={handleDropdownProduct}
    />

          </Form>





          <Form>
            <label>Sales</label>
          
    <Dropdown
      fluid
     selection
      placeholder={str1}
      options={storeDropDown}
      onChange={handleDropdownStore}
    />

          </Form>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick ={()=>cancelSale()}>
          cancel
        </Button>
        <Button color='green' onClick={() => createSale()}  >
          create
        </Button>

      </Modal.Actions>
    </Modal>
  )
}
