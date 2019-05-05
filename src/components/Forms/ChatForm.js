import React, { Component } from "react";

import { Input } from "antd";

const Search = Input.Search;

class ChatForm extends Component {
  render() {
    return (
      <Search
        placeholder="Insira sua mensagem"
        enterButton="Enviar"
        size="large"
        value={this.props.value}
        onSearch={this.props.onSubmit}
        onChange={this.props.onChange}
      />
    );
  }
}

export default ChatForm;
