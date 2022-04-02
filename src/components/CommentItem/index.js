import {formatDistanceToNow} from 'date-fns'

import './index.css'

const ContactItem = props => {
  const {commentDetails, toggleIsLiked, onDeleteComment} = props
  const {name, comment, isFavorite, id, classNames, date} = commentDetails

  const likedText = isFavorite ? 'liked-text' : ''
  const imageUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const timeOfComment = formatDistanceToNow(date)

  const nameLogo = name[0]
  const onClickLikeIcon = () => {
    toggleIsLiked(id)
  }

  const onClickDelete = () => {
    onDeleteComment(id)
  }
  return (
    <li className="comment-row">
      <div className="comments-bottom-card">
        <div className="comment-bottom-container">
          <h1 className={`name-logo ${classNames}`}>{nameLogo}</h1>
          <div className="userDetails-container">
            <div className="name-time-container">
              <h1 className="user-name">{name}</h1>

              <p className="time">{timeOfComment} ago</p>
            </div>
            <p className="comment-text">{comment}</p>
          </div>
        </div>
        <div className="icon-images-component">
          <div className="like-section">
            <img src={imageUrl} alt="like" className="like-image" />
            <button
              type="button"
              className={`like-button ${likedText}`}
              onClick={onClickLikeIcon}
            >
              Like
            </button>
          </div>
          <button
            type="button"
            testid="delete"
            onClick={onClickDelete}
            className="delete-button"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
              alt="delete"
              className="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default ContactItem
