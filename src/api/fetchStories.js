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

class fetchStories {

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    this.setState(updateSearchTopStoriesState(hits, page));
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    const onFrontPage = searchTerm.length > 0 ? false : true;
    let tags = onFrontPage ? 'front_page' : '';

    this.setState({
      isLoading: true,
      onFrontPage,
    });

    return fetch(`${PATH_BASE}${PATH_SEARCH}?${PATH_TAGS}${tags}&${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`, { mode: 'cors' })
      .then(response => response.json())
      .catch(e => console.log(e));
  }
}

export default fetchStories;
