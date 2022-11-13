import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import AddPostComponent from "./components/AddPostComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import axios from "axios";

const BASE_API_URL = `https://jsonplaceholder.typicode.com`;

function App() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        let response = await axios.get(`${BASE_API_URL}/posts`);
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  
   const deletePost = async (id) => {
    try {
      await axios.delete(`${BASE_API_URL}/posts/${id}`);
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <h1>Daftar Postingan</h1>
      <p>by Kelompok 11</p>
      <Button className="mb-4" variant="primary" onClick={handleShow}>
        Tambahkan postingan
      </Button>
      <AddPostComponent show={show} modal={handleClose} posts={posts} setPosts={setPosts} />
      {posts.map((post) => {
        return (
          <Card className="mb-3">
            <Card.Body key={post.id}>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <Button variant="danger" onClick={() => deletePost(post.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}

export default App;
