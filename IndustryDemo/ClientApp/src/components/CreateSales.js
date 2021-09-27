import React,{useState} from 'react'
import { Button, Header, Image, Modal,Form ,Dropdown,DateInput} from 'semantic-ui-react'

import axios from 'axios'

import moment from 'moment'

export default function CreateSales(props) {
  
const {open,custom,customer,products,stores,createPopupFunction}=props
  
const [cus,setCus]=useState(0)
const [pro,setPro]=useState(0)
const [stor,setStor]=useState(0)

console.log("check 1")
	  console.log(stores);

    console.log(moment(Date.now()).format("L"))
    

const customerDropDown=customer.map((r)=> (
    {
      key: r.id,
      text: r.name,
      value: r.id,
      
    }))
    

    const productDropDown=products.map((r)=> (
      {
        key: r.id,
        text: r.name,
        value: r.id,
        
      }))
      

      const storeDropDown=stores.map((r)=> (
        {
          key: r.id,
          text: r.name,
          value: r.id,
          
        }))
        



const createSalesDetails=()=>{
  console.log("Data Insertion check")
 console.log(cus)
 console.log(pro)
 console.log(stor)
axios.post('sales/PostSales',{
  Customerid:cus,

  Productid:pro,

Storeid:stor,
DateSold:new Date(moment(Date.now()).format("L"))
 //DateSold:new Date(moment(Date.now()).format("L"))
})
.then(s=>{
  console.log("enterd the box")
  console.log(s.data)
  createPopupFunction(false)

})
.catch(err=>{console.log(err.reponse)})


}

  const [date, setDate] = moment(Date.now()).format("L")
 
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
        createPopupFunction(false)
        }
  
  return (
    <Modal
    
      open={open}
   >
      <Modal.Header>Add Sale </Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
          <Form style={{width:'30%'}}>
        
                          
                                
                                <Form.Field>
      <label>First Name</label>
      <input  placeholder={ moment(Date.now()).format("L")} readOnly />
    </Form.Field>
                                
                                {/* <SemanticDatepicker onChange={handleDateChange} /> */}

      {/* <pre>
        Selected date:
        <br />
        {date ? date.toString() : 'None'}
      </pre> */}




                                </Form>
                                <Form>
                                <label>Customer</label>
                                <Dropdown
                               
    placeholder='Select Customer'
    fluid
    selection
    options={customerDropDown}
    onChange={handleDropdownCustomer}
   
  />
                </Form>        
                <Form>
                <label>Product</label>
                                <Dropdown
                               
    placeholder='Select Product'
    fluid
    selection
    options={productDropDown}
    onChange={handleDropdownProduct}
   
  />
                </Form>        
                <Form>
                <label>Store</label>
                                <Dropdown
                               
    placeholder='Select Store'
    fluid
    selection
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
        <Button color='green' onClick={() => createSalesDetails()}  >
          create
        </Button>

      </Modal.Actions>
    </Modal>
  )
}


