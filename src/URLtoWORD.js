import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "./URLtoWORD.css";
import firebase from "./firebase";

const { Search, TextArea } = Input;
const wordArray = ["사과","수박","딸기","참외","귤","포도","자몽","바나나","멜론","체리","레몬","망고","키위","석류"];
let nummberArray = [];
for(let i=0; i<=2; i++){
    nummberArray.push(i);
}

const URLtoWORD = () => {
  const [datas, setDatas] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [urlToWordValue, setUrlToWordValue] = useState("");
  const [wordToUrlValue, setWordToUrlValue] = useState("");
  const [numberIndex, setNumberIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // 초기값 데이터베이스에 생성
  // useEffect(()=>{
  //   firebase.database().ref("currentIndex").set({
  //     word: 0,
  //     number: 0,
  //   });
  // },[]);

  // useEffect(() => {
  //   setLoading(true);
  //   //데이터베이스에서 값 읽기
  //   firebase
  //     .database()
  //     .ref("currentIndex")
  //     .once("value", (snapshot) => {
  //       console.log(snapshot.val());
  //       // if(snapshot.val().number === 100){
  //       //   setDatas(
  //       //     wordArray[snapshot.val().word+1] + nummberArray[0]
  //       //   );
  //       //   setWordIndex(snapshot.val().word+1);
  //       //   setNumberIndex(0);
  //       //   return;
  //       // }

  //       setDatas(
  //         wordArray[snapshot.val().word] + nummberArray[snapshot.val().number]
  //       );
  //       setWordIndex(snapshot.val().word);
  //       setNumberIndex(snapshot.val().number);
  //     });
  // }, []);

  useEffect(() => {
    console.log(datas);
    setLoading(false);
  }, [datas]);

  const onChangeUrlToWord = (value) => {
    // 데이터베이스에 저장
    firebase.database().ref("datas").child(datas).set({
      url: value,
      word: datas,
    });
    // currentIndex.number++ , 만약 100이면 %100하고 currentIndex.word++
    setWordToUrlValue(datas);
    setNumberIndex(numberIndex + 1);
    
  };

  useEffect(()=>{
    firebase.database().ref("currentIndex").set({
      word: wordIndex,
      number: numberIndex,
    },(error) => {
      if (error) {
        console.log(error);
      } else {
        // Data saved successfully!
        firebase
      .database()
      .ref("currentIndex")
      .once("value", (snapshot) => {
        console.log(snapshot.val());
        if(snapshot.val().number === 2){
          setDatas(
            wordArray[snapshot.val().word+1] + nummberArray[0]
          );
          setWordIndex(snapshot.val().word+1);
          setNumberIndex(0);
          return;
        }

        setDatas(
          wordArray[snapshot.val().word] + nummberArray[snapshot.val().number]
        );
        setWordIndex(snapshot.val().word);
        setNumberIndex(snapshot.val().number);
      });
      }
    });
  },[numberIndex,wordIndex])

  useEffect(()=>{
    console.log(numberIndex);
  },[numberIndex])

  const onChangeWordToUrl = (value) => {
    //firebase 데이터베이스에서 가져옴
    // word에 맞는 url 가져오기
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

  if (isLoading) {
    return <div>{"로딩중입니다"}</div>;
  }

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
      <TextArea rows={4} readOnly value={wordToUrlValue} />

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
