import classes from "../../styles/Button.module.css";

export default function Button({ className = "", children, ...rest}) {
  //return <div className={`${classes.button} ${className}`}>{children}</div>;
  return <button type="submit" className={`${classes.button} ${className}`} {...rest} >{children}</button>
}