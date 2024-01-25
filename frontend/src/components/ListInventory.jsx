import React, { Component } from 'react';
import InventoryService from '../services/InventoryService';

class ListInventory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(id) {
        InventoryService.deleteInventory(id)
            .then(() => {
                this.setState(prevState => ({
                    items: prevState.items.filter(item => item.id !== id)
                }));
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    }

    viewItem(id) {
        this.props.history.push(`/view/${id}`);
    }

    editItem(id) {
        this.props.history.push(`/${id}`);
    }

    handleFetchError = (error) => {
        console.error('Error fetching inventories:', error);
      }
    
      componentDidMount() {
        InventoryService.getInventories()
          .then((res) => {
            this.setState({ inventories: res.data });
          })
          .catch(this.handleFetchError);
      }

    addItem() {
        this.props.history.push('/add/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Inventory List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addItem}>Add Item</button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                                <th>Harga Satuan</th>
                                <th>Lokasi</th>
                                <th>Deskripsi</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nama_barang}</td>
                                        <td>{item.jumlah}</td>
                                        <td>{item.harga_satuan}</td>
                                        <td>{item.lokasi}</td>
                                        <td>{item.deskripsi}</td>
                                        <td>
                                        <div className="d-flex justify-content-center">
                                            <button
                                                onClick={() => this.viewItem(item.id)}
                                                className="btn btn-info mx-1"
                                                >
                                                View
                                                </button>
                                                <button
                                                onClick={() => this.editItem(item.id)}
                                                className="btn btn-info mx-1"
                                                >
                                                Update
                                                </button>
                                                <button
                                                onClick={() => this.deleteItem(item.id)}
                                                className="btn btn-danger mx-1"
                                                >
                                                Delete
                                                </button>
                                            </div>
                                            </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListInventory;
