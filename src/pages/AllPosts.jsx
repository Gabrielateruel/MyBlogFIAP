import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/createClient';
import { Layout } from '../components/Layout';
//import './AllPosts.css'; // Importe um arquivo de estilo (por exemplo, AllPosts.css)

const PostsPerPage = 3;

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    client
      .getEntries({
        content_type: 'blogPostAula',
      })
      .then(function (entries) {
        console.log('posts', entries.items);
        setPosts(entries.items);
      });
  }, []);

  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / PostsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="all-posts-container">
        <h1>Todos os Posts</h1>
        <ul className="posts-list">
          {currentPosts.map((post) => (
            <div className="card mb-3" key={post.sys.id}>
              <div className="card-body">
                <h5 className="card-title">{post.fields.postTitle}</h5>
                <p className="card-text">{post.fields.postDescription}</p>
                <Link
                  to={`/post/${post.fields.postSlug}`}
                  className="read-more-link"
                >
                  Ver Post
                </Link>
              </div>
            </div>
          ))}
        </ul>

        <nav aria-label="Page navigation">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
              >
                <button
                  onClick={() => handleClick(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-1">
          <Link to="/" className="btn btn-primary">
            Voltar para Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};
