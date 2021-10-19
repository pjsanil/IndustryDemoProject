import React, { useState,useEffect } from 'react'
import axios from 'axios';

import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

const EditStore = (props) => {
    const { open, Id, EditStoreDetails,name,address} = props;
    console.log("testing edit")
console.log(name)
console.log(address)
   
     const [entername, setEnterName] = useState("")
     const [enteraddress, setEnterAddress] = useState("")


     useEffect(() => {
      setEnterName(name)
      setEnterAddress(address)
      }, [name,address]);



    const editStore = (sname,saddress) => {
        console.log("Store edit name check")
        console.log(sname)
        console.log(saddress)
        console.log(Id)
        axios.put(`stores/putstore/ ${Id}`,
            {
                id: Id,       //passing object
                name: sname,     //passing object
                address: saddress  //passing object
            })
            .then(res => {
                console.log("qwerty" + res.data);
                EditStoreDetails(false)

            })
            .catch(err => console.log(err))

    }

//the lifecycle features lies here. 
   
   
    return (

        <div>

            <Modal

              
                open={open}
            
            >

                <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content >

                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input  defaultValue={name} onChange={(e) => setEnterName(e.target.value)} type="text"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input defaultValue={address} onChange={(e) => setEnterAddress(e.target.value)} type="text" />
                            </Form.Field>
                        </Form>

                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => EditStoreDetails(false)}>
                        cancel
                    </Button>
                   
                    <Button color='green' onClick={() => editStore(entername,enteraddress)} >
                        edit
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default EditStore

