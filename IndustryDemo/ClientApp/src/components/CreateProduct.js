
import React,{useState} from 'react'
import axios from 'axios'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'

const CreateProduct=(props)=> {
  //const [open, setOpen] = React.useState(false)
const {open,createProductDetails}=props
 const[name,setName]= useState("")
 const[price,setPrice]=useState("")

const CreateContent =()=>
{
axios.post('products/postproduct',
{
    Name:name,
    Price:parseInt(price)

})
.then((res)=>{
  console.log('gggggg');
    console.log(res.data)
    createProductDetails(false)
})
.catch(err =>{console.log(err)})
}





return (
    <Modal
    
      open={open}
   >
      <Modal.Header>Create Product </Modal.Header>
      <Modal.Content>
        
        <Modal.Description>
        <Form>
                            <Form.Field>
                                <label>Product Name</label>
                                <input placeholder='name' onChange={(e)=>setName(e.target.value)}  />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input placeholder='price' onChange={(e)=>setPrice(e.target.value)} />
                            </Form.Field>
                        </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='black' onClick={()=>createProductDetails(false)} >
                        cancel
                    </Button>
                   
                    <Button color='green' onClick={()=>CreateContent()} >
                        create
                    </Button>
        
      </Modal.Actions>
    </Modal>
  )
}

export default CreateProduct

