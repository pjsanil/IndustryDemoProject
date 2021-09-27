import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Table, Button,Menu } from 'semantic-ui-react'
import SalesEditPopup from './SalesEditPopup'
 import DeleteSales from './DeleteSales'
import CreateSales from './CreateSales';
//import PaginationCreator from './PaginationCreator';

export class FetchSales extends Component {
    constructor(props) {

        super(props);
            this.state = {
            custom: [],
			customer: [],
			products:[],
            stores:[],
            loading: false,
           open:false,
           deletepopup:false,
           opensales:false,
           id:"",
           cus1:"",
           prd1:"",
           str1:"",
           dat1:""
            
           
        
        };
        
    }



    componentDidMount() {
        console.log("componentdidmount")
        this.fetchSalesDetails();
		this.fetchCustomerDetails();
		this.fetchProductDetails();
        this.fetchStoresDetails();
    }

   



    fetchSalesDetails() {
        this.setState({
            loading: true,
        })
        axios.get('Sales/getSales') // not case sensitive   
        .then(({ data }) => {
               console.log(data)
                this.setState({
                    custom: data,
                    loading: false,

                })
             
            })
            .catch(
                err => {
                    console.log(err);
                })
    }


 fetchStoresDetails() {
        this.setState({
            loading: true,
        })
        axios.get('Stores/getStore') // not case sensitive   
        .then(({ data }) => {
               console.log(data)
                this.setState({
                    stores: data,
                    loading: false,

                })
             
            })
            .catch(
                err => {
                    console.log(err);
                })
    }





	fetchCustomerDetails() {
		this.setState({
			loading: true,
		})
		console.log("test");
		axios.get('customers/getcustomers') 
			.then(({ data }) => {
				console.log(data);
				this.setState({
					customer: data,
					loading: false,
				})

				console.log("hola")
				
			})
			.catch(
				err => {
					console.log(err);
				})
	}



	fetchProductDetails() {
		this.setState({
			loading: true,
		})
		console.log("test");
		axios.get('products/getproduct') // not case sensitive
			.then(({ data }) => {
				console.log(data);
				this.setState({
					products: data,
					loading: false,
				})
			})
			.catch(
				err => {
					console.log(err);
				})
	}
	

createPopupFunction=(value)=>{

this.setState({open:value})
this.fetchSalesDetails()

}


editPopupFunction=(val,rid,cst,prd,str,dte)=>{
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(dte)
    if(val===false)
    {
    this.fetchSalesDetails()
    }
    this.setState({opensales:val})
    this.setState({id:rid})
    this.setState({cus1:cst})
    this.setState({prd1:prd})
    this.setState({str1:str})
    this.setState({dat1:dte})
    console.log("the date value is " + this.state.dat1)
}

DeleteSalesDetails=(value,rId)=> {
    console.log("entering deletedetails")
    this.setState({deletepopup:value})
    this.setState({Id:rId})
    
    if(value===false)
    {console.log("entering")
     this.fetchSalesDetails();
    }
    //.catch(err=>{console.log(err.response);})
}

     

    render() {

        //const { custom, loading,open,cust,prodct,stre,opensales,cus1,prd1,str1,dat1,id} = this.state
       
        const { custom, loading,open,customer,products,stores,opensales,cus1,prd1,str1,dat1,id,deletepopup} = this.state
       console.log(custom)
       console.log("date checking custom")
	  

        if (loading) {
            return (
                <div> loading.... </div>
            )
        }
        else {
         
            return (
               
                <div margin='25px'>
                      <CreateSales open={open} custom={custom} customer={customer} products={products} stores={stores} createPopupFunction={this.createPopupFunction}/>                         
                      <DeleteSales open={deletepopup} Id={this.state.Id} DeleteSalesDetails={this.DeleteSalesDetails}/>
                      <SalesEditPopup open={opensales}custom={custom} cust={customer} prodct={products} stre={stores} editPopupFunction={this.editPopupFunction} cus1={cus1} prd1={prd1} str1={str1} dat1={dat1} id={id}/>
                    <Button content='New Sales' primary  onClick={this.createPopupFunction} />
                   
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>

                                <Table.HeaderCell >Customer</Table.HeaderCell>
                                <Table.HeaderCell >Product</Table.HeaderCell>
                                <Table.HeaderCell >Store</Table.HeaderCell>
                                <Table.HeaderCell >Date Sold</Table.HeaderCell>
                                <Table.HeaderCell >Action</Table.HeaderCell>
                                <Table.HeaderCell >Dat</Table.HeaderCell>

                            </Table.Row>

                        </Table.Header>

                        <Table.Body>

						
                            {custom.map((r) => (
								
								

                                <Table.Row key={r.id}>
                                    <Table.Cell collapsing>
                                        {r.customer.name}
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        {r.product.name}
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        {r.store.name}
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        {r.dateSold}
                                    </Table.Cell>


                                    <Table.Cell collapsing textAlign='left'>
                                        <Button color='yellow'  onClick={()=>this.editPopupFunction(true,r.id,r.customer.name,r.product.name,r.store.name,r.dateSold)}><Icon name='edit' />Edit</Button>
                                    </Table.Cell>
                                    <Table.Cell collapsing textAlign='left'>
                                        <Button Icon='trash' onClick={()=>this.DeleteSalesDetails(true,r.id)} color='red'  ><Icon name='trash' />Delete</Button>
                                    </Table.Cell>
                                </Table.Row>

                            ))}





                        </Table.Body>

                        <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='6'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              {/* <Icon name='chevron left' /> */}
            </Menu.Item>
            {/* <PaginationCreator   custom={custom} value={"antony"} />  */}
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
                    </Table>
                   
                </div>


            );
        }



    }
}

