import React, { useState } from "react";
import { motion } from "framer-motion";

const HouseCostCalc: React.FC = () => {
  const [step, setStep] = useState(1);
  const [prevStep, setPrevStep] = useState(1); 
  const [purpose, setPurpose] = useState("");
  const [houseCost, setHouseCost] = useState(0); 
  const [houseType, setHouseType] = useState(""); 
  const [wallMaterial, setWallMaterial] = useState(""); 
  const [houseArea, setHouseArea] = useState(""); 
  const [floors, setFloors] = useState(""); 

  const handleTypeChange = (event) => setHouseType(event.target.value);
  const handleMaterialChange = (event) => setWallMaterial(event.target.value);
  const handlePurposeChange = (event) => setPurpose(event.target.value);
  const handleAreaChange = (event) => setHouseArea(event.target.value);
  const handleFloorsChange = (event) => setFloors(event.target.value);

  const calculateCost = () => {
    let baseCost = 1000000;
    
    switch (houseType) {
      case "Частный дом": baseCost += 500000; break;
      case "Таунхаус": baseCost += 300000; break;
      case "Дача": baseCost += 200000; break;
      default: break;
    }

    switch (wallMaterial) {
      case "Кирпич": baseCost += 600000; break;
      case "Дерево": baseCost += 400000; break;
      case "Пеноблоки": baseCost += 300000; break;
      default: break;
    }

    switch (purpose) {
      case "Постоянное проживание": baseCost += 500000; break;
      case "Отдых с семьей": baseCost += 300000; break;
      case "Коммерческие цели": baseCost += 700000; break;
      default: break;
    }

    switch (houseArea) {
      case "До 100 м²": baseCost += 200000; break;
      case "От 100 до 200 м²": baseCost += 400000; break;
      case "Более 200 м²": baseCost += 600000; break;
      default: break;
    }

    switch (floors) {
      case "1 этаж": baseCost += 200000; break;
      case "2 этажа": baseCost += 400000; break;
      case "3 и более этажей": baseCost += 600000; break;
      default: break;
    }

    setHouseCost(baseCost);
  };

  const handleNextStep = () => {
    if (step === 4) calculateCost(); 
    setPrevStep(step);
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setPrevStep(step);
      setStep(step - 1);
    }
  };

  const getProgressValue = () => (step - 1) * 25;

  const slideVariants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="section block-content">
      <div className="container">
        <h2 className="title-main">УЗНАЙТЕ СТОИМОСТЬ ВАШЕГО ДОМА ЗА 1 МИНУТУ</h2>
        <div className="columns is-mobile">
          <div className="column is-three-quarters">
            <progress className="progress" value={getProgressValue()} max="100">
              {getProgressValue()}%
            </progress>
          </div>
          <div className="column has-text-right">
            <span className="text-main">{step}/5</span>
          </div>
        </div>

        <motion.div
          key={step}
          initial={prevStep < step ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit={prevStep < step ? "hiddenLeft" : "hiddenRight"}
          variants={slideVariants}
          className="question"
        >
          {step === 1 && (
            <>
              <p className="mb-5">Какого типа дом вы хотите построить?</p>
              <label className="label text-main">
                <input
                  type="radio"
                  value="Частный дом"
                  checked={houseType === "Частный дом"}
                  onChange={handleTypeChange}
                />
                Частный дом
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="Таунхаус"
                  checked={houseType === "Таунхаус"}
                  onChange={handleTypeChange}
                />
                Таунхаус
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="Дача"
                  checked={houseType === "Дача"}
                  onChange={handleTypeChange}
                />
                Дача
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <p className="mb-5">Какой материал стен вы предпочитаете?</p>
              <label className="label text-main">
                <input
                  type="radio"
                  value="Кирпич"
                  checked={wallMaterial === "Кирпич"}
                  onChange={handleMaterialChange}
                />
                Кирпич
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="Дерево"
                  checked={wallMaterial === "Дерево"}
                  onChange={handleMaterialChange}
                />
                Дерево
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="Пеноблоки"
                  checked={wallMaterial === "Пеноблоки"}
                  onChange={handleMaterialChange}
                />
                Пеноблоки
              </label>
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-5">Для каких целей вы хотите построить дом?</p>
              <label className="label text-main">
                <input
                  type="radio"
                  value="Постоянное проживание"
                  checked={purpose === "Постоянное проживание"}
                  onChange={handlePurposeChange}
                />
                Для постоянного проживания
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="Отдых с семьей"
                  checked={purpose === "Отдых с семьей"}
                  onChange={handlePurposeChange}
                />
                Для отдыха с семьей
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="Коммерческие цели"
                  checked={purpose === "Коммерческие цели"}
                  onChange={handlePurposeChange}
                />
                Для коммерческих целей
              </label>
            </>
          )}

          {step === 4 && (
            <>
              <p className="mb-5">Какая площадь дома вам нужна?</p>
              <label className="label text-main">
                <input
                  type="radio"
                  value="До 100 м²"
                  checked={houseArea === "До 100 м²"}
                  onChange={handleAreaChange}
                />
                До 100 м²
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="От 100 до 200 м²"
                  checked={houseArea === "От 100 до 200 м²"}
                  onChange={handleAreaChange}
                />
                От 100 до 200 м²
              </label>
              <br />
              <label className="label text-main">
                <input
                  type="radio"
                  value="Более 200 м²"
                  checked={houseArea === "Более 200 м²"}
                  onChange={handleAreaChange}
                />
                Более 200 м²
              </label>
            </>
          )}

          {step === 5 && (
            <div className="result">
              <h3 className="text-main">Примерная стоимость вашего дома: {houseCost} руб.</h3>
            </div>
          )}
        </motion.div>

        <div className="columns">
            <div className="column is-half">
                {step > 1 && 
                    <button onClick={handlePreviousStep} className="button-back text-main">
                    <span className="icon">
                        <i className="fas fa-arrow-left"></i>
                    </span><span>Вернуться</span>
                </button>}
            </div>
            <div className="column is-half has-text-right">
            {step < 5 && 
                <button onClick={handleNextStep} className="button-next text-main">
                    <span>ДАЛЕЕ</span>
                </button>}
            </div>
        </div>
      </div>
    </section>
  );
};

export default HouseCostCalc;
