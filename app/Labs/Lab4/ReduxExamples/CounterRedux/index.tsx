/* eslint @typescript-eslint/no-explicit-any: "off" */
"use client";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterReducer";
import { useEffect, useState } from "react";

export default function CounterRedux() {
  const [isClient, setIsClient] = useState(false);

  const count = useSelector((state: any) => state?.counterReducer?.count || 0);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div id="wd-counter-redux">
        <h2>Counter Redux</h2>
        <h3>Loading...</h3>
        <hr />
      </div>
    );
  }

  return (
    <div id="wd-counter-redux">
      <h2>Counter Redux</h2>
      <h3>{count}</h3>
      <button
        onClick={() => dispatch(increment())}
        id="wd-counter-redux-increment-click"
        className="btn btn-primary me-2"
      >
        Increment
      </button>
      <button
        onClick={() => dispatch(decrement())}
        id="wd-counter-redux-decrement-click"
        className="btn btn-primary"
      >
        Decrement
      </button>
      <hr />
    </div>
  );
}
