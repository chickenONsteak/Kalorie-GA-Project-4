# Kalorie

---

## 📑 Table of Contents

- [About Kalorie](https://github.com/chickenONsteak/ga-project-3?tab=readme-ov-file#%E2%84%B9%EF%B8%8F-about-kopi--paws)
- [Features](https://github.com/chickenONsteak/ga-project-3?tab=readme-ov-file#-features)
- [Roles & Permissions]()
- [Tech Stack](https://github.com/chickenONsteak/ga-project-3?tab=readme-ov-file#-tech-stack)
- [App Hierarchy & ERD](https://github.com/chickenONsteak/ga-project-3?tab=readme-ov-file#-app-hierarchy--erd)
- [Setup & Installation](https://github.com/chickenONsteak/ga-project-3?tab=readme-ov-file#-setup--installation)

---

## ℹ️ About Kalorie

Calorie tracking is one of the most effective ways to manage weight — something I discovered after beginning my weightlifting journey. But like many others, I eventually gave it up after months of use because it felt tedious and time-consuming.

The vision behind **Kalorie** is to make tracking **quick, simple, and effortless** — a process that takes **less than 5 minutes a day**. With this, anyone can stay consistent and in control of their health without the frustration of traditional tracking methods.

Kalorie is a calorie and nutrition tracking web application that helps users log meals, monitor daily intake, and build healthier eating habits. To achieve this speed and simplicity, the app leverages **AI-assisted tracking** instead of manual input:

- 🤖 AI food recognition: Input meals with natural language (e.g., “2 slices of pepperoni pizza and a Coke”) instead of manually entering every nutrient.
- 📸 Image-based logging: Upload a meal photo and let the AI suggest possible foods and calorie counts.

Additionally, the app provides clear insights into calories, protein, fats, and carbohydrates _(future expansion)_, making nutrition tracking both simple and intuitive.

## ✨ Features

- **Authentication:** User registration and login
- **Meal Logging:** Add, update, or delete meals with nutritional values
- **Dashboard:** Overview of daily and weekly calorie and macro intake
- **Calendar View:** Track meals and progress across days
- **Responsive Design:** Works across desktop and mobile

### Meal Logging

**Kalorie** makes meal logging quick and effortless with two options:

1. Describe your food (text input)
2. Upload a photo (image recognition)

**How it works**

1. Text description:
   1. Your input (e.g., “2 slices of pepperoni pizza and a Coke”) is fitted into our scripted prompt
   2. The prompt is then sent to OpenAI's model, which returns:
      1. Name of food
      2. Calories
      3. Carbohydrates
      4. Protein
      5. Fats
      6. Assumptions made
      7. Confidence score
      8. Follow-up questions if the confidence score is low (to refine calorie & macro estimates)
1. Image upload:
   1. Your photo is analysed by an OpenAI vision model with our scripted prompt
   2. The output is then chained to the prompt above _(chain prompting)_ to produce the same structured results as text input

## 👤 Roles & Permissions

| Capability                                            | Guest | User |
| ----------------------------------------------------- | :---: | :--: |
| Register / login                                      |  ✅   |  ✅  |
| Get calorie and macro estimation (AI-assisted)        |  ✅   |  ✅  |
| Log meals                                             |   -   |  ✅  |
| Review logged meals (if the AI model isn't confident) |   -   |  ✅  |
| Edit / Delete own meal logs                           |   -   |  ✅  |
| View historical data (calendar, progress)             |   -   |  ✅  |

## 🛠 Tech Stack

**Fontend**

- React (Vite)
- Tailwind (with Shadcn and other UI components)
- TanStack Query

**Backend**

- Flask (Python)
- JWT Authentication

**Database**

- PostgreSQL

## 🪾 App Hierarchy & ERD

**App Hierarchy**
![app hierarchy](/assets/app%20hierarchy.png)
**Entity Relationship Diagram**
![entity relationship diagram](/assets/ERD.png)

## 🚀 Setup & Installation

**Prerequisites**

- Node.js
- Python
- PostgreSQL

**Steps**

1. Clone this repo:

```bash
git clone https://github.com/chickenONsteak/ga-project-4.git
cd kalorie
```

2. Setup backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate   # (Mac/Linux)
venv\Scripts\activate      # (Windows)
pip install -r requirements.txt
flask run
```

3. Setup frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Open your browser with the correct port
