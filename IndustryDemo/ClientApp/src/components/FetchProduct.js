import axios from 'axios';
import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import PaginationCustomer from "./PaginationCustomer";
import { Icon, Table, Button, Menu,NavItem,NavLink } from 'semantic-ui-react'
export class FetchProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			custom: [],
			loading: false,
			deleted: false,
			popup:false,
			Id:0,
			name:'',
			price:0,
			editpopup:false,
			deletepopup:false,
			currentPage: 1,
             postsPerPage: 5,
			 productPag: [],
		};
		this.fetchProductDetails = this.fetchProductDetails.bind(this);
	}
	componentDidMount() {
		this.setState({
			currentPage: 1,
			postsPerPage: 5,
		  });

		this.fetchProductDetails();
	}
	componentWillUnmount() {
		console.log("componentwillunmount");
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
					custom: data,
					loading: false,
				})


				const indexOfLastPage =this.state.currentPage * this.state.postsPerPage;
			    const indexOfFirstPost = indexOfLastPage - this.state.postsPerPage;
			          this.setState({
						             productPag: this.state.custom.slice(
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
       this.fetchProductDetails();
  };
	
	deleteProductDetail=(value,rId)=> {

		this.setState({deletepopup:value})
		this.setState({Id:rId})
		console.log("Sanil delete id")
		console.log(rId)
		console.log(value)
		if(value===false)
		{console.log("entering")
		 this.fetchProductDetails();
		}

	}
		createProductDetails=(value)=> {

			this.setState({popup:value})
              
               if(value===false)
               {console.log("entering")
                this.fetchProductDetails();
               }
     
	}


	EditProductDetails=(value,rId,rname,rprice)=> {

		this.setState({editpopup:value})
		this.setState({Id:rId})
		this.setState({name:rname})
		this.setState({price:rprice})
		   if(value===false)
		   {console.log("entering")
			this.fetchProductDetails();
		   }
 
}



	render() {
		console.log("render");
		const { custom,popup, loading,editpopup,deletepopup,postsPerPage,productPag } = this.state//destructuring
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
                     <EditProduct open={editpopup} Id={this.state.Id} name={this.state.name} Address={this.state.price} EditProductDetails={this.EditProductDetails} createProductDetails={this.createProductDetails}/>
					 <CreateProduct open={popup} Id={this.state.Id} createProductDetails={this.createProductDetails}/>
					 <DeleteProduct open={deletepopup} Id={this.state.Id} deleteProductDetail={this.deleteProductDetail}/>
					 <Button content='New Product' primary onClick={()=>this.createProductDetails(true)} />

					<Table celled striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell >Name</Table.HeaderCell>
								<Table.HeaderCell >Price</Table.HeaderCell>
								<Table.HeaderCell >Actions</Table.HeaderCell>
								<Table.HeaderCell >Actions</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{productPag.map((r) => (
								<Table.Row key={r.id}>
									<Table.Cell collapsing>
										{r.name}
									</Table.Cell>
									<Table.Cell collapsing>
										{r.price}
									</Table.Cell>
									{/* <Table.Cell collapsing textAlign='left'>
										<Button color='yellow'><Icon name='edit'
										/>Edit</Button>
									</Table.Cell> */}
                                   
									<Table.Cell collapsing textAlign='left'>
										<Button color='yellow' Icon name='edit' onClick=
											{() => this.EditProductDetails(true,r.id,r.name,r.price)}><Icon name='trash' />Edit</Button>
									</Table.Cell>

									<Table.Cell collapsing textAlign='left'>
										<Button Icon='trash' color='red' onClick=
											{() => this.deleteProductDetail(true,r.id)}><Icon name='trash' />Delete</Button>
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