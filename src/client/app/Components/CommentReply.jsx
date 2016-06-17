import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const loginCustomStyle = {
  width : '40%',
  maxWidth : 'none',
}

export default class LoginDialogComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = { open:false, replyText : ''};
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({open:true})
  }

  handleClose(){
    this.setState({open:false})
  }

  handleReplyText(e){
    this.setState({replyText : e.target.value})
  }

  onSubmit(e){
    var replyText = this.state.replyText.trim()

    if(!replyText){
      return;
    }
    else{
      this.setState({passwordErrorText: '', userErrorText : ''})
      //need to grab the author before submitting!
      this.props.onCommentSubmit({author : 'author', reply : replyText})
      alert("Submitting Comment!")
    }
    
  }

  render(){
    const actions = [
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.onSubmit.bind(this)}
        />,
        <FlatButton
          label = "Cancel"
          primary = {true}
          keyboardFocused = {true}
          onTouchTap = {this.handleClose}
        />
      ];
    return (
      <div>
        <FlatButton label = "Reply" onTouchTap = {this.handleOpen} />
        <Dialog
          title = "Reply"
          actions = {actions}
          modal = {false}
          contentStyle = {loginCustomStyle}
          open = {this.state.open}
          onRequestClose = {this.handleClose}>
          <TextField
              hintText="Enter your reply here"
              multiLine = {true}
              errorText = {this.state.userErrorText}
              onChange = {this.handleReplyText.bind(this)}
            /><br />
        </Dialog>
      </div>


    );
  }
}