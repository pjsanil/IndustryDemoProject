import React,{useState} from 'react'
import axios from 'axios'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'

const CreateStore=(props)=> {
  //const [open, setOpen] = React.useState(false)
const {open,createStoreDetails}=props
 const[name,setName]= useState("")
 const[address,setAddress]=useState("")

const CreateContent =()=>
{

  console.log("Create cust name and address")
  console.log(name)
  console.log(address)
axios.post('stores/poststore',{
 
    Name:name,
    Address:address

})
.then((res)=>{ 
   
    console.log(res.data)
    createStoreDetails(false)
})
.catch(err =>{console.log(err)})
}





return (
    <Modal
    
      open={open}
   >
      <Modal.Header>Create Store </Modal.Header>
      <Modal.Content image>
        
        <Modal.Description>
        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' onChange={(e)=>setName(e.target.value)}  />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder='Address' onChange={(e)=>setAddress(e.target.value)} />
                            </Form.Field>
                        </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='black' onClick={()=>createStoreDetails(false)} >
                        cancel
                    </Button>
                   
                    <Button color='green' onClick={()=>CreateContent()} >
                        create
                    </Button>
        
      </Modal.Actions>
    </Modal>
  )
}

export default CreateStore

