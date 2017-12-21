import React, { Component } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import Search from './components/Search';
import { Button } from './components/Button';

import fetch from 'isomorphic-fetch';

import {
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
  PATH_TAGS,
  } from './constants';

const updateSearchTopStoriesState = (hits, page) => (prevState) => {
  const { searchKey, results } = prevState;
  
  const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];

  const updatedHits = [
    ...oldHits,
    ...hits
  ];

  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };  
}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: '',
      onFrontPage: true,
      error: null,
      isLoading: false,
    };

    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    const onFrontPage = searchTerm.length > 0 ? false : true;
    let tags = onFrontPage ? 'front_page' : '' ;
    
    this.setState({ 
      isLoading: true,
      onFrontPage,
    });

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PATH_TAGS}${tags}&${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`, {mode: 'cors'})
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => console.log(e));
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm);
    
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }
  
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading,
    } = this.state;
    
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    
    return (
      <div className="page">
        <div className="interactions">
          <Header
              value={searchTerm}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
          />
        </div>
        { error
          ? <div className="interactions">
              <p>Something went wrong.</p>
            </div>
          : <Table 
            list={list}
            />
        }
        <div className="interactions">
            <ButtonWithLoading
              isLoading={isLoading}
              onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
              More
            </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

const Loading = () => (
  <div className="spinner"></div>
);

const withLoading = (Component) => ({ isLoading, ...rest }) => (
  isLoading
  ? <Loading />
  : <Component { ...rest } /> 
);

const ButtonWithLoading = withLoading(Button);

export {
  Button,
  Search, 
  Table,
}

export default App;