import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    if (replace) {
      //before we were mutating history now we use callback version to make a copy
      //this was previous version: history[history.length - 1] = newMode; 
      setHistory(prev => { //now we arent affecting the original array because we spread it
        const copy = [...prev];
        copy[copy.length - 1] = newMode;
  
        return copy;
      });
      setMode(newMode);
    } else {
      setHistory(prev => [...prev, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {

      setHistory(prev => {
        //once again we make sure to spread array to not pop and mutate the original state
        const copy = [...prev];
        copy.pop();
        return copy;
      });
      //here we were mutating original history
      // history.pop();
      //we are popping off the copy so the original history is unaffected so we need -2 instead of -1
      const prev = history[history.length - 2];
      setMode(prev);
    }
  }
  //set this as mode: history[history.length -1] in your return and then you can remove mode and set mode
  return { mode, transition, back };
}

//.slice(-1) gives you a newarr with one item in it
//history.slice(-1)[0] a cooler way to get the last item in an array as opposed to history[history.length - 1]