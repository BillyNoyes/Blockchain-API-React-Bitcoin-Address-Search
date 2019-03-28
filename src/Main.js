import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
        btcAddress: "",
        btcBalance: '',
        errorMsg: "",
        transactions: [],
        isLoading: true,
        errors: null
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      btcBalance: '',
      errorMsg: ""
    })

    const btcAddress = this.state.btcAddress;

    if (btcAddress.length !== 34) {
      this.setState({
        errorMsg: "BTC Address has to be 34 characters"
      })
      return;
    }

    var urlBalance = "https://blockchain.info/q/addressbalance/" + btcAddress + "";
    fetch(urlBalance)
      .then(res => res.json())
      .then(json => {
          this.setState({
              btcBalance: "BTC Balance: " + json / 100000000
          })
      });

      var urlTransactions = "https://cors-anywhere.herokuapp.com/https://blockchain.info/rawaddr/" + btcAddress + "";
      axios.get(urlTransactions)
      .then(response => console.log(response))
      .then(response =>
        response.data.txs.inputs.prev_out.map(transaction => ({
          value: `${transaction.inputs.prev_out.value}`,
          addr: `${transaction.inputs.prev_out.addr}`
        }))
        )
        // Let's make sure to change the loading state to display the data
        .then(transactions => {
          this.setState({
            transactions,
            isLoading: false
          });
        })
        // We can still use the `.catch()` method since axios is promise-based
        .catch(error => this.setState({ error, isLoading: false }));

  }

  handleInputChange = (event) => {
    event.preventDefault()

    this.setState({
      btcAddress: event.target.value
    })
  }

  render() {
    const {btcAddress} = this.state
    const {btcBalance} = this.state
    const {errorMsg} = this.state
    const { isLoading, transactions } = this.state;
    return (
      <div id="main">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Enter BTC Address" name="btcAddress"  onChange={this.handleInputChange} autoFocus/>
          <button onClick={this.handleSubmit}>Search</button>
        </form>
        <h3>{errorMsg}</h3>
        <br />
        <h4>{btcAddress}</h4>
        <h4>{btcBalance}</h4>

        {!isLoading ? (
          transactions.map(transaction => {
          const {value, addr } = transaction;
          return (
          <div>
            <p>Value: {value}</p>
            <p>Sent to address: {addr}</p>
            <hr />
          </div>
        );
           })
         ) : (
           <p>Loading...</p>
         )}

      </div>



    )
  }
}

export default Main
