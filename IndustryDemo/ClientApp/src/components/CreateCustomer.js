import React,{useState} from 'react'
import axios from 'axios'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'

const CreateCustomer=(props)=> {
  //const [open, setOpen] = React.useState(false)
const {open,createCustomerDetails}=props
 const[name,setName]= useState("")
 const[address,setAddress]=useState("")

const CreateContent =()=>
{
axios.post('customers/postcustomer',
{
    Name:name,
    Address:address

})
.then((res)=>{
 
    console.log(res.data)
    createCustomerDetails(false)
})
.catch(err =>{console.log(err)})
}




return (
    <Modal
    
      open={open}
   >
      <Modal.Header>Create customer </Modal.Header>
      <Modal.Content image>
        
        <Modal.Description>
        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='First Name' onChange={(e)=>setName(e.target.value)}  />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder='address' onChange={(e)=>setAddress(e.target.value)} />
                            </Form.Field>
                        </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='black' onClick={()=>createCustomerDetails(false)} >
                        cancel
                    </Button>
                   
                    <Button color='green' onClick={()=>CreateContent()} >
                        create
                    </Button>
        
      </Modal.Actions>
    </Modal>
  )
}

export default CreateCustomer

