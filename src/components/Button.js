import React from "react";
import "components/Button.scss";
import classnames from "classnames";

export default function Button(props) {

   const buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

   return <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
   >
      {props.children}
   </button>;
}


   //BEFORE REFACTOR in line 7 this is how we did if else for adding button classes
   // if (props.confirm) {
   //    buttonClass += " button--confirm";
   // }

   // if (props.danger) {
   //    buttonClass += " button--danger";
   // }
