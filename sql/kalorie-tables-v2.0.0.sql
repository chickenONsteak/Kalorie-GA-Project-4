CREATE TABLE users (
	uuid		uuid		DEFAULT uuid_generate_v4()	PRIMARY KEY,
	first_name	varchar(50)	NOT NULL,
	last_name	varchar(50)	NOT NULL,
	password	varchar(50)	NOT NULL
);

CREATE TABLE calorie_goals (
	id					serial	PRIMARY KEY,
	user_id				uuid	REFERENCES	users(uuid),
	created_at			date	DEFAULT CURRENT_DATE,
	calorie_goal		int		NOT NULL,
	carbohydrates_goal	int		NOT NULL,
	protein_goal		int		NOT NULL,
	fats_goal			int		NOT NULL
);

CREATE TABLE intakes (
	id	serial	PRIMARY KEY
	user_id	uuid	REFERENCES users(uuid)
	timestamp	datetime	DEFAULT now
	
)

