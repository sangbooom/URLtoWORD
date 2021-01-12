import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "./URLtoWORD.css";
import firebase from "./firebase";
import { Helmet } from "react-helmet";

const { Search, TextArea } = Input;
const MAX_NUMBER: number = 99;
const wordArray: string[] = ["사과", "수박", "딸기", "참외", "당근", "멜론"];
let numberArray: number[] = [];
for (let i = 0; i <= MAX_NUMBER; i++) {
  numberArray.push(i);
}

const URLtoWORD: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [urlToWordValue, setUrlToWordValue] = useState<string>("");
  const [wordToUrlValue, setWordToUrlValue] = useState<string>("");
  const [urlValue, setUrlValue] = useState<string>("");

  useEffect((): void => {
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

  useEffect((): void => {
    if (data) {
      firebase.database().ref("datas").child(data).set({
        url: urlValue,
        word: data,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
      setWordToUrlValue(`'${data}' (으)로 변환되었습니다.`);
    }
    // eslint-disable-next-line
  }, [data]);

  const onChangeUrlToWord = (value: string) => {
    setUrlValue(value);
    firebase
      .database()
      .ref("datas")
      .once("value", (snapshot) => {
        let datas_length: number = snapshot.val()
          ? Object.keys(snapshot.val()).length
          : 0;
        setData(
          wordArray[Math.floor(datas_length / MAX_NUMBER) % wordArray.length] +
            numberArray[datas_length % MAX_NUMBER]
        );
      });
  };

  const onChangeWordToUrl = (value: string) => {
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>URL to WORD</title>
      </Helmet>
      <div className="headerTitle">URL to WORD</div>

      <Helmet>
        <title>URL to WORD</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
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

      <Helmet>
        <title>WORD to URL</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
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
