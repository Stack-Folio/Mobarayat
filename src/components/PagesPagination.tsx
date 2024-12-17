"use client";
import { PaginationType } from "@/utils/Types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PagesPagination = ({
  lang,
  pagination,
  current,
}: {
  lang: string;
  pagination: PaginationType;
  current: { page: string; limit: string };
}) => {
  const route = useRouter();
  const [activeStep, setActiveStep] = useState(+current.page);
  const [skip, setSkip] = useState(0);
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const newParams = new URLSearchParams(queryParams);

  const paginationLength =
    pagination.totalPages < 4 ? pagination.totalPages : 3;

  const next = () => {
    if (pagination.hasNextPage) {
      setActiveStep((prev) => prev + 1);
      if (activeStep > 3) {
        setSkip((prev) => prev + 1);
      }
    }
  };
  const prev = () => {
    if (pagination.hasPrevPage) {
      setActiveStep((prev) => prev - 1);
      if (skip > 0) {
        setSkip((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    newParams.set("page", activeStep.toString());
    route.push(`?${newParams.toString()}`);
    if (activeStep > 3) {
      setSkip(activeStep - 3);
    }
  }, [activeStep, route]);

  return (
    <div className="">
      <ul className="flex gap-4 justify-center mt-8">
        <li
          onClick={() => route.push(`?page=1`)}
          className={`${
            pagination.hasPrevPage
              ? "bg-primary cursor-pointer"
              : "bg-secondary"
          } flex items-center justify-center shrink-0 w-9 h-9 rounded-md`}
        >
          {lang === "ar" ? (
            <>
              <ChevronRightIcon className="w-3 font-bold text-white" />
              <ChevronRightIcon className="w-3 font-bold text-white" />
            </>
          ) : (
            <>
              <ChevronLeftIcon className="w-3 font-bold text-white" />
              <ChevronLeftIcon className="w-3 font-bold text-white" />
            </>
          )}
        </li>
        <li
          onClick={prev}
          className={`${
            pagination.hasPrevPage
              ? "bg-primary cursor-pointer"
              : "bg-secondary"
          } flex items-center justify-center shrink-0 w-9 h-9 rounded-md`}
        >
          {lang === "ar" ? (
            <ChevronRightIcon className="w-5 font-bold text-white" />
          ) : (
            <ChevronLeftIcon className="w-5 font-bold text-white" />
          )}
        </li>
        {Array.from({ length: paginationLength }, (_, idx) => (
          <li
            onClick={() => setActiveStep(idx + 1 + skip)}
            className={`${
              +activeStep === idx + 1 + skip ? "text-dark bg-light" : ""
            } flex items-center justify-center shrink-0 cursor-pointer text-base font-bold px-[13px] h-9 rounded-md`}
            key={idx}
          >
            {idx + 1 + skip}
          </li>
        ))}
        <li
          onClick={next}
          className={`${
            pagination.hasNextPage
              ? "bg-primary cursor-pointer"
              : "bg-secondary"
          } flex items-center justify-center shrink-0 w-9 h-9 rounded-md`}
        >
          {lang === "en" ? (
            <ChevronRightIcon className="w-5 font-bold text-white" />
          ) : (
            <ChevronLeftIcon className="w-5 font-bold text-white" />
          )}
        </li>
        <li
          onClick={() => route.push(`?page=${pagination.totalPages}`)}
          className={`${
            pagination.hasNextPage
              ? "bg-primary cursor-pointer"
              : "bg-secondary"
          } flex items-center justify-center shrink-0 w-9 h-9 rounded-md`}
        >
          {lang === "en" ? (
            <>
              <ChevronRightIcon className="w-3 font-bold text-white" />
              <ChevronRightIcon className="w-3 font-bold text-white" />
            </>
          ) : (
            <>
              <ChevronLeftIcon className="w-3 font-bold text-white" />
              <ChevronLeftIcon className="w-3 font-bold text-white" />
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default PagesPagination;
