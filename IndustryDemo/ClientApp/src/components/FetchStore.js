import axios from 'axios';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import CreateStore from './CreateStore';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';
import PaginationCustomer from "./PaginationCustomer";
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
			Aaddress:'',
			editpopup:false,
			deletepopup:false,
			currentPage: 1,
			postsPerPage: 5,
			storePag: [],
			
		};
		console.log("after construvtor")
		//this.fetchStoreDetails = this.fetchStore.bind(this);
		
	}
	componentDidMount() {
		this.setState({
			currentPage: 1,
			postsPerPage: 5,
		  });

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


				const indexOfLastPage =this.state.currentPage * this.state.postsPerPage;
			    const indexOfFirstPost = indexOfLastPage - this.state.postsPerPage;
			          this.setState({
						             storePag: this.state.custom.slice(
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
       this.fetchStoreDetails();
  };
	
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
		console.log("tset store edit from fetch")
		
		this.setState({editpopup:value})
		this.setState({Id:rId})
		this.setState({name:rname})
		this.setState({address:raddress})
		console.log(this.state.address)
		
		   if(value===false)
		   {console.log("entering")
			this.fetchStoreDetails();
		   }
 
}



	render() {
		console.log("render");
		const { custom,popup, loading,editpopup,deletepopup,Id,postsPerPage,storePag } = this.state//destructuring
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
					
                     <EditStore open={editpopup}  Id={this.state.Id} name={this.state.name} address={this.state.address} EditStoreDetails={this.EditStoreDetails}/>
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
							
							{storePag.map((r) => (
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
						<PaginationCustomer
            postsPerPage={postsPerPage}
            totalPosts={custom.length}
            parent="FetchProduct"
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