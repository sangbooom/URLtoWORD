import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "./URLtoWORD.css";
import firebase from "./firebase";

const { Search, TextArea } = Input;
const MAX_NUMBER = 99;
const wordArray = ["사과", "수박", "딸기", "참외", "당근", "멜론"];
let numberArray = [];
for (let i = 0; i <= MAX_NUMBER; i++) {
  numberArray.push(i);
}

const URLtoWORD = () => {
  const [data, setData] = useState("");
  const [urlToWordValue, setUrlToWordValue] = useState("");
  const [wordToUrlValue, setWordToUrlValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  useEffect(() => {
    firebase
      .database()
      .ref("datas")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let childTimeStamp = childSnapshot.val().timestamp;
          let currentTime = new Date().getTime();
          if (currentTime - childTimeStamp >= 86400000) {
            let deleteNode = childSnapshot.val().word;
            firebase.database().ref("datas").child(deleteNode).remove();
          }
        });
      });
  }, []);

  useEffect(() => {
    if (data) {
      firebase.database().ref("datas").child(data).set({
        url: urlValue,
        word: data,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
      setWordToUrlValue(`'${data}' (으)로 변환되었습니다.`);
    }
  }, [data]);

  const onChangeUrlToWord = (value) => {
    setUrlValue(value);
    firebase
      .database()
      .ref("datas")
      .once("value", (snapshot) => {
        let datas_length = snapshot.val()
          ? Object.keys(snapshot.val()).length
          : 0;
        setData(
          wordArray[parseInt(datas_length / MAX_NUMBER) % wordArray.length] +
            numberArray[datas_length % MAX_NUMBER]
        );
      });
  };

  const onChangeWordToUrl = (value) => {
    firebase
      .database()
      .ref("datas")
      .once("value", (snapshot) => {
        if (!snapshot.val()[value]) {
          setUrlToWordValue("결과 없음");
          return;
        }
        setUrlToWordValue(snapshot.val()[value].url);
      });
  };

  return (
    <div className="wrapper">
      <div className="headerTitle">URL to WORD</div>

      <div className="mainTitle">URL to WORD</div>
      <Search
        placeholder="URL 입력"
        allowClear
        enterButton="변환하기"
        size="large"
        onSearch={onChangeUrlToWord}
        style={{ marginBottom: 20 }}
      />
      <TextArea
        rows={4}
        readOnly
        value={wordToUrlValue}
        style={{ fontSize: 20 }}
      />

      <div style={{ marginBottom: 40 }} />

      <div className="mainTitle">WORD to URL</div>
      <Search
        placeholder="단어 입력"
        allowClear
        enterButton="변환하기"
        size="large"
        onSearch={onChangeWordToUrl}
        style={{ marginBottom: 20 }}
      />
      <TextArea
        rows={4}
        readOnly
        value={urlToWordValue}
        style={{ fontSize: 20 }}
      />
    </div>
  );
};

export default URLtoWORD;
