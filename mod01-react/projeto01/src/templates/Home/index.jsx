import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts';
import {loadPosts} from '../../utils/load-post'
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component{
  state = {
      posts: [],
      allPosts:[],
      page: 0,
      postsPerPage: 10,
      searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }
  
  loadPosts = async ()=>{
    const {page, postsPerPage} = this.state
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts = () => { 
    const {
      page, 
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);
    this.setState({posts, page:nextPage})
  }

  handleChange = (e) =>{
    const {value} = e.target;
    this.setState({searchValue: value})
  }

  render(){
  const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? allPosts.filter(post =>{
    return post.title.toLowerCase().includes(searchValue.toLowerCase());
  }) : posts;
  //se tiver algum valor no search value vai acontecer a coisa x, e se não, a y

    return (
      <section className='container'>
        <div className='search-container'>
          {!!searchValue && (//se o search value for verdadeiro faço o seguinte:
          //!!- transforma o valor do searchvalue em um valor booleano
            <h1>Busca:</h1>
          )}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 &&( // se filtered posts for maior que zero faça isso:
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 &&( // se filtered posts for IGUAL A zero faça isso:
          <p className='filtered-posts'>Não existem posts</p>
        )}

        <div className="button-container">
          {!searchValue && (//se não tiver o searchvalue o botão será inserido
            <Button 
              text="Load More Posts" 
              onClick={this.loadMorePosts} /*esse onClick não é um evento, é um atributo que está sendo mandado para a props do componente*/
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

