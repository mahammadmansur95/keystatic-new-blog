
import { Modal, Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';

const ContactUsModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (result.success) {
        message.success('Your message has been submitted!');
        form.resetFields();
        onClose();
      } else {
        throw new Error(result.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      message.error('Submission failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={<span style={{ fontWeight: 'bold', color: '#f5222d' }}>Reach out to us</span>}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>Please fill out the form we will get back to you!!</p>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: 'Full name is required' }]}
        >
          <Input placeholder="Full name*" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: 'Phone number is required' },
            { pattern: /^\d{10,15}$/, message: 'Enter a valid phone number' },
          ]}
        >
          <Input placeholder="Phone number*" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input placeholder="Email id*" />
        </Form.Item>

        <Form.Item name="designation">
          <Input placeholder="Designation" />
        </Form.Item>

        <Form.Item name="message">
          <Input.TextArea rows={4} placeholder="Message" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ backgroundColor: '#f5222d' }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactUsModal;
