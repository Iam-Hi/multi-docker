import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data })
  }

  renderSeenIndexes() {
    const { seenIndexes } = this.state;
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const { values } = this.state;
    const entries = [];
    Object.keys(values).forEach(valueKey => entries.push(
      <div key={valueKey}>
        For index {valueKey} I caluclated: {values[valueKey]}
      </div>
    ));

    return entries;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
          value={this.state.index}
          onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3> indexes i have seen </h3>
        {this.renderSeenIndexes()}
        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}
