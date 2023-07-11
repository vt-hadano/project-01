import './styles.css';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useState, useEffect, useCallback } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
      })
    : posts;

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container" id="root">
      <div className="search-container">
        {!!searchValue && <h1>Search: {searchValue}</h1>}
        <TextInput handleChange={handleChange} searchValue={searchValue} />
      </div>
      {filteredPosts.length > 0 ? <Posts posts={filteredPosts} /> : <p>Não existem posts com esse resultado</p>}
      {!searchValue && (
        <div className="button-container">
          <Button onClick={loadMorePosts} text={'Load More'} disabled={noMorePosts} />
        </div>
      )}
    </section>
  );
};
// export class Home2 extends Component {

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 2,
//     searchValue: ''
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos
//     });

//   }

//   loadMorePosts = () => {
//     const {
//       page,
//       postsPerPage,
//       allPosts,
//       posts
//     } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({ posts, page: nextPage });
//   }

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   }

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;
//     const filteredPosts = !!searchValue ? allPosts.filter(post => {
//       return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
//     })
//       : posts;
//     return (
//       <section className='container' id='root'>
//         <div className='search-container'>
//           {!!searchValue && (
//             <h1>Search: {searchValue}</h1>
//           )}
//           <TextInput
//             handleChange={this.handleChange}
//             searchValue={searchValue}
//           />
//         </div>
//         {filteredPosts.length > 0 ?
//           (<Posts posts={filteredPosts} />)
//           : (<p>Não existem posts com esse resultado</p>)}
//         {!searchValue && (
//           <div className='button-container'>
//             <Button
//               onClick={this.loadMorePosts}
//               text={'Load More'}
//               disabled={noMorePosts}
//             />
//           </div>
//         )}
//       </section>
//     );
//   }
// }

export default Home;
