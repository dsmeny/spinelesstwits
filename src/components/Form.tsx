import { useEffect, useState, CSSProperties, useRef } from "react";
import { BsSend } from "react-icons/bs";

const Form = ({ submitHandler }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [boxHt, setBoxHt] = useState(40);

  const inputRef = useRef();

  const onFormSubmit = (e) => {
    const scrollHt = inputRef.current as HTMLFormElement;

    e.preventDefault();
    submitHandler(e);
    setIsClicked(true);
    scrollHt.rows = 1;
  };

  const changeHandler = () => {
    const scrollHt = inputRef.current as HTMLFormElement;
    const letterCount = scrollHt.value.length;

    if (letterCount > 48 && scrollHt.rows <= 8) {
      scrollHt.rows = 8;
    }
  };

  return (
    <form id="form1" onSubmit={onFormSubmit}>
      <div className="form-input">
        <textarea
          id="inputField"
          rows={1}
          cols={40}
          name="name"
          autoFocus
          required
          placeholder="Store a message"
          onChange={changeHandler}
          ref={inputRef}
        ></textarea>
        <button type="submit" className="send">
          <BsSend
            className="icon-group-styling"
            style={{ fontSize: "1.2rem" }}
          />
        </button>
      </div>
    </form>
  );
};

export default Form;
