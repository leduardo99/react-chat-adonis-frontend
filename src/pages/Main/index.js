/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Redirect } from "react-router-dom";
import api from "../../services/api";

import { Form, Icon, Input, Button, Modal } from "antd";

import RecoveryForm from "../../components/Forms/RecoveryForm";

import "./styles.css";
import logo from "../../assets/logo.svg";

class MainForm extends React.Component {
  state = {
    loading: false,
    visible: false,
    confirmLoading: false
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });

        const { email, password } = values;

        try {
          const response = await api.post(`login`, { email, password });
          const { message } = response.data;

          if (message)
            return Modal.error({
              title: "Erro ao realizar o login",
              content: message
            });

          this.setState({ loading: false });

          this.props.history.push(`/auth?email=${email}&password=${password}`);
        } catch (error) {
          Modal.error({
            title: "Erro ao realizar o login",
            content: error.message
          });
          return this.setState({ loading: false });
        }
      }
    });
  };

  handleRecoveryAccount = async e => {};

  componentDidMount() {
    const authenticated = localStorage.getItem("authenticated");
    if (authenticated === true) return this.props.history.push("/chat");
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="main-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div style={{ textAlign: "center" }}>
            <img
              src={logo}
              style={{ width: 100, marginBottom: 20 }}
              alt="Logo"
            />
          </div>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "Você deve fornecer um e-mail válido"
                },
                { required: true, message: "Insira seu e-mail" }
              ]
            })(
              <Input
                prefix={<Icon type="mail" />}
                placeholder="E-mail"
                type="email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Insira sua senha" }]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Senha"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              loading={this.state.loading}
            >
              Log in
            </Button>
            <div>
              <a
                className="login-form-forgot"
                href=""
                onClick={e => {
                  e.preventDefault();
                  this.setState({ visible: true });
                }}
              >
                Esqueceu a senha?
              </a>
              <div style={{ float: "right" }}>
                <a href="/register">Registre-se agora!</a>
              </div>
            </div>
          </Form.Item>
        </Form>
        <Modal
          title="Esqueceu sua senha?"
          visible={this.state.visible}
          onOk={this.handleRecoveryAccount}
          onCancel={() => this.setState({ visible: false })}
          confirmLoading={this.state.confirmLoading}
          okButtonProps={{ disabled: true }}
        >
          <RecoveryForm />
        </Modal>
      </div>
    );
  }
}

const Main = Form.create({ name: "normal_login" })(MainForm);

export default Main;
