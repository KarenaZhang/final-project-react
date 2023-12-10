import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentPage.css';
import Navigation from './elements/Navigation';
import { Link } from "@reach/router";

const CommentPage = ( )  => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // 用于加载评论
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    let username = localStorage.getItem("userName")
    try {
        const response = await axios.get(`http://localhost:8080/comment-records-user/${username}`);
        console.log(response.data)
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    // try {
    //   const response = await axios.get('http://localhost:8080/comment-records');
    //   setComments(response.data);
    // } catch (error) {
    //   console.error('Error fetching comments:', error);
    // }
  };



  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  

  return (
    <div className="comment-container">
      
      <div>
        Comments Numbers:{comments.length}

      </div>
      <div>
        {comments.map((commentObj, index) => (
          <div key={index} className="comment">
            <p><strong className="comment-username">{commentObj.username}</strong>   commented at {formatDate(commentObj.comment_time)} Movie Id {commentObj.movie_id}:</p>
            
            <p>{commentObj.comment}</p>
            <Link to={'/details/'+commentObj.movie_id}>Link</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;
