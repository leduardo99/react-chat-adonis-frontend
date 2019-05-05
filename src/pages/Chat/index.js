/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Ws from "@adonisjs/websocket-client";
import api from "../../services/api";
import moment from "moment";

import { Layout, Menu, Comment, Avatar, Breadcrumb } from "antd";

import ChatForm from "../../components/Forms/ChatForm";
import CommentList from "./CommentList";

import "./styles.css";

const { Content, Footer } = Layout;

let ws = null;
let chat = null;

moment.locale("pt-br");

export default class Chat extends Component {
  state = {
    windowHeight: window.innerHeight,
    value: "",
    comments: [],
    user: {},
    usersOnline: 0
  };

  componentDidMount() {
    this.connectToWebSocket();

    window.addEventListener("resize", this.handleResize);
  }

  async componentWillMount() {
    const token = localStorage.getItem("token");
    const response = await api.get("/users", {
      headers: { Authorization: `bearer ${token}` }
    });

    this.setState({ user: response.data });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  connectToWebSocket = connected => {
    ws = Ws("ws://localhost:3333").connect();

    ws.on("open", socket => {
      console.log(socket);
      this.subscribeToChannel();
    });

    ws.on("close", socket => {
      console.log(socket);
    });

    ws.on("error", error => {
      console.error(error);
    });
  };

  subscribeToChannel = () => {
    chat = ws.subscribe("chat");

    chat.on("error", error => console.error(error));

    chat.on("message", message => {
      console.log(message);
      this.setState({
        value: message.value,
        comments: [
          ...this.state.comments,
          {
            author: message.author,
            avatar: (
              <Avatar style={{ backgroundColor: "#87d068" }} icon="user" />
            ),
            content: <p>{message.content}</p>,
            datetime: message.datetime
          }
        ]
      });
    });
  };

  handleResize = e => {
    this.setState({ windowHeight: window.innerHeight });
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    ws.getSubscription("chat").emit("message", {
      value: "",
      author: this.state.user.username,
      content: this.state.value,
      datetime: moment().fromNow()
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  handleLogout = e => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  render() {
    const minHeight = this.state.windowHeight - 172;
    const { comments, value } = this.state;

    return (
      <Layout>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item style={{ float: "right" }} onClick={this.handleLogout}>
            Sair
          </Menu.Item>
        </Menu>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb
            separator=">"
            style={{ marginTop: "5px", marginLeft: "15px" }}
          >
            <Breadcrumb.Item>Logado como</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.user.username}</Breadcrumb.Item>
          </Breadcrumb>
          <Comment
            content={
              <ChatForm
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                value={value}
              />
            }
          />
          <div
            style={{
              background: "#fff",
              padding: 24,
              minHeight: minHeight
            }}
          >
            <CommentList minHeight={minHeight} comments={comments} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          React Chat & Adonis.js ©2019 Criado por Luís
        </Footer>
      </Layout>
    );
  }
}
