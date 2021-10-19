import React, { useState } from "react";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Dropdown,
  DateInput,
} from "semantic-ui-react";

import axios from "axios";

import moment from "moment";

export default function CreateSales(props) {
  const { open, custom, customer, products, stores, createPopupFunction } =
    props;

  const [cus, setCus] = useState(0);
  const [pro, setPro] = useState(0);
  const [stor, setStor] = useState(0);
  let [sdate, setsDate] = useState("");

  
  
  const handleDateChange=(e)=> {
    
      setsDate(e.target.value)
    }
  

   

 // console.log("check 1");
  //console.log(sdate);

 // console.log(moment(Date.now()).format("L"));

  const customerDropDown = customer.map((r) => ({
    key: r.id,
    text: r.name,
    value: r.id,
  }));

  const productDropDown = products.map((r) => ({
    key: r.id,
    text: r.name,
    value: r.id,
  }));

  const storeDropDown = stores.map((r) => ({
    key: r.id,
    text: r.name,
    value: r.id,
  }));

  const createSalesDetails = () => {
 console.log("2323")
 
 if(sdate==="")
 {
   console.log("114")
   sdate=new Date(moment(Date.now()).format("L"))
 }
 console.log("115")
 console.log("sdate")
    axios
      .post("sales/PostSales", {
        Customerid: cus,

        Productid: pro,

        Storeid: stor,
        DateSold: sdate,
        //DateSold:new Date(moment(Date.now()).format("L"))
      })
      .then((s) => {
        createPopupFunction(false);
      })
      .catch((err) => {
        console.log(err.reponse);
      });
  };

  //const [date, setDate] = moment(Date.now()).format("L");

  const handleDropdownCustomer = (event, data1) => {
    setCus(data1.value);
  };

  const handleDropdownProduct = (event, data2) => {
    setPro(data2.value);
  };

  const handleDropdownStore = (event, data3) => {
    setStor(data3.value);
  };

  const cancelSale = () => {
    console.log("firsthit");
    createPopupFunction(false);
  };

  return (
    <Modal open={open}>
      <Modal.Header>Add Sale </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form style={{ width: "30%" }}>
            {/* <DateInput
              name="date"
              placeholder="Date"
              value={sdate}
              iconPosition="left"
              onChange={handleChange}
            /> */}

            <Form.Field>
              <label>Date</label>
             


              <input type="date" name="DateSold" defaultValue={new Date().toLocaleDateString("en-CA").slice(0, 10)} max={new Date().toLocaleDateString("en-CA").slice(0, 10)} onChange={handleDateChange}/>


              {/* <input placeholder={moment(Date.now()).format("L")} readOnly /> */}
            </Form.Field>
          </Form>
          <Form>
            <label>Customer</label>
            <Dropdown
              placeholder="Select Customer"
              fluid
              selection
              options={customerDropDown}
              onChange={handleDropdownCustomer}
            />
          </Form>
          <Form>
            <label>Product</label>
            <Dropdown
              placeholder="Select Product"
              fluid
              selection
              options={productDropDown}
              onChange={handleDropdownProduct}
            />
          </Form>
          <Form>
            <label>Store</label>
            <Dropdown
              placeholder="Select Store"
              fluid
              selection
              options={storeDropDown}
              onChange={handleDropdownStore}
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => cancelSale()}>
          cancel
        </Button>
        <Button color="green" onClick={() => createSalesDetails()}>
          create
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
