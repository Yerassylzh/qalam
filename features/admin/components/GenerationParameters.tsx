import React from "react";
import { useGenerationContext } from "../context/GenerationContext";

const TopicInputBar = () => {
  const { setLanguage, setTextAmount, setStyle } = useGenerationContext();

  return (
    <div className="flex gap-2 flex-wrap">
      <select
        className="px-4 py-1 border rounded-full text-sm"
        onChange={(e) => setLanguage(e.target.value as "eng" | "ru" | "kk")}
      >
        <option value="ru">Русский</option>
        <option value="eng">English</option>
        <option value="kk">Қазақша</option>
      </select>

      <select
        className="px-4 py-1 border rounded-full text-sm"
        onChange={(e) =>
          setTextAmount(e.target.value as "standard" | "low" | "high")
        }
      >
        <option value="standard">Стандарт</option>
        <option value="low">Мало</option>
        <option value="high">Много</option>
      </select>

      <select
        className="px-4 py-1 border rounded-full text-sm"
        onChange={(e) =>
          setStyle(e.target.value as "steppe" | "formal" | "neutral")
        }
      >
        <option value="steppe">STEPPE</option>
        <option value="formal">Формальный</option>
        <option value="neutral">Нейтральный</option>
      </select>
    </div>
  );
};

export default TopicInputBar;
