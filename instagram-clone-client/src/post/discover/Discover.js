import React, { Component } from "react";
import Slider from "react-slick";
import "./discover.css";
import { Card, Avatar, Button } from "antd";
import { getAllUsers, follow } from "../../util/ApiUtil";
import { ACCESS_TOKEN } from "../../common/constants";
import LoadingIndicator from "../../common/LoadingIndicator";

const { Meta } = Card;

class Discover extends Component {
  state = {
    isLoading: false,
    users: []
  };

  componentDidMount = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      this.props.history.push("/login");
    }

    this.loadAllUsers();
  };

  loadAllUsers = () => {
    this.setState({ isLoading: true });

    getAllUsers()
      .then(Response => this.setState({ users: Response, isLoading: false }))
      .catch(error => this.setState({ isLoading: false }));
  };

  handleOnCardClick = username => {
    this.props.history.push("/users/" + username);
  };

  startFollow = user => {
    const request = {follower:this.props.currentUser, following: user}
    follow(request).then(r => console.log(r));
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    var settings = {
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4
    };

    return (
      <div className="discover-container">
        <div className="title">
          <h3>Discover people</h3>
        </div>
        <Slider {...settings}>
          {this.state.users
            .filter(user => user.username !== this.props.currentUser.username)
            .map(user => (
              <div>
                <Card
                  hoverable
                  style={{ width: 230 }}
                  cover={
                    <div
                      onClick={() => this.handleOnCardClick(user.username)}
                      className="avatar-container"
                    >
                      <Avatar
                        className="avatar"
                        src={user.userProfile.profilePictureUrl}
                      />
                    </div>
                  }
                  actions={[
                    <Button type="primary" className="follow-btn" onClick={() => this.startFollow(user)}>
                      Follow
                    </Button>
                  ]}
                >
                  <Meta
                    onClick={() => this.handleOnCardClick(user.username)}
                    className="card-meta"
                    title={user.userProfile.displayName}
                    description={"@" + user.username}
                  />
                </Card>
              </div>
            ))}
        </Slider>
      </div>
    );
  }
}

export default Discover;
