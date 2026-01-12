import { useState } from "react";
import { movies } from "./MovieDetail";
import { ErrorMSG } from "./ErrorMsg";
import { Film , RefreshCcw , CircleCheckBig , Send } from "lucide-react";

function Form() {
  const [selection, setSelection] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [submit, setSubmit] = useState(false);
  const [isError, setIsError] = useState({});

  const handleSelection = (event) => {
    setSelection(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validationForm()) {
      const data = {
        name: name,
        email: email,
        selection: selection,
      };
      console.log(data);
      setSubmit(true);
    }
  };

  const validationForm = () => {
    let error = {};
    let isValid = true;

    if (!name) {
      error.name = "โปรดใส่ชื่อของคุณ";
      isValid = false;
    }

    if (!email) {
      error.email = "โปรดใส่อีเมลของคุณ";
      isValid = false;
    }

    if (!selection) {
      error.selection = "โปรดเลือกหนังของคุณ";
      isValid = false;
    }

    setIsError(error);
    return isValid;
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSelection("");
    setComment("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-white text-left w-full p-6 bg-gradient-to-bl from-violet-800 to-fuchsia-800 flex items-center gap-3">
          <span>
            <Film size="28px" />
          </span>
          Movie Survey
        </h1>

        {!submit ? (
          <form className="space-y-4 px-8 pb-8" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อ <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isError.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="กรุณากรอกชื่อของคุณ"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <ErrorMSG message={isError.name} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อีเมล <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isError.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="example@email.com"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <ErrorMSG message={isError.email} />
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              เลือกหนังที่คุณชอบ <span className="text-red-500">*</span>
            </label>
            <div
              className={`list-box ${
                isError.selection
                  ? "flex flex-col gap-5 border border-red-500 rounded-md p-5"
                  : "flex flex-col gap-5 border border-white rounded-md p-0"
              }`}
            >
              {movies.map((movie) => (
                <label key={movie.title}>
                  <input
                    type="radio"
                    name="option"
                    value={movie.title}
                    checked={selection === movie.title}
                    onChange={handleSelection}
                  />
                  <span className="font-semibold pl-3 ">
                    {movie.title} <span>({movie.year})</span>
                  </span>
                  <p className="font-thin pl-6">Director: {movie.director}</p>
                </label>
              ))}
            </div>
            <ErrorMSG message={isError.selection} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ความคิดเห็นเกี่ยวกับหนัง
              </label>
              <textarea
                rows="3"
                type="text"
                value={comment}
                className="w-full h-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                placeholder="พิมพ์ความคิดเห็นของคุณที่นี่"
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleReset}
                className="w-[85px] bg-white text-black py-2 rounded-md hover:bg-purple-100 transition cursor-pointer border-gray-300 border flex items-center justify-center gap-1"
              ><span><RefreshCcw size="18px"/></span>
                รีเซ็ต
              </button>

              <button
                type="submit"
                className="w-[145px] text-white py-2 rounded-md transition cursor-pointer bg-gradient-to-bl from-violet-800 to-fuchsia-800 hover:scale-[1.02] flex items-center justify-center gap-1"
              ><span><Send size="18px"/></span>
                ส่งแบบสำรวจ
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-center flex-col gap-4">
            <div className="status-page w-[400px] h-auto px-8 pt-3 bg-green-100 flex flex-col gap-3 rounded-lg rounded-green-300 ">
              <h3 className="font-bold text-[18px] text-green-800 flex items-center gap-2 "><span><CircleCheckBig /></span>
                ส่งแบบสำรวจสำเร็จ!
              </h3>
              <p className="text-gray-500">ชื่อ: <span className="text-black"> {name}</span></p>
              <p className="text-gray-500">อีเมล:<span className="text-black"> {email}</span></p>
              <p className="text-gray-500">
                หนังที่เลือก:
                <span className="text-purple-700"> {selection}</span>
              </p>

              {!comment ? (
                <p></p>
              ) : (
                <div className="comment-box ">
                  <p className="text-gray-500 " >ความคิดเห็น:</p>
                  <textarea
                    rows="0"
                    type="text"
                    value={comment}
                    className="w-full h-auto px-3  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-[400px] bg-black text-white py-3 px-5 rounded-md hover:bg-gray-900 mb-6 flex justify-center items-center gap-2"
              ><span> <RefreshCcw size="19px"/></span>
                ทำแบบทดสอบใหม่
              </button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
