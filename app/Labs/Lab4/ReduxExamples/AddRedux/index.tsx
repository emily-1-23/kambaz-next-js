"use client"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { add } from "./addReducer";
import { Button, FormControl } from "react-bootstrap";
import { RootState } from "../../store";

export default function AddRedux() {
  const { sum } = useSelector((state: RootState) => state.addReducer);
  const dispatch = useDispatch();
  const [a, setA] = useState(12);
  const [b, setB] = useState(23);
  return (
    <div className="w-25" id="wd-add-redux">
      <h3>Add Redux</h3>
      <h4>{sum}</h4>
      <FormControl value={a} type="number" onChange={(e) => setA(parseInt(e.target.value))} />
      <FormControl value={b} type="number" onChange={(e) => setB(parseInt(e.target.value))} />
      <Button onClick={() => dispatch(add({ a, b }))} id="wd-add-redux-click">
        Add
      </Button>
    </div>
  );
}