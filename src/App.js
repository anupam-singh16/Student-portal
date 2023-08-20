import React, { useEffect, useState } from "react";
import "./App.css"
const App = () => {
  const [api, setApi] = useState();
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    number:""
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
 
  useEffect(() => {
    // fetch("http://localhost:5000/")
    //   .then((data) => {
    //     return data.json();
    //   })
    //   .then((d) => {
    //     setApi(d);
    //   });
    fetch("http://localhost:5000/student")
      .then((response) => response.json())
      .then((d) => {
        console.log("login data",api)
        setApi(d);
      });
  }, []);


  console.log("api", api);
const getData = (e) =>{
  const { value, name } = e.target;

    setStudent({
      ...student,
      [name]: value,
    });
}
  const singup = async(e)=>{
    e.preventDefault();
    setShow(true)

    const { name,email, number, password } = student;

    const res = await fetch("http://localhost:5000/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({   
        name,
        email,
        number,
        password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("post data",data);
    
    });
  }
  const loginData =(e)=>{
    const { value, name } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
  }
  
  const signIn = async () =>{
    const { email,password } = login;

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({   
        email,
        password
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("login post data",data)
    });
  }

  return (
    <div className="App" >
     <h1>Student Portal </h1>
      {/* {api?.map((item, i) => {
        return (
          <div>
            <h1>{item?.name}</h1>
          </div>
        );
      })} */}
      {show ?(<> <input  type='email' name="email" placeholder="email"  onChange={loginData}  /><br/>
          <input name="password" type="password"  onChange={loginData} /><br/>
          <button onClick={signIn} >login</button>
          </>)
          :
         ( <>
          <input type='email'  name="email" onChange={getData} placeholder="email"  /><br/>
          <input name="name" onChange={getData} placeholder="name" type="text" /><br/>
          <input name="password" onChange={getData} type="password" placeholder="passowrd" /><br/>
          <input name="number" onChange={getData} placeholder='mobile number' type="number" /><br/>
          <button onClick={singup} >sign Up</button>
          </>)
      }
    </div>
  );
};

export default App;
