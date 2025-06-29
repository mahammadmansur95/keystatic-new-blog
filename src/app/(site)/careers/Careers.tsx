"use client";

import JobCard from "@/components/JobCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Careers() {
  const [jobs, setJobs] = useState<any[]>([]);
  console.log("jobs", jobs);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const fetchJobs = async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      search: searchQuery, // use searchQuery
    });

    const res = await fetch(`/api/jobs?${params.toString()}`);
    const data = await res.json();

    setJobs(data.jobs);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchJobs();
  }, [page, searchQuery]);

  const handleSearchClick = () => {
    setPage(1); // reset to first page
    setSearchQuery(searchInput);
  };

  // If input is cleared → reset to all jobs
  useEffect(() => {
    if (searchInput === "") {
      setSearchQuery(""); // triggers fetch
      setPage(1);
    }
  }, [searchInput]);

  return (
    <section className="bg-[#E1F3FD]">
      <div className="relative text-center py-8 h-full w-full text-white font-semibold text-xl flex items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(236.22deg,_#1D3D8D_1.39%,_#14244C_90.45%)]" />

        {/* Right-side background image */}
        <div className="absolute right-0 top-0 h-full  md:w-1/2 w-full z-10">
          <Image
            src="/images/about_us_bg.png"
            alt="about us bg image"
            fill
            className="object-cover object-right"
            priority
          />
        </div>

        <h1 className="relative z-20 md:text-4xl text-2xl font-bold">
          Join Our Wave of Innovation
        </h1>
      </div>
      <div className="md:h-[25rem] h-[10rem] w-full relative">
        <Image src="/images/careers_page.png" alt={"we_are_hiring"} fill />
      </div>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow px-4 py-2 border rounded"
          />
          <button
            onClick={handleSearchClick}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
        </div>

        {jobs.length === 0 && (
          <div className="text-black text-lg">Currently there are no openings</div>
        )}

        {jobs.length > 0 && (
          <>
            {jobs.map((job) => (
              <JobCard
                title={job.title}
                slug={job.slug}
                exp={job.experience}
                location={job.location}
                jobType={job.jobType}
                skills={job.skills}
                mansur={job.mansur}
              />
            ))}

            {/* Pagination */}
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`px-3 py-1 rounded border ${
                      page === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
