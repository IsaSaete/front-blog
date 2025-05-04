import React, { useState } from "react";
import { useNavigate } from "react-router";
import { PostData } from "../../types";
import "./PostForm.css";

interface PostFormProps {
  action: (postData: PostData) => Promise<void>;
}

const PostForm: React.FC<PostFormProps> = ({ action }) => {
  const initialPostData: PostData = {
    author: "",
    content: "",
    imageUrl: "",
    title: "",
    imageAlt: "",
    publishDate: "",
    tags: "",
  };

  const [postData, setPostData] = useState<PostData>(initialPostData);

  const changePostData = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value;

    setPostData((postData) => ({
      ...postData,
      [event.target.id]: newValue,
    }));
  };

  const isFormValid =
    postData.title !== "" &&
    postData.author !== "" &&
    postData.content !== "" &&
    postData.imageUrl !== "";

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitForm = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage("");

    try {
      await action(postData);

      navigate("/");
    } catch {
      setErrorMessage("¡Error al crear el post!");
    }
  };

  return (
    <form className="post-form" onSubmit={onSubmitForm}>
      <div className="post-form__groups">
        <h3 className="form-text">Campos obligatorios:</h3>
        <div className="post-form__group">
          <label htmlFor="title" className="post-form__text">
            Título:
          </label>
          <input
            type="text"
            id="title"
            className="post-form__control"
            value={postData.title}
            onChange={changePostData}
            required
          />
        </div>
        <div className="post-form__group">
          <label htmlFor="author" className="post-form__text">
            Autor/a:
          </label>
          <input
            type="text"
            id="author"
            className="post-form__control"
            value={postData.author}
            onChange={changePostData}
            required
          />
        </div>
        <div className="post-form__group">
          <label htmlFor="imageUrl" className="post-form__text">
            Imagen Url:
          </label>
          <input
            type="url"
            id="imageUrl"
            className="post-form__control"
            value={postData.imageUrl}
            onChange={changePostData}
            required
          />
        </div>
        <div className="post-form__group">
          <label htmlFor="content" className="post-form__text">
            Contenido:
          </label>
          <textarea
            rows={6}
            id="content"
            className="post-form__control"
            value={postData.content}
            onChange={changePostData}
            required
          />
        </div>
      </div>
      <div className="post-form__groups">
        <h3 className="form-text">Campos opcionales:</h3>
        <div className="post-form__group">
          <label htmlFor="imageAlt" className="post-form__text">
            Descripción de imagen:
          </label>
          <input
            type="text"
            id="imageAlt"
            className="post-form__control"
            value={postData.imageAlt}
            onChange={changePostData}
          />
        </div>
        <div className="post-form__group">
          <label htmlFor="tags" className="post-form__text">
            Etiquetas:
          </label>
          <input
            type="text"
            id="tags"
            className="post-form__control"
            value={postData.tags}
            onChange={changePostData}
          />
        </div>
        <div className="post-form__group">
          <label htmlFor="publishDate" className="post-form__text">
            Fecha de publicación:
          </label>
          <input
            type="date"
            id="publishDate"
            className="post-form__control"
            value={postData.publishDate}
            onChange={changePostData}
          />
        </div>
      </div>
      {errorMessage && <span className="post-form__error">{errorMessage}</span>}
      <button
        className="post-form__button"
        type="submit"
        disabled={!isFormValid}
      >
        Crear post
      </button>
    </form>
  );
};

export default PostForm;
