"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

export default function GenerateMarketing() {
  const [input, setInput] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const queryClient = useQueryClient();
  let toastPostId: string;

  // Create a post

  const { mutate } = useMutation(
    async (input: string) =>
      await axios.post("/api/marketing-copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.dismiss(toastPostId);
          toast.error(error?.response?.data.message, { id: toastPostId });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        toast.dismiss(toastPostId);
        toast.success("Response was generated ", { id: toastPostId });
        // const suggestion: string = data.response.result;
        console.log("response from open ai", data.data);

        setIsDisabled(false);
      },
    }
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPostId: toast.loading("Generate Answer", { id: toastPostId });
    setIsDisabled(true);
    mutate(input);
  };

  // const submit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const res = await fetch("/api/marketing-copy", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ input }),
  //   });
  //   const suggestion: string = await res.json();
  //   console.log(suggestion);
  // };

  return (
    <form onSubmit={submit} className=" bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setInput(e.target.value)}
          name="input"
          id=""
          value={input}
          placeholder="input any thing related to marketing"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            input.length > 30 ? "text-red-700" : "text-gray-600"
          }`}
        >{`${input.length}/30`}</p>
        <button
          disabled={isDisabled}
          className={`text-sm bg-teal-600 text-white py-2 px-6 rounded-md ${
            isDisabled ? "opacity-60" : null
          }`}
          type="submit"
        >
          Generate
        </button>
      </div>
    </form>
  );
}
