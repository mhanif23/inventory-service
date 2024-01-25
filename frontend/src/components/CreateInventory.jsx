import React, { Component } from "react";
import InventoryService from "../services/InventoryService";

class CreateInventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama_barang: "",
      jumlah: '',
      harga_satuan: '',
      lokasi: "Bandung",
      deskripsi: "",
    };

    this.changeNamaBarang = this.changeNamaBarang.bind(this);
    this.changeJumlah = this.changeJumlah.bind(this);
    this.changeHargaSatuan = this.changeHargaSatuan.bind(this);
    this.changeLokasi = this.changeLokasi.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdateItem = this.saveOrUpdateItem.bind(this);
  }

  componentDidMount() {
    if (this.state.id !== "_add") {
      InventoryService.getInventoryById(this.state.id).then((res) => {
        let item = res.data;
        this.setState({
          nama_barang: item.nama_barang,
          jumlah: item.jumlah,
          harga_satuan: item.harga_satuan,
          lokasi: item.lokasi,
          deskripsi: item.deskripsi,
        });
      });
    }
  }

  saveOrUpdateItem = (e) => {
    e.preventDefault();
    let item = {
      nama_barang: this.state.nama_barang,
      jumlah: this.state.jumlah,
      harga_satuan: this.state.harga_satuan,
      lokasi: this.state.lokasi,
      deskripsi: this.state.deskripsi,
    };
    console.log("inventory => " + JSON.stringify(item));

    if (this.state.id === "_add") {
      InventoryService.createInventory(item).then((res) => {
        this.props.history.push("/");
      });
    } else {
      InventoryService.updateInventory(item, this.state.id).then((res) => {
        this.props.history.push("/");
      });
    }
  };

  changeNamaBarang = (event) => {
    this.setState({ nama_barang: event.target.value });
  };

  changeJumlah = (event) => {
    this.setState({ jumlah: parseInt(event.target.value)});
  };

  changeHargaSatuan = (event) => {
    this.setState({ harga_satuan: parseInt(event.target.value)});
  };

  changeLokasi = (event) => {
    this.setState({ lokasi: event.target.value });
  };

  changeDeskripsi = (event) => {
    this.setState({ deskripsi: event.target.value });
  };

  cancel() {
    this.props.history.push("/");
  }

  getTitle() {
    return this.state.id === "_add" ? (
      <h3 className="text-center">Add Inventory Item</h3>
    ) : (
      <h3 className="text-center">Update Inventory Item</h3>
    );
  }

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nama Barang: </label>
                    <input
                      placeholder="Nama Barang"
                      name="nama_barang"
                      className="form-control"
                      value={this.state.nama_barang}
                      onChange={this.changeNamaBarang}
                    />
                  </div>
                  <div className="form-group">
                    <label> Jumlah: </label>
                    <input
                      type="number"
                      placeholder="Jumlah"
                      name="jumlah"
                      className="form-control"
                      value={this.state.jumlah}
                      onChange={this.changeJumlah}
                    />
                  </div>
                  <div className="form-group">
                    <label> Harga Satuan: </label>
                    <input
                      type="number"
                      placeholder="Harga Satuan"
                      name="harga_satuan"
                      className="form-control"
                      value={this.state.harga_satuan}
                      onChange={this.changeHargaSatuan}
                    />
                  </div>
                  <div className="form-group">
                    <label> Lokasi: </label>
                    <select
                      name="lokasi"
                      className="form-control"
                      value={this.state.lokasi}
                      onChange={this.changeLokasi}
                    >
                      <option value="Bandung">Bandung</option>
                      <option value="Jakarta">Jakarta</option>
                      <option value="Denpasar">Denpasar</option>
                      <option value="Manokwari">Manokwari</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label> Deskripsi: </label>
                    <textarea
                      placeholder="Deskripsi"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changeDeskripsi}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateItem}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateInventory;
