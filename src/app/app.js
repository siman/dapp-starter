/**
 * Created by Alex Siman http://github.com/siman
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Table, Button, ButtonGroup, ButtonToolbar, MenuItem, Modal, Alert, HelpBlock } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel, Checkbox, InputGroup } from 'react-bootstrap';

import camelCase from 'lodash/camelCase';
import capitalize from 'lodash/capitalize';
import BigNumber from 'bignumber.js';

import abi from './contract.abi';

// TODO uncomment when you have your ABI file ready:
// const Contract = web3.eth.contract(abi);
// const contract = Contract.at(STARTER_CONTRACT_ADDRESS);

class RootApp extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillMount() {
    // this.load();
  }

  load() {
    let setState = this.setState.bind(this);

    contract.name((err, res) => {
      console.log(`contract.name err`, err);
      console.log(`contract.name res`, res ? res.toString() : res);
      
      setState({ name: res });
    })
  }

  onInputChange(e) {
    let name = e.target.value;
    // console.log(`name:`, name);
    this.setState({ name });
  }

  onSubmit(e) {
    // TODO Interact with smart contract here
  }

  render() {
    let { name } = this.state;
    let setState = this.setState.bind(this);
    let onInputChange = this.onInputChange.bind(this);
    let onSubmit = this.onSubmit.bind(this);

    return <div className="MainContent BountyContent">

      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand">
              Dapp Starter <span style={{fontWeight: 'normal'}}></span>
            </a>
          </div>
        </div>
      </nav>
      
      <p>
        TODO: Write your dapp
      </p>

      <p>
        <FormControl type="text" value={name}
          onChange={onInputChange} placeholder="Full name" />
      </p>

      <p className='lead'>
        <Button bsStyle="default" onClick={onSubmit}>Submit</Button> 
      </p>

    </div>;
  }
}

ReactDOM.render(<RootApp />, document.getElementById('app'));

