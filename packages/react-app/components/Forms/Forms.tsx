import { FormEvent, useRef, useState } from "react";
import styles from "./Forms.module.scss";

const API_KEY = "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";

const Forms = () => {
  const [chatAnswer, setChatAnswer] = useState("");

  const electricityInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const enteredElectricity = electricityInputRef.current?.value;

    const question = `Chat, I consume ${enteredElectricity} kWh of electricity per month. How much carbon dioxide do I emit?`;

    console.log(question);

    // const response = await fetch("https://api.openai.com/v1/completions", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "text-davinci-003",
    //     prompt: question,
    //   }),
    // });
    // const data = await response.json();
    // setChatAnswer(data.choices[0].text);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>Calculate your carbon footprint</h1>
      </header>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="electricity">
              How many kWh do you consume on average per month?
            </label>
            <input
              type="number"
              name="electricity"
              id="electricity"
              placeholder="On average, I consume..."
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="renewable">
              How much of this is renewable energy?
            </label>
            <select id="renewable">
              <option value="0">0%</option>
              <option value="25">25%</option>
              <option value="50">50%</option>
              <option value="75">75%</option>
              <option value="100">100%</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="electricity">
              How many kWh do you consume on average per month?
            </label>
            <input
              type="number"
              name="electricity"
              id="electricity"
              placeholder="On average, I consume..."
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="electricity">
              How much of this is renewable energy?
            </label>
            <select>
              <option value="0">0%</option>
              <option value="25">25%</option>
              <option value="50">50%</option>
              <option value="75">75%</option>
              <option value="100">100%</option>
            </select>
          </div>
        </div>
        
        <button type="submit">Calculate</button>
      </form>
      {/* {chatAnswer && <p>{chatAnswer}</p>} */}
    </>
  );
};

export default Forms;
