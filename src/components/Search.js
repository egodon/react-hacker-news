import React, { Component } from 'react';

const searchBtn = {
  color: '#fff'
}

class Search extends Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    const {
      value,
      onChange,
      onSubmit
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={value}
          onChange={onChange}
          ref={(node) => { this.input = node; }}
        />
        <button type="submit" style={searchBtn}>
          Search
        </button>
      </form>
    );
  } 
}

export default Search;