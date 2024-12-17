"use client";
import { getTexts, updateText } from "@/utils/fetchData";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SuccessModal from "../ui/SuccessModal";

interface transType {
  _id: string;
  originalText: string;
  translatedText: string;
}

const UpdateText = ({ token }: { token: string }) => {
  const [text, setText] = useState({
    originalText: "",
    toAppear: "",
    value: "",
  });

  console.log(text);
  const [filterd, setFilterd] = useState([]);
  const [active, setActive] = useState(false);

  const [words, setWords] = useState([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (text.value === "") {
      return;
    }

    const res = await updateText({ token, data: text });

    if (res.rs === 400) {
      return alert(res.message);
    } else {
      setActive(true);
      setText({
        originalText: "",
        toAppear: "",
        value: "",
      });
    }
  };
  useEffect(() => {
    const main = async () => {
      const res = await getTexts({ token });

      setWords(res);
    };

    main();
  }, [token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "toAppear") {
      setFilterd(() =>
        words.filter((word: transType) =>
          word.translatedText.includes(value.toLowerCase())
        )
      );
      if (value === "") {
        setFilterd([]);
        setText((prev) => ({ ...prev, toAppear: "" }));
      }
    }
    setText({ ...text, [name]: value });
  };

  console.log();

  return (
    <div className="text-center mx-auto max-w-5xl my-20">
      {active && (
        <SuccessModal
          title={"تم التحديث"}
          text={"تم تحديث الكلمة بنجاح"}
          href={null}
          setModal={setActive}
          btn={"اغلاق"}
        />
      )}
      <h1 className="text-xl text-primary font-bold">
        من هنا يمكنك تعديل أسم لاعب, فريق, بطولة أو دوري.
      </h1>
      <div className="mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-3 w-1/2 mx-auto"
        >
          <div className="w-full relative">
            {filterd && filterd.length > 0 && (
              <ul className="absolute top-[50px] p-2 w-full bg-white text-primary shadow-md rounded-md z-[9999]">
                {filterd.slice(0, 10).map((el: transType, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setText((prev) => ({
                        ...prev,
                        originalText: el.originalText,
                        toAppear: el.translatedText,
                      }));
                      setFilterd([]);
                    }}
                    className="hover:bg-light p-2 rounded-sm cursor-pointer"
                  >
                    {el.translatedText}
                  </li>
                ))}
              </ul>
            )}
            <input
              type="text"
              name="toAppear"
              value={text.toAppear}
              onChange={handleChange}
              placeholder="الكلمة الحالية باللغة الأنكليزية"
              className="p-3 px-4 rounded-lg w-full"
            />
          </div>
          <input
            type="text"
            placeholder="ترجمة الكلمة باللغة العربية"
            name="value"
            onChange={handleChange}
            value={text.value}
            className="p-3 px-4 rounded-lg w-full"
          />
          <button
            type="submit"
            className="bg-primary py-3 w-full text-white rounded-lg"
          >
            حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateText;
