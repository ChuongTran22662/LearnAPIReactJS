import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList'
import ProductItem from '../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actFetchProductsRequest, actDeleteProductRequest } from '../../actions/index'

class ProductListPage extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAllProducts();
    }

    onDelete = (id) => {
        this.props.onDeleteProduct(id);
    }

    findIndex = (products, id) => {
        var result = -1;
        products.forEach((product, index) => {
            if (product.id === id) {
                result = index;
            }
        })
        return result;
    }

    // onDelete = (id) => {
    //     var { products } = this.state;
    //     callApi(`products/${id}`, 'DELETE', null).then(res => {
    //         if (res.status === 200) {
    //             var index = this.findIndex(products, id);
    //             if (index !== -1) {
    //                 products.splice(index, 1);
    //                 this.setState({
    //                     products: products
    //                 })
    //             }
    //         }
    //     })
    // }

    render() {

        var { products } = this.props;

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to="/product/add" type="button" className="btn btn-info mb-10">Thêm Sản Phẩm</Link>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Danh Sách Sản Phẩm</h3>
                    </div>
                    <ProductList>
                        {this.showProducts(products)}
                    </ProductList>
                </div>
            </div>
        );
    }

    showProducts = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        product={product}
                        key={index}
                        index={index}
                        onDelete={this.onDelete}
                    />
                )
            })
        }
        return result;
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest())
        }, onDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
