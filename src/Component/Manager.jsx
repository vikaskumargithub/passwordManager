import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    // let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
    // else{
    //   passwordArray=[]
    // }
  }, []);

  const copyText = (text) => {
    toast("copy from clipbord", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: "Bounce",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = () => {
    setpasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    console.log([...passwordArray, form]);
    setform({ site: "", username: "", password: "" })

    toast("password Saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: "Bounce",
    });
  };
  const deletePassword = (id) => {
      console.log("delete this password",id);
      let c = confirm("Do you really want to delete this password");
      if (c) {
        
        setpasswordArray(passwordArray.filter(item=>item.id!==id));
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
        toast("password deleted ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: "Bounce",
        });

      }
      // console.log([...passwordArray, form]);
  };

  const editPassword = (id) => {
    console.log("edit this password",id);
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id));
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // console.log([...passwordArray, form]);
};
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="bounce"
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="md:mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          pass
          <span className="text-green-500 ">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row  w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter User Name"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 rounded-full px-8 py-2 w-fit hover:bg-green-400 border  border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwods">
          <h2 className="font-bold text-2xl py-4">Your password</h2>
          {passwordArray.length === 0 && <div>No passwods to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" flex items-center justify-center py-2 border border-white text-center ">
                        <div className=" flex items-center justify-center">
                          <span>{item.site}</span>

                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingLeft: "2px",
                                paddingTop: "3px",
                              }}
                              icon={faCopy}
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32 ">
                        <div className=" flex items-center justify-center">
                          <span>{item.username}</span>

                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingLeft: "2px",
                                paddingTop: "3px",
                              }}
                              icon={faCopy}
                            />
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32 ">
                        <div className=" flex items-center justify-center">
                          <span>{item.password}</span>

                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                width: "20px",
                                height: "20px",
                                paddingLeft: "2px",
                                paddingTop: "3px",
                              }}
                              icon={faCopy}
                            />
                          </div>
                        </div>
                      </td>

                      <td className=" py-2 border border-white text-center w-32 ">
                        <span className="cursor-pointer mx-2" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/zfzufhzk.json"
                            trigger="hover"
                           style={{width:"25px",height:"25px"}}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-2" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/hjbrplwk.json"
                            trigger="hover"
                           style={{width:"25px",height:"25px"}}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
