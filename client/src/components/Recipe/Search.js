import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";

import { SEARCH_RECIPES } from "../../quires";

class Search extends React.Component {
  state = {
    searchResults: [],
  };

  handleChange = ({ searchRecipes }) => {
    this.setState({
      searchResults: searchRecipes,
    });
  };

  render() {
    const { searchResults } = this.state;

    return (
      <ApolloConsumer>
        {(client) => (
          <div className="App">
            <input
              type="search"
              placeholder="Search"
              onChange={async (event) => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_RECIPES,
                  variables: { searchTerm: event.target.value },
                });
                this.handleChange(data);
              }}
            />

            <ul>
              {searchResults.map((recipe) => (
                <li key={recipe._id}>
                  <Link to={`/recipes/${recipe._id}`}>
                    <h4>{recipe.name}</h4>
                  </Link>
                  <h4>{recipe.likes}</h4>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Search;
