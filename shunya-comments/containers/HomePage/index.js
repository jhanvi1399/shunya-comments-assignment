import React from 'react';
import { style } from 'typestyle';
import TextEditor from '../../components/TextEditor';
import CommentsList from '../../components/CommentsList';


const wrapperClass = style({
  
  backgroundColor: 'white',
  padding: '15px',
  fontFamily: 'Arial, Helvetica, sans-serif',
  textAlign:'justify',
  display:'flex',
  alignItems:'center',
  
  

});

const blockClass = style({
  width: '600px',
  textAlign:'justify',
  
  margin: '30px',
  padding: '30px',
  backgroundColor: '#fff',
  marginBottom: '15px',
 // boxShadow: '-2px 2px 3px 0px rgba(0,0,0,0.51)',
 // borderRadius: '3px',
  display:'inline-flex',
  
  border:'solid',
  
  
  
});

const titleClass = style({
  textAlign: 'center',
  fontSize: '16px',
});

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={wrapperClass}>
        <div className={blockClass}>
        <div className={titleClass}>
          <TextEditor />
          </div>

          
        </div>

        <div className={blockClass}>
          
        <CommentsList />
          

          
        </div>

        
       
      </div>
    );
  }
}
