import React from 'react';
import { connect } from 'react-redux';
import { convertToRaw, SelectionState, EditorState } from 'draft-js';
import { style } from 'typestyle';
import CommentForm from '../../components/CommentForm';

const commentListClass = style(
  {
    paddingBottom: '15px',
    color: 'rgb(69, 71, 82)',
    
    $nest: {
      ul: {
        listStyle: 'none',
        padding: 0,

      },
      li: {
        padding: '15px',
        border: '2px solid #eef',
        borderRadius:'5px',
        width:'400px'
      },

    },
  }
);
const paragraphClass = style({
  fontSize: '14px',
  paddingRight: '5px',
  display: 'inline-block',
  
});
const editButtonClass = style(
  paragraphClass,
  {
    color: 'rgb(88,128,199)',
  }
);

class CommentsList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.selectComment = this.selectComment.bind(this);
  }

  selectComment(comment) {
    const { editorState, setEditorState } = this.props;

    const selectionState = SelectionState.createEmpty(comment.blockKey);
    const updatedSelection = selectionState.merge({
      anchorOffset: comment.offset,
      focusKey: comment.blockKey,
      focusOffset: (comment.offset + comment.length),
      hasFocus: false,
      isBackward: false,
    });
    const newEditorState = EditorState.forceSelection(editorState, updatedSelection);// editorState.set('selection', updatedSelection);
    setEditorState(newEditorState);
  }

  render() {
    const { editorState, commentIsBeingEdited } = this.props;

    const contentState = editorState.getCurrentContent();
    const rawState = convertToRaw(contentState);

    const comments = [].concat(...rawState.blocks.map((block, blockIndex) => {
      if (block.entityRanges.length < 1) {
        return [];
      }

      return block.entityRanges.map((entity) => {
        const comment = rawState.entityMap[entity.key];
        return {
          blockIndex: blockIndex + 1,
          blockKey: block.key,
          entityKey: entity.key,
          commentText: comment.data.comment,
          length: entity.length,
          offset: entity.offset,
        };
      });
    }));

    const listItems = comments.map((comment, index) => (
      <li key={index}>
        <button className={editButtonClass} onClick={() => { this.selectComment(comment); }}>Refer the comment in document: </button>
        
           {comment.commentText}
      </li>
      ));

    return (
      <div>
        { commentIsBeingEdited &&
          <CommentForm />
        }
        <div className={commentListClass}>
          <h3>Comments </h3>
          <ul>
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editorState: state.getIn(['editor', 'editorState']),
    commentIsBeingEdited: state.getIn(['editor', 'commentIsBeingEdited']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditorState: (newState) => {
      dispatch({
        type: 'SET_EDITOR_STATE',
        editorState: newState,
      });
    },
    editComment: (commentText) => {
      dispatch({
        type: 'EDIT_COMMENT',
        commentText,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
