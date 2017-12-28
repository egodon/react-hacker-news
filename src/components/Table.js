import React, { Component } from 'react';
import { Sort } from './Sort';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';


const largeColumn = {
  width: '40%',
};

const smallColumn = {
  width: '10%',
};

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, [l => l.author.toLowerCase()]),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);    
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list } = this.props;

    const {
      sortKey,
      isSortReverse,
    } = this.state;
    
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse
      ? sortedList.reverse()
      : sortedList;

    return (
      <div className="table">
        <div className="table-header">
          <span style={ largeColumn }>
            <Sort
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Title
            </Sort>
          </span>
          <span style={ smallColumn }>
            <Sort
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}              
            >
              Author
            </Sort>
          </span>
          <span style={ smallColumn }>
            <Sort
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}              
            >
              Comments
            </Sort>
          </span>
          <span style={ smallColumn }>
            <Sort
              sortKey={'POINTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}              
            >
              Points
            </Sort>
          </span>
        </div>
        {reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn} className="title">
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={smallColumn}>
              {item.author}
            </span>
            <span style={smallColumn}>
              <a href={`https://news.ycombinator.com/item?id=${item.objectID}`}>{item.num_comments}</a>
            </span>
            <span style={smallColumn}>
              {item.points}
            </span>
          </div>
        )}
      </div>
    );
  };
};

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number,
    })
  ).isRequired
};

export default Table;