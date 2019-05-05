import React, { Component } from "react";

import { Form, Icon, Input } from "antd";
// import { Container } from './styles';

class Recovery extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="vertical">
        <Form.Item>
          {getFieldDecorator("recoveryEmail", {
            rule: [
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
      </Form>
    );
  }
}

const RecoveryForm = Form.create({ name: "normal_recovery" })(Recovery);

export default RecoveryForm;
