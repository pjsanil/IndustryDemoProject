import React from 'react'
import axios from 'axios'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const DeleteSales=(props)=> {

const {open, Id , DeleteSalesDetails} = props


console.log("delete saleid1111 value is "+ props.Id)

const confirmDelete=()=>{
  
axios.delete(`sales/DeleteSales/ ${Id}`   ) // string interpolation
             .then (res =>{
                 console.log(res.data)
                 
                 DeleteSalesDetails(false)
                 

             })
           .catch(err=> {console.log(err)})
}



  return (
    <Modal
    
      open={open}
     
    >
      <Modal.Header>Delete Store</Modal.Header>
      <Modal.Content image>
       
        <Modal.Description>
         Are yo sure?
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
                    <Button color='black' onClick={()=>DeleteSalesDetails(false)}  >
                        cancel
                    </Button>
                   
                    <Button color='red' onClick={confirmDelete}>
                        delete
                    </Button>
                </Modal.Actions>
    </Modal>
  )
}

export default DeleteSales