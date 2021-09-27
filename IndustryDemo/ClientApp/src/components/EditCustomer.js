import React,{useState} from 'react'
import axios from 'axios'
import { Button, Header, Image, Modal,Form } from 'semantic-ui-react'

const EditCustomer=(props)=> {
  //const [open, setOpen] = React.useState(false)
const {open,CustomerPopup,name,Address}=props
 const[CName,setName]= useState("")
 const[Caddress,setAddress]=useState("")
 console.log(props);
//  console.log(props.open);



const CreateContent = (namec,addressc) => {
  console.log("Edit customerdata")
  console.log(namec)
  console.log(addressc)
    axios.put(`customers/putcustomer/ ${props.Id}`,
        {
            id: props.Id,       //passing object
            name: namec,     //passing object
            address: addressc  //passing object
        })
        .then(res => {
            console.log("qwerty" + res.data);
           CustomerPopup(false)

        })
        .catch(err => console.log(err.response))
        
}


return (
    <Modal
    
      open={open}
   >
      <Modal.Header>Edit customer </Modal.Header>
      <Modal.Content image>
        
        <Modal.Description>
        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder={props.name} onChange={(e)=>setName(e.target.value)}  />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder={props.Address} onChange={(e)=>setAddress(e.target.value)} />
                            </Form.Field>
                        </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button color='black' onClick={()=>CustomerPopup(false)} >
                        cancel
                    </Button>
                   
                    <Button color='green' onClick={()=>CreateContent(CName,Caddress)} >
                        Edit
                    </Button>
        
      </Modal.Actions>
    </Modal>
  )
}

export default EditCustomer

