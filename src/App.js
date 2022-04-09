import "./App.css";
import { useEffect } from "react";
import React from "react";
import { useForm } from "react-hook-form";
const axios = require("axios");

const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="both">Both</option>
      <option value="boys">Male</option>
      <option value="girls">Female</option>
    </select>
  </>
));


const boys = [
  "Aswin",
  "Arivu",
  "Anbu selvan",
  "Anbu arasan",
  "Arunesh",
  "Aravindaraman",
  "Ajay",
  "Agatheesh",
  "Aziz",
  "Deva",
  "Domnic",
  "Elamparuthi",
  "Elanchezhiyan",
  "Fysel",
  "Kamalesh V",
  "Kamalesh W",
  "Jayaram",
  "Gokul",
  "Andrew",
  "Roshan",
  "Dixson",
  "Deepak",
  "Babu",
  "Kalai",
  "Jana",
  "Ganapathi",
  "Jaddu",
  "Balaji",
  "Jayanthan",
  "Joseph",
].sort();

const girls = [
  "Jeni",
  "Gomathi",
  "Anju",
  "Gosh",
  "Deepika N",
  "Deepika M",
  "Abirami",
  "Hari priya",
  "Andal",
  "Devika",
  "Haridha",
  "Akshaya",
  "Bala abirami",
  "Heffina",
  "Bridha",
  "Kanimozhi",
  "Ashmine",
  "Leona",
  "Binu",
].sort();

function App() {
  const apiKey = "E11138BE-B7E8-11EC-8FB3-A5BEAA92D621";
  const api = "https://api.strawpoll.com/v2/polls";
  const { register, handleSubmit } = useForm();

  const postPolling = async(nameList,data) => {
        const payload = {
        type: "multiple_choice",
        title: data.title,
        poll_meta: { description: data.description, location: "" },
        media: { path: null },
        poll_options: nameList,
        poll_config: {
          is_private: 1,
          allow_comments: 1,
          is_multiple_choice: 0,
          multiple_choice_min: null,
          multiple_choice_max: null,
          require_voter_names: 0,
          duplication_checking: "ip",
          deadline_at: null,
          status: "draft",
        },
      };

      const header = {
        headers: {
          "X-API-KEY": apiKey,
        },
      };

      const response = await axios.post(api, payload, header);
      console.log("Response", response);
    };

  const getPollOption = (type) => {
    if (type === "boys") {
      return boys.map((name) => {
        return {
          value: name,
        };
      });
    } else if (type === "girls") {
      return girls.map((name) => {
        return {
          value: name,
        };
      });
    } else {
      const names = [...boys, ...girls];
      return names.sort().map((name) => {
        return {
          value: name,
        };
      });
    }
  };

  const onSubmit = (data) => {
    const pollOption = getPollOption(data.type);
    postPolling(pollOption,data);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Title"
          {...register("title", { required: true })}
        ></input>
        <input
          placeholder="Description"
          {...register("description", { required: false })}
        ></input>
        <Select
          label="Question for"
          {...register("type", { required: true })}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default App;
