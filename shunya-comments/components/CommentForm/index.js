import React from 'react';
import { connect } from 'react-redux';
import { style } from 'typestyle';
import * as csstips from 'csstips';
import { addOrEditComment } from '../../utils/editorStateHelpers';



const wrapperClass = style(
  csstips.vertical,
  {
    
    overflow: 'hidden',
    marginBottom: '15px',
    
  }
);

const inputClass = style(
  csstips.flex,
  {
    
    padding: '10px 15px',
    widht: '100%',
  }
);

const buttonClass = style(
  csstips.content,
  {
    backgroundColor: 'rgb(88,128,199)',
    color: 'white',
    marginTop:'15px',
    padding: '7px 5px',
    float: 'right',
    width:'100px',
    
    
  }
  
 

);

class CommentForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.onLinkInputKeyDown = this.onLinkInputKeyDown.bind(this);
  }

  componentDidMount() {
    this.newCommentText.focus();
  }

  onLinkInputKeyDown(e) {
    switch (e.which) {
      case 13:
        this.save();
        break;
      default:
        break;
    }
  }

  save() {
    const { editorState, saveComment } = this.props;
    const newEditorState = addOrEditComment(editorState, this.newCommentText.value);
    console.log('editor state:', newEditorState);
    saveComment(newEditorState);
  }

  render() {
    const { commentText, commentIsBeingEdited } = this.props;
    return (
      <div className={wrapperClass}>
        <input
          onKeyDown={this.onLinkInputKeyDown}
          className={inputClass} type="text"
          ref={(c) => { this.newCommentText = c; }}
          defaultValue={commentText}
        />
        
        <button className={buttonClass} onClick={(e) => { this.save(e); }}>Comment</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editorState: state.getIn(['editor', 'editorState']),
    commentIsBeingEdited: state.getIn(['editor', 'commentIsBeingEdited']),
    commentText: state.getIn(['editor', 'commentText']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveComment: (newState) => {
      dispatch({
        type: 'SAVE_COMMENT',
        editorState: newState,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
