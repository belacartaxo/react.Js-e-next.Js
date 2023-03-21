import './App.css';
import { Component } from 'react';
import { PostCard } from './components/PostCard';

class App extends Component{
  state = {
      posts: []
  };

  componentDidMount() {
    this.loadPosts();
  }
  
  loadPosts = async ()=>{ //requisições posts
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) =>{ //para cada post pega um índice que corresponde a uma foto
      return { ...post, cover: photosJson[index].url}
    });

    this.setState({posts: postsAndPhotos});
  }

  render(){
  const { posts } = this.state;
    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <PostCard
              //passando os dados par o componente, esses dados ficam armazenado no objeto props
              key={post.id}
              title={post.title}
              body={post.body}
              cover={post.cover}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default App;
