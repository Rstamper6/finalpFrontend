import * as React from "react";
import { useState } from "react";

export interface Board {
  addBoard: Function;
}
export function CreateBoard(props: Board) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");
  const [DOD, setDOD] = useState<string>("");
  const [obituary, setObituary] = useState<string>("");

  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    props.addBoard({
      firstName: firstName,
      lastName: lastName,
      DOB: DOB,
      DOD: DOD,
      obituary: obituary,
    });
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>First Name</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First name"
        />
        <label>Last Name</label>
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last name"
        />
        <label>Date of Birth</label>
        <input
          onChange={(e) => setDOB(e.target.value)}
          type="Date of Birth"
          max="2023-03-05"
        />
        <label>Date of Death</label>
        <input
          onChange={(e) => setDOD(e.target.value)}
          type="Date of Death"
          max="2023-03-05"
        />
        <label>Obituary</label>
        <input onChange={(e) => setObituary(e.target.value)} type="Obituary" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
