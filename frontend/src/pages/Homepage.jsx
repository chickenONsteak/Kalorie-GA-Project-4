import React, { useContext, useEffect, useState } from "react";
import CalorieCard from "../components/homepage/CalorieCard";
import MacroCard from "../components/homepage/MacroCard";
import FormLogIntake from "../components/homepage/FormLogIntake";
import DataTabs from "../components/homepage/DataTabs";
import UploadIntakePhoto from "../components/homepage/UploadIntakePhoto";
import UserContext from "../contexts/user";
import { jwtDecode } from "jwt-decode";
import useEmblaCarousel from "embla-carousel-react";

const Homepage = () => {
  const userContext = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });
  const [displayedEmoji, setDisplayedEmoji] = useState("");
  const listOfHealthyEmojis = [
    "🍎",
    "🍏",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍒",
    "🫐",
    "🥝",
    "🥭",
    "🥑",
    "🥬",
    "🥦",
    "🥕",
    "🌽",
    "🥚",
    "🍗",
    "🥩",
    "🥓",
    "🐟",
    "🦐",
    "🦑",
    "💧",
    "🥛",
    "🫖",
    "🍵",
    "🌿",
    "🌱",
    "🪴",
    "🍀",
    "🌸",
    "💚",
    "💪",
  ];

  // GET NAME OF USER, BUT CHANGE BACK TO STRANGER WHEN USER LOGS OUT
  useEffect(() => {
    if (userContext.accessToken) {
      const decoded = jwtDecode(userContext.accessToken);
      setUsername(decoded.first_name);
    } else {
      setUsername("stranger");
    }
  }, [userContext?.accessToken]);

  // SWITCH EMOJI ON FIXED INTERVAL
  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setDisplayedEmoji(
        listOfHealthyEmojis[
          Math.floor(Math.random() * listOfHealthyEmojis.length)
        ]
      );
    }, 500);

    return () => {
      clearInterval(emojiInterval);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-800 dark:text-white">
          {`Hey ${username}, ready to check in on`}
          <br />
          <span className="change">today</span>
          {`? ${displayedEmoji}`}
        </h1>
      </div>

      {/* INTAKE FORM */}
      <div className="flex flex-col w-full mt-12 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 flex-wrap">
        <div className="flex-1">
          <FormLogIntake />
        </div>
        <div className="flex-1">
          <UploadIntakePhoto />
        </div>
      </div>

      {/* MACRO & CALORIE CARDS */}
      <div className="embla w-full my-8 relative z-0" ref={emblaRef}>
        <div className="embla__container flex justify-between overflow-x-auto scroll-smooth">
          <div className="embla__slide flex-shrink-0 w-72 sm:w-1/2 lg:w-auto">
            <CalorieCard />
          </div>
          <div className="embla__slide flex-shrink-0 w-72 sm:w-1/2 lg:w-auto">
            <MacroCard id="carbohydrates">🍞 Carbs</MacroCard>
          </div>
          <div className="embla__slide flex-shrink-0 w-72 sm:w-1/2 lg:w-auto">
            <MacroCard id="protein">🥩 Protein</MacroCard>
          </div>
          <div className="embla__slide flex-shrink-0 w-72 sm:w-1/2 lg:w-auto">
            <MacroCard id="fats">🥓 Fats</MacroCard>
          </div>
        </div>
      </div>

      <div>
        <DataTabs />
      </div>
    </div>
  );
};

export default Homepage;
