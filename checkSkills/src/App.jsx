import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const string = "Hello world 204";
  const int = 204;
  const bool = true;
  const variable = () => {
    console.log(string, int, bool);
    console.log(typeof string, typeof int, typeof bool);

    //แปลงชนิดข้ิอมูล

    console.log(parseInt("10"));
    console.log(parseFloat("3.14"));
    const toString = int.toString();
    console.log(toString, typeof toString);
  };

  // tuple object array
  const objectArray = () => {
    let object = [
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
  };

  const [bgColor, setBgColor] = useState("white");
  const changeColorBackground = () => {
    console.log(bgColor);
    setBgColor(bgColor === "red" ? "white" : "red");
    document.body.style.backgroundColor = bgColor;
  };

  const [isHidden, setIsHidden] = useState(false);
  const showText = () => {
    setIsHidden(!isHidden);
  };

  const ageCal = () => {
    const age = Math.round(document.getElementById("age").value);
    const ageOutput = document.getElementById("ageOutput");
    const oddEven = document.getElementById("oddEven");
    if (age <= 18) {
      ageOutput.innerHTML = "เด็ก";
    } else if (age > 18 && age <= 50) {
      ageOutput.innerHTML = "วัยรุ่น";
    } else if (age > 50) {
      ageOutput.innerHTML = "ผู้ใหญ่";
    }

    if (age % 2 === 0) {
      oddEven.innerHTML = "เป็นเลขคู่";
    } else {
      oddEven.innerHTML = "เป็นเลขคี่";
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

  try {
    let result = 10 / a; // โค้ดที่อาจเกิดข้อผิดพลาด
    console.log(result);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  }

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

  const [bubbleSort, setBubbleSort] = useState([]);
  const pushData = () => {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(Math.round(Math.random() * 1000));
    }
    setBubbleSort((prev) => [...prev, ...array]);
    console.log(array);
  };

  const bubbleSortFunc = () => {
    let sortDummy = [...bubbleSort];
    let temp;
    let size = bubbleSort.length;
    for (let i = 0; i < size - 1; i++) {
      for (let j = 0; j < size - i - 1; j++) {
        // ตำแหน่ง 1 - 2
        if (sortDummy[j] > sortDummy[j + 1]) {
          // 10 - 4
          temp = sortDummy[j]; // temp = 10
          sortDummy[j] = sortDummy[j + 1]; // ตำแหน่ง1 = 4
          sortDummy[j + 1] = temp; // ตำแหน่ง2 = 10
        }
      }
    }
    setBubbleSort(sortDummy);
    console.log(bubbleSort);
  };

  //----------------------------------------------------------------------------
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");

  // บันทึกข้อมูลลง LocalStorage ทุกครั้งที่ tasks เปลี่ยน
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("LocalStorage Updated:", localStorage.getItem("tasks"));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  //---------------------------------------------------------------
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]); // ใช้ state ใหม่สำหรับข้อมูลใหม่

  useEffect(() => {
    if (newData.length === 0) return; // ถ้าไม่มีข้อมูลใหม่ให้ return

    fetch("http://localhost:3000/update-json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData), // ส่งเฉพาะข้อมูลใหม่
    })
      .then((res) => res.text())
      .then((response) => {
        console.log(response);
        setData((prevData) => [...prevData, ...newData]); // เพิ่มข้อมูลใหม่ลงใน data หลังส่งไปแล้ว
        setNewData([]); // เคลียร์ newData หลังจากส่งแล้ว
      });
  }, [newData]);

  useEffect(() => {
    fetch("http://localhost:3000/get-json")
      .then((res) => res.json())
      .then((response) => setData(response));
  }, []);

  //git add . || git add <file>
  //git commit -m "comment"
  //git push

  //git pull
  //git checkout -b [name_of_your_new_branch]
  //git push origin [name_of_your_new_branch]
  //git branch -a
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
            <hr />
            {isHidden && <h1>Hidden</h1>}
            <hr />
            <div className="var-obj">
              <button onClick={() => variable()}>variable</button>
              <button onClick={() => objectArray()}>object array</button>
            </div>
            <hr />
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
            <hr />

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
              <p>{">= 18"} = เด็ก</p>
              <p>{"< 18 && >= 50"} = วัยรุ่น</p>
              <p>{"> 50"} = ผู้ใหญ่</p>
            </div>
            <div>
              <label htmlFor="">AGE : </label>
              <input type="number" id="age" />
              <button onClick={() => ageCal()}>Age</button>
              <h1 id="ageOutput"></h1>
              <h1 id="oddEven"></h1>
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
              <h1>Bubble Sort</h1>
              <div className="bubbleSort">
                {bubbleSort.map((item, index) => (
                  <div key={index}>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => pushData()}>เพิ่มข้อมูล 100 ตัว</button>
              &nbsp;
              &nbsp;
              <button onClick={() => bubbleSortFunc()}>เรียงข้อมูล</button>
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
            <hr />

            <div>
              <h2>To-Do List</h2>
              <div style={{ border: "0px" }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="เพิ่มงานใหม่..."
                  style={{ fontSize: "1.5rem" }}
                />
                <button onClick={addTask} style={{ fontSize: "1.5rem" }}>
                  เพิ่ม
                </button>
              </div>
              <div id="app-todos">

              {tasks.map((task, index) => (
                <div key={index} className="todos" style={{ border: "0px" }}>
                  <div id="checkBox" style={{backgroundColor: task.completed ? "rgb(146, 226, 146)" : ""}} onClick={() => toggleComplete(index)}>{task.completed ? "✅" : "❌"}</div>
                  <p style={{ fontSize: "1.5rem" , textDecoration: task.completed ? "line-through" : "none"}}>{task.text}</p>

                  {/* <button
                      onClick={() => toggleComplete(index)}
                      style={{
                        backgroundColor: task.completed ? "red" : "green",
                        fontSize: "1.5rem",
                        }}
                        >
                        {task.completed ? "ยกเลิก" : "ทำเสร็จแล้ว"}
                        </button> */}
                  <button id="delete" onClick={() => removeTask(index)}>ลบ</button>
                </div>
              ))}
              </div>
            </div>
            <hr />

            <div>
              <h2>แสดงข้อมูลจาก JSON</h2>
              <pre style={{ fontSize: "1.5rem" }}>
                {JSON.stringify(data, null, 2)}
              </pre>
              <button onClick={() => setNewData([{ name: "Alice", age: 25 }])}>
                เพิ่ม Alice
              </button>
              <button onClick={() => setNewData([{ name: "Bob", age: 30 }])}>
                เพิ่ม Bob
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
