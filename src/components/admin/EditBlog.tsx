"use client";
import { FormEvent, useState } from "react";
import AdminPageTitle from "./AdminPageTitle";
import { Editor } from "@tinymce/tinymce-react";
import AdminFormsContainer from "./AdminFormsContainer";
import { editArticle } from "@/utils/fetchData";
import { ArticleType } from "@/utils/Types";
import SuccessModal from "../ui/SuccessModal";
import { encode as encodeData, decode as decodeData } from "js-base64";

const EditBlog = ({ token, data }: { token: string; data: ArticleType }) => {
  const [model, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [article, setArticle] = useState<ArticleType>({
    ...data,
    Body: decodeData(data.Body), // تشفير فك Body
    BodyAr: decodeData(data.BodyAr), // تشفير فك BodyAr
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const encodedArticle = {
      ...article,
      Body: encodeData(article.Body), // تشفير Body
      BodyAr: encodeData(article.BodyAr), // تشفير BodyAr
    };

    const res = await editArticle({
      data: encodedArticle,
      token,
      id: data._id,
    });

    if (res.rs === 400) {
      setMsg(res.msg);
    } else {
      setModal(true);
    }
  };

  return (
    <AdminFormsContainer>
      {model && (
        <SuccessModal
          title={"تم التعديل"}
          text={"تم تعديل المقال بنجاح"}
          btn={"أغلاق"}
          href={null}
          setModal={setModal}
        />
      )}
      <div>
        <AdminPageTitle>تعديل المقالة</AdminPageTitle>
        <form className="my-10 space-y-3 text-[15px]">
          <div className="flex gap-3 max-sm:flex-col">
            <input
              type="text"
              className="bg-light p-2 px-3 rounded-lg outline-none w-full"
              name="NameAr"
              value={article.NameAr}
              onChange={handleChange}
              placeholder="أسم المقالة"
            />
            <input
              type="text"
              name="Name"
              value={article.Name}
              onChange={handleChange}
              className="bg-light p-2 px-3 rounded-lg outline-none w-full"
              placeholder="الأسم باللغة الانكليزية"
            />
          </div>
          <div className="flex gap-3 max-sm:flex-col">
            <input
              type="text"
              name="TitleAr"
              value={article.TitleAr}
              onChange={handleChange}
              className="bg-light p-2 px-3 rounded-lg outline-none w-full"
              placeholder="عنوان المقال"
            />
            <input
              type="text"
              className="bg-light p-2 px-3 rounded-lg outline-none w-full"
              name="Title"
              value={article.Title}
              onChange={handleChange}
              placeholder="العنوان باللغة الانكليزية"
            />
          </div>
          <div className="flex gap-3 max-sm:flex-col">
            <textarea
              name="DescriptionAr"
              value={article.DescriptionAr}
              onChange={handleChange}
              id=""
              placeholder="وصف المقال بمحركات البحث"
              className="bg-light p-2 px-3 rounded-lg outline-none w-full resize-none"
            ></textarea>
            <textarea
              name="Description"
              value={article.Description}
              onChange={handleChange}
              id=""
              placeholder="الوصف باللغة الانكليزية"
              className="bg-light p-2 px-3 rounded-lg outline-none w-full resize-none"
            ></textarea>
          </div>
          <div className="flex gap-3 max-sm:flex-col">
            <input
              type="text"
              name="KeywordsAr"
              value={article.KeywordsAr}
              onChange={handleChange}
              className="bg-light p-2 px-3 rounded-lg outline-none w-full"
              placeholder="كلمات مفتاحية"
            />
            <input
              type="text"
              className="bg-light p-2 px-3 rounded-lg outline-none w-full"
              name="Keywords"
              value={article.Keywords}
              onChange={handleChange}
              placeholder="الكلمات المفتاحية باللغة الانكليزية"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              name="ImageURL"
              value={article.ImageURL}
              onChange={handleChange}
              className="bg-light p-2 px-3 rounded-lg outline-none w-full"
              placeholder="رابط صورة المقالة"
            />
          </div>
          <div className="">
            <ContentAr setArticle={setArticle} value={article.BodyAr} />
          </div>
          <div className="">
            <ContentEn setArticle={setArticle} value={article.Body} />
          </div>
          {msg && <p className="text-red-500">{msg}</p>}
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-primary text-white p-2 px-4 rounded-sm"
            >
              تعديل المقال
            </button>
          </div>
        </form>
      </div>
    </AdminFormsContainer>
  );
};

export const ContentAr: React.FC<{
  setArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
  value: string;
}> = ({ setArticle, value }) => {
  const handleEditorChange = (newContent: string): void => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      BodyAr: newContent,
    }));
  };

  return (
    <Editor
      id="tiny-react_59500018411730725891671"
      apiKey="ty64wdwcze2p14fs1fvog2o2yexvzesbd7hwn7u81egby9oh"
      value={value}
      init={{
        height: 400,
        menubar: false,
        branding: false,
        directionality: "rtl",
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "code",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code",

        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        content_style: "body { background-color: #97BDD340; }",
        exportpdf_converter_options: {
          format: "Letter",
          margin_top: "1in",
          margin_right: "1in",
          margin_bottom: "1in",
          margin_left: "1in",
        },
        codesample_global_prismjs: true,
        exportword_converter_options: { document: { size: "Letter" } },
        importword_converter_options: {
          formatting: {
            styles: "inline",
            resets: "inline",
            defaults: "inline",
          },
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export const ContentEn: React.FC<{
  setArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
  value: string;
}> = ({ setArticle, value }) => {
  const handleEditorChange = (newContent: string): void => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      Body: newContent,
    }));
  };

  return (
    <Editor
      id="iny-react_50954852821732564135390"
      apiKey="ty64wdwcze2p14fs1fvog2o2yexvzesbd7hwn7u81egby9oh"
      value={value}
      init={{
        height: 400,
        menubar: false,
        branding: false,
        directionality: "ltr",
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "code",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code",

        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        content_style: "body { background-color: #97BDD340; }",
        exportpdf_converter_options: {
          format: "Letter",
          margin_top: "1in",
          margin_right: "1in",
          margin_bottom: "1in",
          margin_left: "1in",
        },
        codesample_global_prismjs: true,
        exportword_converter_options: { document: { size: "Letter" } },
        importword_converter_options: {
          formatting: {
            styles: "inline",
            resets: "inline",
            defaults: "inline",
          },
        },
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default EditBlog;
