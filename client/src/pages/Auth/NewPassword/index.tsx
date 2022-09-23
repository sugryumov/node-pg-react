import { FC, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, Form, Input, Button, notification } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNewPasswordMutation } from '@/services/authService';
import styles from '../index.module.css';

const { Title } = Typography;

export const NewPassword: FC = () => {
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();

  const [fetchNewPassword, { error, isError, isSuccess, isLoading }] =
    useNewPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: 'A new password has been set',
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

  const handleNewPassword = ({ password }: any) => {
    const resetPasswordLink = searchParams.get('activationLink');
    fetchNewPassword({ password, resetPasswordLink });
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name="newPassword"
        layout="vertical"
        autoComplete="off"
        onFinish={handleNewPassword}
        className={styles.form}
      >
        <Title level={3} className={styles.title}>
          Set a new password
        </Title>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="New password"
            prefix={<LockOutlined className={styles.icon} />}
          />
        </Form.Item>

        <Form.Item
          name="repeatPassword"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Repeat your new password"
            prefix={<LockOutlined className={styles.icon} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
