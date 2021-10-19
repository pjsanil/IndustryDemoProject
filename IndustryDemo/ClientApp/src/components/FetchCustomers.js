import axios from 'axios';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import CreateCustomer from './CreateCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import PaginationCustomer from "./PaginationCustomer";
import { Icon, Table, Button, Menu,NavItem,NavLink } from 'semantic-ui-react'
export class FetchCustomers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			custom: [],
			loading: false,
			deleted: false,
			popup:false,
			Id:0,
			name:'',
			address:'',
			editpopup:false,
			deletepopup:false,
			popup:false,
			currentPage: 1,
      postsPerPage: 5,
      customerPag: [],
	  customer:[]
	  };
		this.fetchCustomerDetails = this.fetchCustomerDetails.bind(this);
	}
	componentDidMount() {
		
		this.setState({
			currentPage: 1,
			postsPerPage: 5,
		  });


		this.fetchCustomerDetails();
	}
	componentWillUnmount() {
		console.log("componentwillunmount");
	}


	
	fetchCustomerDetails() {
		this.setState({
			loading: true,
		})
		
		axios.get('customers/getcustomers') 
			.then(({ data }) => {
				
				this.setState({
					customer: data,
					custom:data,
					loading: false,
				})
				
				const indexOfLastPage =this.state.currentPage * this.state.postsPerPage;
			  const indexOfFirstPost = indexOfLastPage - this.state.postsPerPage;
			  this.setState({
				customerPag: this.state.custom.slice(
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
       this.fetchCustomerDetails();
  };
		


	
	DeleteDetails=(value,rId)=> {
		console.log("entering deletedetails")
		this.setState({deletepopup:value})
		this.setState({Id:rId})
				
		if(value===false)
		{console.log("entering")
		 this.fetchCustomerDetails();
		}
		
	}
		createCustomerDetails=(value)=> {

			this.setState({popup:value})
              
               if(value===false)
               {console.log("entering")
                this.fetchCustomerDetails();
               }
     
	}
	CustomerPopup=(val)=>{
this.setState({editpopup:val})
if(val===false){

	this.fetchCustomerDetails()
}
	}

	EditCustomerDetails=(value,rId,rname,raddress)=> {

		this.setState({editpopup:value})
		this.setState({Id:rId})
		this.setState({name:rname})
		this.setState({address:raddress})
		   if(value===false)
		   {console.log("entering")
			this.fetchCustomerDetails();
		   }
 
}



	render() {
		console.log("render");
		const { custom,popup, loading,editpopup,deletepopup,Id,postsPerPage,customer,customerPag } = this.state//destructuring
		console.log(loading);
		 if (loading) {
		 	return (
		 		<div> loading.... </div>
		 	)
		 }
		 else {
			return (
				<div margin='25px'>
					<p>{loading}</p>
                    {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/create-customer">Fetch Customers</NavLink>
                </NavItem> */}

					 {/* <p><Link to='/CreateCustomer'>CreateCustomer</Link></p> */}
                     <EditCustomer open={editpopup} Id={this.state.Id} name={this.state.name} Address={this.state.address}  CustomerPopup={this.CustomerPopup}/>
					 <CreateCustomer open={popup} Id={this.state.Id} createCustomerDetails={this.createCustomerDetails}/>
					  <DeleteCustomer open={deletepopup} Id={Id} DeleteDetails={this.DeleteDetails}/>
					 <Button content='New Customer' primary onClick={()=>this.createCustomerDetails(true)} />

					<Table celled striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell >Name</Table.HeaderCell>
								<Table.HeaderCell >Address</Table.HeaderCell>
								<Table.HeaderCell >Actions</Table.HeaderCell>
								<Table.HeaderCell >Actions</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{customerPag.map((r) => (
								<Table.Row key={r.id}>
									<Table.Cell collapsing>
										{r.name}
									</Table.Cell>
									<Table.Cell collapsing>
										{r.address}
									</Table.Cell>
									{/* <Table.Cell collapsing textAlign='left'>
										<Button color='yellow'><Icon name='edit'
										/>Edit</Button>
									</Table.Cell> */}
                                   
									<Table.Cell collapsing textAlign='left'>
										<Button color='yellow' Icon name='edit' onClick=
											{() => this.EditCustomerDetails(true,r.id,r.name,r.address)}><Icon name='trash' />Edit</Button>
									</Table.Cell>

									<Table.Cell collapsing textAlign='left'>
										<Button Icon='trash' color='red' onClick=
											{() => this.DeleteDetails(true,r.id)}><Icon name='trash' />Delete</Button>
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
            parent="FetchCustomers"
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