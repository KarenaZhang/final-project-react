import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentPage.css';
import Navigation from './elements/Navigation';

const CommentPage = ({ movieId })  => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // 用于加载评论
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
        const response = await axios.get(`https://final-project-node-d408.onrender.com/comment-records-movie/${movieId}`);
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

  const handleSubmit = async () => {

    // const { movieId } = this.props; 
    // console.log(movieId)
    // let comment = 
    const now = new Date();
    const commentTime = now.toLocaleString();
    let username = localStorage.getItem("userName")
    try {
      await axios.post('https://final-project-node-d408.onrender.com/add-comment-record', { username,comment,commentTime,movieId});
      fetchComments(); // 重新加载评论
      setComment(''); // 清空输入框
    //   console.log('11')
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  

  return (
    <div className="comment-container">
      <h2>Comments</h2>
      <input 
        type="text"
        className="comment-input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..." 
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>

      <div>
        {comments.map((commentObj, index) => (
          <div key={index} className="comment">
            <p><strong className="comment-username">{commentObj.username}</strong>   commented at {formatDate(commentObj.comment_time)}:</p>
            <p>{commentObj.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentPage;
