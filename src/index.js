import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';

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
            <Post key={id} image={post.image} desc={post.desc} interaction={post.interaction} />
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
            <div id={this.props.id}>
                <img src={this.props.image} alt={this.props.desc} />
                <Interaction data={this.props.interaction} />
            </div>
        );
    }
}

class Interaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {likes: props.data.likes, comments: props.data.comments};
    }

    render() {
        this.state.comments.sort(function(a, b){return a.date-b.date})
        let comments = this.state.comments.map((comment) => 
            <span key={comment.id}>
                <b>{comment.user}: </b> {comment.content}<br/>
            </span>
        );
        return (
            <div>
                Likes: {this.state.likes}<br/>
                Comments: {this.state.comments.length}
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
