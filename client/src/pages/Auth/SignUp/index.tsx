import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useSignUpMutation } from '@/services/authService';
import { IAuthRequest } from '@/models/request/IAuthRequest';
import styles from '../index.module.css';

const { Title } = Typography;

export const SignUp: FC = () => {
  const navigation = useNavigate();

  const [fetchSignUp, { error, isError, isSuccess, isLoading }] =
    useSignUpMutation();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: 'Registration success',
      });

      navigation('/sign-in');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      const errorMessage: any = error;

      notification.error({
        message: errorMessage?.data?.message,
      });
    }
  }, [isError]);

  const handleSignUp = ({ email, password }: IAuthRequest) => {
    fetchSignUp({ email, password });
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSignUp}
        className={styles.form}
      >
        <Title level={3} className={styles.title}>
          Sign Up
        </Title>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            type="email"
            placeholder="Email"
            prefix={<MailOutlined className={styles.icon} />}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined className={styles.icon} />}
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>

        <p className={styles.text}>
          Already have an account? <Link to={'/sign-in'}>Sign In</Link>
        </p>
      </Form>
    </div>
  );
};
