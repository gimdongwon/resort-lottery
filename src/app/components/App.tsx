import React, { useState } from "react";
import styles from "@/app/components/App.module.css";

function App() {
  const [number, setNumber] = useState<number>(0);
  const [inputNumber, setInputNumber] = useState<number>(0);
  const getRandomNumber = () => {
    if (inputNumber <= 0) {
      alert("최대 숫자를 입력하세요.");
      return;
    }
    setNumber(Math.floor(Math.random() * inputNumber) + 1);
  };
  const handleInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    setInputNumber(value);
  };
  return (
    <main className={styles.main}>
      <h1>엔카 리조트 추첨</h1>
      <div>
        <label htmlFor="maxNumber" className={styles.label}>
          리조트 당첨 숫자
        </label>
        <input
          type="text"
          id="maxNumber"
          name="maxNumber"
          min="1"
          onChange={handleInputNumber}
        />
        <button className={styles.btn_lottery} onClick={getRandomNumber}>
          번호 추첨하기
        </button>
        <p>당첨번호 {number}</p>
      </div>
    </main>
  );
}

export default App;
