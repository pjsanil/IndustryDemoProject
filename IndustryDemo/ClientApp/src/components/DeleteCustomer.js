import React from 'react'
import axios from 'axios'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const DeleteCustomer=(props)=> {

const {open, Id , DeleteDetails} = props
console.log(open)
console.log("delete id value is "+ Id)
//const [open,setOpen]=useState(true)



const confirmDelete=()=>{
  
axios.delete(`customers/deletecustomer/ ${Id}`   ) // string interpolation
             .then (res =>{
                 console.log(res.data)
                 
                 DeleteDetails(false)
                 

             })
           .catch(err=> {console.log(err)})
}



  return (
    <Modal
    //   onClose={() => setOpen(false)}
    //   onOpen={() => setOpen(true)}
      open={open}
     // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Delete Customer</Modal.Header>
      <Modal.Content>
       
        <Modal.Description>
         Are yo sure?
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
                    <Button color='black' onClick={()=>DeleteDetails(false)}  >
                        cancel
                    </Button>
                   
                    <Button color='red' onClick={confirmDelete}>
                        delete
                    </Button>
                </Modal.Actions>
    </Modal>
  )
}

export default DeleteCustomer