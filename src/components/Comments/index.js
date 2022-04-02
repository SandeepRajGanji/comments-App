import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
const initialUserDetails = []
// Write your code here
class Comments extends Component {
  state = {
    commentsCount: 0,
    name: '',
    comment: '',
    userDetails: initialUserDetails,
  }

  addComment = event => {
    event.preventDefault()
    const {commentsCount, name, comment} = this.state
    if (name !== '' && comment !== '') {
      const tempCount = commentsCount
      const initialClassName = initialContainerBackgroundClassNames
      const randomClassPicker = Math.ceil(
        Math.random() * initialClassName.length - 1,
      )

      const commentObject = {
        id: uuidv4(),
        name,
        comment,
        isFavorite: false,
        classNames: initialClassName[randomClassPicker],
        date: new Date(),
      }
      this.setState(prevState => ({
        userDetails: [...prevState.userDetails, commentObject],
        commentsCount: tempCount + 1,
        name: '',
        comment: '',
      }))
    }
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      userDetails: prevState.userDetails.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isFavorite: !eachComment.isFavorite}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {userDetails, commentsCount} = this.state
    const modifiedUserComments = userDetails.filter(
      eachComment => eachComment.id !== id,
    )
    const updatedCommentsCount = commentsCount
    console.log(commentsCount)
    this.setState({
      userDetails: modifiedUserComments,
      commentsCount: updatedCommentsCount - 1,
    })
  }

  getName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  getComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  render() {
    const {commentsCount, name, comment, userDetails} = this.state
    return (
      <div className="comments-container">
        <div className="comments-card">
          <div className="comments-card1">
            <form className="comments-input-details" onSubmit={this.addComment}>
              <h1 className="heading">Comments</h1>
              <p>Say something about 4.0 Technologies</p>
              <input
                type="text"
                value={name}
                className="name"
                placeholder="Your Name"
                onChange={this.getName}
              />
              <textarea
                className="comment-description"
                value={comment}
                rows="4"
                columns="50"
                placeholder="Your Comment"
                onChange={this.getComment}
              />
              <button type="submit" className="add-comment">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
          <div className="comment-details-container ">
            <p className="comments-count-text">
              <span className="class-comment-count">{commentsCount}</span>{' '}
              Comments
            </p>
            <ul>
              {userDetails.map(eachComment => (
                <CommentItem
                  key={eachComment.id}
                  commentDetails={eachComment}
                  isFavorite={eachComment.isFavorite}
                  toggleIsLiked={this.toggleIsLiked}
                  onDeleteComment={this.onDeleteComment}
                  classNames={initialContainerBackgroundClassNames}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Comments
