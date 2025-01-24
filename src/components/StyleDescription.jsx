import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import '../styles/StyleDescription.css'

const StyleDescription = () => {
const { id } = useParams();
const [style, setStyle] = useState(null);
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState({ username: '', comment: '' });

  useEffect(() => {
    //Fetch the beers on load
    fetch(`https://ilias-imdbeer.torvalds.be/styles/${id}`)
      .then((response) => response.json())
      .then((data) => setStyle(data))
      .catch((error) => console.error('Error fetching style details:', error));
      //Fetch the comments on load
      fetch(`https://ilias-imdbeer.torvalds.be/styles/${id}/comments`)
  .then((response) => response.json())
  .then((data) => setComments(data))
  .catch((error) => console.error('Error fetching comments:', error));
  }, [id]);

  //Function to post comments
  const handleCommentSubmit = () => {
    fetch(`https://ilias-imdbeer.torvalds.be/styles/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment({ username: '', comment: '' });
      })
      .catch((error) => console.error('Error submitting comment:', error));
  };

  //Function to delete comments
  const handleCommentDelete = (commentId) => {
  fetch(`https://ilias-imdbeer.torvalds.be/styles/${id}/comments/${commentId}`, {
    method: 'DELETE',
  })
    .then(() => {
      setComments(comments.filter(comment => comment._id !== commentId));
    })
    .catch((error) => console.error('Error deleting comment:', error));
};
  if (!style) {
    return <div>Loading...</div>;
  }

  return (
    <div className='style-description'>
        <h1>{style.name}</h1>
        <h2><strong>Category</strong></h2>
        <p>{style.category}</p>
        <h2><strong>Overall Impression</strong></h2>
        <p>{style.overallimpression}</p>
        <h2><strong>ABV</strong> </h2>
        <p>Between {style.abvmin}% and {style.abvmax}%</p>
      
        <h2><strong>Aroma</strong></h2>
        <p>{style.aroma}</p>
        <h2><strong>Appearance</strong></h2>
        <p>{style.appearance}</p>
        <h2><strong>Flavor</strong> </h2>
        <p>{style.flavor}</p>
        <h2><strong>Mouthfeel</strong> </h2>
        <p>{style.mouthfeel}</p>
        <h2><strong>Comments</strong> </h2>
        <p>{style.comments}</p>
        <h2><strong>History</strong> </h2>
        <p>{style.history}</p>
        <h2><strong>Characteristic Ingredients</strong></h2>
        <p>{style.characteristicingredients}</p>
        <h2><strong>Style Comparison</strong> </h2>
        <p>{style.stylecomparison}</p>
        <h2><strong>Commercial Examples</strong> </h2>
        <p>{style.commercialexamples}</p>
        <h2><strong>Tags</strong> </h2>
        <p>{style.tags}</p>
      
      <h2 className='add_comment'>Add a Comment</h2>
   <div className="inputs"><input
    type="text"
    placeholder="Username"
    value={newComment.username}
    onChange={(e) => setNewComment({ ...newComment, username: e.target.value })}
  />
  <input
    type="text"
    placeholder="Comment"
    value={newComment.comment}
    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
  />
  <button onClick={handleCommentSubmit}>Submit</button>
  </div>

  <h2 className='comment_title'>Comments</h2>
{comments.length === 0 ? (
  <p className='comment'>No comments for this style</p>
) : (
  comments.map((comment) => (
    <div key={comment.id} className="comment">
      <p><strong>{comment.username}:</strong> {comment.comment}</p><p className='date'>{comment.createdAt}</p>
      <button className="delete-btn" onClick={() => handleCommentDelete(comment._id)}>
        <FaTrashAlt />  
      </button>
    </div>
)))}
</div>
    
  );
};


export default StyleDescription