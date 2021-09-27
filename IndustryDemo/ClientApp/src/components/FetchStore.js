import axios from 'axios';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import CreateStore from './CreateStore';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';

import { Icon, Table, Button, Menu,NavItem,NavLink } from 'semantic-ui-react'

console.log("test stroe")
export class FetchStore extends Component {
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
			deletepopup:false

			
		};
		console.log("after construvtor")
		//this.fetchStoreDetails = this.fetchStore.bind(this);
		
	}
	componentDidMount() {
		console.log("componentdidmount")
		this.fetchStoreDetails();
	}
	// componentWillUnmount() {
	// 	console.log("componentwillunmount");
	// }


	fetchStoreDetails() {
        this.setState({
            loading: true,
        })
		

        axios.get('Stores/getStore') // not case sensitive   
        .then(({ data }) => {
			
			console.log("print store custom")
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


	
	DeleteDetails=(value,rId)=> {
		console.log("entering deletedetails")
		this.setState({deletepopup:value})
		this.setState({Id:rId})
		console.log("enteruig2" + this.state.Id)
console.log(this.state.editpopup)
		
		if(value===false)
		{console.log("entering")
		 this.fetchStoreDetails();
		}
		//.catch(err=>{console.log(err.response);})
	}
		createStoreDetails=(value)=> {

			this.setState({editpopup:value})
              
               if(value===false)
               {console.log("entering")
                this.fetchStoreDetails();
               }
     
	}


	EditStoreDetails=(value,rId,rname,raddress)=> {

		this.setState({editpopup:value})
		this.setState({Id:rId})
		this.setState({name:rname})
		this.setState({address:raddress})
		   if(value===false)
		   {console.log("entering")
			this.fetchStoreDetails();
		   }
 
}



	render() {
		console.log("render");
		const { custom,popup, loading,editpopup,deletepopup,Id } = this.state//destructuring
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
                     <EditStore open={editpopup} createStoreDetails={this.createStoreDetails} Id={this.state.Id} name={this.state.name} Address={this.state.address} EditStoreDetails={this.EditStoreDetails}/>
					 <CreateStore open={popup} Id={this.state.Id} createStoreDetails={this.createStoreDetails}/>
					  <DeleteStore open={deletepopup} Id={this.state.Id} DeleteDetails={this.DeleteDetails}/>
					 <Button content='New Store' primary onClick={()=>this.createStoreDetails(true)} />

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
							
							{custom.map((r) => (
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
											{() => this.EditStoreDetails(true,r.id,r.name,r.address)}><Icon name='trash' />Edit</Button>
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
									<Menu floated='right' pagination>
										<Menu.Item as='a' icon>
											<Icon name='chevron left' />
										</Menu.Item>
										<Menu.Item as='a'>1</Menu.Item>
										<Menu.Item as='a'>2</Menu.Item>
										<Menu.Item as='a'>3</Menu.Item>
										<Menu.Item as='a'>4</Menu.Item>
										<Menu.Item as='a' icon>
											<Icon name='chevron right' />
										</Menu.Item>
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