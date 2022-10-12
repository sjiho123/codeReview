import * as Hangul from "hangul-js";

export default function App() {
  const check = (han) => {
    if (
      [
        "ㄱ",
        "ㄴ",
        "ㄷ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅅ",
        "ㅇ",
        "ㅈ",
        "ㅊ",
        "ㅋ",
        "ㅍ",
        "ㅌ",
        "ㅎ"
      ].find((ele) => ele === han)
    ) {
      return "ja";
    } else if (
      ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ", "ㅐ", "ㅔ"]
    ) {
      return "mo";
    } else {
      return "error";
    }
  };

  const getKrpp = (body, josa) => {
    const Hangul = require("hangul-js"); // 한글을 분해시켜주는 라이브러리 ex) 김 => [ㄱ,ㅣ,ㅁ]
    let checkBody = Hangul.disassemble(body); //body값을 분해하여 배열화시켜 담아놓음
    let mojosa = ""; //body값이 모음이 마지막일 경우 들어갈 조사
    let jajosa = ""; //body값이 자음이 마지막일 경우 들어갈 조사
    let exceptionJosa = ""; //예외 조사

    let checkJosa = [
      ["이", "가"],
      ["으로써", "로써"],
      ["와", "과"],
      ["을", "를"],
      ["으로서", "로서"],
      ["으로", "로"],
      ["은", "는"]
    ];

    // 매칭되는 조사값을 담아둠
    checkJosa.map((data) => {
      if (data.indexOf(josa) > -1) {
        jajosa = data[0];
        mojosa = data[1];
        exceptionJosa =
          Hangul.disassemble(mojosa)[0] + Hangul.disassemble(mojosa)[1];
        console.log(exceptionJosa, mojosa);
      }
    });

    //body의 마지막 값이 자음일경우
    if (check(checkBody[checkBody.length - 1]) === "ja") {
      console.log(body + jajosa);
      if (
        checkBody[checkBody.length - 1] === "ㄹ" &&
        exceptionJosa === "ㄹㅗ"
      ) {
        return body + mojosa;
      }
      return body + jajosa;
      //body의 마지막 값이 모음일경우
    } else if (check(checkBody[checkBody.length - 1]) === "mo") {
      console.log(body + mojosa);
      return body + mojosa;
    }
  };
  return (
    <div>
      {getKrpp("지호", "을")}
      <br />
      {getKrpp("지호", "으로써")}
      <br />
      {getKrpp("지호", "이")}
    </div>
  );
}
