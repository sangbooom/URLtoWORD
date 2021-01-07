import React, { useState } from "react";
import { Input } from "antd";
import "./URLtoWORD.css";

const { Search, TextArea } = Input;
// const wordArray = ["사과","수박","딸기","참외","귤","포도","자몽","감귤","멜론","체리","레몬","망고","키위","석류","자두","앵두","매실","모과","살구","대추","쥐","소","말","양","강아지","고양이"];
// let nummberArray = [];
// for(let i=0; i<1000; i++){
//     nummberArray.push(i);
// }
const onSearch = (value) => {
    console.log(value);
    //firebase 데이터베이스에 저장 

  // url: https://ant.design/components/input/
  // word: 수박12

    //firebase 데이터베이스에서 가져옴 
    // word에 맞는 url 가져오기
};

const URLtoWORD = () => {
  return (
    <div className="wrapper">
      <div className="headerTitle">URL to WORD</div>

      <div className="mainTitle">URL to WORD</div>
      <Search
        placeholder="URL 입력"
        allowClear
        enterButton="변환하기"
        size="large"
        onSearch={onSearch}
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
        onSearch={onSearch}
        style={{ marginBottom: 20 }}
      />
      <TextArea rows={4} readOnly value={"asd"} />
    </div>
  );
};

export default URLtoWORD;
