import React, { useEffect, useState } from "react";
import styles from "./NotesDisplay.module.css";
import sendBtn1 from "./sendBtn1.png";
import sendBtn2 from "./sendBtn2.png";

const NotesDisplay = ({ group }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState({});

  const getInitials = (groupName) => {
    const words = groupName.split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSendText = () => {
    if (text.trim()) {
      const currentDateTime = new Date();
      const date = currentDateTime.toLocaleDateString();
      const time = currentDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const groupMessages = messages[group.text] || [];
      const updatedMessages = {
        ...messages,
        [group.text]: [...groupMessages, { text, date, time }],
      };
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      setText("");
    }
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.circle} style={{ background: group.color }}>
          <span className={styles.initials}>{getInitials(group.text)}</span>
        </span>
        <span className={styles.grpName}>{group.text}</span>
      </div>

      <div className={styles.notesContent}>
        {messages[group.text]?.map((message, index) => (
          <div key={index} className={styles.chatMessage}>
            <div>{message.text}</div>
            <div className={styles.timestamp}>
              {message.date} <span className={styles.smallCircle}></span>{" "}
              {message.time}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.textareaWrapper}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here..........."
        />
        <button className={styles.sendButton} onClick={handleSendText}>
          <img src={text.trim() ? sendBtn2 : sendBtn1} alt="Send" />
        </button>
      </div>
    </div>
  );
};

export default NotesDisplay;
