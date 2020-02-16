import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from '../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    }

    componentDidMount() {
        var { match } = this.props;

        if (match) {
            var id = match.params.id;
            // callApi(`/products/${id}`, 'GET', null).then(res => {
            //     var data = res.data;
            //     this.setState({
            //         id: data.id,
            //         txtName: data.name,
            //         txtPrice: data.price,
            //         chkbStatus: data.status
            //     })
            // })
            this.props.onGetProduct(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = this.props;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chkbStatus: itemEditing.status
            })
        }
    }

    onChange = (event) => {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.setState({
            [name]: value
        })
    }

    onSave = (e) => {
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var { history } = this.props;

        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }

        e.preventDefault();
        if (id) {
            // callApi(`products/${id}`, 'PUT', {
            //     id: id,
            //     name: txtName,
            //     price: txtPrice,
            //     status: chkbStatus
            // }).then(res => {
            //     history.goBack();
            // })
            this.props.onUpdateProduct(product);
            history.goBack();
        } else {
            // callApi('products', 'POST', {
            //     name: txtName,
            //     price: txtPrice,
            //     status: chkbStatus
            // }).then(res => {
            //     history.goBack();
            // })
            this.props.onAddProduct(product);
            history.goBack();
        }
    }

    render() {

        var { txtName, txtPrice, chkbStatus } = this.state;

        return (

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên Sản Phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            name='txtName'
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input
                            type="text"
                            className="form-control"
                            name='txtPrice'
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái</label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="chkbStatus"
                                value={chkbStatus}
                                onChange={this.onChange}
                                checked={chkbStatus}
                            />
                            Còn Hàng
                            </label>
                    </div>
                    <Link type="submit" className="btn btn-danger mr-10" to='/product-list'>Trở về</Link>
                    <button type="submit" className="btn btn-primary">Lưu Lại</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        onGetProduct: (id) => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct: (product) => {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
