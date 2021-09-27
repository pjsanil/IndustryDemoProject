import React, { useState,useEffect } from 'react'
import axios from 'axios';

import { Button, Header, Image, Modal, Form } from 'semantic-ui-react'

const EditStore = (props) => {
    const { open, editid, editCustomerDetails,name,address} = props;
console.log(name)
   
     const [entername, setEnterName] = useState("")
     const [enteraddress, setEnterAddress] = useState("")




    const editRole = () => {
        axios.put(`stores/putstore/ ${editid}`,
            {
                id: editid,       //passing object
                name: entername,     //passing object
                address: enteraddress  //passing object
            })
            .then(res => {
                console.log("qwerty" + res.data);
                editCustomerDetails(false)

            })
            .catch(err => console.log(err))

    }

//the lifecycle features lies here. 
    useEffect(() => {
        //componentDIDmount after firstrender
        //ComponentDidUpdate
        console.log("hey its me"+ entername);
        return () => {
            console.log("nothing to clean up");
        }
    }, [entername])


    // const cancelFun =()=>{
    //     console.log("hello friend")
    //     console.log("hello "+ props.open)

    // }



    return (

        <div>

            <Modal

                // onClose={() => setOpen(false)}
                // onOpen={() => setOpen(true)}
                open={open}
            //trigger={<Button>Show Modal</Button>}
            >

                <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content >

                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder={name} onChange={(e) => setEnterName(e.target.value)} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input placeholder={address} onChange={(e) => setEnterAddress(e.target.value)} />
                            </Form.Field>
                        </Form>

                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => editCustomerDetails(false)}>
                        cancel
                    </Button>
                   
                    <Button color='green' onClick={() => editRole()} >
                        edit
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default EditStore

