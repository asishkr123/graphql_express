import React, { Component } from "react";

export default class GithubProfile extends Component {
  state = {
    repos: [],
    clientId: "47f3207f432090a24be1",
    clientSecret: "756a5c998d529fa2d73dca42b4a30f538318daf6",
    count: 3,
    sort: "created: asc"
  };
  componentDidMount() {
   
    const username =  this.props.match && this.props.match.params.username ? this.props.match.params.username : this.props.username
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      });
  }
  render() {
    const { repos } = this.state;

    return (
      <div className="col s5 offset-s1 card">
        <h3 className="center-align blue-text lighten-2-text">
          Latest Github repos
        </h3>
        {!this.props.username ? (
          <h5 className="center-align blue-text lighten-2-text">
            Add your github username to see repos
          </h5>
        ) : (
          <></>
        )}

        <div className="row">
          {repos.map(repo => (
            <div key={repo.id} className=" card col s12">
              <div className="card-content">
                <h4 className="center-align">
                  <a
                    href= {`https://github.com/${this.props.username}/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p
                  style={{ marginBottom: "20px" }}
                  className="center-align blue-lighten-2-text"
                >
                  {repo.description}
                </p>
                <div className="row">
                  <div className="col s4">
                    <span
                      style={{ fontStyle: "bold" }}
                      className="blue-text lighten-2-text"
                    >
                      Stars:{" "}
                    </span>
                    {repo.stargazers_count}
                  </div>
                  <div className="col s4">
                    <span
                      style={{ fontStyle: "bold" }}
                      className="blue-text lighten-2-text"
                    >
                      Watchres:{" "}
                    </span>
                    {repo.watchers_count}
                  </div>
                  <div className="col s4">
                    <span
                      style={{ fontStyle: "bold" }}
                      className="blue-text lighten-2-text"
                    >
                      Forks:{" "}
                    </span>
                    {repo.forks_count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
