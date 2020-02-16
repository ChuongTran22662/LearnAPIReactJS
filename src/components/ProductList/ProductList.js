import React, { Component } from 'react';

class ProductList extends Component {
    render() {
        return (
            <div className="panel-body">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã SP</th>
                            <th>Tên SP</th>
                            <th>Giá SP</th>
                            <th>Trạng Thái</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductList;
