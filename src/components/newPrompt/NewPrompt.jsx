import React, { useEffect, useRef, useState } from "react";
import "./newprompt.css";
import Upload from "../../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import MarkDown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswers] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "hello, I have two dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like know?" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens:100,
    },
  });

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [answer, question, img]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const {userId} = useAuth()
  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          setQuestion("");
          setAnswers("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError:(err)=>{
      console.log(err);
      
    }
  });

  //gemini
  const add = async (text) => {
    setQuestion(text);
    try {
      
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let words = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        words += chunkText;
        setAnswers(words);
      }
      // const response = result.response.text();
      // console.log(response);
      // setQuestion("")
      mutation.mutate()
    } catch(error){
      console.log(error);
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    add(text);
  };

  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="300"
          transformation={[{ width: 300 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <MarkDown>{answer}</MarkDown>
        </div>
      )}
      <div className="endchat" ref={endRef}></div>
      <form className="newform" onSubmit={handleSubmit}>
        <div>
          <Upload setImg={setImg} />
        </div>
        <input type="file" multiple={false} hidden id="file" />
        <input type="text" name="text" placeholder="Ask Anything...." />
        <button type="submit">
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
