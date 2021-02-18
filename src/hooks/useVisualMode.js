import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {

    if (replace) {
      //before we were mutating history now we use callback version to make a copy
      // history[history.length - 1] = newMode; 
      setHistory(prev => { //now we arent affecting the original array because we spread it
        const copy = [...prev];
        copy[copy.length - 1] = newMode;
        //console.log(copy)
        return copy;
      });
      setMode(newMode);
    } else {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }

  function back() {
    if (history.length > 1) {

      setHistory(prev => {
        const copy = [...prev];
        //console.log(copy)
        copy.pop();
        return copy;
      });
      //mutating original history
      // history.pop();
      //we are popping off the copy so the original history is unaffected so we need -2 instead of -1
      const prev = history[history.length - 2];
      setMode(prev);
    }
  }
  //set this as mode: history[history.length -1] in your return
  return { mode, transition, back };
}

//GARY VERSION
// export default function useVisualMode(initial) {
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode) {

//    setHistory (prev => {
//      return [...prev, newMode]
//    })

//   };

//   function back() {

//     setHistory(prev => {
//       const newHistory = [...prev]
//       newHistory.pop()
//       return newHistory
//     })
//   }
//   const mode = history.slice(-1)[0]
//   return { mode, transition, back };
// }


//.slice(-1) gives you a newarr with one item in it
//history.slice(-1)[0] a cooler way to get the last item in an array as opposed to history[history.length - 1]