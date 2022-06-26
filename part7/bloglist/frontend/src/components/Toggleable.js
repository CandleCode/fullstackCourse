import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const Toggleable = forwardRef((props, refs) => {
  const user = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const showWhenUserExists = { display: user ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div style={showWhenUserExists}>
      <div style={hideWhenVisible}>
        <Button
          variant="outlined"
          onClick={toggleVisibility}
          id="new-blog-button"
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
