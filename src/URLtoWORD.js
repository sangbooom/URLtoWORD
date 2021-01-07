import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "./URLtoWORD.css";
import firebase from "./firebase";

const { Search, TextArea } = Input;
// const wordArray = ["사과","수박","딸기","참외","귤","포도","자몽","감귤","멜론","체리","레몬","망고","키위","석류","자두","앵두","매실","모과","살구","대추","쥐","소","말","양","강아지","고양이"];
// let nummberArray = [];
// for(let i=0; i<1000; i++){
//     nummberArray.push(i);
// }

const URLtoWORD = () => {
  const [changedWord, setChangedWord] = useState("");
  const [datas] = useState([]);
  const [count, setCount] = useState(0);
  const [urlToWordValue, setUrlToWordValue] = useState("");
  const [wordToUrlValue, setWordToUrlValue] = useState("");

  const onChangeUrlToWord = (value) => {
    //firebase 데이터베이스에 저장
    firebase.database().ref("datas").child("수박13").set({
      url: value,
      word: "수박13",
    }); //////////////////////////// 수박13을 랜덤값으로 바꾸기
  };

  const onChangeWordToUrl = (value) => {
    //firebase 데이터베이스에서 가져옴
    // word에 맞는 url 가져오기
    firebase
      .database()
      .ref("datas")
      .once("value", (snapshot) => {
        if (!snapshot.val()[value]) {
          console.log("결과 없음");
          setUrlToWordValue("결과 없음");
          return;
        }
        setUrlToWordValue(snapshot.val()[value].url);
        // setCount(Object.keys(snapshot.val()).length);
        // console.log(count)
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
      <TextArea rows={4} readOnly value={"asd"} />

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
      <TextArea rows={4} readOnly value={urlToWordValue} />
    </div>
  );
};

export default URLtoWORD;
