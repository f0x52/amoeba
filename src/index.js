import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {json: {posts: []}};
        this.request = this.request.bind(this);
    }
    componentDidMount() {
        this.requestTimer = setInterval(
            () => this.request(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.requestTimer);
    }

    request() {
        fetch("src/spec.json")
            .then(response => response.json())
            .then(responseJson => {
                this.setState({json: responseJson});
            })
    }

    render() {
        let posts = this.state.json.posts.map((post, id) =>
            <Post key={id} id={id} user={post.user} image={post.image} desc={post.desc} interaction={post.interaction} />
        );
        return (
            <div className="posts">
                {posts}
            </div>
        );
    }
}

class Post extends React.Component {
    render() {
        return (
            <div id={this.props.id} className="post">
                <div className="userinfo">
                    <img src={this.props.user.image} />
                    <b>{this.props.user.name}</b>
                </div>
                <div className="postcontent">
                    <img src={this.props.image} alt={this.props.desc} />
                    <Interaction data={this.props.interaction} />
                </div>
            </div>
        );
    }
}

class Interaction extends React.Component {
    render() {
        this.props.data.comments.sort(function(a, b){return a.comment_id-b.comment_id})
        let comments = this.props.data.comments.map((comment) => 
            <span key={comment.comment_id}>
                <b>{comment.user}: </b> {comment.content}<br/>
            </span>
        );
        return (
            <div className="interaction">
                <b>{this.props.data.likes} likes</b><br/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path className="like" d="M414.9 24C361.8 24 312 65.7 288 89.3 264 65.7 214.2 24 161.1 24 70.3 24 16 76.9 16 165.5c0 72.6 66.8 133.3 69.2 135.4l187 180.8c8.8 8.5 22.8 8.5 31.6 0l186.7-180.2c2.7-2.7 69.5-63.5 69.5-136C560 76.9 505.7 24 414.9 24z"/></svg>
            <svg xmln="http://www.w3.org/2000/svg" viewBox="0 0 565 505"><path className="comment" d="M 282.321,30.543 C 143.177,30.543 30,123.411 30,237.638 c 0,53.808 25.966,105.899 71.669,144.42 -10.361,23.455 -24.186,45.703 -41.222,65.98 -3.941,4.767 -4.831,11.346 -2.225,16.94 2.606,5.594 8.232,9.122 14.397,9.122 45.608,0 84.192,-11.124 128.02,-36.931 21.262,3.337 63.247,7.564 81.681,7.564 139.112,0 252.321,-92.932 252.321,-207.158 C 534.642,123.411 421.433,30.543 282.321,30.543 Z" /></svg>
                <div className="comments">
                    {comments}
                </div>
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
