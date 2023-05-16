import React, { useState } from 'react';
import './prof.css';

const ProfessionsList = () => {
  const [selectedProfession, setSelectedProfession] = useState(null);

  const handleSelectProfession = (profession) => {
    setSelectedProfession(profession);
  };

  const professionsData = [
    {
      title: 'ИТ-профессии',
      professions: ['Разработчик программного обеспечения', 'Системный администратор', 'Тестировщик'],
      requirements: 'Требования для выбранной профессии',
      skills: ['Навык 1', 'Навык 2', 'Навык 3'],
      responsibilities: ['Обязанность 1', 'Обязанность 2', 'Обязанность 3'],
      development: 'Возможности развития в выбранной профессии'
    },
    {
      title: 'Маркетинг',
      professions: ['Маркетолог', 'SEO-специалист', 'Аналитик маркетинга'],
      requirements: 'Требования для выбранной профессии',
      skills: ['Навык 1', 'Навык 2', 'Навык 3'],
      responsibilities: ['Обязанность 1', 'Обязанность 2', 'Обязанность 3'],
      development: 'Возможности развития в выбранной профессии'
    }
  ];

  const selectedProfessionData = professionsData.find((data) => data.professions.includes(selectedProfession));

  return (
    <div id="professions-list">
    
      {professionsData.map((data, index) => (
        <div id={`profession-section-${index}`} key={data.title}>
          <h2>{data.title}</h2>
          <ul id={`profession-list-${index}`}>
            {data.professions.map((profession, profIndex) => (
              <li key={profIndex}>
                <button
                  id={`profession-button-${index}-${profIndex} ${selectedProfession === profession ? 'selected' : ''}`}
                  onClick={() => handleSelectProfession(profession)}
                >
                  {profession}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {selectedProfessionData && (
        <div id="profession-details">
          <h1 id='myh2'>{selectedProfessionData.title}</h1>
          <h2>Требования</h2>
          <p>{selectedProfessionData.requirements}</p>
          <h2>Навыки</h2>
          <ul>
            {selectedProfessionData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <h2>Обязанности</h2>
          <ul>
            {selectedProfessionData.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
         
         </ul>
          <h2>Возможности развития</h2>
          <p>{selectedProfessionData.development}</p>
        </div>
      )}
    </div>
  );
};
export default ProfessionsList