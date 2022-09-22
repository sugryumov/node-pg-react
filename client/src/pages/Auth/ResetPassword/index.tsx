import { FC, useEffect } from 'react';
import { Button, Form, Input, notification, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useResetPasswordMutation } from '@/services/authService';
import styles from '../index.module.css';

const { Title } = Typography;

export const ResetPassword: FC = () => {
  const [fetchResetPassword, { error, isError, isSuccess, isLoading }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message:
          'Instruction with further actions sent to the specified address',
      });
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

  const handleResetPassword = ({ email }: any) => {
    fetchResetPassword({ email });
  };

  return (
    <div className={styles.wrapper}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={handleResetPassword}
        className={styles.form}
      >
        <Title level={3} className={styles.title}>
          Reset your password
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

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
