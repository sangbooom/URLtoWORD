/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import firebase from "../../firebase";
import { Helmet } from "react-helmet";
import {
  Wrapper,
  Header_title,
  Content_title,
  Content_textArea,
  Footer_container,
  Footer,
  Footer_svg,
} from "./style";

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
        return;
      });
  };

  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>URL to WORD</title>
      </Helmet>
      <Header_title>URL to WORD</Header_title>

      <Helmet>
        <title>URL to WORD</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Content_title>URL to WORD</Content_title>
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
      <Content_title>WORD to URL</Content_title>
      <Search
        placeholder="단어 입력"
        allowClear
        enterButton="변환하기"
        size="large"
        onSearch={onChangeWordToUrl}
        style={{ marginBottom: 20 }}
      />
      <Content_textArea>
        <a href={urlToWordValue} target="_blank" rel="noreferrer noopener">
          <div>{urlToWordValue}</div>
        </a>
      </Content_textArea>

      <Footer_container>
        <Footer
          href="https://github.com/sangbooom/URLtoWORD"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Footer_svg
            height="24"
            viewBox="0 0 16 16"
            version="1.1"
            width="24"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </Footer_svg>
          <span>By @sangbooom</span>
        </Footer>
      </Footer_container>
    </Wrapper>
  );
};

export default URLtoWORD;
