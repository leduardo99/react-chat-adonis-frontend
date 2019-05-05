/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import api from "../../services/api";

import { Form, Input, Icon, Button, Modal } from "antd";

import logo from "../../assets/logo.svg";

class RegisterForm extends React.Component {
  state = {
    loading: false,
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ loading: true });
        console.log("Received values of form: ", values);
        const { username, email, password } = values;

        try {
          await api.post("/register", {
            username,
            email,
            password
          });

          this.setState({ loading: false });

          let secondsToGo = 5;
          const modal = Modal.success({
            title: "Você foi registrado com sucesso",
            content: `Você será redirecionado em ${secondsToGo} segundos.`
          });

          const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
              content: `Você será redirecionado em ${secondsToGo} segundos.`
            });
          }, 1000);

          setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            this.props.history.push("/");
          }, secondsToGo * 1000);
        } catch (error) {
          this.setState({ loading: false });
          return Modal.error({
            title: "Erro ao realizar cadastro",
            content: "Usuário ou E-mail em uso, tente novamente"
          });
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("As senhas não são iguais!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

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
                {
                  required: true,
                  message: "Insira seu e-mail",
                  whitespace: true
                }
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
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Insira seu nome de usuário",
                  whitespace: true
                }
              ]
            })(<Input placeholder="Usuário" prefix={<Icon type="user" />} />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Insira sua senha",
                  whitespace: true
                },
                {
                  validator: this.validateToNextPassword
                },
                {
                  max: 16,
                  message: "A senha excede 16 caracteres"
                },
                {
                  min: 8,
                  message: "A senha não pode conter menos de 8 caracteres"
                }
              ]
            })(
              <Input
                type="password"
                placeholder="Senha"
                prefix={<Icon type="lock" />}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Por favor, confirme sua senha",
                  whitespace: true
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                type="password"
                onBlur={this.handleConfirmBlur}
                placeholder="Confirme sua senha"
                prefix={<Icon type="lock" />}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              onSubmit={this.handleSubmit}
            >
              Registrar
            </Button>
            <div style={{ textAlign: "center" }}>
              <a href="/">Já possue uma conta? Clique aqui!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Register = Form.create({ name: "normal_register" })(RegisterForm);

export default Register;
