import React, { useState } from "react";
import styles from "@/app/components/App.module.css";
import Image from "next/image";
import WinningNumber from "./WinningNumber";

function App() {
  const [number, setNumber] = useState<number>(0);
  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [inputNumber, setInputNumber] = useState<number>(0);
  const getRandomNumber = () => {
    if (inputNumber <= 0) {
      alert("최대 숫자를 입력하세요.");
      return;
    }
    setNumber(Math.floor(Math.random() * inputNumber) + 1);
    setResultVisible(true);
  };
  const handleInputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    setInputNumber(value);
  };
  return (
    <>
      <main className={styles.main}>
        {resultVisible ? (
          <>
            <WinningNumber winningNumber={number} />
            <button
              className={styles.btn_redraw}
              onClick={() => setResultVisible(false)}
            >
              다시 추첨하기
            </button>
          </>
        ) : (
          <>
            <Image
              src="https://fem.encar.com/assets/images/login/logo_ENCAR.svg"
              width={100}
              height={50}
              alt="encar logo"
            />
            <h1 className={styles.title}>엔카 리조트 추첨</h1>
            <div className={styles.wrap_input}>
              <label htmlFor="maxNumber" className={styles.label}>
                리조트 당첨 숫자 입력
              </label>
              <input
                type="text"
                id="maxNumber"
                name="maxNumber"
                className={styles.input_number}
                min="1"
                onChange={handleInputNumber}
                placeholder="최대 숫자를 입력하세요"
              />
            </div>
            <div className={styles.area_btn}>
              <button className={styles.btn_lottery} onClick={getRandomNumber}>
                번호 추첨하기
              </button>
            </div>
          </>
        )}
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/gimdongwon" target="_blank">
          made by winter1(FE2팀 김동원)
        </a>{" "}
        ||{" "}
        <a href="https://github.com/gimdongwon/resort-lottery" target="_blank">
          source code
        </a>
        <br />
        조작 방지를 위해 소스코드 첨부합니다
      </footer>
    </>
  );
}

export default App;
