import axios from 'axios';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Table, Button,Menu } from 'semantic-ui-react'
import SalesEditPopup from './SalesEditPopup'
 import DeleteSales from './DeleteSales'
import CreateSales from './CreateSales';
//import PaginationCreator from './PaginationCreator';
import PaginationCustomer from "./PaginationCustomer";
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
           dat1:"",
           customerid1:0,
           productid:0,
           storeid1:0,
           currentPage: 1,
             postsPerPage: 5,
             salesPag: [],
        
        };
        
    }


    componentDidMount() {
        
        this.setState({
            currentPage: 1,
            postsPerPage: 5,
          });

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

                const indexOfLastPage =this.state.currentPage * this.state.postsPerPage;
                const indexOfFirstPost = indexOfLastPage - this.state.postsPerPage;
                      this.setState({
                                     salesPag: this.state.custom.slice(
                                     indexOfFirstPost,
                                     indexOfLastPage
                                          ),
                                    });

             
            })
            .catch(
                err => {
                    console.log(err);
                })
    }

    paginate = (number) => {
        this.setState({
      currentPage: number,
    });
       this.fetchSalesDetails();
  };
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

returnpagefunction=(val)=>
{
    this.setState({opensales:val})
    
    if(val===false)
    {
        console.log("entering sales 1234")
    this.fetchSalesDetails()
    }
}

editNewPopupFunction=(val)=>{
    this.setState({opensales:val})
    if(val===false)
    {console.log("entered the fetch page")
    this.fetchSalesDetails()
    }
}


editPopupFunction=(val,rid,cst,prd,str,dte,customerid1,productid1,storeid1)=>{
    console.clear()
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@********")
   // console.log(customerid1)
//    if(val===false)
//    {
//        console.log("entering sales details")
//    this.fetchSalesDetails()
//    }
//    else
//    {
   // this.fetchSalesDetails()
    this.setState({opensales:val})
    this.setState({id:rid})
    this.setState({cus1:cst})
    this.setState({prd1:prd})
    this.setState({str1:str})
    this.setState({dat1:dte})
    this.setState({customerid1:customerid1})
    this.setState({productid:productid1})
    this.setState({storeid1:storeid1})
  // }
   
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
       
        const { custom, loading,open,customer,products,stores,opensales,cus1,prd1,str1,dat1,id,deletepopup,postsPerPage,salesPag,customerid1,productid,storeid1} = this.state
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
                                          
                      <SalesEditPopup open={opensales}custom={custom} cust={customer} prodct={products} stre={stores} returnpagefunction={this.returnpagefunction} customerName={cus1} productName={prd1} storeName={str1} soldDate={dat1} saleId={id} custid={customerid1} prodid={productid} storeid={storeid1} />
                    <Button content='New Sales' primary  onClick={this.createPopupFunction} />
                   
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>

                                <Table.HeaderCell >Customer</Table.HeaderCell>
                                <Table.HeaderCell >Product</Table.HeaderCell>
                                <Table.HeaderCell >Store</Table.HeaderCell>
                                <Table.HeaderCell >Date Sold</Table.HeaderCell>
                                <Table.HeaderCell >Edit</Table.HeaderCell>
                                <Table.HeaderCell >Delete</Table.HeaderCell>

                            </Table.Row>

                        </Table.Header>

                        <Table.Body>

                        
                            {salesPag.map((r) => (
                                
                                

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
                                        <Button color='yellow'  onClick={()=>this.editPopupFunction(true,r.id,r.customer.name,r.product.name,r.store.name,r.dateSold,r.customer.id,r.product.id,r.store.id)}><Icon name='edit' />Edit</Button>
                                    </Table.Cell>
                                    <Table.Cell collapsing textAlign='left'>
                                        <Button Icon='trash' onClick={()=>this.DeleteSalesDetails(true,r.id)} color='red'  ><Icon name='trash' />Delete</Button>
                                    </Table.Cell>
                                </Table.Row>

                            ))}




                        </Table.Body>

                        <Table.Footer>
                        <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                        <PaginationCustomer
            postsPerPage={postsPerPage}
            totalPosts={custom.length}
            parent="FetchSales"
            paginate={this.paginate}
          />
          </Table.HeaderCell>
                    </Table.Row>    
         
                        
                        </Table.Footer>
                    </Table>
                   
                </div>

            );
        }


    }
}
