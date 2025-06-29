import { Modal } from "antd";
import React, { useState } from "react";
import Markdoc from "@markdoc/markdoc";
import JobApplicationModal from "./JobApplicationModal";

type Job = {
  slug: string;
  title: string;
  exp: string;
  location: string;
  jobType: string;
  skills: string;
  mansur: any;
};

const JobCard = ({
  slug,
  title,
  exp,
  location,
  jobType,
  skills,
  mansur,
}: Job) => {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const openFormModal = () => {
    setOpenForm(true);
  };

  const onCancelForm = () => {
    setOpenForm(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div
      key={slug}
      className="border-b p-4 mb-4 bg-white rounded-xl flex justify-between items-center"
    >
      <div>
        <h2
          className="md:text-xl text-lg font-bold hover:underline cursor-pointer"
          onClick={showModal}
        >
          {title}
        </h2>
        <Modal
          open={open}
          onOk={() => {}}
          onCancel={handleCancel}
          width={1000}
          footer={null}
        >
          <p className="text-xl font-bold">{title}</p>
          <div className="prose text-base text-[#14244C] font-light prose-lg leading-relaxed space-y-6 max-w-none">
            {Markdoc.renderers.react(mansur, React)}
          </div>
        </Modal>
        <p className="md:text-base text-xs text-gray-500">
          Exp: {exp} required
        </p>
        <p className="md:text-base text-xs text-gray-500">
          Location : {location} | {jobType}
        </p>
        <div className="md:text-base text-xs text-gray-500">
          Skills: {skills.length > 50 ? skills.slice(0, 50) + "..." : skills}
        </div>
      </div>
      <div>
        <button
          className="px-4 py-2 md:text-base text-sm bg-red-500 text-white rounded-lg"
          onClick={openFormModal}
        >
          Apply now
        </button>
        <JobApplicationModal
          title={title}
          visible={openForm}
          onClose={onCancelForm}
        />
      </div>
    </div>
  );
};

export default JobCard;
