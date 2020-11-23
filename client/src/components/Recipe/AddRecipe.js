import React from "react";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { ADD_RECIPE } from "../../quires";
import Error from "../Error";

const initialStete = {
  name: "",
  instructions: "",
  category: "Breakfast",
  description: "",
  username: "",
};

class AddRecipe extends React.Component {
  state = { ...initialStete };

  cleareState = () => {
    this.setState({ ...initialStete });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(({ data }) => {
      console.log(data);

      this.cleareState();

      this.props.history.push('/')
    });
  };

  validateForm = () => {
    const { name, category, description, instructions } = this.state;

    const isInvalid = !name || !category || !description || !instructions;

    return isInvalid;
  };

  componentDidMount() {
    // console.log(this.props);

    this.setState({
      username: this.props.session.getCurrentUser.username,
    });
  }

  render() {
    const { name, category, description, instructions, username } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, instructions, description, username }}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>

              <form
                className="form"
                onSubmit={(event) => this.handleSubmit(event, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Recipe Name"
                  onChange={this.handleChange}
                />
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Dinner">Dinner</option>
                </select>
                <input
                  type="text"
                  value={description}
                  name="description"
                  placeholder="Add descriptions"
                  onChange={this.handleChange}
                />
                <textarea
                  name="instructions"
                  onChange={this.handleChange}
                  placeholder="Add Instractions"
                  value={instructions}
                ></textarea>

                <button type="submit" disabled={loading || this.validateForm()}>
                  Submit
                </button>

                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(AddRecipe);
