import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const JobApplicationModal = ({ title, visible, onClose }: any) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Watch form fields
  const fullName = Form.useWatch("fullName", form);
  const email = Form.useWatch("email", form);
  const phone = Form.useWatch("phone", form);

  useEffect(() => {
    const isReady = fullName && email && phone && fileList.length > 0;
    setCanSubmit(isReady);
  }, [fullName, email, phone, fileList]);

  useEffect(() => {
    if (visible && title) {
      form.setFieldsValue({ jobRole: title });
    }
  }, [visible, title, form]);

  const onFinish = async (values: any) => {
    if (!fileList.length) {
      message.error("Please upload your resume");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("jobRole", values.jobRole || "");
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message || "");
    formData.append("resume", fileList[0]);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        message.success("Form submitted and resume uploaded!");
        form.resetFields();
        setFileList([]);
        onClose();
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (err) {
      console.error(err);
      message.error("Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error("Please fill all required fields");
  };

  const uploadProps = {
    beforeUpload: (file: any) => {
      setFileList([file]);
      return false;
    },
    onRemove: () => setFileList([]),
    fileList,
  };

  return (
    <Modal
      title={
        <span style={{ fontWeight: "bold", color: "#f5222d" }}>
          Job openings
        </span>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>Please fill out the form we will get back to you!!</p>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="jobRole">
          <Input placeholder="Job Role" disabled />
        </Form.Item>

        <Form.Item
          name="fullName"
          rules={[{ required: true, message: "Full name is required" }]}
        >
          <Input placeholder="Full name*" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Phone number is required" },
            { pattern: /^\d{10,15}$/, message: "Enter a valid phone number" },
          ]}
        >
          <Input placeholder="Phone number*" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Email id*" />
        </Form.Item>

        <Form.Item label="Upload resume">
          <Dragger {...uploadProps} accept=".pdf,.doc,.docx">
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ color: "#f5222d" }}/>
            </p>
            <p>Click or drag file to upload</p>
          </Dragger>
        </Form.Item>

        <Form.Item name="message">
          <Input.TextArea rows={4} placeholder="Message" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{ backgroundColor: "#f5222d" }}
            disabled={!canSubmit}
            className={canSubmit ? "" : "opacity-25"}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default JobApplicationModal;
