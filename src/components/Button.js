import React from "react";
import "components/Button.scss";
import classnames from "classnames";

export default function Button(props) {
   // let buttonClass = "button";
   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   // }

   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }
   return <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
   >
      {props.children}
   </button>;
}




