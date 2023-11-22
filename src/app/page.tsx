"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [botResponse, setBotResponse] = useState<string>("");
  const [useNaya, setUseNaya] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const backgroundColor = useNaya ? "bg-green-100" : "bg-red-100";
  function qryLLM() {
    setLoading(true);
    axios
      .post("/api/llm", {
        query: input,
      })
      .then(function (response) {
        setBotResponse(response.data.choices[0].message.content);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }
  return (
    <main className="flex h-full flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full justify-between text-sm lg:flex h-full">
        <div className="rows-3 w-9/12 m-h-full">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl">Ask Payaza</h2>
            <div className="bauble_box flex items-center">
              <p>Use Naya</p>
              <input
                className="bauble_input"
                id="bauble_check"
                name="bauble"
                type="checkbox"
                onClick={() => {
                  setUseNaya(!useNaya);
                }}
              />

              <label className="bauble_label" htmlFor="bauble_check"></label>
            </div>
          </div>
          <hr className="my-4" />
          {loading && (
            <div className="flex flex-row justify-center">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {!loading && (
            <div className="border-gray-300 focus:border-gray-500 p-2 w-full bg-slate-50 my-4">
              {botResponse}
            </div>
          )}
          <textarea
            className="flex-1 border-gray-300 focus:border-gray-500 p-2 w-full bg-slate-50 my-4"
            rows={5}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          ></textarea>
          <button
            className="rounded-md bg-slate-100 p-4"
            onClick={() => {
              qryLLM();
            }}
          >
            Send Message
          </button>
        </div>
      </div>
      <div
        className={`fixed right-20 top-20 w-72 h-auto shadow-lg rounded-md border border-slate-300 z-10 ${backgroundColor}`}
      >
        <div
          className="items-center flex p-4 rounded-md"
          style={{ height: 50 }}
        >
          <h2 className="font-bold text-lg">Prompt</h2>
        </div>
        <div className="p-4">
          <code>{input}</code>
        </div>
      </div>
    </main>
  );
}
