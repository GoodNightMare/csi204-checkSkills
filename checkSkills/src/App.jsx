import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const string = "Hello world 204";
  const int = 204;
  const bool = true;
  console.log(string, int, bool);
  console.log(typeof string, typeof int, typeof bool);

  //แปลงชนิดข้ิอมูล

  console.log(parseInt("10"));
  console.log(parseFloat("3.14"));
  const toString = int.toString();
  console.log(toString);

  // tuple object array
  const object = [
    {
      name: "John",
      age: 30,
      city: "New York",
    },
    {
      name: "Jane",
      age: 25,
      city: "San Francisco",
    },
    {
      name: "Bob",
      age: 40,
      city: "Los Angeles",
    },
  ];

  console.log(object.push({ name: "night", age: 20, city: "thailand" }));
  console.log(object.push({ name: "night", age: 20, city: "thailand" }));
  console.log(object.push({ name: "night", age: 20, city: "thailand" }));
  console.log(object[3].name, object[3].age, object[3].city);
  console.log(object.shift()); //ลบหน้า
  console.log((object[1].name = "tim"));
  console.table(object);

  const uniquePeople = Array.from(
    new Set(object.map(JSON.stringify)) // แปลงเป็น string ก่อน // Set ไม่เอาค่าซ้ำ
  ).map(JSON.parse); // แปลงกลับเป็น object
  console.table(uniquePeople);

  const [bgColor, setBgColor] = useState("white");
  const changeColorBackground = () => {
    setBgColor(bgColor === "red" ? "white" : "red");
  };

  const [isHidden, setIsHidden] = useState(false);
  const showText = () => {
    setIsHidden(!isHidden);
  };

  const ageCal = () => {
    const age = document.getElementById("age").value;
    const ageOutput = document.getElementById("ageOutput");
    if (age <= 18) {
      ageOutput.innerHTML = "เด็ก";
    } else if (age > 18 && age < 50) {
      ageOutput.innerHTML = "วัยรุ่น";
    } else if (age <= 50) {
      ageOutput.innerHTML = "ผู้ใหญ่";
    }

    if (age % 2 === 0) {
      ageOutput.innerHTML += ", เป็นเลขคู่";
    } else {
      ageOutput.innerHTML += ", เป็นเลขคี่";
    }
  };

  const whileLoop = () => {
    const inputWhileloop = document.getElementById("inputWhileloop");
    const outputWhileloop = document.getElementById("outputWhileloop");
    while (true) {
      if (inputWhileloop.value === "exit") {
        console.log(inputWhileloop.value);
        outputWhileloop.innerHTML = "ออกจากการทํางาน";
        return;
      } else {
        console.log(inputWhileloop.value);
        outputWhileloop.innerHTML += inputWhileloop.value + " ";
        break;
      }
    }
  };

  const factoria = (n) => {
    let result = 1;
    for (let i = 1; i <= n; i++) {
      result *= i;
    }
    document.getElementById("outputFactoria").innerHTML = result;
  };

  const fibonacci = (n) => {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const [calGrade, setCalGrade] = useState([
    { sub: "CSI101", credit: 3, score: 0, grade: "-" },
    { sub: "CSI102", credit: 3, score: 0, grade: "-" },
    { sub: "CSI203", credit: 3, score: 0, grade: "-" },
    { sub: "CSI204", credit: 3, score: 0, grade: "-" },
    { sub: "CSI305", credit: 3, score: 0, grade: "-" },
  ]);

  const [gpa, setGPA] = useState(null);

  const handleScoreChange = (index, value) => {
    const newCalGrade = [...calGrade];
    newCalGrade[index].score = value;
    setCalGrade(newCalGrade);
  };

  const calGPA = () => {
    const newCalGrade = calGrade.map((item) => {
      let grade = "-";
      const score = Number(item.score); // แปลงเป็นตัวเลข

      if (score >= 80) grade = "4";
      else if (score >= 75) grade = "3.5";
      else if (score >= 70) grade = "3";
      else if (score >= 65) grade = "2.5";
      else if (score >= 60) grade = "2";
      else if (score >= 55) grade = "1.5";
      else if (score >= 50) grade = "1";
      else grade = "0"; // เปลี่ยน "F" เป็น 0

      return { ...item, grade };
    });

    setCalGrade(newCalGrade);

    // คำนวณ GPA
    const totalCredit = newCalGrade.reduce(
      (total, item) => total + item.credit,
      0
    );
    const totalScore = newCalGrade.reduce(
      (total, item) => total + parseFloat(item.grade) * item.credit,
      0
    );
    const gpaValue = totalScore / totalCredit;
    setGPA(gpaValue.toFixed(2)); // อัปเดต GPA
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [lottery, setLottery] = useState("000000");
  const [lotteryOutput, setLotteryOutput] = useState("");
  const lotteryRandom = () => {
    const input = document.getElementById("inputLottery");
    const output = document.getElementById("outputLottery");

    const random = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    setLottery(random);
    output.style.display = "block";
    if (parseInt(input.value) === parseInt(random)) {
      setLotteryOutput("ถูกต้อง");
    } else {
      setLotteryOutput("ถูกกิน");
    }
    console.log(input.value, parseInt(lottery));
  };

  //อานและเขียนไฟล JSON โดยใช json.loads() และ json.dumps()
  // เขียนโปรแกรม Bubble Sort หรือ Selection Sort
  //  ใช JavaScript สราง Array มีขนาด 100 ชอง Random ตัวเลขแลวเรียงลำดับขอมูล

  //git add . || git add <file>
  //git commit -m "comment"
  //git push
  return (
    <>
      <div id="app204">
        <div className="title">
          <h1>{string}</h1>
        </div>
        <div className="main">
          <div className="sideBar">
            <div>
              <button onClick={() => changeColorBackground()}>
                Change Color Background
              </button>
            </div>
            <div>
              <button onMouseOver={() => changeColorBackground()}>
                onMouseOver
              </button>
            </div>
            <div>
              <input type="text" onKeyUp={() => changeColorBackground()} />
            </div>
            <div>
              <button id="showText" onClick={() => showText()}>
                Show Text
              </button>
            </div>
          </div>
          <div className="content">
            <h1>นายนนท์ธีร์ ปานะถึก</h1>
            <h2>รหัสนักศึกษา : 66073169</h2>
            {isHidden && <h1>Hidden</h1>}
            <div>
              <form action="" id="form">
                <div>
                  <label htmlFor="">Name : </label>
                  <input type="text" id="name" />
                </div>
                <div>
                  <label htmlFor="">Email : </label>
                  <input type="text" id="email" />
                </div>
              </form>
              <div id="submit">
                <button
                  onClick={() => {
                    const name = document.getElementById("name").value;
                    const email = document.getElementById("email").value;
                    // ตรวจสอบว่าอีเมลมีเครื่องหมาย @ และ .com
                    const emailPattern =
                      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    if (!emailPattern.test(email)) {
                      alert("กรุณากรอกอีเมลที่ถูกต้อง (ต้องมี @ และ .com)");
                    } else {
                      console.log(name, email);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>

            {/*
            
              start
                display "โปรแกรมคำนวณพื้นที่วงกลม"

                display "ป้อนค่ารัศมี"
                input รัศมี
                pi = 3.14

                result = pi * radius * radius

                display "พื้นที่วงกลม = " + result
              end

             */}
            <div>
              <label htmlFor="">Radius : </label>
              <input type="number" id="radius" />
              <button
                onClick={() => {
                  const radius = document.getElementById("radius").value;
                  const area = 3.14 * radius ** 2;
                  document.getElementById("output").innerHTML = area;
                }}
              >
                Area
              </button>
              <h1 id="output"></h1>
            </div>
            <hr />
            <div>
              <label htmlFor="">AGE : </label>
              <input type="number" id="age" />
              <button onClick={() => ageCal()}>Age</button>
              <h1 id="ageOutput"></h1>
            </div>
            <hr />
            <div>
              <label htmlFor="">For loop : </label>
              <button
                onClick={() => {
                  const outputForloop =
                    document.getElementById("outputForloop");
                  for (let i = 1; i <= 10; i++) {
                    outputForloop.innerHTML += i + " ";
                  }
                }}
              >
                Click
              </button>
              <h1 id="outputForloop"></h1>

              <label htmlFor="">While loop : exit</label>
              <input type="text" id="inputWhileloop" />
              <button onClick={() => whileLoop()}>Click</button>
              <h1 id="outputWhileloop"></h1>
            </div>
            <hr />
            <div>
              <label htmlFor="">Factoria : </label>
              <input type="number" id="factoria" />
              <button
                onClick={() => {
                  const n = document.getElementById("factoria").value;
                  factoria(n);
                }}
              >
                Click
              </button>
              <h1 id="outputFactoria"></h1>

              <label htmlFor="">Fibonacci : </label>
              <input type="text" id="fibonacci" />
              <button
                onClick={() => {
                  const n = document.getElementById("fibonacci").value;
                  const result = fibonacci(n);
                  document.getElementById("outputFibonacci").innerHTML = result;
                }}
              >
                Click
              </button>
              <h1 id="outputFibonacci"></h1>
            </div>
            <hr />
            <div className="table">
              <table border="1" id="gradeTable">
                <thead>
                  <tr>
                    <th>รหัสวิชา</th>
                    <th>คะแนนที่ได้</th>
                    <th>จำนวนหน่วยกิต</th>
                    <th>เกรดที่ได้</th>
                  </tr>
                </thead>
                <tbody>
                  {calGrade.map((item, index) => (
                    <tr key={index}>
                      <td>{item.sub}</td>
                      <td>
                        <input
                          type="number"
                          value={item.score}
                          onChange={(e) =>
                            handleScoreChange(index, e.target.value)
                          }
                        />
                      </td>
                      <td>{item.credit}</td>
                      <td>{item.grade}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>GPA</td>
                    <td>
                      <button
                        style={{ width: "100%", fontSize: "1.5rem" }}
                        onClick={() => {
                          calGPA();
                        }}
                      >
                        คํานวณ
                      </button>
                    </td>
                    <td></td>
                    <td>{gpa}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr />
            <div>
              <h1>JSONPladeHolder</h1>
              <div id="jsonUsers">
                {users.map((user) => (
                  <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.username}</p>
                    <p>{user.phone}</p>
                    <p>{user.email}</p>
                    <p>{user.website}</p>
                    <p>{user.address.street}</p>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <h1>ระบบสุ่มหวย</h1>
              <label htmlFor="">กรอกเลข 6 ตัว : </label>
              <input
                type="number"
                id="inputLottery"
                maxLength={6}
                onInput={(e) => {
                  if (e.target.value.length > 6) {
                    e.target.value = e.target.value.slice(0, 6);
                  }
                }}
              />
              <h1 style={{ letterSpacing: "5px" }}>{lottery}</h1>
              <h1 id="outputLottery" style={{ display: "none" }}>
                {lotteryOutput}
              </h1>
              <button
                style={{ fontSize: "1.5rem", padding: "10px 50px" }}
                onClick={() => lotteryRandom()}
              >
                สุ่ม
              </button>
            </div>
          </div>
        </div>
        <div className="footer">
          <h3>จัดทำโดย นายนนท์ธีร์ ปานะถึก รหัสนักศึกษา 66073169</h3>
        </div>
      </div>
    </>
  );
}

export default App;
