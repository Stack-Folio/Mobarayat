"use client";

interface ModalType {
  title: string;
  text: string;
  btn: string;
  setState: React.Dispatch<
    React.SetStateAction<{ error: boolean; success: boolean }>
  >;
}

const ErrorModal = ({ title, text, btn, setState }: ModalType) => {
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative">
        <div className="my-2 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 fill-red-500 inline"
            viewBox="0 0 286.054 286.054"
          >
            <path
              fill="#e2574c"
              d="M143.027 0C64.04 0 0 64.04 0 143.027c0 78.996 64.04 143.027 143.027 143.027 78.996 0 143.027-64.022 143.027-143.027C286.054 64.04 222.022 0 143.027 0zm0 259.236c-64.183 0-116.209-52.026-116.209-116.209S78.844 26.818 143.027 26.818s116.209 52.026 116.209 116.209-52.026 116.209-116.209 116.209zm.009-196.51c-10.244 0-17.995 5.346-17.995 13.981v79.201c0 8.644 7.75 13.972 17.995 13.972 9.994 0 17.995-5.551 17.995-13.972V76.707c-.001-8.43-8.001-13.981-17.995-13.981zm0 124.997c-9.842 0-17.852 8.01-17.852 17.86 0 9.833 8.01 17.843 17.852 17.843s17.843-8.01 17.843-17.843c-.001-9.851-8.001-17.86-17.843-17.86z"
              data-original="#e2574c"
            />
          </svg>

          <h4 className="text-lg text-dark font-semibold mt-6">{title}</h4>
          <p className="text-sm text-gray-500 mt-2">{text}</p>
        </div>

        <div className="flex max-sm:flex-col gap-4">
          <button
            type="button"
            onClick={() => setState({ error: false, success: false })}
            className="px-5 mt-3 py-2.5 rounded-lg w-full tracking-wide text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600"
          >
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
