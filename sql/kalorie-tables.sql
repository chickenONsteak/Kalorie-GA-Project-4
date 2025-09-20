CREATE TABLE users (
	uuid			uuid			DEFAULT uuid_generate_v4()	PRIMARY KEY,
	created_at		date			DEFAULT CURRENT_DATE,
	email			citext			NOT NULL,
	first_name		varchar(50)		NOT NULL,
	last_name		varchar(50)		NOT NULL,
	hashed_password	text			NOT NULL
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
	id								serial		PRIMARY KEY,
	user_id							uuid		REFERENCES users(uuid),
	created_at						timestamptz	DEFAULT now(),
	food_name						text		NOT NULL,
	calories						int			NOT NULL,
	carbohydrates					int			NOT NULL,
	protein							int			NOT NULL,
	fats							int			NOT NULL,
	assumption_1					text		NOT NULL,
	assumption_2					text		NOT NULL,
	assumption_3					text		NOT NULL,
	additional_details_required_1	text,
	additional_details_required_2	text,
	additional_details_required_3	text
);

SELECT * FROM users;