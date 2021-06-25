function Button(props) {
  return (
    <button className={props.active ? "active" : ""} onClick={props.toggle}>
      {props.children}
    </button>
  );
}

export default Button;
