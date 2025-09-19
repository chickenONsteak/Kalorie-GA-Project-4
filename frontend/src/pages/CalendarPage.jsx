import React from "react";
import BigCalendar from "../components/calendarPage/BigCalendar";
import chatgptLogo from "../assets/ChatGPT_logo.svg.png";

const CalendarPage = () => {
  const quotes = [
    "Healthy eating isn't about strict limitations—it's about feeling your best every day.",
    "Every small choice you make adds up to a healthier, stronger you.",
    "Progress is better than perfection—one meal at a time.",
    "Your body deserves fuel, not punishment.",
    "Balance your plate, balance your life.",
    "Consistency beats intensity when building lasting habits.",
    "Nourish your body, and your mind will follow.",
    "Calories matter, but so does joy in eating.",
    "The journey to health starts with one mindful bite.",
    "Small steps every day lead to big transformations over time.",
  ];

  return (
    <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 py-6">
      <figure className="flex flex-col max-w-screen-md mx-auto self-center">
        <svg
          className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        <blockquote>
          <p className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center text-2xl sm:text-3xl md:text-4xl italic font-medium text-gray-800 dark:text-white">
            {`"${quotes[Math.floor(Math.random() * quotes.length)]}"`}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
          <img
            className="w-6 h-6 rounded-full"
            src={chatgptLogo}
            alt="profile picture"
          />
          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
            <cite className="pe-3 font-medium text-gray-800 dark:text-white">
              ChatGPT
            </cite>
            {/* <cite class="ps-3 text-sm text-gray-500 dark:text-gray-400">
              CEO at Google
            </cite> */}
          </div>
        </figcaption>
      </figure>

      <div className="w-full flex justify-center mt-8 px-2 sm:px-4">
        <BigCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
