
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'

const EditProduct=(props)=> {
  //const [open, setOpen] = React.useState(false)
const {open,EditProductDetails}=props
 const[pname,setName]= useState("")
 const[pprice,setPrice]=useState("")

//  console.log(props.open);
 


 useEffect(()=>{
  setName(props.name)
  setPrice(props.Address)
 },[props.name,props.Address])

const CreateContent = (nam,pprice) => {
  console.log("Edit product datas1")
  console.log(nam)
  console.log(pprice)
    axios.put(`products/putproduct/ ${props.Id}`,
        {
            id: props.Id,       //passing object
            name: nam,     //passing object
            price: parseInt(pprice)  //passing object
        })
        .then(res => {
            console.log("qwerty" + res.data);
            EditProductDetails(false)

        })
        .catch(err => console.log(err.response))
        
}


return (
    <Modal
    
      open={open}
   >
      <Modal.Header>Edit Product </Modal.Header>
      <Modal.Content image>
        
        <Modal.Description>
        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input defaultValue={props.name} onChange={(e)=>setName(e.target.value)}  />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input defaultValue={props.Address} onChange={(e)=>setPrice(e.target.value)} />
                            </Form.Field>
                        </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='black' onClick={()=>EditProductDetails(false)} >
                        cancel
                    </Button>
                   
                    <Button color='green' onClick={()=>CreateContent(pname,pprice)} >
                        Edit
                    </Button>
        
      </Modal.Actions>
    </Modal>
  )
}

export default EditProduct

