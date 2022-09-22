import { FC, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Form, Input, notification, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useSignInMutation } from '@/services/authService';
import { IAuthRequest } from '@/models/request/IAuthRequest';
import styles from '../index.module.css';

const { Title } = Typography;

export const SignIn: FC = () => {
  const { setCredentials } = useActions();
  const { isAuth } = useTypedSelector(state => state.authReducer);

  const [fetchSignIn, { data, error, isError, isSuccess, isLoading }] =
    useSignInMutation();

  useEffect(() => {
    if (isSuccess) {
      setCredentials(data);
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

  const handleSignIn = ({ email, password }: IAuthRequest) => {
    fetchSignIn({ email, password });
  };

  if (isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={styles.wrapper}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSignIn}
        className={styles.form}
      >
        <Title level={3} className={styles.title}>
          Sign In
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

        <Form.Item className={styles.passwordItem}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className={styles.icon} />}
            />
          </Form.Item>
          <Link className={styles.forgotLink} to={'/reset-password'}>
            Forgot password?
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>

        <p className={styles.text}>
          New on English Exercise?{' '}
          <Link to={'/sign-up'}>Create an account</Link>
        </p>
      </Form>
    </div>
  );
};
