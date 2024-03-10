PGDMP      ;                |            WazaFitness    16.0    16.0 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    82473    WazaFitness    DATABASE     �   CREATE DATABASE "WazaFitness" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "WazaFitness";
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    6            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    6                        3079    82474 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false    6            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �           1247    82856    friend_status    TYPE     k   CREATE TYPE public.friend_status AS ENUM (
    'pending',
    'accepted',
    'rejected',
    'blocked'
);
     DROP TYPE public.friend_status;
       public          postgres    false    6            �            1255    82485    update_updated_at_column()    FUNCTION     �   CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;
 1   DROP FUNCTION public.update_updated_at_column();
       public          postgres    false    6            �            1259    82486    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    6            �            1259    82493    availability    TABLE     =  CREATE TABLE public.availability (
    availability_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    trainer_id uuid,
    weekday character varying(10),
    start_time time without time zone,
    end_time time without time zone,
    CONSTRAINT chk_weekday CHECK (((weekday)::text = ANY (ARRAY[('Monday'::character varying)::text, ('Tuesday'::character varying)::text, ('Wednesday'::character varying)::text, ('Thursday'::character varying)::text, ('Friday'::character varying)::text, ('Saturday'::character varying)::text, ('Sunday'::character varying)::text])))
);
     DROP TABLE public.availability;
       public         heap    postgres    false    2    6    6            �            1259    82498    certifications    TABLE     u  CREATE TABLE public.certifications (
    certification_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    certification_name character varying(255) NOT NULL,
    issuing_body character varying(255),
    date_issued date,
    valid_until date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);
 "   DROP TABLE public.certifications;
       public         heap    postgres    false    2    6    6            �            1259    82505    chat    TABLE       CREATE TABLE public.chat (
    chat_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    sender_id uuid,
    receiver_id uuid,
    message_content text,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    read_status boolean
);
    DROP TABLE public.chat;
       public         heap    postgres    false    2    6    6            �            1259    82512    exercise    TABLE     |  CREATE TABLE public.exercise (
    exercise_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    trainer_id uuid,
    muscle_group character varying(255),
    weight integer,
    sets integer,
    reps integer,
    session_id uuid NOT NULL,
    CONSTRAINT exercise_reps_check CHECK ((reps > 0)),
    CONSTRAINT exercise_sets_check CHECK ((sets > 0)),
    CONSTRAINT exercise_weight_check CHECK ((weight > 0)),
    CONSTRAINT muscle_group_check CHECK (((muscle_group)::text = ANY ((ARRAY['Hamstrings'::character varying, 'Chest'::character varying, 'Shoulders'::character varying, 'Quadriceps'::character varying, 'Back'::character varying, 'Triceps'::character varying, 'Biceps'::character varying, 'Glutes'::character varying, 'Calves'::character varying, 'ABS'::character varying, 'Legs'::character varying, 'The back and biceps'::character varying, 'Forearms'::character varying, 'Upper back'::character varying, 'Arm'::character varying])::text[])))
);
    DROP TABLE public.exercise;
       public         heap    postgres    false    2    6    6            �            1259    82794    exercise_log    TABLE     �   CREATE TABLE public.exercise_log (
    log_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    exercise_id uuid NOT NULL,
    weight integer,
    achieved_reps integer
);
     DROP TABLE public.exercise_log;
       public         heap    postgres    false    2    6    6            �            1259    82866    friends    TABLE     �   CREATE TABLE public.friends (
    friendship_id integer NOT NULL,
    warrior_id uuid,
    friend_id uuid,
    status public.friend_status
);
    DROP TABLE public.friends;
       public         heap    postgres    false    6    945            �            1259    82865    friends_friendship_id_seq    SEQUENCE     �   CREATE SEQUENCE public.friends_friendship_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.friends_friendship_id_seq;
       public          postgres    false    240    6            �           0    0    friends_friendship_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.friends_friendship_id_seq OWNED BY public.friends.friendship_id;
          public          postgres    false    239            �            1259    82519    goals    TABLE     �   CREATE TABLE public.goals (
    goal_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    goal_name character varying(255) NOT NULL
);
    DROP TABLE public.goals;
       public         heap    postgres    false    2    6    6            �            1259    82523    meal_food_items    TABLE     ]  CREATE TABLE public.meal_food_items (
    meal_id uuid NOT NULL,
    food_item_identifier character varying(255) NOT NULL,
    quantity numeric NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    unit character varying(50) NOT NULL
);
 #   DROP TABLE public.meal_food_items;
       public         heap    postgres    false    6            �            1259    82530 
   meal_types    TABLE     '  CREATE TABLE public.meal_types (
    meal_type_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.meal_types;
       public         heap    postgres    false    2    6    6            �            1259    82536    meals    TABLE     N  CREATE TABLE public.meals (
    meal_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    warrior_id uuid NOT NULL,
    meal_type_id uuid NOT NULL,
    meal_date date NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.meals;
       public         heap    postgres    false    2    6    6            �            1259    82542    reviews    TABLE     M  CREATE TABLE public.reviews (
    review_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    warrior_id uuid,
    trainer_id uuid,
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);
    DROP TABLE public.reviews;
       public         heap    postgres    false    2    6    6            �            1259    82550    session    TABLE       CREATE TABLE public.session (
    session_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    warrior_id uuid,
    trainer_id uuid,
    scheduled_date timestamp without time zone,
    status character varying(50),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    CONSTRAINT chk_session CHECK (((status)::text = ANY (ARRAY[('upcoming'::character varying)::text, ('completed'::character varying)::text, ('canceled'::character varying)::text])))
);
    DROP TABLE public.session;
       public         heap    postgres    false    2    6    6            �            1259    82556    specializations    TABLE     #  CREATE TABLE public.specializations (
    specialization_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    specialization_name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);
 #   DROP TABLE public.specializations;
       public         heap    postgres    false    2    6    6            �            1259    82808    template    TABLE     -  CREATE TABLE public.template (
    template_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    warrior_id uuid,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone
);
    DROP TABLE public.template;
       public         heap    postgres    false    2    6    6            �            1259    82828    template_exercise    TABLE     :  CREATE TABLE public.template_exercise (
    template_exercise_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    template_id uuid,
    title character varying(255) NOT NULL,
    muscle_group character varying(255) NOT NULL,
    weight integer NOT NULL,
    sets integer NOT NULL,
    reps integer NOT NULL
);
 %   DROP TABLE public.template_exercise;
       public         heap    postgres    false    2    6    6            �            1259    82561    trainer_certifications    TABLE     q   CREATE TABLE public.trainer_certifications (
    trainer_id uuid NOT NULL,
    certification_id uuid NOT NULL
);
 *   DROP TABLE public.trainer_certifications;
       public         heap    postgres    false    6            �            1259    82564    trainer_specializations    TABLE     s   CREATE TABLE public.trainer_specializations (
    trainer_id uuid NOT NULL,
    specialization_id uuid NOT NULL
);
 +   DROP TABLE public.trainer_specializations;
       public         heap    postgres    false    6            �            1259    82567    users    TABLE     n  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255),
    email character varying(255) NOT NULL,
    user_type character varying(50) NOT NULL,
    profile_pic text,
    date_joined timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    last_login timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_verified boolean DEFAULT false NOT NULL,
    provider character varying(50) NOT NULL,
    age integer,
    name character varying(255),
    gender character varying(6),
    CONSTRAINT users_user_age_check CHECK (((age > 17) AND (age < 100))),
    CONSTRAINT users_user_gender_check CHECK (((gender)::text = ANY (ARRAY[('Male'::character varying)::text, ('Female'::character varying)::text]))),
    CONSTRAINT users_user_type_check CHECK (((user_type)::text = ANY (ARRAY[('Waza Warrior'::character varying)::text, ('Waza Trainer'::character varying)::text])))
);
    DROP TABLE public.users;
       public         heap    postgres    false    2    6    6            �            1259    82580    warrior_specializations    TABLE     s   CREATE TABLE public.warrior_specializations (
    warrior_id uuid NOT NULL,
    specialization_id uuid NOT NULL
);
 +   DROP TABLE public.warrior_specializations;
       public         heap    postgres    false    6            �            1259    82583    warriorexercise    TABLE     e   CREATE TABLE public.warriorexercise (
    warrior_id uuid NOT NULL,
    exercise_id uuid NOT NULL
);
 #   DROP TABLE public.warriorexercise;
       public         heap    postgres    false    6            �            1259    82586    warriorgoals    TABLE     ^   CREATE TABLE public.warriorgoals (
    warrior_id uuid NOT NULL,
    goal_id uuid NOT NULL
);
     DROP TABLE public.warriorgoals;
       public         heap    postgres    false    6            �            1259    82589    waza_trainers    TABLE     O  CREATE TABLE public.waza_trainers (
    trainer_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    hourly_rate numeric NOT NULL,
    bio text NOT NULL,
    location character varying(255) NOT NULL,
    experience integer,
    CONSTRAINT waza_trainer_trainer_experience_check CHECK ((experience > 0))
);
 !   DROP TABLE public.waza_trainers;
       public         heap    postgres    false    2    6    6            �            1259    82596    waza_warriors    TABLE     �   CREATE TABLE public.waza_warriors (
    warrior_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid,
    age integer,
    caloric_goal double precision
);
 !   DROP TABLE public.waza_warriors;
       public         heap    postgres    false    2    6    6            �           2604    82869    friends friendship_id    DEFAULT     ~   ALTER TABLE ONLY public.friends ALTER COLUMN friendship_id SET DEFAULT nextval('public.friends_friendship_id_seq'::regclass);
 D   ALTER TABLE public.friends ALTER COLUMN friendship_id DROP DEFAULT;
       public          postgres    false    239    240    240            �          0    82486    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    216   �       �          0    82493    availability 
   TABLE DATA           b   COPY public.availability (availability_id, trainer_id, weekday, start_time, end_time) FROM stdin;
    public          postgres    false    217   8�       �          0    82498    certifications 
   TABLE DATA           �   COPY public.certifications (certification_id, certification_name, issuing_body, date_issued, valid_until, created_at, updated_at) FROM stdin;
    public          postgres    false    218   U�       �          0    82505    chat 
   TABLE DATA           j   COPY public.chat (chat_id, sender_id, receiver_id, message_content, "timestamp", read_status) FROM stdin;
    public          postgres    false    219   r�       �          0    82512    exercise 
   TABLE DATA           �   COPY public.exercise (exercise_id, title, description, created_at, updated_at, trainer_id, muscle_group, weight, sets, reps, session_id) FROM stdin;
    public          postgres    false    220   ��       �          0    82794    exercise_log 
   TABLE DATA           R   COPY public.exercise_log (log_id, exercise_id, weight, achieved_reps) FROM stdin;
    public          postgres    false    236   ��       �          0    82866    friends 
   TABLE DATA           O   COPY public.friends (friendship_id, warrior_id, friend_id, status) FROM stdin;
    public          postgres    false    240   9�       �          0    82519    goals 
   TABLE DATA           3   COPY public.goals (goal_id, goal_name) FROM stdin;
    public          postgres    false    221   V�       �          0    82523    meal_food_items 
   TABLE DATA           p   COPY public.meal_food_items (meal_id, food_item_identifier, quantity, created_at, updated_at, unit) FROM stdin;
    public          postgres    false    222   s�       �          0    82530 
   meal_types 
   TABLE DATA           P   COPY public.meal_types (meal_type_id, name, created_at, updated_at) FROM stdin;
    public          postgres    false    223   �       �          0    82536    meals 
   TABLE DATA           e   COPY public.meals (meal_id, warrior_id, meal_type_id, meal_date, created_at, updated_at) FROM stdin;
    public          postgres    false    224   ��       �          0    82542    reviews 
   TABLE DATA           a   COPY public.reviews (review_id, warrior_id, trainer_id, rating, comment, created_at) FROM stdin;
    public          postgres    false    225   ��       �          0    82550    session 
   TABLE DATA           u   COPY public.session (session_id, warrior_id, trainer_id, scheduled_date, status, created_at, updated_at) FROM stdin;
    public          postgres    false    226   ��       �          0    82556    specializations 
   TABLE DATA           i   COPY public.specializations (specialization_id, specialization_name, created_at, updated_at) FROM stdin;
    public          postgres    false    227   E�       �          0    82808    template 
   TABLE DATA           g   COPY public.template (template_id, warrior_id, title, description, created_at, updated_at) FROM stdin;
    public          postgres    false    237   ��       �          0    82828    template_exercise 
   TABLE DATA           w   COPY public.template_exercise (template_exercise_id, template_id, title, muscle_group, weight, sets, reps) FROM stdin;
    public          postgres    false    238   V�       �          0    82561    trainer_certifications 
   TABLE DATA           N   COPY public.trainer_certifications (trainer_id, certification_id) FROM stdin;
    public          postgres    false    228   ��       �          0    82564    trainer_specializations 
   TABLE DATA           P   COPY public.trainer_specializations (trainer_id, specialization_id) FROM stdin;
    public          postgres    false    229   ��       �          0    82567    users 
   TABLE DATA           �   COPY public.users (user_id, username, password, email, user_type, profile_pic, date_joined, last_login, created_at, updated_at, is_verified, provider, age, name, gender) FROM stdin;
    public          postgres    false    230   \      �          0    82580    warrior_specializations 
   TABLE DATA           P   COPY public.warrior_specializations (warrior_id, specialization_id) FROM stdin;
    public          postgres    false    231   ��      �          0    82583    warriorexercise 
   TABLE DATA           B   COPY public.warriorexercise (warrior_id, exercise_id) FROM stdin;
    public          postgres    false    232   �      �          0    82586    warriorgoals 
   TABLE DATA           ;   COPY public.warriorgoals (warrior_id, goal_id) FROM stdin;
    public          postgres    false    233    �      �          0    82589    waza_trainers 
   TABLE DATA           d   COPY public.waza_trainers (trainer_id, user_id, hourly_rate, bio, location, experience) FROM stdin;
    public          postgres    false    234   =�      �          0    82596    waza_warriors 
   TABLE DATA           O   COPY public.waza_warriors (warrior_id, user_id, age, caloric_goal) FROM stdin;
    public          postgres    false    235   ;8      �           0    0    friends_friendship_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.friends_friendship_id_seq', 1, false);
          public          postgres    false    239            �           2606    82601 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    216            �           2606    82603    availability availability_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_pkey PRIMARY KEY (availability_id);
 H   ALTER TABLE ONLY public.availability DROP CONSTRAINT availability_pkey;
       public            postgres    false    217            �           2606    82605 "   certifications certifications_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.certifications
    ADD CONSTRAINT certifications_pkey PRIMARY KEY (certification_id);
 L   ALTER TABLE ONLY public.certifications DROP CONSTRAINT certifications_pkey;
       public            postgres    false    218            �           2606    82607    chat chat_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (chat_id);
 8   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_pkey;
       public            postgres    false    219            "           2606    82799    exercise_log exercise_log_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.exercise_log
    ADD CONSTRAINT exercise_log_pkey PRIMARY KEY (log_id);
 H   ALTER TABLE ONLY public.exercise_log DROP CONSTRAINT exercise_log_pkey;
       public            postgres    false    236            �           2606    82609    exercise exercise_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (exercise_id);
 @   ALTER TABLE ONLY public.exercise DROP CONSTRAINT exercise_pkey;
       public            postgres    false    220            *           2606    82871    friends friends_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (friendship_id);
 >   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_pkey;
       public            postgres    false    240            �           2606    82611    goals goals_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (goal_id);
 :   ALTER TABLE ONLY public.goals DROP CONSTRAINT goals_pkey;
       public            postgres    false    221            �           2606    82613 $   meal_food_items meal_food_items_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.meal_food_items
    ADD CONSTRAINT meal_food_items_pkey PRIMARY KEY (meal_id, food_item_identifier);
 N   ALTER TABLE ONLY public.meal_food_items DROP CONSTRAINT meal_food_items_pkey;
       public            postgres    false    222    222            �           2606    82615    meal_types meal_types_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.meal_types
    ADD CONSTRAINT meal_types_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.meal_types DROP CONSTRAINT meal_types_name_key;
       public            postgres    false    223            �           2606    82617    meal_types meal_types_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.meal_types
    ADD CONSTRAINT meal_types_pkey PRIMARY KEY (meal_type_id);
 D   ALTER TABLE ONLY public.meal_types DROP CONSTRAINT meal_types_pkey;
       public            postgres    false    223            �           2606    82619    meals meals_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_pkey PRIMARY KEY (meal_id);
 :   ALTER TABLE ONLY public.meals DROP CONSTRAINT meals_pkey;
       public            postgres    false    224                        2606    82621 1   meals meals_warrior_id_meal_type_id_meal_date_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_warrior_id_meal_type_id_meal_date_key UNIQUE (warrior_id, meal_type_id, meal_date);
 [   ALTER TABLE ONLY public.meals DROP CONSTRAINT meals_warrior_id_meal_type_id_meal_date_key;
       public            postgres    false    224    224    224                       2606    82623    reviews reviews_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    225                       2606    82625    session session_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (session_id);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    226                       2606    82627 $   specializations specializations_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.specializations
    ADD CONSTRAINT specializations_pkey PRIMARY KEY (specialization_id);
 N   ALTER TABLE ONLY public.specializations DROP CONSTRAINT specializations_pkey;
       public            postgres    false    227            (           2606    82835 (   template_exercise template_exercise_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.template_exercise
    ADD CONSTRAINT template_exercise_pkey PRIMARY KEY (template_exercise_id);
 R   ALTER TABLE ONLY public.template_exercise DROP CONSTRAINT template_exercise_pkey;
       public            postgres    false    238            $           2606    82816    template template_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.template
    ADD CONSTRAINT template_pkey PRIMARY KEY (template_id);
 @   ALTER TABLE ONLY public.template DROP CONSTRAINT template_pkey;
       public            postgres    false    237            &           2606    82854    template template_title_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.template
    ADD CONSTRAINT template_title_key UNIQUE (title);
 E   ALTER TABLE ONLY public.template DROP CONSTRAINT template_title_key;
       public            postgres    false    237            	           2606    82629 2   trainer_certifications trainer_certifications_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.trainer_certifications
    ADD CONSTRAINT trainer_certifications_pkey PRIMARY KEY (trainer_id, certification_id);
 \   ALTER TABLE ONLY public.trainer_certifications DROP CONSTRAINT trainer_certifications_pkey;
       public            postgres    false    228    228                       2606    82631 4   trainer_specializations trainer_specializations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.trainer_specializations
    ADD CONSTRAINT trainer_specializations_pkey PRIMARY KEY (trainer_id, specialization_id);
 ^   ALTER TABLE ONLY public.trainer_specializations DROP CONSTRAINT trainer_specializations_pkey;
       public            postgres    false    229    229                       2606    82633    users unique_email 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_email;
       public            postgres    false    230                       2606    82635 $   waza_trainers unique_trainer_user_id 
   CONSTRAINT     b   ALTER TABLE ONLY public.waza_trainers
    ADD CONSTRAINT unique_trainer_user_id UNIQUE (user_id);
 N   ALTER TABLE ONLY public.waza_trainers DROP CONSTRAINT unique_trainer_user_id;
       public            postgres    false    234                       2606    82637    waza_warriors unique_user_id 
   CONSTRAINT     Z   ALTER TABLE ONLY public.waza_warriors
    ADD CONSTRAINT unique_user_id UNIQUE (user_id);
 F   ALTER TABLE ONLY public.waza_warriors DROP CONSTRAINT unique_user_id;
       public            postgres    false    235                       2606    82639    users unique_username 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_username UNIQUE (username);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT unique_username;
       public            postgres    false    230                       2606    82641    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    230                       2606    82643 4   warrior_specializations warrior_specializations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.warrior_specializations
    ADD CONSTRAINT warrior_specializations_pkey PRIMARY KEY (warrior_id, specialization_id);
 ^   ALTER TABLE ONLY public.warrior_specializations DROP CONSTRAINT warrior_specializations_pkey;
       public            postgres    false    231    231                       2606    82645 $   warriorexercise warriorexercise_pkey 
   CONSTRAINT     w   ALTER TABLE ONLY public.warriorexercise
    ADD CONSTRAINT warriorexercise_pkey PRIMARY KEY (warrior_id, exercise_id);
 N   ALTER TABLE ONLY public.warriorexercise DROP CONSTRAINT warriorexercise_pkey;
       public            postgres    false    232    232                       2606    82647    warriorgoals warriorgoals_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.warriorgoals
    ADD CONSTRAINT warriorgoals_pkey PRIMARY KEY (warrior_id, goal_id);
 H   ALTER TABLE ONLY public.warriorgoals DROP CONSTRAINT warriorgoals_pkey;
       public            postgres    false    233    233                       2606    82649     waza_trainers waza_trainers_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.waza_trainers
    ADD CONSTRAINT waza_trainers_pkey PRIMARY KEY (trainer_id);
 J   ALTER TABLE ONLY public.waza_trainers DROP CONSTRAINT waza_trainers_pkey;
       public            postgres    false    234                        2606    82651     waza_warriors waza_warriors_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.waza_warriors
    ADD CONSTRAINT waza_warriors_pkey PRIMARY KEY (warrior_id);
 J   ALTER TABLE ONLY public.waza_warriors DROP CONSTRAINT waza_warriors_pkey;
       public            postgres    false    235            �           1259    82652    idx_chat_read_status    INDEX     L   CREATE INDEX idx_chat_read_status ON public.chat USING btree (read_status);
 (   DROP INDEX public.idx_chat_read_status;
       public            postgres    false    219                       1259    82653    idx_session_status    INDEX     H   CREATE INDEX idx_session_status ON public.session USING btree (status);
 &   DROP INDEX public.idx_session_status;
       public            postgres    false    226                       1259    82654    idx_users_email    INDEX     B   CREATE INDEX idx_users_email ON public.users USING btree (email);
 #   DROP INDEX public.idx_users_email;
       public            postgres    false    230            I           2620    82655    users trigger_set_timestamp    TRIGGER     �   CREATE TRIGGER trigger_set_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
 4   DROP TRIGGER trigger_set_timestamp ON public.users;
       public          postgres    false    230    251            +           2606    82656 )   availability availability_trainer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.availability
    ADD CONSTRAINT availability_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES public.waza_trainers(trainer_id);
 S   ALTER TABLE ONLY public.availability DROP CONSTRAINT availability_trainer_id_fkey;
       public          postgres    false    4892    234    217            ,           2606    82661    chat chat_receiver_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(user_id);
 D   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_receiver_id_fkey;
       public          postgres    false    230    219    4882            -           2606    82666    chat chat_sender_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(user_id);
 B   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_sender_id_fkey;
       public          postgres    false    219    4882    230            .           2606    82671 !   exercise exercise_trainer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES public.waza_trainers(trainer_id);
 K   ALTER TABLE ONLY public.exercise DROP CONSTRAINT exercise_trainer_id_fkey;
       public          postgres    false    234    4892    220            C           2606    82800    exercise_log fk_exercise    FK CONSTRAINT     �   ALTER TABLE ONLY public.exercise_log
    ADD CONSTRAINT fk_exercise FOREIGN KEY (exercise_id) REFERENCES public.exercise(exercise_id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.exercise_log DROP CONSTRAINT fk_exercise;
       public          postgres    false    4852    220    236            /           2606    82789    exercise fk_session    FK CONSTRAINT     �   ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES public.session(session_id) ON DELETE CASCADE;
 =   ALTER TABLE ONLY public.exercise DROP CONSTRAINT fk_session;
       public          postgres    false    226    220    4869            E           2606    82841    template_exercise fk_template    FK CONSTRAINT     �   ALTER TABLE ONLY public.template_exercise
    ADD CONSTRAINT fk_template FOREIGN KEY (template_id) REFERENCES public.template(template_id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.template_exercise DROP CONSTRAINT fk_template;
       public          postgres    false    4900    237    238            G           2606    82877    friends friends_friend_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES public.waza_warriors(warrior_id);
 H   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_friend_id_fkey;
       public          postgres    false    235    240    4896            H           2606    82872    friends friends_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id);
 I   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_warrior_id_fkey;
       public          postgres    false    235    240    4896            0           2606    82676 ,   meal_food_items meal_food_items_meal_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.meal_food_items
    ADD CONSTRAINT meal_food_items_meal_id_fkey FOREIGN KEY (meal_id) REFERENCES public.meals(meal_id);
 V   ALTER TABLE ONLY public.meal_food_items DROP CONSTRAINT meal_food_items_meal_id_fkey;
       public          postgres    false    222    4862    224            1           2606    82681    meals meals_meal_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_meal_type_id_fkey FOREIGN KEY (meal_type_id) REFERENCES public.meal_types(meal_type_id);
 G   ALTER TABLE ONLY public.meals DROP CONSTRAINT meals_meal_type_id_fkey;
       public          postgres    false    224    4860    223            2           2606    82686    meals meals_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.meals
    ADD CONSTRAINT meals_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id);
 E   ALTER TABLE ONLY public.meals DROP CONSTRAINT meals_warrior_id_fkey;
       public          postgres    false    235    224    4896            3           2606    82691    reviews reviews_trainer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES public.waza_trainers(trainer_id);
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_trainer_id_fkey;
       public          postgres    false    234    225    4892            4           2606    82696    reviews reviews_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id);
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_warrior_id_fkey;
       public          postgres    false    235    225    4896            5           2606    82706    session session_trainer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES public.waza_trainers(trainer_id);
 I   ALTER TABLE ONLY public.session DROP CONSTRAINT session_trainer_id_fkey;
       public          postgres    false    226    234    4892            6           2606    82711    session session_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id);
 I   ALTER TABLE ONLY public.session DROP CONSTRAINT session_warrior_id_fkey;
       public          postgres    false    235    4896    226            F           2606    82836 4   template_exercise template_exercise_template_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.template_exercise
    ADD CONSTRAINT template_exercise_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.template(template_id) ON DELETE CASCADE;
 ^   ALTER TABLE ONLY public.template_exercise DROP CONSTRAINT template_exercise_template_id_fkey;
       public          postgres    false    4900    237    238            D           2606    82817 !   template template_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.template
    ADD CONSTRAINT template_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.template DROP CONSTRAINT template_warrior_id_fkey;
       public          postgres    false    235    237    4896            7           2606    82716 C   trainer_certifications trainer_certifications_certification_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trainer_certifications
    ADD CONSTRAINT trainer_certifications_certification_id_fkey FOREIGN KEY (certification_id) REFERENCES public.certifications(certification_id);
 m   ALTER TABLE ONLY public.trainer_certifications DROP CONSTRAINT trainer_certifications_certification_id_fkey;
       public          postgres    false    228    218    4847            8           2606    82721 =   trainer_certifications trainer_certifications_trainer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trainer_certifications
    ADD CONSTRAINT trainer_certifications_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES public.waza_trainers(trainer_id);
 g   ALTER TABLE ONLY public.trainer_certifications DROP CONSTRAINT trainer_certifications_trainer_id_fkey;
       public          postgres    false    234    228    4892            9           2606    82726 F   trainer_specializations trainer_specializations_specialization_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trainer_specializations
    ADD CONSTRAINT trainer_specializations_specialization_id_fkey FOREIGN KEY (specialization_id) REFERENCES public.specializations(specialization_id);
 p   ALTER TABLE ONLY public.trainer_specializations DROP CONSTRAINT trainer_specializations_specialization_id_fkey;
       public          postgres    false    4871    227    229            :           2606    82731 ?   trainer_specializations trainer_specializations_trainer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.trainer_specializations
    ADD CONSTRAINT trainer_specializations_trainer_id_fkey FOREIGN KEY (trainer_id) REFERENCES public.waza_trainers(trainer_id);
 i   ALTER TABLE ONLY public.trainer_specializations DROP CONSTRAINT trainer_specializations_trainer_id_fkey;
       public          postgres    false    229    4892    234            ;           2606    82736 F   warrior_specializations warrior_specializations_specialization_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.warrior_specializations
    ADD CONSTRAINT warrior_specializations_specialization_id_fkey FOREIGN KEY (specialization_id) REFERENCES public.specializations(specialization_id) ON DELETE CASCADE;
 p   ALTER TABLE ONLY public.warrior_specializations DROP CONSTRAINT warrior_specializations_specialization_id_fkey;
       public          postgres    false    227    4871    231            <           2606    82741 ?   warrior_specializations warrior_specializations_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.warrior_specializations
    ADD CONSTRAINT warrior_specializations_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id) ON DELETE CASCADE;
 i   ALTER TABLE ONLY public.warrior_specializations DROP CONSTRAINT warrior_specializations_warrior_id_fkey;
       public          postgres    false    231    4896    235            =           2606    82746 0   warriorexercise warriorexercise_exercise_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.warriorexercise
    ADD CONSTRAINT warriorexercise_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(exercise_id);
 Z   ALTER TABLE ONLY public.warriorexercise DROP CONSTRAINT warriorexercise_exercise_id_fkey;
       public          postgres    false    220    232    4852            >           2606    82751 /   warriorexercise warriorexercise_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.warriorexercise
    ADD CONSTRAINT warriorexercise_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id);
 Y   ALTER TABLE ONLY public.warriorexercise DROP CONSTRAINT warriorexercise_warrior_id_fkey;
       public          postgres    false    235    4896    232            ?           2606    82756 &   warriorgoals warriorgoals_goal_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.warriorgoals
    ADD CONSTRAINT warriorgoals_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(goal_id);
 P   ALTER TABLE ONLY public.warriorgoals DROP CONSTRAINT warriorgoals_goal_id_fkey;
       public          postgres    false    233    4854    221            @           2606    82761 )   warriorgoals warriorgoals_warrior_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.warriorgoals
    ADD CONSTRAINT warriorgoals_warrior_id_fkey FOREIGN KEY (warrior_id) REFERENCES public.waza_warriors(warrior_id);
 S   ALTER TABLE ONLY public.warriorgoals DROP CONSTRAINT warriorgoals_warrior_id_fkey;
       public          postgres    false    235    4896    233            A           2606    82766 (   waza_trainers waza_trainers_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.waza_trainers
    ADD CONSTRAINT waza_trainers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 R   ALTER TABLE ONLY public.waza_trainers DROP CONSTRAINT waza_trainers_user_id_fkey;
       public          postgres    false    234    4882    230            B           2606    82771 (   waza_warriors waza_warriors_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.waza_warriors
    ADD CONSTRAINT waza_warriors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.waza_warriors DROP CONSTRAINT waza_warriors_user_id_fkey;
       public          postgres    false    230    235    4882            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �  x���I��HE��)t�b�I���&��n�6��>~�셭�� ����3��Hn�SR�f湆IC��GZI(�Ck/����AH,�����BzN��%�������_^�zd�I���TW0���3�ɕ�Z2Ԏ�jt"
ѻn7��4Q0�r�\5�vx�q�����Q�'�M�ЙXnU�AS��xK6�G��[��F'n�E?���I栍#t,�&�a�gJ����=�_��9�{i�C�ߖ�E[F�p(Z=Ъ������Aq��^�.��lwd��C��R|�#���s�n�X�ŏ<fS�J�%í��$�RӲ���5;\�+~��L�e!E��D�xH�*�j��8B.��B�0x�����Q�cE���mbRmڗ���(��]B�(���j�e~'�\�+�$\��a� y�"(���G�{�⟾����o_O_����O��,9��U*��	�%G�D�[Ȣ6�s(-Ű8V(�96	w�+γ�r# ��Ⓩ15����
�(��k�ٟba�t�zǬ~`��B�[*���p�0,R&�=���a�� ��
�-a��V�V���9�c�D��]�#�Cc�6WU��X�j�~���/��SB�[Ȍw$�]
�z�S
o0�
`�Z*5J}hT�D��B��a�t3IH�u`1aåt^J�"���GO�r�@@��5+�a(v)�؊���J�%�Z�]�%S.xp���B7�0W��8���^%ޔ�Ub�8PF��愾�t믕����:9��<���e��b�k�%ļ�*x,�2zƈ@�)6\kR���B�����"~"�cm�:��A�P|�ֲW/@ӏ�7�	��� �4��0��&۵�������+��#Gȇ���D�dlCn��S�Y�%lH�R N��$�W��1��(��%�9���B�H�K{aC�����f
�F���&�^�C��'�z�z�����@�7�Y����h�AaȊc��z�7:�8���"�������9�"ވbW����0c��f*�;|��f�B^��t��l<�К�9�4'�Ti�;�0
�:Ey��sW���jh}��9�!l�����ڶ�9v!9�y10�/�"��ڔ�G�4/�|'�9[�anU1�F���mI�'�N�<<pbW�UҬ{���.�7�v�
f��c �H؈إ ��"���������+X����"⡐+���Lm`ib�$r����b^�V�G_ܟ:��/f��g�;L�����x<�	|�Y      �   �  x���A�%!D�Uw�D�2@����1���C�̗R����V1���� ��c:.�Ϣ�H�U��	2`��i�|�z)���6��	�h�h]Hc�9������ADГ�IXВ��{��e<���5��=� �0h/ә~L��~'7~�[� ���Mݛ\v��Y�Ǘ��˘�NXK�]`�.��������)�8�-��!��(~����A��.�GS0���8�Nq����ا�Z���)��S햻����w�Fw��1,_4�8c���_�^�h�}W��怚[��#Y�Gu��-�3A� H��.Zr�꺼w֢�=���m�P����N�a��P�����v�5��o'�x�@���f�,��#@F_��YV܈S�{�??����_�      �      x������ � �      �      x������ � �      �   �  x����n�F�����UѢ^b��%F�=uТ@ofwge�2%Prۼ}���X�ҐJaI�1�~3����Jn���0�2�a1��ZzeD>�u�p&9��TLH&M%T#}�B-���}��g������b;_Dڤ��1�-+�B��BI��$]Nqm���f������F��*��9��:���]��Ȧ҂\GƵML]��E��B��e�!�`��G3�1����NM�%&܎#Eh��yX�Q�H[XA�	�/D-:��Υr1@�L&i��������d�a��4���lm������Xg��G��]<�o<i����3��̚����%T�Ŝ��~��і�j͍:B����b��75�t��$�^�����X&A�N���J�FX%�K?קg��s�A�Q��~�RT���x#1{��*%a�R}�5����˜�,�,�e�g��J�F���Z�cԩ� �(֩x�Pi�T�I��x���5K��VrZ�N�R��P�j��[`�zY�o���e��R�,�Pq�H�p����t��_4�8���M��py��/sbpF�� E2E\U�M��)Q+Ys���?�&�GF=	�'�,�3��R<Җ�����1K@%&Emj��y��$�ب���
��ԃEj#� �)dY��H�g׷�t�m��[b�����zE}g��rw{��z�C��}���C����>���������ӴX?���=�;p�C�;(q1R�~�?���GXR"3�y`��h�rIt5�D1{�A��ŋ�G�H��Q���}n|�Ԁ;�ЩeN�ʸ�<��yJ�Q��f
d����~��.S��C�W����V�ʲ�VВ�y  �Th���
04mWT,���[�p�V7�p�W����-V����\�A\�v+��w�L��_ ���@����?֋�nwU��n��M�xG�h�ˁy�kw�����B����f�E�9�#.hjMr_v�=K�	�� ��p}�N�������@	��pU�pƅ#S�n�n�N[
rV<�A�a@����m��(b��l<`ʆ�ƨ�H1dLO �W.�c���ޠöE�m�&_�g�4�\�A�S��h�n���;4����/u�)���B+��pΒ�N�`�JI<X:`ήW����	��v�xa���>�h�(N�e�nM�O#������r�X��,��\r� �Ө9��� ����*^�s��ǩ��>��L��3ʗ~���;���-B�����{�Y��P�"P�i�2@���L��J袙W!Q��B�0~�U_Z8�6c�?�|���J��osIO���L
pB��3U�ﰣ��<��~(�����JSR;I��������'��B��/�E%�QI�#���G��ջ���W?`�8�jZj��U���c�Ӷ��d�-uOG�a�,��&J4��`?t^� R�Դ�O
���������p��e      �   �   x���=N1@�:s
z�c���Q����N"�JS,��wN@3�+>鉋��:B���buP#aϨ����n�~�!1d�ܮ\��\T�1�b��n6FC�
}�rP�Z��]j�x��}�Ƀz�\�z(bTZ��T�HLO�?�>�Z��\�k9�-'��(����+}��S��e۶'�_      �   �  x���M��6��ϫ��)��t���/�̠E��	P���Xߥ���9���i�К/Pj���F�_\�d�A^�@�P6���R8m��f�E��%C����xO�������$}Z�)���%!����ny��22,�ԩ��>����Q�F�Vn�6�x_P���N�zo����Q;Ѭ(A �?*��d1��#K�j����i���t(�FzB~��ĥy�RO
Re�%��7�-�Z}�[����Pf����
�e�4g/���Ճ*����{�����h���c�X9Y�>�bo�� ��-O�L�Ĺێz�ċ�6�HU�w��VC��4秼��ᅷ�{����I���N��N��(�A�v����מ�?��Cq'?�H[�Z�B���s��C!X��DK�;����?�G����iCv��K�Ψo�Y	8py�ܻ}��4R<N
��I�:�-2gΤ�&�g�W^N;ry����U��9�}������h����F��?��w)��W�l�=��Ҧ�:��E�Up4�!���g�v��Ptć�]y��6�\8ա3D�T����WM�-���PE�Cmg����-BB��q���6oE�k�{������^i����i�g?�f0?,Q���:A=��<����v楇EIw$�����!���f3�Z���S�;nەW���j�ﳴ��k",�L�&X(N�Ggk���K�t�t�ʻ&��m6��g���
O�$�'TE��������)��)��>KۤD±���7�v�yR]���2���J�`�Ⱥv����>=�k�d����
�ֈe���wL��(Řjv�7~x���k�h(mDw�A�,c��BLw���ˏ��-�{R��k&��1�Du-�F�"��Y8>�m_��+m�Dd���Y�4�yI��(~|��q�	�qJ֪�|�f߹���$����ż'e˺F�7�b�����㤶4u��[h�)2V�B��⳴��o��x�=      �      x������ � �      �   E  x���K��6E�ﭢ7@�I^DV���%�6�@:���xb��1�{/5y�갹mP�ڤ >:RD����H�U�*��	��}KИ������#+ �����L|*�܎V4}��R�"�h�!Ћ)D�^YB���x}���z2�H���{-`��Q�:� mp卽<��[<��h3]��2����|ʷ����Fso�ϫ��x�6��P�ϲ6�FP�bhԻ(�|<�W�>��N��{��ެ�]v���Y�Mz֎����x����T?����9�oFX��e!��=`�aA*ݫ=�K^/��2�%=�����}��0�6z�V�8S�)���>�O���_� a��jP{�^�V/V;O����o�I��J�EÝ�����������g����o��+��|)T����7��Jz��Q�6��eT t����[-Cwو��[{���x��6^�R�[{]�[i�]�]Ӑ4���x�����`)���1Yr�Vf>]q?a��W�=��sYO{Bu�NU�\Ķ������j����r�.r�c���9h2`�3{��QV[5e�t�%�U��xεv��Ļ��]���z�_�$��<X5e��Q�S�%�?�MN��{����kJ�
Bx�BrѮE(��>9o���2�O�C�v}�
7lO�)[��5p�oS=U~r���\��R�r���W��.� ���ӂ��X�ޔ��2����U=�qC�'�2��	���xn�K�k:��M���!W�6�'� �!y�	o�z9�!&�%B��y \O罼M�_x�G�������cD�&�CC�k�oeG<=����x=��������'2~�J      �   �  x���Mn�0�מS�(��Ov� -�h4�Ȇ��;�==�^�����{�#�w�[��b���rDe&%��V��~7��y��c�h�3�g�0Pb7|���r�P3R��v�ApES��1�0�Y/r�I���)Ae�@N��	
�����L쇳�i^��V�7i�F����9 k�@A"O��2���Y���u;@�X|��#P��m�
�<2�P��z�ۼ��"��J�G̘㔝+���dE���}�&�����}ի��6����Qw$$�%�Z�@� ORp\�᭶�����\q���X#H_8�8�+���m����}��6�X���˾�6
GPI��X��*Il6��Z������}�>x�m_�J�ϒ
�T�'��c�ù��֣>*���t:�� י      �   U  x����j1���S�^4H����r��"�-m����}�f�҅�& |1����V�@��jƦ�F�qܶ�v_�V�GV��XZ��2�Qmص/��#�r����7;��p�/�`a�إ͹��0r@��0�������[�ȪP}�)����f��.Y��N�}�F;�l�m>_u̚���T:h)�K���l��m��(�\V��K���V�X߀Y���]"s��o��y�~����=��*1^5ګ�>3��ga�[��\<��^���%��w�@<;�YV� �hh�6���?�(���YI"�]�[` ��Η��<w�7~�g	{�52]�����
zg�w      �   x  x��Uͮ7^�y�� 6��h�� �j���r��_�.��=i4���~`�)6�n�a4x�lɨ��d��8�=��R`��ڀn����`�����O��׷�>����?w~{�^t��>��^�`-��[1��{0�??�"��D��" �ع�-�p�f�'�k�X�P�f�_��a�.Ԕ��|͂�L�j�)��6���L��%x߃y�.�i��K��,�`�DjאC�N��v��$a�6P�(�\��k��>мX�8�J�~S&J�!��.�Y�~<AN<�	��^�X�:�vZ����ဢ`8��ҙ�5�4�R�K����1�hF9s���A��U�I���m´�i۩�Ž������_�!֤���q�k�lT�N�7n�k=g0����")��V�(Y����Lᣦ�3�żw�+T`J�V����+Ӱ}����m*hO�I-��"�+��L{�d�$�Q��I*�H`ن V��f�������7�ůJ�'��.�O�(���BD�r��Y���qDC3�m�M�(E^��XMz���:�h�"�؁��"V��K�5���=�w��t�Ӏv`m�]���s�Xe��{�?�{���p֐�㹢g'8c���T�{ ��������O�       �      x������ � �      �      x��]I��)s\w��wц`����e��g��_U/�'1B1_o�0�^��v���BO�J\�l�?��^c���j���a��Bn�y�D��F)ً�����/��_(5�k�})����0�,��[��1��^���Wu�ޚ)��Z7�p�\�S�v��4^���Tv�k�)�o�u�ہ4rJ9�{z�f�Fx�٨m�Y�?����P߼��Wèd[y��߶5$���(5�]s(�
ք�������
�r��Ƿ{|�ְܭ��{�-�W�r,��7�b?�=��nu�؀4����zpu\��K�5݄���?}~^<�Rw���Ú�yۤ���q��fwz�8�Pf<a��ln��u��
�F'k�c�鄒�Ʊ����V����G�m/�ݸ#�xS����7�Ӑ4:�S[�=�� ��=��f�xl}�Ң it�i�aOo=0H����n�c��jy\A�4h�.��4�U$�����c�{K�qI��`�ؠz�Ƈ�w�T���M�C$qwχ��ᛊ�&~��M�0增���Ip��R;о�3��/���������I�x��w��Zu =� ���JG�;I����ull{�Ex�g�x��mP�D�� i��������Q��m/��2V��H�`I[�8�m�c=Pw�0��kA��	��Xj"?)H�܍s�e���-�kY;�~�����@AҸ`���M�_H��0���ӆٴ��I����97���Cb��m����\� i�nB:�0(�9G#���]O��K�������~�fa����Hc�Bz�`l��'I�`_}�{a9��=�B3���X9�"�$����fk�lJ툀�`��}��w��;I��=��S�è���?���uQ�(H���/�_��{��L���)�~�iv(�|f�`}�ipf����5��_��xg���6��-�V��P|����I!�HqI��-�]�YH�(�2$���O'#0�NA�t�go�G�ʈ;�&g��*�UDW�D:ٴA��!,N!@��	�Ucf����
���A�ƀ8��G2µ��ǺJ'I���y�Z\~�Y��%0 D�m�W��D��g�y�d���,#�={����"HH��Է{��3\�ra��95X+�(f�f"�$I���b/�*{�G$� ��78�5�T�"i��ZN��z�5�8=�ڝ���@B���d���b�9�rBF�o`����M����}�c��2,� f�m��^�Zw�����IKA(]Rw?�n�IZ���o�o5�Z"�$mM��`�*���-��s�1�U_5����z{1kJ̋�	��k^�� ������Q�����)~��'?Ğ�d�lqM
���-?xҔ���(����]�����EAҴJ+���y�@���-@��K���@A�ή�|��O�����Zn�PΪVQ����{.�5/��z/x2��˫m(��+H`�yG��Ans����Ѐ74��$mM�.`�keG�2|2D�`��WOM�9%$M�!R��ΐ��C�}î[=d��mt�N
�F�}�>���
�ވ�H C��!��O�'I�37����oCf!&�@�u�;D�S�D:AS�%�9.Čq9����K{��E~R�4�t�가��<��N���X��V)� iz��+P(g'�De�ӌs`��F��$mw����c)��/V���1欈��5)H?�8��H���	z��}L�Zew��?�xw��q����wN, dp�h�cok%$��4F�7�C^�4�����P=��5j�WB�t��B�g��e���!�<��!"(H��7�����tMv}���Q�`I��;V��u�fx�u�wx�!���Gwgq_>n5C�q�S#B�ԛ��Ď&�;	I�l�#���l�|��L�}��SV|�D�T�$+�s�#H��`�5� ;��#��w���5����{�)v|~j�o�n��S�$OH`v���W��;��kk��F��$$�Nk��
��C��KX!_k�ߝ'VQg*H�.(ˏ�K�1�P�m��^���)��'&!iZ��/�yH�8|����hC��]�RB����[g�0��ꖲC�k�9"�#�sjHښF6X򐘔W�Y|/),��BjD~R�4MW=��K�Ǜv>���Oh�Us��ԩj:I�V�_�����-,:�}��i��S�t
��Uz���W�]�U�hb<�
�O]�Q�$mM��c�9]|��v�k�	S�!ƽ�7Y�&-c��w����|��^�C���4~B(6���C��X"E�;�
�G_Sܝ��Y�i1�8u�.2٬\x=���_Tu����ٳe���?�%ǀ%�{vyP�*�$MZ��]��<Jp�g���9�7�9��y��&-n�7h�/�w&�=B��X�TĜIڝ'K{B�%zbe,�N�`��J��}b�/!i�ׇ?�}�!���F��W��rπǪQ\Aw7�/�����@���u0߰.��NA�xܡ�:�5����ÄԆ᱑��e�AA�t����p_$rMa���l�]v9�T�+HҚ`1ㄦ[��Cg���M�R�3:$$mw���ߴ:Ye���Z��}��Pw' irw��eqok�Cs��PF�)�aHH����y���L��_:�~n~v�E5�T�4.���+�yp����C���WFM-�?D���i7� ��c]�����'8��ڪ`[Qg*Hg�Q��`	NZ����Bk`�r�%1{BB�x��~"xt��I��c5۱���I�X-�ͤN03:oh&�>���g�6MZ$$��,�ct�m��;pxF\+4{㴶��q����)�Į�ˎ��!")�8����[��F�4!֞B/�R��/���S�6L� ��D:�=xo�k�ƹ���������}%$I�-We�c���U(^�g�6X�_�EBB��<��q�|�,|�6���`5��ӟW��
�ƙVF�[�I�3�lf�q���]{S�-����'_$Z�Y@������{c���Q���$�i�^x��(�����F�n�F'|F�3GZ%G��غ��
�᠉ZEA�$���������w3S�����!�j���ѩf/�M�<_~�1k�K�������ƙ�
�k�7�;�h�f|l�7Vo�%$qM{=<��䂉�k��T��*g*H��4���^ݬ��������v��IA�,B;�FȀ�o�$&mCz���Uf�i���5�~ު�8<V�`x�5�h�̙�����3W~1����J�}����ʴ�$$�N+����NA�_�K�6���;{	I���@&,�r�1����Y�>�z-[�NA)~F�6��<1�q�h0��gw�fTB��λ=�>P����k�S��k�!�uU/ZA���o�p��BΞ�J�C�0��n�jܢ i�w�d�X��阤� M���ɲ�T�4i�f�B?�/R��r��#�sVs�$$M�nHP�S	)~��.�k����R�I���eh�5�t��@��~Z�d�xU�� itz�^#	_ݸ;�i�?9��^�+H?���kT�X�n�X/>�3�(f�JH���x�b@v�'N� ��Л�����	H���5��2bFW�$����#f�JH�SZ�uN�)"~F��]c\"xigJH�������=�*;kL�tv.y�2�f$$qM��	�/_n����N���:ξS�/��$	.��l��m��D?,���Tl4���"!�k�F���=�b�8O��5>��OV)� i���Z�g+���Y]xnN�ɺ❘���	�n"t�Ð��a9k�W�=z��Y��)Hg��o���;Bز�e���h�=�'�IH�W+}�������_^=>->�k������w�p�S�}-�0�0�=���"�aHH��j��7kd��e�r�둏L��%f3KH�ٵ��.P��9�.\H� �O�wȲX�#!i��o��k�*�z�}���\���ľ!���~��>e�3����`
zb1�x�/!i�9��TC�̞HX��	�    c�՗�*�mHH?>�w�VH�],��
C>��e�WBҴʴ��_���lD�r����.mo�@BҸ`��3HX?��b�X�� �}���D� ��o�/`�X]� Ƴ�6@%mX+��]����4�\`V^�È���-�2��(�VJA��na�� ����zP�sU6Ii+&���O]�����a����i���a� ڈ�8o��ݡ��q�f�Pd����5��L�MCgI6��=!!iZe#�^#Ëv|�<�n�!	(��[�Ļ	I����dw��,8Deka�g�˙�5��$M<h�{��0�����{޷�ÌK��Q��5�Z'�W��=Ơ��6���0��(�IA��L73�l]��Z:�vg;?R�Vw' I��BPX0���#`�|���Ŏ��$w5��ʡN��[�L�t���%�7���4�+m,o(`Hx=г}x������������:��1fV|xu�4\ߺ4~�����Y+4p��W���]��V�����J'I�L۹�1A=|S�3�Ƌ��1�[B�,B��A6���l��Ͼ{��H� Db������d����6+�	gC,��פ ir68�z`�_$�v7V?���~D?SB��T�g��U��Zvrf[�����;kT�IA���n����D�aA�c�qU:H]��$$��Z����	`֒�6�dw��)�]n��$$Mӵް�����W�˝�T�&���$�3�}=_k�y�AZffc��#l�e�b&����]�vlge2]g�
6��X�	͚KIH������|,8����=�< V�KH�.��� ���1��y��pf�sC$$MZ��iB�u���C]��mDX�f�HH�{k���=��`-Un��z���i�H'I;;��u��^(L�Úw����Vu�+H"��6O8{����`-�ؠ��9C�;��4.�[�?4v_һ��͙�Sz�1z��HH�m�����(��Q��`�f�뛨$Mgu2{"�q�O7܇8�����NB�x��K.��J����m���j�� i<z�� ��]k��:n��9Kb5���Q�w0�"R��P[w2_��p�Mg�^���I���'Ĭ�2)���1��	�T�I�]�qޑ[��I�����)"��<u,v���$�la�"�mez�'�.���vvw����$i��_ܗ�<&���T៴L�	I��-Y�������2Xa�bc�����V|���$��rj������!��"�����3�X#!!i\PR��xX����a���ָ�ׄHR�`	I����Y�'6(-`�1������cU� ����Ik�:��#�������ȱ��F�vv5Ɲ~�6��г��݂ u�F�fTB��S�^F+�fV v�E��)����/!i\�U��i�_�3Lx<,��B�����!�䫴�VYz�g����{��k��b�"?)H"�6��%vH��m}�.4��/\�ƙ-Q`����pH��l�C���v�Ӑ�ݵb��q����i9ΘYI����4�C�ZG�$f��B�v����:�u�ϔ�4iR��.�\'��7�����I��x�{����u���ʁ�S�G"W�萐4.�e�Wph_��g��j�'�}5��AA�t�|�X��� ;�!��dgF��.z����A��s"~D�a���4�j�l�=���,!�k*���Λ���c�٧vbK؛?{}KH��,pc�5oC:��&����Ɖ�/��UB)��k����)�r�
_��.vj��4:yj��{1�w�JC�0���h�$�N�/kos�&�48��?o�9�T�*�
�ƙ��d�婋�����d�:��LIゃ-܍�g��w��`6�D���U��JH��N����1����0U�	K)Q��{_	I�-��<���n�.��¢��Cuβ��Q�B����K���ՋGHp?c�[k>b���펕'���9������w`�;���^&�����f����r�%�'<����+�
��U�.Ʀ�����4]�jIL�ݑ�]�>�����e[��aUJ"	ʺ�:�G��l�7Y
�ę="�s��"���p�%4�A$��IB�䮧z��AK�t��M���5ƪ��q���$�xO�~�l�VvE���F~�]��;��$�nx�]�9)=�ӎXY��t��U$$�����È�ۯk��{���x\B���ꗳȝ �3:�T�[�8SFB�l0G���%��L�k_6̧9Eg��bu���ɝ%;��pV�7��<�)x�G���ƙ�(��uFf'X�������&N����5M�L����ݜ5�y��Os�$�8��4~��`���D�ժ�̳����-�NA�$��{�f�Bvy^���7U�c�&VIHg���t��-fj�C�뻼�"F������b�@�:t�pf����z2����NB�v�{���`D�H^[˵�2t�[�"-!ig�o{�W��H_�n8_�̺σb�Q����4����ھlf|_X� J����U�](!i�v��A����6���^�@�`_�w� i<> .l�9'_n&5݃
���&ȰoU�+H��%^f�}nq��,�ܝ&-
�F�9q��'x����N��޽q>̨�OLB�|:_}>H�<<�g�l88�sPK�]����4~ڑ�F6'�����=V��Į��F��n9�u�7�����c����=���;{	I����p,̃G�IU��p�jfY0�.�&IH�����-��Iz�s#�f�����Z7	I;���j�#V����®r���x��"g*H����b*)Ĵ��cu�g�L��_�:�IB�������h��8%-�ἽG&3�5�;1	I��c�pNv�ê0�Lկ��L|���$~��k�?�Z���4)�
�z쨬�G��$�qF~+g8���9��:dx��gJHښRYe��XQ���^XM<�Us���9*{��Ū6�qlL�c��S�֐�iű�
����e2;i{uǛ�%1���$�g���ˍ!���}$��R/L���%$��z6~�֜�jE�:-�hM�4��$=>~�nN3'���fw^J�d;[�b� 	I��mß�|�)#3{"ǐ���+>$fXKHō�f�`u�NX_�DN�!23�$$mw6OP���v��-8�!���7�]�$M���!O�*@i�����*�B�t
���Ҙ4�s��|�]߯���Lԙ
���r�b�D�8fRq:M��J���1ڐ�4~��:Gȟ޾�{3x�E`�;Y4'v#��4�Rw����)��:�5�<V�k�1YB�,B��SY�����Բ�y�e��LB��Gyg��v���"p]a�V&.򸂤i�f7Ɓs 	�z�}N���)�c��4.h��yrά~�����~gr��I��O�����9)j/1�Ę�^;!HH�.�۵#�������7�c��A�X�'!i���x�*g۳CRE�M]�=���R# I��#��|_�$��qz���ó��"!�k:i��=d:���,�����:���-!i�9n�";�����d�8����X{�򸂤�ӄ=��
�4٥����E��k�U��(!i�`U��	_q9JzZ��vo��u@��5)H����QB����Y1L����ڐ0V�jr� i��ZڽQ�4v,�̵����Ҹb������b�L�-�}5��B�_����bO*	I���tg��*�f!#��&}>�>SC����n,�Kn�SZ�e�@��z��NfԐ���D��M��;����X��������wb
�f�wJ���z^_H���pN�̗��w��H'a%c�U��j_�m���kz��$$�N���_�";ݝ�@��d6u]�I�ɒ�D:]�@��$��Ii4�j����Z.jl� iq����6�ݙ�rz��m�1�i*�$qwo���lQr�nC��T���N�����I�Ax����0���@�~�2,j��X�$!igwڸv���YQt<L�Q�ls��Q;khH���vr��`�W���*��F�!Q(H�^�m�}5ޮ���*    ��������%!itz��F���9q�@q~'��nI'�����,�/I�#.o.��w�JL0b�%$I�fܓ������d>�\�mN�=]�c����������^;>�Y'�N���fW�U%$�NiBώ��V��a�`��Gn-?��$!I~&܉�W�v�_�b��3u���N�`;�N���1��8����+�`��ȖD{hr'!ik������&��u ��@%��Knb6��$���3�-��T�6[_w�b�h:����HH��eZ|Mr��;[=�������~'!Ia���l"�f�������"䉣5�?�N��ǳ�}�\x��m���:��i�AY��$M� @��B��p�5���/���k�����;�g:�zfrњ#*����)����DiQ��ݙ��0����r������Jp�Jj&z��ƙ�Wd�p�:�y`t�O_p��<��)!ir��[�q1o�2B}��w�݋x�#!io�ǃܦw���);��^��X���$mw�����O�w쇅���ߥ$$�N#��Z�m�-v�N���������3��T���]��<�1���>��Uۢ �k:�EX��d��z�霝s-�SgL�� i���|��/3=L;��~���EH��;I�݄�Q��c�A����Ap�vL��ӫM�������y�ip�Q��¼�xG[�-�xg/!i�[�E�
�ǌX�L���w��ݳ��}$M�,����И�\�2���v�T�x�"!�tB\v+�0���B� �_o�Dp͎�"�$mM��i 1�V��_ׁ��.��_"irw��{m��3�k����l��PB�v�f��r�����aQ�ا���8XAҼ�y �#(ؕ�\���p[�Y���U$$�N��`��r��L��������(Hښ�f�o�b���&�ً���;{	I����!�]
S�_�h7�������$-����C�=��w�?��j��O'!�kzlv��ރ!-XNxѵB�����+��$�]���*l;o�U�<�}���z�'�EKH������Y�uh:z�,W��� �7~�$-+��o�~�qr;FQg�Z�b��y��xvc��\oҡg��4{���[��$$��3_0 <1v�X�gV���oܐg-��������ڃ��`�D��S/4π��3)� �k���$���H�~�ׄ�|O�Q� ��4틝n�]��9a��;�T��k@󱓔��!!��;p�]������2��`�}�A��$$mw�Z�Lc,��57{C������KH�ܙ%�,���c �+��2¢{�.���O��n`���$��G���?�I�_� i�
��0Jx9u�X��^���՗؏UB�,g���C�n�<������N�=b����q8v׵Vˈ����ҧ��W��$$��U�����9���Bo�9.U|���4�ky�۩��bʢ����(s�]�T�F�VR|�	S�r�m x�W�R�"(H��6�a���/C��:p�����͡z�
���ޘ>�CM�&k�O�mdNo�+����5���Cæ��3~���z#�!:��$$mM8촊�|��2^Yp��1�H%�g� i�4޸r�66Vvc�&� 5�)<�3��=!!i��R�)�,_/���؅��� ���[����ɍ}�K8��վ�� �D��u�b�	I۝7��p���Ǧ�O �����t5R����L�'�B��1xc�uZGT�koF%$�����쥓�6A�;="R�1��f[Κ����;h+����u�j��x�*!i��7�Q��	���{6m񎔺�n.!i�{�ʪ8��y=Ͼ��i��۬�N
���_�%é���y��鲍[���꽯�$����gJ���+`�l�|9��x�.	I�;����;/7b�Y��h	���N@�$�#o<�NAX0�벽�$�X�=bN��$ɝ�٩t�|b�e]6A�|���u�("gJH��R����1V8����9K~"��K��#!�k:���CtV��U���g�}��*-
��O�g~B\��j�Q���*����&�-��O��}�cq�\�m̳N�s��tR�${GC�r���u|�!�7_�̹��3�$$uM����_�z���T 2�df�ڷ*�
�&�V���j�C���
+���W���;V	I�S�9z:�n���F<)�c�[��ŜQ	I�����c����k_�xs��8�VC�(�2<g���9���B}�#���ݢ_ !it�le3(����2aT���Oo5ըr���q'��oz�92+ ��2�b@�R_�%$������LX�������o�ok%$�3z��Va7Ga�6�}u��m,�V[B�����D�݈�Y�:�<�Ԓ��J>�$���-�d�t9�5�3>�
'��,��&� KH�N�>����ar�	+��yX�XɮR\A�(~F3�wN`\��VǊ�l�ء[B��決�#_�;��aS�7���s�%$M��JL�sl��ß���ލ��|���+!it���q�S�L����?��.٧S�4~zy�:�ɨ���MV�O�����I���Jf|�����G��/"[NӸ@A�,'�s��OZ�A�8>�S:�f0JH����Op�
���@���pJ'�ޱsƙ���t/����Q>ߤ�1�{�¡q7�3%$mMy�3��z�ݠU2Gn皗ALq"��$i��!��=���T44]e��\}���+����$I���Gwx�$���n���ݎ�s��W�vv oA�n�vt9� <\�H��;���
�H��,�0N(p�J���zS.����`	I\"j��G\V����řѡ񓂤qAi�p��������O�R-]�두4�+�K�d��f2Gn��
1Z���Ĝ,	I��v+�!��	�ޘ��"�����b΃�$�-���fHA����Ι�⍟��Ip�t�V����Y��ZH{���n��J>	I\S���6��*(:�2�ԓ��N�Q�)H�VA$o�����(0���j{��zv��;� 4�M;+@������iQ�5��4�9b���]\}a:v��s)��So�%$�3Ǿp��D��iӹ@�ծ���,�S��4]0KpqX�D	f3^ ./�_�{����so�=��.BAx6�3�f1��;I�R+�*G��f�{H�xf�#��E.P�4�
Qgx��N��"�QY�o��L�$���f�;��Q
�H���m囼MU(H����gc;�X��)�?8��PR���HH�wM��igrf���d/k����Z�9$�Ⰽt��E��}��ײn�^�� ����^^��@O�S=�|�uĎ��J���i:x�3�u�1z���Spdw�f7��Ԯ(����7��9�П�=[ꄱmάN���4�{=�D��~H���29��hg>�8Q�$��o{������A��B�g���.�W�4=����k8�P)�Q��s�'�@"�N���[�`�7� �	+��ý�3���!)�;q�u�C�R�_'���i�H��cs	I���=fR��7Yhs:r=o%������$=~��	������AL6���n�@z�x'&!I���GM�k>*;�B����?_����	Hښr_�}�+�wp���=�5�6Ĝ,	I\Ә��v��79ٚ��?�w�qg�٧�&-��~�7�a\록�:V�3�5$ŶC�Q��C���j��8o�}�Ŏ��&���q��8Ofzr2#�P�}^��gS�!!i\P��~�%�����
<x@����:��	I�xe���`���@�.�n���9آg/!iz�������	��Ym�I� iڷ�����Y	�'p��}�6���+H�{�{Fx��~�c@o��%�뉝%$Mgv����f�_��ˠ���R.vŪ^	I���?���k������L�U	V�4:�}��T|+�9���o�.P�4�l���\�Y��Ml[�8:�Nh1+@BҸ �6���iX�ʩ�����#��so!%$mM>ۘp�m�����-�� B	  誶�)� i����!,Ԟ���%���5�he�9����'# ��om�܀�=� �j�����	I�[g�M��;(l���BH��{�oe�fX' �lr���{1�o?*�fe�狄$R�$�^\�xd�u
G�@��\���n��@�%+Ωu�´��{
#�x`�[�R
�H�79G7d��4W��0�-�R3�$$�3ᆭ�!."<��飼(��X�նj[$Mӽ�{G�O�%��u�z�/�`�7��&I�(����	L�����pc8}甌�C�vwa�N__���Ú�>3;��>���"!I�y�,/�����$؈ఈ��-���5$���gJ�W��+���w>���*���������N�*�{�BQ��"훓�=!!it���XiL�(�M���{aГ/V[��F����B͛��/��W���f�ܘ�X5'!i�{E�yx�}����������bΨ�$Y��o}�r�=������#]���b*�'	I��|���I��pz!�D��f�&V6HH�m�[��K��[��J^a�u��Q�$��KH�ٕ�s�d�N�^��)�ͩǻ��"!i\�]�_Sg��8�>��i��.΁���5�zLQ8�'���wC��eI���
�vv~��
�ʗe�l�����ƓĜQ	Iә����er�^�=�"�<熲{�;��$��{`�R�@R8}t��_���TlS|ᒐ���gv��D�Ì�6�GlyjPn"�$Mg"+O�P����v�W��mqM
�Fq|��M7Y)s�� ��8�� �+�R������vN O�٧��=�`縘U)!i�n-�������b�Q�<��\i�M�r*H���wMK/�ˮM�ݭH��Yn����$���D+�9��u(4�L�L��2%��4�t��;��
�9#�h ���+�Q�LI�'o�%��'���iG�WG�M_�M��tR�4� ���b��{��aYi4�L�Ƭ�TM	I�Ӟ����������龟TV)��J'I�Ӊ'r0�e�h��<pA�s_/~]|{������39���v���|5X�e>��8�ABҸ��62S8&k/�p-z��r�X����Q��w��vN�'�ǀÑ�^�'p�+H��^�����7}�����v�˓<ŝ��k�4��Ůr�ݭ�A�Q1Ɲ�ȥ�;�����c<�%�<@�"�}_�g!Pͫ�������؜��e�&�M\h/�R�b�&	I�݋���\��ws:�c��(;>8b��IH��8��g�p�R��ή��&`Ei6��	H�m�v#��ȩP��Zb�1>��+���?D��R�o$���gD���U;SR��=!!i\�V�,�a��P���:@�ʟSF�W	I�xZ�ܜ=`
˼� �"z��R�M���&(3���;e,B�qb�'��,e��VB�l�����|.��\D΄�h��b?	I��\3w����[�|߰��x�nf�$�3I��;#�ů�͠��>�'�<E	Iれ�2s�*�2�jxbm���b����s9➒X��5Pe���\Ғ:�^B��.�mZ�fv��֨X;yTc;l�b'N	I���x�����e���#�af�?UZ$qM�=A��˯s���h��)Ĺ�������[L�z���<���CN��&��.޴KH�V��@T��=���?�C�P�*o�s"g*Hg�^:��n�X3�}q����W	I�2@Zpf�+����q
��W��zV����q$*�^X����]_je�y��TW�4M�Z���}ӎt\�R���+�o�X%$��A4���ᴣ�籕�X{�g���$mM���N���1�X �	��!"K1�>����8,�l�̂��3�Ya��zQ}_I��/�����[S,��/�3*S��U$MZ:o�Xj5���DX���S�8�	.���
�F'�<�Ȁ��gW^v/���X���8_�`I\S����ON�8_�gpA-�f�n��[���q�|{TH��ּ�2b��*���.VIH�V����WN�f��Y�U�wA׈���F����C���f�e��� &>�s�b�������K��t��.`��ccN�b��I�I;;إ'gGoV��?�O�>ZeoN��w' i���ေ�M�AD��Q,4@��&I�t^��i9�&��h㽞b_��*H�ٝn��M�����!�}�[�U��E�-R\B��t��ip��b63�i�q,���y���YBҸ�c�n3��.���;�/:�R�,8I�t���m<TD���/7!^�^��4:]���v�a�կ6�ۖzo�TZ+C%$�ǡ�v��$��A�hp��!����		I����Ͽ�����      �      x���Y�-Yu���+��WOVߤ�5B�t�T�5s[-pie�$����ݜ8����U���p�x��=}�1�Xk6mE7[2G��a�v��az�u�QS�/�g�j���]�sk�������~��U��o~����M�n����o��'�����[���ￓ��?~����/��񽯾{��_�_�����ů^~����쟾l?��������g�?�;L�3k>���?�����<�����3��䭍/�e|����o�~�Ջ�/�����l������lI3!�y�6��f
G�����qӼ��{�s%����\��Oˆ����Ӕ4^Lp~�`Ɯ��,e-7�;��R]/Kٳ�{k%�\i�_f���RZ��/��_���զ?n_~��/�|��o���>��7�������>��˟~#��.����3����)�Tm�>6�����C�,��]���G���]���!k~3`y_g�i�����l�m{��rL�O������;��+��b6a8c��ku�M�׸�֝�F��(5��l�kgޭ��yֶ;l��L38�L7\����Sr�Ml�ۗ�~��O�>��!S]�9عM��0��#؜�6�=��s:��\�bT���س�Z�a��Qأ-�������V{���t9�|[5�\����g��3/4ƽt��ª1�����m��oF}�T��:���˹�k���Q��[��Ũ����8���5���mS`�4��,���6�Ʒ謷%�����rlW����hK'E9{�݄��n�_͓&w&uv1:rՙ����*���#R���!k�1�-�J�G-C���Qb,+� 5�����㙹[�<>��γ�d�
�V7����4,�M��m��{瑶�!fxҶ�cϾϚj���fC�i-�Sq��1��2�ŝ��E0�}�S�+C?fi�ݽ_�b�t^Fl� ��*����m!����z^.�Ź��+��Si�	�&�f��N>iT��u7�Z��dk�v9�ݭ5�m��ը���u$.@7lԵ��}9�nm� \̚O���kY� ΑBI�{,{�e�xa�'P���KvCrmӬ���^��O�	��+��}�ݹ}�Ozr��� =��)3��rsf�(��w@	o��ȚWt�{���Ǭp=c�
:�uw�v�,��柵/�j�l��������/�����o���|���_~���o�⋿��?������_������wҗ�����e���^~�~��/���/9������m��)\�3?7�sk?�)�_��6x��@V��±<�
���C����~����Y�j|��Wk��>�㿸���5��o~�i�����g�E#�_���<�L���o~����w�I�7_}���_~�����ӟ����n���?|�'?����Ϳ�^������x��.��)���y��Q���9>W>�^j"������_�?\=��IY�{foƣg��cq��ay����=p��o��G�?������������o�����w?�������������7����|뷿�������|�����|�̓N��|���G�������]����0a�#`�����'QD��~x~w7÷����O�W?������?�Ϳ}����Ͼ_���Z����9��?�5������7����|����?��_���m4C�ܘ�c�,����?��a�8�J-�%�5!��D]���Y4���XH�'�����>�F�����~/��~�~����ÿ���������������_|�;�w����?\��y�!}��gչ�k?�/̐�O��|l_��HJ'�
4P�}��/a��+���#M�s�c:V�j����r�	�n[�U���K�m�ܖ�3>����^׬�;x4dphv�ڇo�-<b�[�m�U�pƢ9B+樵#Fl��v��b�z��籯�[�J5���B����>��*ڣ��u3!�%ǫ��is���*�1Zj�&�/�,��'��>%���Hc�U�6��x4E�~l�!k�,�`qX0����(3�+���
��뎏9�xpj�EH(B��Zr�m�1�l�s��q^��{�FQG�܈wʞ'�;��"��n�.ݕP��ųZ+�m��Y9-�l쬪�<�=�Z�	���y���@|?�'F�m�h{x~�#�B�]9��'8�}Z	����r蜶������M��1Fb�{��P)��d���I�v�YB��և�;���y����>p�n�����S���H����G<�Co�Z��ugȺkKȩV�ajM��T�0}�Wú�Gz�{H���f�5�0k~�yKm�:嶳bl7��ov��R9^����kS��C�3C��ŝA[��,�Ԯ���������=Ø��aQ�+�����·$Ru�"�%S�9y�|gQ�V�}W�{"�1?[ɡ��k;-�r�@�zRL�"h�C�w[B������So���C|��C������eꁛ�+Ն������~�!=\-X����m6�?��{\)B Ѩ���
j��`f���l}�k(
�.�,N�z���j1)6��1������?��_ky�`��!$�&��T���^Ң�����L�{޼>,С���H0)�A�����I}���m<�>cn�-(���l�&�'���}d�ݛU�f��Eg�G!X���]ͯ�.�"o:,�?�;��-�b��o�@^��I���>�w��� ��(��m`$Ǝ��p:��%O8��X��8�WU����W:͵~��cj{�b�75�)c����'����4a�;�oo��6-~��������=�!c]��ӋѦ�j\�M:�$Tv��,�ӱ�Y�i�v��+	?�A�
�V�a���լ�ܵڲ̆��iw�	�a	�{��,� h�j��i[�vh}% ��݀���Yod�!c]�Z��uh��Њ;0]O����U��r��r��9 ���F���N�D8��΃�Ye��.?�fhDs3z9mO��aX�}�"53!����{/�I_���G<]S�h���t��{�>d�;�p�C��!J��p��h��|�}=���o�ȣ�&���[k���������_�Y��j�\v�q�}=�,��Z�nc�6�����>vCsے�\i$���2�wa��C��������	��si�$��16�<r3�wb��W���6N�����ґ(�"��� �k/���8;s���`��g��M�� �4��q�����,�&�g����=K=F����>�%ŋnK��	��}��_?b����\;�R�"(����_�旮����!��MX�y@��|�a�_f���#N������՛��YQ�vO��{�J#���`^X������LΣ�9��6cu���.����������#��e0�Rb4� ��r��42�P�S���� �������)��KJ��]�y4F:j�'�_�)>���!2���6��R[�5�>cq~��a�C����������=�Y&x��jVڄ$#�&�	(��D�	j�c5�f�'����<��A�M`��,-9�&�Y�gta��S
��uŽ+�`�7�|���bV��O|�c��1�]VG�1���55�<P���,���9�B���/:���d��l#̱��na��6w�(l��):�-v8t�%)fCdړFL�Z��!^����U1e��c��0�{�0�"���i�{�x��!�m<�f�x��;���;�+�P�B9s���"��&������U��e���lb��+�}���M�p�'�o#��$y�!c]O�aHs�qĐ��s�<��p���W����2��9m�[���lsi����*�v��]�VM�ሦ��J�{n��ݤ���Ų0���_�'C)�ش��֛x�4�G�u�Q[���^ ��>�	���v4�"�v+���ǔٶ�V�-Wm�~�6�u�Q߻��1hu���0Ȝ�t"���	a!����2mL>b�����a�yq�m燌u��^f[C�.˶�G�6c�����F�u��sN�,m7C��"��l,�u��kK�f��Ƈ��cv%S��T2׳�D�ך    g"���S��E)E|�7�%���χ�u��du������X�(({Aj{sW������U?&dz��Ѓ�N��1Ђ��X��䷥��B�G�����#{�;+Y�j9T�.�%GH��GT�B�f�^fM�kG�����Q�Qw?d�뎇��tD3`ˢ2���jN�H��Y�FOt��СC�D��J�Jւ�A���{�W��Fm� 6W�fy�=�}�1ƴ:�Wn��P�O:��ϧ�Ĳ�XikZ����TF}*�G��~���=����c��y�vMT�둌b�b������,��]�Y���m�k�ִ�j|��u�k^��ei��5��^#���U��Z_2�p�'D �o�8��N�2֕&��;�lVіS;Х�[ڋ׳n'�ޝ��k5m���+[�`��؂�f��k�ʐ�6�,���H�ž%/s'$C���`ƽ����@��g[X�ӧ����`��P��Ջ�"����7��=o0�v���}@y;��EqE�t}�Z�j{q7j�!�ݤny�`_Ś�R��Y �,GКMX��7ۣc�ӅCDm[)F��ey����L1�^Z�yv^��.�ݳ������o���f{Xh{�C5'@~Q[+G�5���~��p�B
e4���7aшڣB�W8	�7�O�Is3�|��-�ݞ�nG�n�w>:.$�)u{�����[of���Cƺ6D x��3.����G�N%0i������C;�d@<��j�#��mń��E���_���VFD�N`PO�t3�)jØ�a�5:���������8���~p�|n�=��@ά�� ��ڊ�`W��`�@�0-��f�!#�RrOѿ�5����&~ݷ����
���Ѐ�OH��߰HmĶz˘1���uV ȩ����=`����<`u�-�D��4�=��žn'�>��9��&"��#��l�׽Zxi��4���ؠ�c,��,+�`>͘�)7Yҵw�5A�V�}V������O��w��ȭx����]i���H�����y�����6۱ۂw����T��!ѺWۗ3A/{if�Pk˹F���� ��Uws����9/E��+/�_���?�_O/���)���I�G�P��6J�+n;���@	�W���n�N�8 ��2��������T��o<XƋ,�J�l	m@B�/�.�q�%�`�z3{=]�+3
%t�!S	���=��[y
|�O#�6
4���=F��5i��.�KJ>���t)�|��G��#�|���,9�TCjp�P��Zd��؃4��k=�B��ٔ�Q�P���i�zP��Tn�;豫�H�H�9�N	�o��q���X�]:�����#,df�V��صdx�r�o��'�ӽ2�[ĝU>���u�	��zPµޙ93�� ��
��	+"?dY�'Ѣ��\B-4���YM}ta03��AI��=b��.�����c���čxDTB�&t�\�����E�Z{����P<��#��%�-�S�V�/�a����G���s'��6��($7�� �sH;<�9�"�M�\�$,�M.Eo�I���
�!{����v�@ �\��RwA���k�h�g �LV��['�Q��}V��՞�z��#�<Vh�ag:�ֶ!"��t����E���5@��of^������_͛��ntЕ6p�""�]6���I�󺑷T�[2%'��b˱A�0�Z�j�Nc���B�֥`���#���/�L©m��f!��o�:�PF�b|�O7�@��"�=�{0��Ɯ���F���2ׇ�u�=��p_%�:z�qmIM�H��U���-����E^l5�3S+3��j�x�֕���� 
�V�����z�f��S 4ƚf��f�e�#�q��P􈱮'k�j��oc�-�z`�r@��e;<�jք��������X�mJ�����uΙ��C@ܩD��U>�a���ѹ��?��D�8�������9�^���#r�k�_4���w�2Ȟ�mg�g*��X�@Q�;a��/��9貽�v���s�6��g�aNe�>�:��3�N�ZG�L��k����2+H�l��y)Rj��cʘz���7&w�x�X�:���%�\29�=������Ͱ�4�ұ?`u��t.5��i��-gh��kh�6c�Hc����hOW��8��ׂ����+�4���n�xC�|񈱮�
�ɪ��k^A�1=��i��z6���0��^I���mYʈ���e��;���kyU����ц�3w6W�2f�'k]���m zU�Q��Y
����d!3���ށ=�R�e��H�����ͥ��m�@��b�*�h��Q�r�P��k7s�6������fe��f��,�v���5G�blT�!o�c�j�J�S{6���}Dt��R
�F��:u���xO9�6�2ֵ���� ������8�N�d�jV{�<�o[���B��۪2nE��d8g��>��\�D�����,s�D�쾦䒴��W��?^�SƳ���H�`J$��*��L3�/�#����=�{�tь��M�t��-���\fs[�l��G��Ҭ�U� 딟̾=��&|=&��]km�iչŸl���"#k�F���dB*-��5�V5��b{xs��գ<d���@Z�T�F��Z9�v3���ïfE�uHI��Օ��8�����ڮ�׍O��j�ǘ�0Npܜ�r^�4��z)C��<_�B�㵰��8�(��������yE8�`=\=ZZ�0#u3���^�_gai��S��T��κ�����j�p^�/�xf�q[3B�ЏR�lOg��fܭ�/�-�y��\P��Fy뭷~�X��ήԐ<��d�Z�j��{X8K��@<�,�����*!+.�p�f�a�	��� ���E�%Ģ<�d�ɟ�<�Z��>&�%n����MڷN���B��uo6��.>R켄�7���NM}@x gWæsZ���U·M��"fք5��%�d�TK��T&RJ�(��g����w*�jp)B L�]�xRT��C}|}�&P�(Y��*�!�^1o���E���C���T κ�u�i���(h]>f��e�5�+�S��D
��R^'~s��a�P'��K�]��JH�(fkJ7�g$�15�ڴ�y�.>�av�5��H��	�&�:���������=�=��!{�Y���K�����a�]\�ҭ�!��@���r�N YYB%��Z �_x�<(Y��]i��l��������~�d�ZU��cy�d���t��:V"t�8�v�r&@�\:�m�too�=�u�< �n�*-i%(�݆���v1{�Y��Y���H�U��j�-�9�SYj_�%G���4V�sJ#]�$�)r1����i��U��Q���;��BP)�n�C�c�Z_yM���Zx��{����v��=�`�fl��m�?�5ҋ�G�1�%`]7��9�W��T����GwuoS/$�P�;
f��f��܀���Ϊ��5^4g�r��o��st��P�Ҁkx��������CmV������8�=lo?����y�}C�&G��Ȑ�Iٍ_u|�b�5�.ٓ��=��[!���bo`��j��[��;��=T�QoB|" z��ޞIĨ}hP�MD���҉䳄\����G;8/ȃi`�%�O���C��DZc턋�#5t�bGmM���"�q�;uV�o���Y�
��g;�D�]�%� K��-��8>�M���J��y͝p�bm�`��u��5|��o�a|6��[z�U>�����ꗾ��:�}�Q�C������+�1����G7a`��Zڍ�'�.e��>�"|�N@��=jO���j�FuFAP&����if����N9���giT�I�"duPi���=����=�[��m^,������w���A�AuG��BZ���)�A\P�u�*о�Q�Y�t+F�RJ��;�T��З��g؝�:��k��n�'AW����mp-U�|�O�|��+h?F�M[8�:���}�ґ�{��~���=���NN�l�P��r���@'� )�ӫ��    3��Z�j�ݫUMj�ƫ�Qc���WK�����;]���{�wJ���aO�qT77�)�w?�q�^US��^\R�1E���s��������})���\�a��u���������!�\5���	���]�&uy��G���(C��K���9mxtK#$�e�Ä�;ڧsuxHj�����E,��������n-�c�j�Z����W��f5�n�]��o��!{���`)ڡ��#���Q �.�}g�o�	��q0Tl�Y�%�Â8�֏w�3���'v�v�����ԟ­g�܌e�zd[�]�e�X������^�}��!c]OԼ�-����\��x^��JQ�ig����O�r���ټ�����B&�6��ڐ���፯;`Φ��}Ƨ�ξ�ea�iմ:/3�;6wà�nB������V��R���A��� !.�D�ӛ+D�:w+695����oI��Su^vL%>��[�]��v�Aq�,�X�6;T�$rd���7���+S�!c�7WJ`1-{���s/c ����(fs6�U�����bo?a�91��Mp��A�K�s�-0�7�Hm��0�p���1��ݒXhp�64=gT޸ ���$1�]{�45�W
p3�(='`�(��}�=Jʕ���MեmqP^�V��W�ꜱšb9S��ѡ��7Ւ/�exz<C#u��d�1���U�Z���|���֤�Nl3��z\�g�d_��ӥ�T�.]A�;;�����}�h�Z��6_A�v%��RJi�j�o�f+|�����p	}&�'""'�Ԫ
���T4�N� �����
�ǆ�\A�@�!D�a6׳��ρ�V�۪�G����&��0H?��l�M�4��AL��MiYUݪ���F��Ґ�{�k��{����u��{k�ޏl2��,lek%|�,��q�_ѱs�;���/��	y-��3�p���4jEE�0��	��!��=�()'@�&�G�����ԕ֥�{i!��r#������g̝�am��P�I	ɎШ�3��ڊp?.{Ğ�S�S�93�EBR}g���X9�m@�+���������r1���z��Dm/���ʑ^s�XT�T�Ǜ��J����5����}��nZ�����;����s�*�.�� �����X��=��3Ւ��u��yy<W5&�V�U�
���1�3n��@$��~�0��[u���5/D����<C��em�V��#���O�m��]50��Kf(ճd���~�� ��~�Eo`���w{���5��[��������~��#Z��G1v'�X�VuB�gmA��H�1�4kŮ�����Z��k7AZ�p�ۂF���V(����M�l����w���g��u�6���D��?���>��PCn�����}�\o�[���ѕ�уI+C��ڪď��fF7 y�9/���wu�錈\\k��[��^N�&S�&��s��V�Q��О�F�n�<yd\�k�aIf��q�q�~��{Ȟ����"2ǵq����6��H�k�b������EU���8�#�Xȶ��������THS��=z�����gw�ʼ���6Q�����_�E�Cƺ'�,��`�W�sC.V����4���p�WZ�9�QcRΦѬR�T���a�f��k���GC��bbu����y���n��ko�e
R�B�5(Ϫ�����{�X��2x��n��"\�JT\:�MU�h�Y�_�}qf�A�t�W�l}4�ƞ�3��Zl��5�Q����X��Q�J��c:TmR��V
ΜÕ��y�Q�"�2ֵ�p- ���5��.��Ū���j8y5�;#�Ϥ]��}��.�Go�&�v5�Z���fAh�{��x��-8�l������j�4�7(�Sr��o�a��V��Mo]d���(�@4*�e��N��՟�~�^��ǖP2+Y)���?�K���W׌3����:~��ݭ?1wڮ��w�=�q������6��gs<V, t��X 
Й�*�ї9��w<q}Ȟ��N�>5\Br��[g4s8b��EM��>������E�/�����ď�"�~�FC;����M��KR߳��fB�YŶ�.����zYo>c�þ�ƺ�tFP����� ��a�� �U��x���;	d��0�U��)05u��`�x*w ����V�}�.U����<���+����6$DM���E3B�6Z�x��C.�#ƺ
�!�֑���9���=X�Zt�t����	v��%�i���[�����뛗V'9]R7�k}��y�D��=��Â�-",��_#��U�p�g��c�j�H�~)c,"�z����vs�����x��*�r�\��q���J�ѐ�峆�b�3����2O�����_�(?�;�2�aS�k�s��ln��	?Oc{`>4��f�}�#yV�y%�K�wF�4a�W/u�����[>�@���y㹢�S졎&��_��#��u���˵52���*A@ö�u$��h/��&��>���&(ly��:��,_�%2du>�R��5�������-'*"�G�h%��o��.%]�m(�E��	�C���8��ǰ���>�� �%�Ӿf��z& ��LW+ ��ɽj^�(�[E
�� �-�K��
�\������F��RV�Yu[qe<���^���'m� ɥ���uغ���>��y���:-�7����<g�j���rׯ��*����ld1�I<Iڿ��0O^�~�K�2�NVQsR��/Q�~D4�|����>�Cƺ6]�1�m�1��#��ݤ��M�����j�T�2�o��5)�D,�-m�I���f�g���J�q��²ŉN��>�������JPv("b(�{�hޘ�ݎ�2�ml�����UʴMG�|��E��e��լ�l�vM���G�׶!L�#l���(�D�!2F�����A{Ch��NP�����l,���|]`�O�+[_�\��r���������N3@D�(��Hǽ=�#���BԈ6 ���m��cj g]ڽ�7�Q�i���U[�F�#�E� ���H�%�ٝ�w��l�E����k�%t�3v���V����i�Ns�2os:�'{��jV?�1!c2p�*c5�^��.��_��6�}�Ȫ�ū��&#s �p��:�k.��`�h;5�aG���]���=/{��!ω�7�m;[*�G��޸��^0��,6�ӊ|FI��U掦���'	�x�>AO��b�ϴ�2�c�<`"v�v��Zl��J�}���&��\�v<=��l�r+��{�f�T]4i��~�m�{S���u�aV弄<c�WE�;�F�_��d�x��S�i/e��cڵyOEh�7,�#��s%�kzpr�Wg�E�!��[�5��T���D��9M���{��Y�?���C�w-�C.�(k�}>b���5$�j�|���M����sN� f#��D�W��3������gE���?D�g� ��4��T�����7�����<��[V�Cƺܽ���+��j�y�i�i,�|�SQZ�ܙ�S��C��U5��l��_�5�6izj�x��g�֝�:hJ}�6UTq
���WhZ$J���Mg�Fr����'�<b�{���v@׃�}-h�w�\X�v�x�d�凯^�0����e���FgQ��k1A�m���¢�3ե���)(���U�����A������p�7*:��󢇌u?�T-x��n�ԡQ����+sm�ۼ"ǩj���Ɩq|�҈���5���ɪ��Jq_�ڻ���ysjD���T('�c��!��<=Ϡ�R|&�z�n�b^�}�G?�#i➤��Eo���h<�G�MU��lӐ�0n����k�M�vD�j�ʄG}�j���3�riv&z#���?�k �g�'��c�~�fm	��^Ie�v����ͱ2ו�N0��yl�T��A���1�C��ͰNQ�Sj��*��f��m:M:��ڗ�T�v�Z�~�X+�؄�&��nvw�ճFk@�%k�P��M�Q@�����EM`�YԤ&T�ϡ���r�t?yĢ���+^����t    ;j�~��5/�̺�ޟq^�~3��g`�hj���Ss�0Y�d(,�EI2�j�3���O:�������P�D��ŋ��+���ۍ�=d�NTcZ��}�C[S, 3���e�))�LNm3�u��FYh2�1�ۣx��G����E�L�a���%�����n���O��|=�P�"�6�7
�{ۀ�7N���8<d�{$`ƀw�o3��.��m���ʹ���H|��\hJI�Sf2N���R�{L��́.�w��j<��O*�VB��Ҳv-�����P^�߹�O���o�k��'���ԥ9�.{����h�u/�~Ȣ�q�k��ˆ�@�pt%�U��ț���@k��j�\3�����XJ�s����c�3�]��8!bb�9��nE$|��nb&��2!/D/�j"s���	)zk�|O�|�\4����i�4{�u(�;l�ܝc�Ӕ�:�oz߸��C��[Q̽�W]'F0��6�w��D��q7|>G�|�v��_��m ����~V��#W(b��i��f*i�}�Ky�wߙĢ��SElI�2}:�H�(=���K���M�7�TsS�Q����:���ft͏:��b;Zo��l#N�v΍��5r�=͟m^]szq�o���bf������o���uʡ��E��b=�!v������E��c�Q�^����:��J�g	KO�;>2-��n��`;���鲗4�
���l3�Sө�}���LwV�z��QK�?��|�\���v��D��KP�򼴟\p�iw7��F����X�[�]�]�k+,MY�/��O��]��V5��Uu
T�\�Yk��YcU�-%�I�K���S�����=p^i�vA7��l9���=��Cb�#�5�.�gb�w��P;K!��a�z����^I�[uѶ���9-b�?�3�Gy���6@�VidA�����/|�I�jz&�?+(�KS��D}��o���5�{��uߣWDkj��l�5�o��9���PK��֝&:n`�E�m\ |�n�]��~dZw��'fD_��̛�8Lu٬�J{��"����|�QMꚁDMф������]�G�u�f�w�����Q��FwX��i:wˑ�֟v�h�Zř쀈);6��\񩚗���\;U4�TC	yA6o�.��Uαf���꣨$�����>�R��'��F�t8��c�U�M^��VޱB�!�^��X�	���{����������-Z���6����|!R���%��$4�_��'Ԧ̦q;#;�q�F}\?�>����A��oY�`����v��1���"�Q�Iu��o�x�m9�����cq/6{Ȣ�F�����Hx�4����Z��{�6����*&{P{p1�<cO�Z���A'���HT�	?��:c�aW� <�y�����I�K*{�y<t��Cnh���>�g�uj���ԜTE:�iX�7�8�L���ҚRt�J���V� ��.t�ǁ0����1C��-�ۤ��E$�~���I�N���pirDW�)8��ű��'A�!s]�T�U���"��l��=���]�=n'T��3L<5�-�l�f���b�/h��p��tvՆ�7��e"Kc��mn�ѹ��;�W�vH��s1۶穟5�_��l�!����k�D�o��Gj����E��+��><Pi�w^Uu<�p	�Md��S+�s+��;.��f��g�q�@�]?r�	�c�]ۻ�ka��$c����n��9\�Y2���	��D��ֽo��*�U4�V9r(���<,�K=�w ��r|gͶ���c�`��1�Q���Ȱ��u �&��4Tl�0�B����( T ��4��Ckwj���6)��w����է��ɓ����%��#iB����p-�Μ{-�	k����u(��Mi��%6�/Z��� ��@ǂeL�x�"ݪ�旃J`2�4���;8����B�A���,k(ie��UE{���x�R��E?t n�r�@T���]±�ࡌx�����q��cte3�9� u��uG(�z�ߥa]�T�>5�h��ŹU)���u� تx%���ӳ�
����#��x�;����w�*�ڃ��ެ��F.:w{题��iR���1b��q�
l:��y5YԴ���D�[զ�𚋇W��l���YK��g���ͳ�2\��YqU����`R�Mo��x��|�\�҆Ʊ�	�`	`�x��-uo��Ͱ�t�膻F�3#i�d�Jl\��0�v��D#�qVe5�O��n�u��$|�:tp�S�7r����!�2A�+�ɛ���8|,6D��s��t��~�!��A%���0GF�!q�=x?�i��j�t��.�m�������n�WV�WR�Տ7���aL�EF�ЕP���"�Ӛ�l����F	�p���Q�3k�A�Dj�7ޔ�0(�s�U�Q��
�(wg�f6��.����W���RǊ�(�l33��@k͈/�,5Ũs���ؕ�>R�S���ǹU���d�OMUc�4�+Ng��$�ޜ��p�U�>ju�ޭ���=����C=d������-&>��k!��B��Sn�Og�]PałXʘ�7��*�H�s�)P�8��o�C����S�5��Ϟd5l�^ٷש"5G�H��ּu�]�?b��YK�e�e<��i	 �3��6�"}nn��'��_�[D�O����q��?7��֥-��uϥz�a���:�N���ϴBTF@�'��T����n{�˳���\����f$Ԋ٨�mjo�'��&��E?��[xj���yG����~���B��۷W�^m]�P�նфV����Z���K�v�V.����l�4�T{�~9G�a�ަ��UM��Dj.m�>{ ��e]TV���;������R���X�*0EuA�����(��Û�_�:�mn�z�0M�|r����a�<�W�eY�#P��U СDMW���]� J���8S�5����R[�5�)��ͪ�����?d���������ׇ�0*d�^�r&�n��ͩ�Jtц)�h&r��D#��k�.Ξ�����>yP��jX��~z7��/E����t�9�<cӽy�����C�oL� o�+w_�K��(�|Q��K�fZ�^2���s��pm��j��c-o�ߪ��i;0C$�+�}�kn���"�5��j�Zr��i��ٽա4�>B����e�J%���y�Nh�"��,z-�,p��P���%��{���w�y��;StU�y.�\��[�DOG�H4r1�
�ƷK���@^-���9��eU�j��Fo�Z��Apxc���n���[�I��������� Y��:�7���z[33��H;�A��ł��|dZ4fTC8�8�h�ƍ���#��O�*�7�V�I�8:�=�SYp*�@��[x�w�}�\w��j��E����~���opww�U��*�Ւ��1iل���Ҏ�"y������g�Z�Ep�D4��6�re���f��*��/u��>۴���;��%ˊ*���w������ُY���2ʱ����C]G1R�U�cu�o��>�G!wv�
�p3��-\�����PO��ͨU��;d�
��� }��Cr��{֤I!MD(oF����;��~�\��]jU8��έQI7��]�	h��F�O��Cu���d����Ȧ���G\�2?��$W�&�E~׶��'����Uu�KU#��T�]QJ��0KC�y��{m�C�&}(I"N{8ؒ5t#�����@_ |7��p���1��&���a"��奴  㑹[h�ȶ͡��i�W��=�;4�Ǆ8��k�t0�q���?_fNn�������L�:�:X0�=6���Y��$���������R]H���y�}9������܎�&����
^��S�����tA�� uՌTc�G$���ļ�l��Q��m�&37�뻦��S߳i2��|n%�<4��c��a:5�E���{�u2�ᶋ�䲹���[�
Ucq����sTn?r�oU[l����g��&��ѝ!L�}k�Qק��ߧ~�s�������JZh^�*!�'k� 7 欚�hcqk��S�U�2<n�fh�b.�@�>M�_��RQ��	�#�4    �щ��=fg���KYu�ִ7nMy����:�n� �q^[����GS��P2x��z{��*J�Კ_�懩k�@K�G`���% F��CYx5���b+S�"��'�9�}��b
��Ӡ�e2׵�M�D`�C: �T��pLB��]�To�,��&g X"dg^S����^_�f�B�Z4j��^�j4�9�fw�z�++����ሇ��4#,��^F� o4��C#bC���t���Aߥ�����!��c�)>�z:n���	!�wU��;o���*�����J��A������ �z�L9D�X��;�3
�@�Qw��sd"�H�\{�����T���{����5|a�m�R}��Y�=D���a�����E/�Q�#�t
Ld��g5�t5�K�C8�!
jr��Gv�:��j�'r't>$�h:4;ِ\�d��P�aIώ�F��0�+׺B0{�Ky����7��{��C溍�B�@T.üT7�l>��,�r7l<���%5AF]�Ւ8���.�@'F�5��D����;D$k_w7;"��ۖ~���j|"�sh=�(�={��'��eG�n�����r�n_��KQr���z���NA���>B���iG��b]o�Og��B��ƪCTBd�h��X�%�`��S;���mU�a^z�oqp+(̊��zfW�v��W��-�����C"�x5�զFn���eu�K'�p#�Y��:� ���Y[���Z�Nw�6|JjO��-�j\��w����%��Zm#)B�n��Z����JBM'P����0<�۪ʩBn*�����|1ׇ\�kG�TxDã&h#��MJ��V���c��	 ��*Me���2/�}B���fM�q&K���ܵ�nU
�T��,��=:p/��۳�}ǭ�mq.�Y�9�T}��zX��!>b�{�G����Ǌ�Y4���$l�[f�����)���ÙRu����V�ڑ��?.��b��� "��i�y[�
2��F~��w���4!��P�<冉{D�oJ�+�2�5���,�$gmݦ
]tek�\������)Z���Bwv�j�ųY�).���c�r�
��wE��
O��T__��5ܼ�6`���(���+���^������9��a��j��H��m�0��e+ў�'7�j�f��ڬ)�։�����.d_��6UOg�Rx~�O���jB!��b��\4��ҹ���w����c�]P�f�̒Z[~���{B�#��uT�	�$�ktqu`�d;B����ݙ�vu��z�9�����i0��?*	�b��(�AI~�6P1�$\�g���R:Di咝��Pu6q}!�4��}� 2����Bs����M��pߞ����mc4��c2Dy�KK���Q��Rm~�D����;.��fp��������g����܎�,_�(S���j��x��v�P|C���u=F%�/�p^�{p������P~��w��t�@�h�J �A�!F�?"o\qؾ�1'S&h(��S���n�-�'�t�h�P��S��\�[�j���C溦�S�P�ư��7��Z�.K�.7��Sm���b���m��e����������<Wqj��US?�^&%0���-��c&�LX������3�Z�c�g2׵0�WW�Р��� @���gº$oy[1���dl��~���P�S�U�gv�,�BXQߣ�d-BM�S��'���^M������'e�­ߺ;����!s��`X��C%���Gǵ4�Jm��uKF��LbԠZ����W��f˛T��W���N���y5�v6T�$��j
��,=��L�v�~5��q/�L����̇�u�ȇ��m�A�4D$�w��ù^���k���N�
"�ñ�Mt��j0�[�)��0�^9�P74
{m�Vl�7��SyZ�%Vr��xA-�� �?�9��=��NQQU3I	�H��m���l�����&b����G񽫉�;J���5���֯'BX3pY�[�Շ
�:P/��Gn]Ϝ4KC��)j^�*�O����}�~{��L���Z���R�$���oo�E�'b�!s}�0z�B7�T��~Zzd5:�`��	U2g]nػ�js�$�a�I�`�&���.�Y8��/�q?{5�M{l~��)����KK���g0Z��x�Խ��C��'Pҟ���~�Xt>H44���F��:�$t��5��	,�I^�O���|㒆DL�F����$M^;��\z���o�Vuدi�Y�]C�5����C�<<d�{�b��5���D�pT�#��P�7�"���_�+Ճv����pu8�z�5 ��֚�c��e��:�����^1�*)DB�Ukx5\�yi�j���}^�i��5>P�y���Zm��w�ir��zȢ��6x��vj�����#�Έ�ϥ�[�@�H������"�����	�aFG�{qSY�C�B
�c�<|Q���OI���n�54a�X��g�֮�J�V���;`=M�&x�U#<���Ł�Tć,z̀	���(�ux����iB�扛�ߣ݊
��oݏ2J�FE��s�}w���C���]s�qu�&D�ݷ��&���Am�VG�۝&2m0��cW���!'�\�9էQ*�=l��c��蝄��ю����c'V�O|�Qmː�7�EL��_N�Soek�h�f+���^�t�Q�� �!m/�����r��P˛h�\^<M�6h
B�*�
��g�͠r�>h�-o?X�����9��#
xOh|Ģ�-�c-��īh�KǫQ��py�?X��k�A�������qV�ų�e�!y�2�2yg�h� ��%5(�Y?��y���MJ�d!�,�U5sj�Y�O���BSɄ��]0�;��|}��s����ŧ�s܇Z�#�ܒ�?�-ը��u6N�T���!�A�0#3�8�� �]v#V����y#���Eu��~>M�4>$AB������U�=������)JQF�(�)'�j@���!�^��svs�kiQڇ����O��f��*R9�lV���M5���܄�����}$;#2i�s�>�6����z� �8AӪ�����o��H�$��X����XĬ���/�%ݳ�N�T�dKuuu%�A�f�������8>�g�����p��j2%�xI{w =�/���ܣ]�4^����bVoi�QyE*E=Je����hl����n� ��Hr�E~!�{=�0rd2<!O5-���A�r4��X��Q�ٴ=��!��k!��/��7nZ�?G��=��S���A� �p�p����*��}q����I�9��J�S�s�Ym�������j<%�y��IV[^� �+��Ul0����euՆ��]W�|&��)� Wsή�=�� �jn�|-��\�Oy!���,�*A�t6 �j���z�m]q�[����=u�jCb�;��Z�%�9�����zԋs�������:�o)&��{yױ��A��2�)h�b{�: �\��3�R����z��h��IM�!m�zH��:gv.W�����}J�YkYՒ��4˴��/s^,R�(��M��Dxa���`��B�$��`�@m
�(ގO�?o�s��p=W�1@���9$)CPe�p4�Kt`�;N�?��Չ�H�%�à�|���Sr!xyG��OM���W��+좝03�O,��.���>ig�n�{���!�#x#;`V6:| ާo�=��|;pX�p��7���-�z�̄�\�;�3Y�.Hl.��!���Q���U�I���]�k�D=�聴�X����)���q!����6Y�A�y����6��/���1SQ��.��7��}��RD���Ѥ�\��y}�|ț��h}I�:�ͰE]#�0�9k���V�LeI�/7�O���:� �g�,9���/��oe�p��U��Y
Z7�Cl:����.]s�5���~�����<��k��S^��%��������5{�&������l����t�ݜn`Y�`�b`*��QL�:B�?s/�z��'�uʛ�6b[g)7��t�S	S�`9Q�ð���6L;�d2�c�u��L ���d    �s�W"��!3��to&Jh9��="	�ո�{H'��S�H�%�b[�E �/������]������{D�\�m`ާ�R?k��q�+�(N�÷>�9�K�zSW�����=��ZG�ٴ�;��N��(�Q�1w;�j�D����=l���쨳%��	��[֐�K��{9[��H�;�t&�D�7�P?c��k��g�=��jX���`�S�*�L ��6����+��w�~*��w�Q���LŤ=���\OP��9�wJ�>�m�'�,��s��B��]u�;F9^�
�L��
�{wYS!�.re�Ԡ�'=	�D�>ۮs���S�D��J�d	c?��"#���m1�"�vH#��H�;f���\G(cQ���9r�N@������/��V�"�$�aO_�2╺�{��'zCfR�D^��V!��.�ݷ�����Z�*Y�⒀�uh�w�\W����/�e2��ش�� ��p:���.������yq\��DriBϳ��6�"�i�w��&��t�k{j8ǻ�▙_ߟ>���z^	��*�V�nG�� W"`��p@H@P$�t7�w�>#�������e}5T�>~����n\3��+��:��͗/�AH�󢤂�#[��^L�j1r���w��noj|S�ho2.n�������ٍ�u�z����[צ�iE�S����(� 8��f���d]'-L�G�nf�}6�����x�k��K@t�}���EzQ.K��+�"��*uW�׎ۅH�yF��� ?|Xr+��{�<.v~�@����:�x�o ��*%�J-����^g�����#0��o^L��At1��0��ӹ�	m}W2�n�01m�X+��]lUi\_R)\���H�C��ї], ;�#K�xȐ쾯)�<*ᤜ&y�_6�c�w��y�?2!	�Ic�?��������Q�BO�^��D#��0�:�<g���\_��h��[��^-`0ꌦ�"a��8�\����>cߥ��^��!���3�J���uIgf�����(�/�M�lt��D!v��)��,�mrj �b��o�}��[�0<��t��\hX>�8�c��]tM.r�=��i)��0�������ߠ�W�~)��Q�J�����@�����ɏ�������O-h�^:[uc��]��:�40�����4��'���&��~�����jG����FI�d�ԠV�������2(�o45G%�J�Z~���Oy)����d`�@f�:ЕE��$s��0v���r��Ε�5#�BpPX\ެ=~t]Dtٺȗ^q:�q�;�v�~9�{���d��ŗb��� IbU�f^�d(%��K�j����K}^g.>�,�����.��v���v���ع�+}t��j�ke����s����bZO��_�Ȭ��j4פ[!Xw~��䭉)Y���f��4O6���
�x�K�z�l���AeW�~�����¼��U�it��;E]-��a�P�� yqyۼI�~Ǥ�6�(7Ѕ�T�wo���@�	�X�j0��4u���g{狗���g�=�]��׾2KQ;��V���̮�ڳeO�6�F�-~u��pu�_+�j.�_����T���˻�V�-���IH��6�3�����L/Ԟ)�2z�����u��4���u?]EeJ$��#Z��ZwBâk��Y"T�u�q�m
U�?	�.�H[4bGv��˦��s��o���>�\�Q��r�<��!%�ޗ�b7~odC$+�0��p�g���	�RD�t=�`�}�B�YL>�$���RԮ��S�|�D�%s��{|�`S���SJ�������i5�e9E��3ޱ�r�f[ȋ��#"��G�8Zko�踠kR�N�3�5�+.9�b���W ȟ��W"zCȋ>���:�R҉ Ƒ��h���p�X$۫˯һ|J����Y��߿dh�bM��
>�-S�&�}�A��m���iE�Z9���R��><y�K����O7*k�໓���&( A@��r���Fj<y�mH��|��(���5D�׬/�Vy��9��yh�T���=׻'M݈PIe*E#I���p����V>��y��W�u_
l//�t�M���S�Z�>���ͷ.uMg�Ι����&[ ,[��~Z�5�^`Is��V���I�f��t����1���&V�_�`2���.���j���( �6���Xu^�C� ��9�K��oV^S
�Fx������C�����kf��$iI��rS�&��k�5:��5_ƋS�������ꨪ��Ф���������6�j��n`�(u��D�[�4��	��u�v����7���bܡ�H�&���鸜e@�`$ 75��a�5!� 5c��ؙ� �IKl�*j�N�����ֻ�f5;�)��7A�����k>=�ѽ������&qp�j��`v?Z!���e$�4Y��s�ޓ�Ow����ԿW���?�Ջ�p=`$�niϓ�s;[0
l��k�e�+.��J����cs�|�v�V�z%\���a����W	G�y�,e52ݼ��-d0��P#��^7Y|�J�b�Y����Vr��=ɏ~�t���OOy+yf8%��?�����2���Z�¦\�ܽ�� @��e��ˣ���������s�BI�t2�.��)h��Ο�]��m��`,U�M'�Ee5�b`|��sjs��l���d�l�\�r�[�˞�ҳ�9�ҡ��- gj�Ը������>d�1f��m/��lL���~)�W��%��� �:`���G�*��}{V�U�Mn�=��f�@�24p��
/���P�m♬��U��ۯ��a#�j��u����uw�a�����v�3�ٱl.�Gͫln7 ��S��N�Ի�4j�Y0�Bج�����پZjS&p���`�D;��0��awg�;�l(�Cc��.m��[�n���.n���Ւ6��4���)�_<})�Oח��̑���'/ji�c�К1.�~/j.X~1AFl�b��U�����aY�D~��z�D��K��@m�q�|�ޟ��H�v��L���|`�j�6��_.B��lq!P"x�r}m���������c�Y���/��W�->C��f��/�b��I6X��4T-0�1xP`���`�̿RJ8�|����h��`<DV)��0U=���`=�Z}��b�%E8���u��R���245���-��6���@�#]���_����s��SL��>����؄��z��m`3��M��z��[�ު<2q�\���z��G�$��ޖ��G�@�.,%y+�a<��X9zqY��gc0�9%	Alٟ;�ˀ��
�Ѓ���g`ـ����-�R�hk��"?��=����N�����kV��t.?	�*\��k�,�r��R��f���\$:;���s�D]�)�k��Y��o��/E�{%�*��-����QR�G�>D���j���S�se���e��00�T��i����ÂNo>d��FmΊޱ�g~�$�v���ͺBY+�U�����38B��]���mcU��%���7��m��JD��&��5�$���h˗è��/��+�j���Q����{ڭ%˃�!��gL:ђ����Z.��'��,E2�ž�QO+�D�5!�U��ڻYzV_<�l=(A�:5������-��RD�Q�J\%vl����A��2l_S��wƯ'�2%YHD��C +���4U���UJ������VI���"������BH�_���O)MQaN��!����/��n!�a�1?��G�5,�66��y�֚�"��84C�^��R�����i�֋�� �0�
N���l�I9�1����i�:�~R=���E�C�6�1u�>��s�ڗ����%k�=��`ɜ�c�G��,��Ww�?k?�WwȤw���s
����~̖��F4���D��n$�59����J�'���� ���>�2%E��/O����?�ml�
Ep��(�7���9�RD�e�v�
�1�u�����Esk�"����fx����ȡh����|�q�=���(�<g@�Z��ws��n��[��ԛbSӐ�|�F^����w��Q�g�    |D���rN>�hF0�m�� �K�ϲ�i���2Cz��]��M�B+�y�i-lq{���uL�uM�R!�l%��S�3�����̈�o�[�;�p����7[��R\�Ǭ�W�U���(oUւc:�i�\����R��^���A<!�P��N�����D�4<�%��l8a���>|3q&]�fYh��WJ'IEg1�Xz�w���������]M�Tt����5�=Y	��%���Z����Kắu�c-^1A�j�XG�����������v�+���PժQk3�"�x�&vu2��"X>�����w������G]�
��RE@�3}���V:z)\�ټ�5ʶP[: 4���sWڕ�C�9xd|5�l��Gb���e���U|��T�!�)�^s��m�fn���h��kW�j*�~�u�$���"8M
�n6jXG�Vf�^sL!}H���}%�ρS�Gd8��)�[�]M9��tf ���䳰3c�%��CКU��S��YԼ���<G��m�5�5W`?�}��b��fz!Pa}�*y�߹�|)\�ѫ�6|5pw�Ju;vc,��
��7[�lB$���9���ʐ��+���,�������2f�5[`_�w��?5��7uK�.o�S�2Fm���j�J��ha��n�w�a�F&d�\�c+y�;C�FM�6�|'ݧ˽G:- vMSΟl�U �XFl�$�$X!M�^�v���E*V]���� ]NT��ϼ{���c$_z�V����7��D���*�K�c�B�`|���*���J��P��(g��V��x���dWGf���_�e�X�1o�/م���mL��n�㻷e3�(�@}�(<�#��q��=Io>�R��f3^�c��k�Z�K�_�^���9��Bk�N����"+��G��*Zٽ��`5o�p+y� ��*3%kj�6�5��w�MRV������,y��វ���p��f��3A�!�iԵEm�R�+�v�֝T�Ebm�'M&J�,��y;�	�Why��q�B�/�TI�N�V�����k	���<S��u��(|%�,[��ݽ�煌di�p�)bx�t��=o<��϶�W�m��H�-E͂}��=)a2΃�Cz�&E'�!KC'�}��[�|w��C@�t���ɍ ���P�.~�� C�r`y���VK�+cww�_��s��t_�:&��k?��n�m��]w�.����VTYn����)ov%���g�Rs��ȿ'Q�������;��$'ۼl�h@�I�u� {R}~�Ï�:Vv���B�HCL���7���c��"��x�:���?]�C4�� �1mv���?��}$`;V��{0A��+�=H����~%�x&)��i�}�}��ub�Ck`��ʯB�\\��x������M#�:�x)\�����>|����A[�̾A�� d�e0�:�R���߅��*�
Wݰ�gIv�5ͯ|��=)f���R׾�Hz-I>�m׃��"y*PH(����I�OfcCR*!or���-u$oY��g�H�a�����<J-I��}Ww�L;�O�Q܍G���9�U�4y�H���w�2L(�#A�
��'I�w����i��+��u+˳���)���B�@,횚쭕M�,�>�������ѻmd�"��c��xX���v,�UA�B0it�\<K�t�\#]Ĭ.J�v��B��J�_96<�{ly~�ʽZ�0 �V��w���m�œ2��ZJe���B��ʿ�T^
׳sn�����/���ȇLGg�Wx�j9o�낇�.�ҡ�k�EY2�X^쇺�UIۖbP�G�:�G�����;�n�a�4��ݘ(�
��-�	���u��T�����i]�_�
T�jK̆�p�֞�]�e��}=�jd�Ts�ݔ͋����mO;�,}�	U��44y��f+�Hs�ҨWk��3�����z�>{�xK���?����yD��)� ַ�F��\�ڻS]SD��i�ݒ;|�O;�!5�
�;��V��uiFHܮsH�ʷ�o2��>7��t �g�MtG2fo�ns6N��K���Օ�5��5^|;��ڔ���'!��R:i����h��kZ�M(u������QB	r���fժY3�gμQ��F�(
vL�4�wqo�T��.H$����M*�JFM�Y^���W�x)��~sIv����h�6�-k�};`C��������qm@�9wͿ�x1-B&�N݊�t	J�ۻr�[;?9�,�%��YI�sW#�u~Z�:s~)\O>8�u�f�:�9-(����/�lm�W`�i{����1,���@��O�j�ŕ��M�0i{x9�l�	��{<}0p6�I�yвk<%H���S��w}q�w�j�g�jp�"f�+Ie�C���Hy)���k�&�����8�-�v��t�lwJI�,j}�ܼI��P0԰�z�-k8��5dG�L���jt�l����>x�T�34�������C���!��R�����BQ:��A�%�8�=4(D�[�ٺ�O���n��
�d�r)A��;��Y���1eV����ǚ�w���OFF�j`�i�_I��W��]	>2���o�jj�=|�Pm��1�?�ЯD��w���3��/���X��@�	o�$�r���¢��Z%ݤ�%�9��Dc��#�� �L1���.PC%�ȃ�˽/��k��5��C4F��͙긄e&���'�c[�J��#i�
�H����P<�LY�AWǫ]n���3�;�t��9�	�= O7�?�?�8}'���� ��[5e�	�?����.�����[���N��\����5[?|��&�db��N�����(�e}�ۼѻM)[�jw�XR�$LGO�h�A�'���GOq��c�-������h�ga��؍$�dn�jvs���)��4��w-�t��Xl��3A��;ք�0��#_
�}�e�0��8��N�2ms9Y�R���r��iT�r[d�M~^~ڒ�L�Q�����I�Es���I'5E6��!��5k���G����cg�����U˛�}�\ːpZ\�g��X<�o,lwkw��g�iM&�f��紎bK�a�"G]���	�K6J�����@Πnf����e�έ	�i#`����D���I-���eL�r��$��Sb7���#�����Z�/��Y��q�e)�:=m$�c�ѡ'I�\Gs���z��� �����9����ؤSmtI/�����t��V�v�2�B�@0Rꟃ�Bv��-x滪�k�=a�^*�d%��:�RA����ؿ�{DW�>� Yv�������^qt���X:�|�,+똜����3<�R�����ɟ��C;'�6�
�Y�����ޕ������6�OP �k��d����PƗ��?��s��笒
 ���Q����Rfw!����d�|f��)�����$)ĥw��n�+vO�-�Q��?#��UO���eEm?u��\>c�˻�\H5��o���CC*IW���$�~!�����?�q$�C,��r�G���BM��ZB<��;LXS��E�Lo(gkI��Axq���Z@���B%�i�ay���R	��)��"<x�4T���h�-?A���B�n��{���0%�r4���t��eJ3Wh��j��@� =�����}@$�����~� ,&��ش�=I����py�#��9�rv�Z�v�|��>lJu狗��X�.�4垔�2K���v�c[�HY�W`ɭj�ׇ�L4�qy�
h�m�_�q_k� ��H�3P������|wh>����%�!+������\엄!_
�3�dZ��e|p�ڥ-���y,܁-gLQ�]K��3O�5�HqE޻���*�gӝ��/j8pK"�7�\/lh�n�
�H*a	��/��$�r�d����jy�D}����k_���\ZXhӎ��'�X{��؏���t�z��\أ=[��R)�X��pȿAs=)m�� \2���P��R9I�2�} m��E�Qi�B�@jh@i�R	��'[�?ZX�=\�E=�>X=̴�k����NZ��Z�}�� A���ݢ���i!    �LV��K䪬 ���twg�����풅�[I��!�\t�!M�X���mP��9Z���÷b_�OP'E����?�@�D�J(�G�ܱ�o�� !���U߱���p��cWM��k�;�L�~u<����id����j&~��N
�7��L�i��������P��to��W����j�.���y̬�ӥI8����u5(Fו���	�_��l� ���θ�ʒ�����:;���,��V����s詯j�o��6��~���s/�����"���%ֽ��u.M��CepF��Z�24@�W�,I�)t�w���&o�X�2��z�� �o6��z��E��{��~K�C�����/��'\We�`��&k��7��7N����"z��֍*$I��I�C"4|I��֯���U�O�$�I:�ӆ��13��:$~�"��pdM)NhBj�`o�s��h%�^��D*y{,ӓ[i�!���P�O\`�ƥ�]S�wKK���q'�'[��g�6Q6
�N�d5�u�9�b��������H���o۞f?R����ct�Ǐ���2��=Jn=[�t�:ҥ�}��[u�BPrA39C�(�^6S�r���Tڤ��DR�H~G,K��N����+}�����Ȁ� U���J����N���4]�I���vK�rg�y>�G~��(�I�F>��?�S_���ֵ��nQZ	e{'a\��R��1����C� lމu�f�rMAE��`�7�o��RDo���h�	�K�/�2��O �-��K�����"�B
W����[��rZ�a&�$JQ�.������?���C����_��$C�,�l�����`a<�=��, ݩ���o5�uD��藻{>�"��`�q�	�H|`������	]���z,'e��=��u#��a젊��U���S�v���Y��:�����{7� �a�j�J3<��;e�<��ý{�%�K�z�4���#Ѱ�d޸U8tr��zRGW�ٷ�r����c tRkr�[O!�EiGY
'a�!./����ν�2�uI;<ɳW��-�6�e��a��{��p=�jӀ�PG'��-�={��������ɜ��fB�AVy[�by��ϟ�5����5�A%�b-��1)�;o� ��:4�����ä)�����w�	xހ|�F!k�RV�ZM#�1W���ԕ-^�����Xe� ��Wb�p����T\� W����N��=,�����<�dK�%jȋ)W3%���oSCQ`�!��/ǻ6�z8����WS�DC������vq�F�_
׭�dz���&�����!Dx��w���;���$0�	[�c�s�A������&[�{Fy������3�F��Xs8�R%MH��k6��e�)%����;���!���+p�c���K��O,�|d�V�����˂�%��=����¨���n�l��^~�Ƶ:x��(�Aw�����+L��쎾?�t�k����$d֩�? -��{��t�.����e�34��I���x%���Qgu�KM�xH|�X��T��K}c�؇�ßS�.��_q80v�h�ۗ��]2�FՒ"�����abr��J��lJGx��}�2f�j�����9�چ��ؽ����#5�Qa]���{^���C��Uw�_K�%権,��`���W�#<����z�� ��S��O��v����L�F<��W��ex�M;y�47�Օ)W�s,]:�H)$��;�V�f48�'��{�B�kѱ$\��+���޲�;KO�O�e�W�[�h����S:Gmd��+I��4�|�y�G��H��y�M�2�e�h�ں[qR1)�m��<߃�;.dXE5}���Q?}Gy�d��{&)T!�t��4&��$�L��OS�8e�ꏼ�K�jD�:W Y��_3I�x��� n�
b8MqTk��nO�V?��8gh2p��#O�5�Ln�����7�R�.a���Eqʏ� �z	�ep��0�rR�b�P!C4�s~g&|q������+��2�*βwl�ׯ�ܻ��\����f{��ӆ���7�y)\O^�*"�� ���ܵ�(�yJ9!+��l�g��+�&\��$�B��2B�����Fy�ܲz'��\z�1��'�2�M�MƲmL��(i:����C#��$�(���!Ϥc�5}�����]:/E�.���%���!w�hY;������3�ٜ�B�w.K/N�^d ��v)��ny���F����9\%檳rv�	�mQ>����,�
��M>&�C0�?]�^	��ɾ��
���h<U#����Շ�a��MQ�K����̚L�����/C�PYb6��T��PC��
��j�C�;�t$Z1��-���V���f�dh��b�i!eCs���)���j�x�K���K�T����"��l�<)3޴{�.��B,�X��_����t3�-kw�yR7��ʳ�b�m�w�)q����(�~J�܄
� %��@6��C
 �,�[:��p�we���S��w�!��ɯ3�D)�B�O)@SOY1{fֵ�����K�J�Д�H�l��hn��:�w��H�3X��<�z&�K���"��w�]�Λ��5
ҖtQky��!����T��['!O�O)�4��Zs���1-��·h)g.x{YԶ�ix�_�w�`��ca>$�TBB����	G������� �b��BY�u�K�z�کO˕xH��5N����[����W`㩳�R|��)��r$)�u�������,��(�����*Ύ����?���N�!+6?��]��0��W`_
ן5[e��[Kǁ���9�]��=�Gt�餴%�y;r"�����o)Ŷ~�6���O��6��UN'�u�_��x�(#��yc��tl�
PL(��7|ڤ5�k��pݢ�UJ���P��v%�Qg�;y���j�9�?�lJ7 �u��m�d�V�_�������ڑ�����b����҂�DuOG>��}�������+�zQ,�ݴ��3+��~���Hj���B.���l��RC��h��M�v��i��c 3vh˩��ʬ���s0������%+�m��X89$�RA���O���~�p=[�G `�~��z�uuw�L\@�>�{�V��N*/j�t����~Y���M��=�Z��c!7Rӻ�թvw�c�6I��C�u;2h�V��m�z�'a�I�M v����b>f��%��p����>�}Y�=�x�m=�e42u�]��~��s�ہdӐ�s��u�~������R4R���}�l��xxt�n���i hRP#��+y|�r���p�&/��%=�0p�c��)%��U��/����Q�<|�}�6 ��]=��,cH[� Stj��&u�w�n�	��|�}�V6C\����n��C��J�4���N�je���4ջX��uv�I(�W\/�N��"z��ȕ��v�"��T%;Ԍx{hr���H,��.E���Q����&�$��_�ڝ�KKRx o��,�Tݭ���w[f�,^�;�b��܊*�An9��0^
����L0��uJʾ�4y�e����6>+�,q�W ��1G����Vvm '�	 �('8I4�����v��-U�ΩPJJ}�P���=�O�_x�A�;<K�{��MNh�g��|�p����/D�٢4�h%ǃ¢f& `�~�9���#��%���
�i�O9�~��u!�\�	��m(��D0�5p����hb?ݱg�@�\��Z9Q>xpS�Jj�~���f]�ѣe�-]�n5� �����E�_��ݗ����m�(�\I�h�o�W�$�����S0K���,�|׻��"��O���a���c��Y��VBs�W����� �RgN�q;'k;TZ���������s-OK#���a�s�ӗ"z���L�_��*-`!�z]𻤳�t�I_Ɨ�bqA�r�Z���v�8��!V�=�D$��p�I+�|��c�O��=o������'�?�������p=! (.�-�#4M�韦LEZ������d��%�'����    ��풉?5kve�z(�к�p��$�t��V�V�n�����c�`O+����7˅,V��z�5���@��R������K��t(|�Zsʂjt3l>,�<L�ץ@)g�AI�W���v�#K̶��I.��5����uP�\�ll��5�1�~�轢�s��r?an�[���r~~Z:��dz)\�!6oOvKԓ�&��!ۗX���[��ԓ:C�)T�n��	eT��/�΋�\!���x+��#�b�R��0�����拉�ז�Kp�ݴ$��|q�޽��(����n��uT��!����(�.�^�I�gK�or \�)e)�p�3���z1|q:vG\9.���CI��XLx�"�,Nf�҅!��<���@�|>��e��K�z�M� ���>�<��٘ס@bgƕ
�=�p���2�W�_�h�#���~���⦉}5���1����5��󎷲m ��u�ۡՔ'���9�tP�Dw�!���k��FU���Ǜ~���]RA/E�>��|�m��ա�\��n�d��6L�]����
DO�S������Y�X�)���x(Z��a�pL�3�*Vf�Խo�%WiX1��#І��|q-��u�8��4�>��6Xr�6�0�ݥdqˋU��R�pŇ]�%j�1�����3�?;\D�Z�Jb6��cd05d�-@vӌ��2��2Ε��
����W�7|)\w����kz��k�� M�9�|�[�N�ZmvmIR��E�D@B@E����|�l���l���m��ށg�u�ɓ��bi&�.�l��1��O�[���Ǧ����e�}ņ�b�/E�N�j�X��6�.�QS��͏%�% ��ޝ ����X ��Nr��Q�_;�@řv�M�2%%`�l�K�l�7G�?=�f����o�l>��$�kJs9Z�枮x)\��:�@ձ��GX���d�4���.��\f�^}D�I�X�<�d̈~��� �c�ڢ#�9��Lyl�O���*@Q�K��4q-[t�'�Hm��6��N�(g1R?�.�>ŕ����Rx����>c�qui:��pG}�-�>�l���v�'��u����|K�I�+d��)�_���
ϫd�bk2����o�������kqGy�����I4o}���'H/���A�[��V��[hrLǒ�}���~]
�r��Aku������Ց�3l���(y-�t]�/�KÜR��)o�kPK)�a�B0Ш�/uD�� bt�XiI���-�a�j��Ȭ�#�7y)�w�R�g���܏'���w^��08׃�����sn�G4�Voۅ�w��^@��®'�g7�����)�ru]���x�w��� �UO�%��׸����0վ��^	�#c�>bS#�q2o0`mXI;��ն��t��1g�%N��c��21��$��	��Dwס�d� 3���}��Z���V2���j�;����e2�;�n��c���ƣb�&�	�!�k|��\l���>�u��H����S~���3^�Z�ؓ�������2GSRfu��x��l�ǖr����з�ve"���c{�8i"_V�SQ�B��PgT����K��_
ן&%�L*���I^+��pasR֥DZ�Zw:�N�%�I9Ϩ����S���|ߣX�[����t�y&d�vޝMS�TU^���^RK����m��ؼ�Suƶ�g�@|��5.?S&�~��RD�=!j즪��:��h���-�uM���{o�P;��̊��3�|'Â���kY���<��塘��oU����{�٦�PwuI�Tt7S�֎���R��K�z�b�&碉}������rd�?�}}6���ܺ��kK0lVx�"W�5Xov��!�In򫍙��%3|�;����2V���%���hB��^|?�H]���0g6��:L��JS�C:Y�B|)�#��u�)� DA<�hq��+��RƳ��ɕ�7�z��=Α� ��߿���R�] j/_�X�/.�v{6���w{u7�ǀ�l�3��g"��~�]nU^ַ��+�og5���>�ѩI3�-���֒j�9]�MЖR�JyjG�?���C\K-���jd ������%�>��*M�D�ZY�J�H����wOBzK6v�ky����Ǧ��?���L�����Q�� ����;�qڪSָ����歞t M��{y�=9�Kb!�Z���2��q�aԄk���l�d��I�1���7�e�i"+B� ������/�����<J����U
���R<x����h0T%�Ly���uKW���C:��''�n-��<��jpf�a/�{��庼�_:>�^"��߶棱�e�4�I�☏� ��翁�o)�W"���c{�X &}4����51�+��̕m�̮ӌ�7*eueb�DX�ע��mTPϲK.5��G;% �=�i�m�(]z��b�N%I���3*�ژO�[_ �p=[���3�v�T%�u�]}��V���5j$���D7�ib���t)8�O-3�J�p	�� >d�#�k`Ho�G���Z'3���&���v������
U7r�s�F�h�����VecQ_����>�=ԑ^�:|QV'EȚn9t�&b�boO�E��N�$�KX�:6�).����@L�z6r�Ǵ�+�Av�:��9z��	2�CwH}ٶe~�n�E9T/S��@H%uШ!�	#���K�E=A4��	)><6bb�w�������xM��$S��tP�&3L�����Du&�1�R�+��C�bw��iuR�������fY��x��*���]7Ű(~�������o���/E��=)e��ڑ�&��J2rM��MWe�xa�O	6ʎ�ؙPJ6X�z�U��'�v
Q|��~/�ZYd-n�����8����n7y�(�u?n �[�]�\�ʞ�,{���F��c��^�/E����Iv�^���wKC�j��\kw��kH�vvv��12yuJ���	֋I=2�s�*2���θG��:��ݾ`����3%���i^�옔҇�x����J��Z	��l��#Ʈ�({h"� ]S�����J�6���`�}8��e��KV'�i�U�`���/3V[�s';a�3�y<?�{���1Vݫ��i��ޖgv�	��f*p�$~�#��R]G�/E�y��RcϏ#��0,��`.H���m:��l�H+;��YS�w�_�5����K�ug�Y-țL�%�?o�`��/ζ`5Xu���F*�h��B����V]$�E��Y�>�8�o_i���_��eA�
��cP|55�!��Y�Ľ��|f��Z)��TO��T� w���?ew7|F҈V�v��9�|�]��L!�uؐ}h.��5��'m�8}���� ���Mɐ4]<�e	�и�7`L�cA�BD�;���m�P��Q�Ve��&��'�ھ�{9Kp�t&�P��:���}aPO)]?��V� YX����f�:��Y�唥����-�=���.'֮�[�ڿ�qm�W$�8`Z"�>��6�z^�7�����RD�9g��>?X�)<�vS�q��w���
u���"�!RLׁ���I{N�g��KK6��v E0�4��{B.��W���f�Q2��T�Đ�d��g��2h��jȵ��u��ںI����K}�,��ZA��;����9��ʙ��~]J8h���]�M$=��'�<�X�Bm�O�6��>(�7�m�j�Pc�m0���ܩ/�{�ŷ��%�"��3���n�w�-��K82G��Xw��I� ����K}�>xG��a.ꩧ Ks�J�U3��ݱ���{|3�)c�G�Q��޹i~ 3�6��ͭ�$Jb��6�R�so��z��B�,0��� ��.�m��wK ��R�kr| ���w�a���_�^�5�����䇣�&�2<��)����ΝeU��#���*0��M��L�~��b�b���c�L���Ӛ���2�])���vU�[�!T,��2ZԉчE��|�J��=��7�,�o?xPi�@d��-�8^��y ��q�����v�N��tG��?=��6�4Rr�4Ȃ����~��V$7���p<�_ �G�]�D»w�C�[I6E    ^��T���+�򍎠B���I�B�y�Ae��������j�p��9{���O4�;ۆ���%��=~@�[ÃmȢ����we�9�OB�v��3H7Ecx���H*�\o���y�<Q������vՙ�m�}H��'/E�y"P�=ƃ�V��::+E� Rc�$��
u�6v��m�yE�Z��TsV���8���&@��ˀ�ܓ����x��b�KB󚂳A�ǒ��#�w��<�C����ԁ���P��/��E��4�RD� �h���U����C�\��(���m���2SKn,qJ��a�J��\���1� �U�W�@��y��Oc䋻`Ao��lvb�[��z�9����^	��ƨ�:�|P�����+Q�n��O���A,X������{�����7���Rl�6�`�� �q�{�h��w�e�\e��-9jHL»Ok���\/��y���@B��ֶ��a7�(��][���
l9y�z��3�����c�%9�D������l���X;�ʀ�;��$�`�( b�8�M��`�}w6�@5��� җ���|� (j{�F��-	�JD��y.CUg-O��st���Fqr-'�7��'��y
Q��_���� !Q�H�eoi&���]�Z��;��U_�4R���D2�t��L�e"��.6|	�+����Xja:��:�b�l��"z]A�� ڇ�Q��F>&a����:j�PN���
ݯ�<���G g�:��	}��j�ă<�N׭��@x#�*��R2�k�շa�<�QM�����ܚɜ��rZ����v������]땈>o�߶os,����8Ȗ� 綡.�e��۳x�H$�.	��6؆������l��-Y�u�+���ٺ+�I:[~�oF:�%IÞ�S"�%y//:�.\�3��?&�_
��
Z�8�/�yه�����@��W��N_e�W��U��������"��+�YX�l�����E!�H|7澳��F �1ޭmV��^��&��Ο������?HIM����4��W��������_��-���#yPz��ͣox�inXrE�7���L��d@�M���3���e��y8M��By�e�.� ����n��6�$�G���p��F��Ok#��A���t�x͑�!�0C�G-1����BN�ݚ�����$��v�;�_.zq��P�Z�^��维5�l�����)
sw�������}M�s�}@��3�-��J�nE��#�ʒ��첦�JL9:�J���]��g�,�1��R��P�Zb���Yſ�q<S�\v��&��f�w�Q��޽Uh:��M�48w�����k�CG!�!T�R��\0	���
��f�!�P���wR�)��P�����������W`�	Ѐ��o���$]ܮM�k�X�vږ�P���a �t�uq�Ƨ]�ۂW���T_;J:L�:����頦�v�+��E��l�:^W�ϻ�!C�9�]l�_��g��@��䤶M�/`�&������5 ,��ڤ��6��²�����;�^	�>q�>�����\eZ;XI�c��;��`�,O���Z���k5�ݥ�O`�)���yOC�����Rs2)��r����FZ[��)�����&8C�[Cv^���+���Kǝ-���G�C�l9Ʒ5��j���4���aD���_�7��X��RA=�]�K�W���<�"�T;)6�m��7��	a��%��`��r�^�R?=�~���{:���[�����O)w$)�X�e���IӋR5���8����ȏY��j�,�Z�4\6�)e�I�����V��?S��� �#{�������f��Yޏ��6=���^%��Ѧ�n�JD���t=2G"e�xz�����&���g�Y� wC���=�������������Q*<��f����y�Y����y�I��AK�Po��ѯ�?|(w[���[��yw .��d �v�\`�\Km��;�����zu0�`RiL[�:�����oU�`iv;�Q��뾇nx+���c��e����0�mV�V}�ͣ�0��"Q��,��7.P�N��"��@iF���P?�!c�C�G٩ǶB����j64��{�E��S����t�~���{,鞗��pq�@t+C�����faI)&�b��F�S�ݺ%�q���gf?��ǽ��y I�Ss��'S���1�9�rߜ�
l8�WM���P�.�"�X'?U~���@
���Z����Gq)ܭAv~C�{6�J>I��M����u��c�y��u�%=] M�!9��7�'���BD��eA��P��N�(`�#�����}��iBo{�4�go$豕iA���ֆ�ɮR�R�)�,��*s���d��'��3�u��ͯ�M��z�4נ����dH^mX�K�i��!���W�<��Q'o�W"z�4�g��`w�z�j,-ăEkW�q�����s��A.�;��e�I'��6>�Vɯ��z�F�_��_�V��h��L�=E]�aK��]�X���ywNK�0������q|����K���{�X˓���+�~��Z�^ZqW��	y��)���lf��Cu{W	���^��Qn)��\�������:���/ǰKmpȝڀ�nO٥�~�6X�@��F�j
a���Ɏ���!/E��#�m���V�r:*)�c���\�c_��ᩦ�Ӹ��i�-]��pͯbZN������Q�Lv�:MR��.Y/ehP6�	�l�]�V�Jf2ۧ%��e�R��f��@i�~g��75��~��6A��wJ�g�μ���֜���E�j���*�$ZUݥȲ��*�MHknSڻI�{/_n�7����{�]T������_�9W˴�plX!,���{�LHv���3��q;�Q`ή�u7�����}�����C��
ng�I0^����/ZoeD:W��ם�:�w�&hN$�+���ݭ�[sr0�У]�I6M--�hľK^�����By�� -�dxN91j1B��u ��yRoӆռ�=Y��V� �Z~沺-o򄝒|���Uw�q�uw��V��^j��9�Fo@�����M@3�H΢rW�B�N��V=lv}�V���/D��i��C-�r{{du:0��9�{<�+��L�R�b�6C�	`�K}w �F��?ݐ��[�@x~i�Iޜ7Yk&��{wF�I�-��:e<�w�4g��m�$g�+A�I<B�)& Ss�����I%�O�g��J]�.�[��Pߖ<y��]��''������(W,j
_ҍ�ffJ��3��6��A�e�����GT�#�V�I��WȌ�\�p���(��w;q�{j���y)Dw)n��)��ot��
ѯD�I�7[�s������;��DP��^�����/�����"t�p�Z��kD��˹����x;�ɕcI�����c�"��_�|�E�
RO�9@���{ԇ���p7�p7�U=�Y�6M3R73�\k25��I��pl0�6_��\��9��h ��}*K��Ka�%� ���"zI�JfG%:G��;E�2���!�x��;u���m7�"B,���o?��4�&i|�:
����V�[��	.�u��e�
�g ��u��`S�����zV'��@D \�8g��#CO��$}��|�t&�Cr�GnR�Q�ÈƯ��u�!��D�e���-ǋ(�WB6%Ψ��3¾LhnH	�u��nU⎽Z_�z�F��khs��x�ȕ�y��b��5�0�m�//U��]�i�#��zѻ���K
�h/��M�{C����5r5���S�!�/`�Q(�����2�8��kj��ٺ�3�JC�N>��BQ����@�i* ��f��K���j�1�����C�fa�E��Dֹ�D���h��G����}�]�1cl-�9�=b���w�=ս��������?�|z8��;d#�>U���9��]��fu�h[/���R�:$S|�鷛u��'���=�9�ZpX��AZ6VW=�VΌ���R{,�U�����5AJ3�A�yXh�彩Sl�k�����_9��"-�6�JV��Y�~M{�9��A�ҿ�    Qr+�>	�=.����ұ4P&?���SR3�>KPມO����09��M���A��h@"�?.�y���{�(�ڕlx�i{I��mm�\̎��z� t;�Y҄��Y�n��=� \�К�z[Z�]'/�g�!{�� �P�x�֞���ݠp0����ϖ�k�k� �&��h����UU���I>�v�Bg9��Xx���D+��v�Ti�<�ɒ�5�S�n>A;�}9�$�w���K�`�8$�}@��'.�T���su��D�[���������۝C� Ur�� ���G�
��%����l����!o6[wL�T�֓G�L�ؼ ��L�٥B���L���dt_$'��@�(�[�y�5� �T���5I�_aiw��l��iAp�=��G�2�4R�_@&!�ɐ���[{�	>T��r7��9%�-�7�G�}��$��4�=zRyw�~�y�tt/���ͫ7%�*ɌŨ�9���]6F�ΐafkx�.�ϗO�Ldr�Lٓ7�7i�����ƨ#pr�r�i��Z������`�u�eK[�!�|����:�.5���y���0�.�,�
��ҕ������17���#��7�6��B�'�ގw��:S�,�ƛX7�-Ȗ4S$9����p��
���Iv����fG)!��<�Φ��t:�+���;GW�5Nm����b�J��h3eA�-E��Рg����
|���E_G{|�Wx/���8�/�G�>���P9�sKb��U�Jn���'�1��Q�$��mY�9tD'�Υ;
s�X��"����!�ө���@)�>NO.�6@"�ͣ9�N���/�=�(� tq�7�Q�ti,Z�G%��Y�0֪H.��v���� :^�,��@עD�|$[߷>O"�ݝ��0�����>��bt3����N)�$,P�kImB
�ڠ@�e����4t��I��՚�|ڹ�\x���}9���f���S�ޢ��.��1�!����i�Ͻl�/�4�W�#��7 |���H�.�1�-�I�O�f�\���+��̣N7��Ͳ��k�@F�/e]c�t�M�kk�b5�����O'e�"'8롯���h����&��!�M��1��� ��`1k�։�'����ϣ�~OB6��k\����Q���Mr^��w�9��=:+�I����ΓZ
�����R�m�4��J�d+Qӭ�ื%^@Y���WL��W���\M�z���O�u�R`�-��-�%�a��V=�*IN�_�<�SBŉu{se��5}����� �Y#N:�dAF��9Lh��������;>i~51�Ӱ=�������`�����9��u7��>B5��,��*��$�A���>	��\q�JT=��\X�+Px���N��r�g���1ưV�݅��˻��K�=����|(�k����Φ� >
�u��M��R�f��f���H��\�8��^�C:��E�(�Dm�h��ûS���Qu�u�u<�"���.��@�X���0��J�f�9�����p�����_�Oj�y=۲���=�a�pR�B�<b�Q���,7��z�3�/J����t��W���q��o+��KUӧ�;�`W)O嚚�˧�A���n�1�a �Z����b|+������'{��e�ZU
��7]`���Ë߸�9�D�h>���I�����6�+IN����[[sf$p��-7��I���}O����1�:���c�怽N_����Oy�7 V��7c����9Hx��^[z�j���LC�#K���_�~��c���� 8�X�њ�:m������G���ݫp1�:bx��ɩ"��v2�C#�u8�_^(�����T��d�kB,Ҥr&�/��:���%K[u�� ��>o�(��A<���k-R��6	/���[wϱ	�F�$Q�~F��N�$��	��E�(�ߢ7j���Q�`JR��{��_��q׸|J�`��X�V�>�B
��\h��8m�ù���L�F�E��7ޫ�-��oU��|�$伊m�p���Gs��G����A=`��ԏ�ȲI3��K�&�2�w�Pؚ�ƨk�f���g D+?�D9[If����z��M�M�TB#{�+1z�V�������c�ҥ?G%X��Y�?2M������{����L=���b���*L���~��gr=��]Q�y��sf�q���a ���t��j�5$H��j���=��|=�#�(����6=�S7^���I쇞y�lc�i4�K�����{kޣ�~��/��}D��x�GI�Fm�Mn�E6�Dec�m�W�EU����4\o���9�)K�bg�e���JN�q���qK����߹�EΰҨ�8��퉰���Q���}�,c��,�@G���cv/��5F���=�"ͱ�3�d�5��r�`9�iί�<$m�9%#��% �I�Ƃ����R��L��X����7L�u�x��d�t�7�
0*��%T�v�E�O�㓈~�<F��pUqN�+��rB�TSg�W�uq� �n>�ދ~�����9j&�e��|�_�3y���Դ����>��� ������&�#���O���K�a�k��v��~s����#�W�ѣ�޷,�Ei����=}[����b���mLce�\���zt�/E��swi��i�9�S�vk`_һ��9�5ߔJ�-��z�鴹C,+���f�ޔ���g��¾��:��#�_���I������n�B>��/M�z���_��pW1-ᬾ����4f.�����O��{�X�j��;�Kt|&���PK���S�Zu���8{1�ܓ�$�A2���9�d��|����E� i����ߞD�29�č��O���e�t����sZ�)��
����7,cy��V@�?1"��+��QL�v�ս�d+��5�nfi}43c�i�ʫff��uÜ�p��(�8<�7��3-�����U�*h:�_U�yg���ڝ��5w�6{;�(dҼ�L���".��:���-]֧A5�o�$ٸ���w���a0z��.�Ye��+|�����J��C�A6U����O;J��l>%+a�Ip�\���ǈ��T�/+N��	�I��&H��X�{6������<O�J�~��Y����oPX,��m5�4�.Y��6�#j��������z�����!�G_:�[��^�u��r�<C,�5�K�hv��������*c��^&Q���.��-�'�k�ܜN%S��S�갥Rc�� '�o{V�� O��Га�\��.�x��N�f
W�G� ����ʁ���v�,�{��/�$
��^�G�ym��X�!�����+��b,��o�XH���Lo{�W���k�z�;�<JL^�GD�ƼG���0�����`��&�R�u�+��Հ�5�hKZ��I#=S	\`U�T��Q�!%Ǉ�̮�N�o�[�]7�ٴfL���Ni����i��Otw�݃p��a�2✎Ǡd��H28�z(��B�՞}:ދ�+s4+Xæ-x�P���Ghy��ȋ�����9%���Sv�vIo`�(z��>� SM�F0S���-ix��Q��[ߔFv�A�'iS<I�nJ��Z�D\�Y��H�ouu�?�!1�n"�7�d`�F61Y���"��Q����� �ڷ�v9���~�K{��::W�-����u% �\��O�����QD��4RYӌpP�N��j;3I����k�:�$F���X��b��((���<,������R�k��Az��Y�u���(�H^QmMH�a+�Uc�m���>
��K0���X�S�|f�s�eF�i M�.k��4*�й<i��x�K��gX�Di|N��m�$1��l��v�* 8W�,5U'�R{sYc��	�=��$\w_���YY�	Z�X�j8  �`)%�MK�g�%J�e�;a��I�O]�fdkHB{x�QOG�P���x�,�P��|�2"��%��nk��5Q�c�b�o�Q�dr]R��װ|��q�����[E�QD��CiX+����O9=��E��ا3���$��Ttp�5�U!(�S    Y�O��Nh��S]���� ,I��T?�V���K�5~Z�Ҭ3i�������e�|-�G�����2r艘O����-��RG,��x6�us����,�<�%�.@�z�,�%Q'��0�k��5�H�R�y�h��D��/�B
��������"�(\��נz�6�U:hd��.A��('�m9}\҈k��!1���S�*k���HQs��^B[���6����ˎd��M���� ��4ʹޖ)���^I5� �j���3u�~d��V�"z�Fg$qP�3[�̣��l���n>X5��f)䍭���x�)�����W!��%�t�����F�r��5xE����b�,C�����]��3ͭ�ݻǢj�O����.%W���`�O\��W�"���I� n��*�8���6���a֗�+���{,$�8u�6�ҥ�X�tfi�OZ��;��|l{35�VI���V������@�g=;���RB�U
0FV�R��eF����A�������V6h�8�N����-w�֞���1F���W���r�j���n���{G��
ƌ�7�s�oO����=l,�w`�!n:|w�֪_�79�@][|}*&����G`�u��(�wR�]
�H�σ�֏"	\-`�lú���Ww\��=|��SM����ca�3����0j�7�rbx,J� �ߝ��*=U�,�DYy|����.\}���uO-Kp�uX/xRxjp��k�`<�R�;��+)�֓�#�
v���g�`95��%A�g95\�D��+r���r樐@�wƝd�3�ȯ����G�W-T&A�]�B�K=J���j_���;C�,<l��M�{ f �]h��}e/+J�K�������
QYW�é�J]��K�������wIL#9T>����1P�4���Î;��"��@�|$�����PC!ߢh.�0�׫lx���d`4��Q)wE寑�(8�t纷+9\�u�����n�Sr�Lb�c%ˏ2��]��\�oY�BK��js��պ4,����{��QD�/�<X�F�4�?�\��.K�8�;�I6~�!�*��
�[���::�*Ƨ��k$PxL���,���g�K�֨!���j��務�2G��{���h��C'3�;gMk3D�����mm�(�����lhFeK����t�`Q��0r���|z͸k�6�9��Y��,���7�WսW�)�L0��I��֝�G�����ӄv��z�l��*y�BfX�t���|\Yr���7�ag�I��G���,���V&`=P`&�Єgܥz���r֗Ť�b�ֳ�s��dU�>�}��tQ�ws-��%I�{�`&�>��M�H��e���}˵�B]������}�Ɏ,�S���JK!͞I�����"zi�S�ۣΥc�f�.b	cL ��b_OW��A�4� "3qE4:}lq� 2U)J��9Hq���u�K�%������G��R�������+��_;����{�`�]��/�v�!�����v����5gj�V�T��,��k���O`yx��L0�t�Xr�m�*⻬�:����9�'5�l��{u�ۦ>W�x��Uʰ�p̾��75�)�߲vЀ�Z{����9����%��\+
ǯ��K�T�$��k�ko���ޭ�oO0䮾�s����8�pL�V�oC��Ձ6I�Zp.�=�.�+��"zw�����p�Yt�R�QϮ����k���ug��e�c�f�y�P�5���叅�N벝b��tҲs/�V��E�;7����1�%Ph*k;Q��/_�����������}WCۂ��H@=��r9�N��n�7�F��J�n����#�<�]�V��ג��RȘ��=�C�dw[R�sxJv��%	�����$\��/$���A�g�͕��BwV�'2����T3�ԝ�}v�j
�Y�a��̺NwR: uMRPo�N���~���������o�j�D���g�A��Z�
�b��T�1��Y�DKJ�>9��EB���F���`1��6���2!�ʏt��+ o(�����]R���	�dϺ���u���lhI{6�S����4Lh�풮��#t1�ZL"zik�<�#F��!u���VO>�W�_rA����2���Q�R��?�K�k�b:0�X�,n;��[�Mþ�Z�m�@nV���H����-�$\wSن��e3ʳ��>�s��_�ƺ.>b󙡵�l8Ǫ��(Qv�++�L�b�j.�I�&�Jٝ}�^�L�x3q>
)Y3�t,n�;��#�b���{�+���$�Ӗ̡flン��_��TQ.|�(��u����ѕ!�,y
k��y@b��so���ځ�=���X���.g�]^��N�����ےF���n|�d��=����G�$���+�n�~�8S�A��{�9��X�4��b���
m=����M$T��ڟma�^I�'���bV֔湵J-$v��ql0����`uި��y���B2J	�S%���2����pݫV��v,�Vx�Y�_b(#��=V�9�\F�F�]�z	��oO'GS˗z}�K�����R&#ti�9��}��G�8]^���IrO�)�l�r�o�N����$Y�MFc]� �lm\u���KZ?W�~�+�+E�̘���& ��l��i8u��˻Pw��F&����乨�F_c��ޗ!��t�:G�[�D,�,���?���*5�y����������cwU�F��=��%+��IaB���[z�[_�K�C<�U5�����M���5cݕV�#�r	�R-����L����#��0��.�L����Zl��C�w3������4˻�~kl�������>
�-U����>\V�0���>�c�h[
�n�ZJPei"���ת�j Od8�,��������D�V��.��}0�G�Rm���$�f����̂^��VV3�.i�h\N?KS�[�K��T��VE�{�\3@�R�$coT��3��I�N�b7.��k���v3��|f��!+K��@��W�I�5�k֝(�{e���w�$e�d)�|�I;>�P�`V���e rO�?	ם�a�XPJd��t�
��vt�B�}��6���6RL���M��l����0\dc���PJ2TF:4ƹ����ɶ6i���
����,��uc�/u���I��g�a�E�Y~��u�_H�����BՋ,�����u���0��`��5L#@$�1V5cg#Q<�+ށOg��ƞX���{�5ӑ���]e<�=4�d�.q%���1�F^)��2}�+��zPpɇ
�A�����mX�	�p]�|ʃ8�mR�m&F9~�5}��G�4f%�5�!)��'`�k�8��>�1#�O����n�ec�����w'E��3�IQ��m��}P�����%��n�(���EKe���*C�0d%]˱i��[�mx`th�&U��zei�GR)�f�#�5h�ɶ~��Î���{7P��v������m��R�o8_��Q�n���%�c��:�5�t�I��,�˺�έd����j�e/Զ��>�.��m=�Q��>�U	Ce�_��+�%�uu�֡Fd)���铼¨�C����G����:���W�ᨚ����ިY�~�o�ff���duj-�`�|�"�M,=�v��b�m^M �
a-f����tCV�ŉ�ے��yG��O��j��>	�7|�"����d�5��?�ӂ���ޞ��?��}:h5V���k4�KT����R �%Oy�zIb�V�>��D)�e�:3�
;���F�$�wo	-8<���Y�;)�A�<�����k?��}��>�����R�GGYviIėAW��i�ø���VWX�d��sY�s���B#-�˄0�Sb6Y'�0�wGt�o���N�.��&T�/�,���&� \�j�;����ZB��H����T�%kށ���Q�]�gU;F�ԇP��T.���PF�� E�r�ْ|ՂP�m��r/���rr��4{z}�ͻ
    {��w�-f��'[|N|�жN>!�~��=����xS�K�fQ~�t����e���\��h+����Ԛ�ַ�^׊�Ǣ}�eVҩ��B��`�	2w!ࡼ��C�eA⽦K��M�Fʉl�_�P�gǟ��ϩ���kX)�_�dr����@d��P�z�6���Wg�9uU׌�Ȥʵ~�!�����j�Q�,ͩ�u	�{������r>�����<�����G����{h΍I�ǠTr[;�/�=�u� {^�2>XR���Y�����]�l�V���Ӧ�k�Y���G�/��h��tBf����ﲊ֚E$�7@^z��8��*��F��iB�����	�����QD/e����ȱ�1���0���+7�E�O�dUa�4Y��ٷA8��b�w��/�)���k.��>�niܱϒK���Y[�7�Z�pJ�m����l�U��G�˛XM�c��YJc��D�.�xЃ�~�]�'
a8�� _�jE�Zn��p.ޗ���Dx��:�������R�H(�q��$hL�h�`U'�,�B'����f�}GI5��L��T�&�lo���g
�Q��q�5�S�>)��J8����O��Y����Ӫ-�b*!N+�cu�dɕӀ���0y��G�:�'"������ƃf�9���^��&Y"��Ճ�/�o��_�}�{��k�7%�J�Br�(y�C�:q�$C���-�6�$�9YK�z�� �a�M��s7���)�N�HY���ެ҉�%��j�d��G^S]jTz�����F���\lp�k�w������nA��4_%�Dڃ�-�W_��,�|e�֨��ZukT��]��\j�1�\�2��T_���� q<+UZ�ʻ*@�	H%���V�4d�&jb��wZu������AD��Z��1z�㻬������t�6u�\�w���Iʲ2��ob���h_m�e;� l�l�b�9��]�5��Qƥ5�{~H;Ш=A+ ��ŋ޽;d��&�5p�Ц�ך�N���覹�E���?��
�1�jL�m-)W�Pۗ;��3o��w�b��M`�ő|k9�����P�i����V�� ��P��q��{�/'�������I��B%��&����I�n�"S a?�&�<D����S�N)�\��o�L����m�ҍ��6%ѯ8���%�k����rv�;\��L[�ϯ��j@�4�n�+�,vup<
��a>�n9�!��#�]�Re�:����'����ٺ����,�f��O?:�y؅�+6x3��ŋ)M�}�-�����9�����t��������_>mvW*~��c���x�@�PM>*P�X���^��QHg4���j��ߒP7T���γe��[_jң��� @�_��o>t7H*�.�	��=�:�SG�{ŷ-G,av�����l~t��#�����~����k�kɑr����7�eO���2!��dmf
�[AΥ�M��
{,��������N-�#{6Y��}>I5b7^W♸� �j v��Q�w{��D��6a�����ؼ�D��q�=b�(��#�$�� 8��au�_X�C�BvW�˹��=�-S�N_�6ʾ��)�e������ԣ�7�wè��]����f�E�~�8�F9X��������d�G��S�������d ���TVX���)�KuZ�,A)�p0�`A̒$Ca�+B9��ϗK��>%��)�b���i�vqm#���d�f�6�ۮ�w��f���L6�&��fpYY ��?�-}0=���d�Ze��R���vb�㯏L)�zC4g2�8�/U�W����T��a#?&[xx�ިey����Xg9�����=�v�@����$HQ����ۍ��{�kYST��n���ZH,%�-C��#.�G�q@���}�C��]=Ӿ�b�������EM��lV'b�>�X�r�y���`�R����%d6GÌ���H?
��؍-1�$#����:��]D�j^��ѝ �.��2���_��jKo�u�ؗ��v,u�E���TY��t���>ʏ�\Ur0p��nd]%vV����X��Iݑ�t�����A8]7�@�mS��P��dE�&�a[��:�9��!Uog70�+���I(�app�2��\����6��P!�V���$l��j6U�c_�9�-�
�Ҷ��W%�*޷[h��1��4��k�<�f|�����WRy��#��O�|�/��r��|�V���4��� �6V�!6Ω#;��G�	x�V�˲�uF�J_�*j���{����9������	�$��kYͦ��O���r������<�t3S�����E�{T���	�^2���=-�%��.����6�3KO��M���|Y!��~
6�p� �����/�㚩��d��Kz`[6���1LG,@����A�����������EiSU���#�$�X[Gî$��x�����@g;��v�@�\�� \�o���/��R(����-�R�f�߁O��3����co��(�˂Qڻu�[�G��� ���|s$��+�� �QD�YeK���u�#�;s�j�C��b�1���2A(NBm��_}�A��]f����)��뛞ȯ�'ꚓ������՝B��$I[�j���(�Mr�- ��(b.�V1�կN����=V�(�̤���.��C�n�t͔S(�:��+����G�|Ё�	$���b�3;�Y�,p��m�ծ-��+��`|Nf�M��Ur]��$�{���x��t�E�l����Z�L�9~����L�AD�ؓ@I�X���u^��:���Cf��ѯ'�;�d]���)�&�fa�@q}�Iv�CI��"�I�AX��k�G�Ϥ"F*�d����iIU���_�\���{��V��G��
=s��O��Ă��wE��d�`<�=�=���&�7�r��$s�B}��̿�^�[rfO��	�a��V{י-d0):$R��W��(PQ�%�L��2.r�����>4³�F�UfA�����^#��s�]���O"z+o�K�u�f�
�o�Ï�{NR�h�=�Z68��!?F���.w�	jn�Gw�9�뎜į�B��6��(�����&Ť����Dg6�"�ź�_�M�������K���)��9�d���*�H�]I%�M%��)��wS�%r�<<-{�)#�i5�/1	K� ad>�>"磦�TF�kN��l������1H�Hz���N�wE�u�9d,??b��o�� ���B&6Y=�/�c{����+�q�$ڵ�N��A�OR�*c��t�D~,k�)1v� -Y�Nq��#��w��������0�.��6�&I��yV�����LrQ�� ���ţe��9e��ƶ�ІSZ6��������sj�6���ѻ���I���Tef	v�,��:�7i���K�4*/V
�,���0ޯ.w~F��K�?��I��d�Ƭ�A�$q�����HW$��r�6�Qfs0��s�GY�Q����=�hʗ$qB��0��P�?�D�O�)T��F��r�V/Y:�y�\�DҎ�:c��}���u6
��R�(�\�4�ey��|�����*ra�,�PC��,S:3�fYx��i�t�}$=�Y����Z'�ܧ��A��݅��O�vՅ�go�W�&�.hc��dr��o���xF0�$9]�b�S*�������O�E�jp���gmt6��^�8��XB �K;�3��� �4#����:C� ��&�ߤ"�6���6���I@`��l�"K��R%
q�s���-�-�����)[]��e|�f����>G������M��F�2�i�j��AG���M*'�1=k��Q��Xɯ�Hr��(<�V��7}�]R֪�%A.n�]�ݼ���[ڼ�2�\C�]������Vw�;���L� ���b��T��,Y�I�����$����9�J��j�Pߎf|�Z���䆫C�]L߫F�̖��z�`�+!ǗO��sZ�����xW�/�eFq�V�d��~$}��N)O"�����ޒ�<"�ס��Nze�q�>�WJ[{��I��5���    ��
]_p�8E;+;��44�ƾ�{}�-AJe��jV�~EU@k������C�j�̒H�~I��Wrlq�p����E��緗1�A$��vIiɕom�!W���XG�Dȍ%����->�I{9ۿ�6�u��4�%��ik��1��$�c�F��a/5/�ǟ��;�^&~��� �C��I�5}ʹ������e�1�'��?Y}֘ce� I? ��kZ'�ҕ��,��� q,]ȹ0u�.g�ܖn����y8�&9 �B�	4�H悚�};�o�l�@����Xr`�&��fv���}3<
�-}�e���x6D^���ښj�u_w���z�r��U,���#f�;�՝󾚝�"g_bbѢ鵱��������%��WK���+���]������g72�,C���Ⱥ9�O�?��+�;3�|&¥�����V+e�f)�^����4�p@~�"5T��sO��4��z���v��5�#P	�I�}?��]9K�h�����$}���im��ȃ�������F늯�%lჱ�[B*e݉����!����dyj´�vG?�^�r,�P�4�Kh�#����Ք�
)��X�(z�}ƒu��x�лn:^f�)%�  �8�]~T�)m�ի�Ccm�>4��$�������(��×%���W@lx�W{(8X�0إV᫉(����$�B��s������uD�#���Hi���,��$�i�{��:�{mK���(�ĕ�)��"�V�W���o	�G�M#Ҩ�F=�T�gs�W{���в������IV4m.(=+2f�~/⎃�����+�$����h�T%��&�?I%���O2��:��$�j�uA­�.����݃g��(�ͨ�q�.m��E�QD/e4~3�N���������+��r�{�W�yd��Qy=�)%87@���}��!gI"����#)��!EJ����e��ǥ�&���Y-���&���Ǵ��p�8�U�R�#j��>�N��Y5"x��_���c�9:V"eA�m@�H����$>�u|�S�Q[.�; ����(r( ~&��Iҷ�-Xd'��ns3`K��Q����P{$la7��'z���G��u�r�י/Uu�(:��jߔ��w�9M��Nu/Q6?��&Г&��
���}ةuy�Mb��Y�x7S�Q~���T�������Q�.إ��w{mU�u��$޶���Wܞ��6���G���k�u��s� =s�2���0����=��y��}TZ#�R�]�%��w�#ؐ*KzC8u�[��j^��t�z�Q���L�>�_d�S ӽ�`����~��C��%����� Iҋ�ȡ����#M�{�x�8�T� *�,��m��;��5���G��$� 5p^�Ҿ����c������u�V-���9.� QyS5�W�D�7�\vջ�7~(�L�^�6و��k�F*O��̿�D�{�&�qˠL>l�Ni�d�����{���͝R�k-�k.K����%���%#G픖�;�]E��tX^����r'ُ�ᡨ�D���������1��jJA#��\�7^�:<V�DƿݯE�r�J>/Q�Ӂ<�� �b�l`Lz�>�D,��N��,����T��4=k��}0x�����(L)��M��ٻ���
��=��M~�/�����yw�3�Yc�
p�"}�<��,7�q���>��w�u4�<\A� � ��#�T�!c����ӽ&�"�ܚ�Qces�A6�7�aj��K�G|��)�iۼ�Ka���C{i�>t��������/[��?b�u��h�f�c�Fm�Gi<������ݏ[ҹ��5�$�]y@�6I%рb��K�E�x��u�5q�uf{_��Qs�-}����� TR���w�p��\{��e�'0VF�v���6Q�1�+˃�~��Pyr2�P�����QS���D]�j�;��\RY�`�� 		�𩩍�Xo)������kk�%k�u�Ƶ`ȝ���w��%��D�S`IÖ��� #K�3��Q�nqA?`�u����amk9�������4
�����:Yi:[�60x}�eS\��Otk1}�#�-���}��G�����h-����]�kKz�h��6n�]v�7��t?x)�(����l�\}>�X{�,%7u*&����|k��z��zKF�;���װBu�Ф2��e]Ϛ�j�e9.L�z����8�l��atL͔L��	��K�{$�I�}���Q��ϷzHv'{�&�H�QF�/��K2 ���Vxbo�ۢFm�5JYr{�_� ;~Avf�z�hu7�c ��cԽ}�mW^�Y�wMn���+� �j���"����'��Ӡ�pV����˞՝|$�ؽ(�R��BkO�;���{�U��n���n3׏�7�,-W2K5\�%���ئ� ��R�]{G��)Qj�}x�e��&����˗iF����5Y��? �K�࡙�Cgw�e�\w��({��s�@����vdG���<lx��Q�U�ߝP�h���Q5K~�5z�5C����n问��ǩ�Q��+`i��Y�Iա"6sT�̑ �v�.�?S뻚!z�Ȭ�u��Ȼ����@�)R���]��O�G_9ߪ�|�1��Y��v�2F�^����~�~4	� *@��G�����a�$�?�E�^��T�Z:�u$n
��mwG������|p�Qj�Y^�M}�K繶��D�|_��f /;I�qq����	 �f�Zi:SG*P��/��w3
Dލ��
�<`z��z5��$t~�;���С8�y@xM��}����Y���Og��z	��o�$�����ߵ�/��!���"��	}��S4��ݧP�(@���- oK�j�!p�2WM����p·��[1^W�z��
�m�8	��'�&��W)�htVO��l���avp��kM�,X,��e��D��<#��6��q���a/�]Smi֏�g���A)��;.�Ak��VdS��NْXQ�o*oͥG�����@0����W+&��Mp�u�|��5�Pk��N�$�o�d��p��x�a�X O�vGs#k�U<��(s}{�Jm�HH:�Z���'+J�f����}j�(\�m�YV���Ϻ��g�d�� �Y��Wh55ٷ�[�v�}ٗ�MR�b��޾l�m؊��ɓPs��P�r���}㣪����d��d��3�8α�mvSe�Z��
 �������|�����U-E�ϴ�r$�ɬN}�����*�{]M��6��KO���o���\Xf�pq�a��p��Ż͒�@�ղ�޿�C��1s�|`	�hB
	��]?
�=S?4TF,Q��8�q8~�r��
4�^�0�x-Ł�˄�l~�4������a�Y�.�.�������� ���I8��$�N�]�\u�|E;fw�_��M���� \o�8 �<h���RgZ˶��e��>�M%��:F��v�!7�!XA9�}�$[_*�ƅMf�&V��� ְw�ue��Lߵ��bgIρ<��H��M�c��"U��JV�/��	��N�{p�ID�Q��/;���<�"Aq'�*R�#�^�w��R1�\��c糈��g�W�N��5.�#'���mD	g�v�ޝ�&�&w�,8�� �4QV`ao�+XQ�Y��ɳ�M�c>�j�����_��=㓈�"xl�H;\�`q��H,_�&4��+��,Nm��6-�L��Yr��Ɇ�2~��!m��ʉ����w�%�����-�
�$%l+�k�b�Y�j���i�^5�� ϖ|��yQE���H�Aߣ���>镴x��^�I����/3��������x@��nS(�u O$Kc3�gi(�C���Wx�j�#����H�J�
�,X��@��_'���n�	k��`�>�z�(��N~�|я1ܭ�O"zw�.F�z��;�D~!�适�fo�rE?���3�07	:� e��f�x���d�$�ˋJԄ�h�;8b�l��YB0�P6���~�e�V����#56'�B+7������"cãg�����J�D�u�~��젔�1�5�cM���]���"�+����s(u7-9e����g�.����W�ъ��    �3���a T��J���飈~�W�o��hd���>�$-�ZVHwJ�'vyB��ʀI)1S>����9���[�G@iZ��ܹ7_=}��7u�j�"x�z��K�~�:	���ӟE}B=
�w'`�=x�3�X��J�4O���n�R�^���je6Ae�/�C���+痔H1M�M�����������r��i8�
-	��]�f�M���̿ ��쇹e�Oul�eŨiR����#>�����x�'��1R�p�h޵�����/�(<(�Kr��H4�%�Z.a@�R7_�Pq"_�B)m`R����h���ѯ'+�0Y�ߢ���:k��͙w�GB���`Dä��G�l����GF �J�(��]9��G]8Ɔ��2�!m�#�X���K��dy�T��dg����5^i��7���'����eR�w�O��҈t@q�_�m)�JjɃ4}Z1��.s`���o��]��Q�nَ%;!�:���m�z@\�d5��
�=S$I�����H�rM����]�Wq�s�_�n�&�"�����<����9��B��z4�'��2nx���7r��r����㆏v�
�' ��M�D�>�U�]���V�8_�1U�"�&]�>Ѻs֢4i-)�.�m�����_� ��~��n����Ñ|^��I��"��-�/T9����~Mҹ����v.�%��t�v{5���Z��#0�y����G�+z]��R�%m���	��x���"&A0m�UÓ��U7s�H*�L}'#��f�r�ﻩ)�o��v���_������À���	��%�G��n7�������g7�n"2C��Vӯ�h��R��@!�3�����u����|m����mǯ��F$Dx�=�a'�B-Pj?�ױ�,l?�ga��{�H�6>))�$��Rˤ2��~.����ϣ��)e�j�����s�!9�#�V,5��~<��m{JqٺUvɭ]���[��H'��!N[=o�
��ԇ��(��iH��o��Ŋ�l�.J4֓ƒ���)���s 1� ��;�=��ٿ�<���u��+9�6�r�N&/0i��X���'�����^/Ν�'[��-Д���\�n�d�Wm���h�jt��;"������򩾄V+TN�#��ң��ڿ.5E��xM���{H�]�_J�G�/�p��������P��%*��V��d�h���$tX�Z�۳]&^���P�X��]�f�U��	�4K���>C��m�q�'ẵg�I��)|"J�J�?�9I�g\Chі�з��H��A4��=�-@;���Ж�J����{	�f@9��L�����^�C�:0c�בz�a�R���h@<
���֔i�[2��9O�����L�b����ֲ%@���@� �*Kҳt��$�u���d�FW�,�t�4�d9�Hk&����@�������d�폠ʑ:�1xM}!��������|}[g?�譒׍&���U�/�H�t�#���:�=��9״)�m���Ctb�iw�x�U����먝�;:�v�[�n|�,1�����&�!�0��	:�O���=�w2~��JӲ�iǪ�c?�L;Ɛ!CT�:{iB�1�-�eg��J稤2R�_,�LAN��&$7 �1��v}ޞ������5�x�=�[v:�{��;2���/3SX�ֈ![x�?�m�t�>��ې��#yҨ%9�`ئ�X�K�+��T�E�9��-h�� W���?��;���:rP�$t���R%�B�q��A��ѕ��C�?/]*׃4�}�;�~;_�w6O�u/뜕�3daq{Tk:h�HR��
�?=Y�DM��I�Pr_����&����1hx�q��zb�w��9�2l�`b1j�/��!�Mc�o[�W�F���	��`��R��c���^I�QD�e؊L�<�ZǓ�U~�B���RZ�е�&c����n��jI���:Y��q�����ړ%t��ay��K����G6RS�!����Ng��<~�=
�})| �=w?d
���%��� ��!.�P`�Y�M��;Ծ(j襆��~fv˙��ϒZ69++���۷6n� �nc��H.��,�{�n�e%޻m�Q����BuV�:�]`��nMԬ`c�i^��ѥ3�Qt&�Z���#;����ǌ~|�-�0�&˷�0�Ug��f��w�ө���y�(=j�hh�=��Kÿ�� �D��Yٗ�%r�-���K�ׄأ�~+��k��Бѡ�ɣ-2<�h�����s�$���@�}�;5U��Ї����HNKP�-����?+rNgS��ݻerD!wK|�o�B���!x�/�Z�g��y}�?��jB��h�k�
ٽ_��S}���y39M+�O �j�H2m�{�`�����!�彌Nz\�(
4���y��~�	��r(�U��ԬUa�:$��H�1��^���"�0��;�'׷쓈��L���c:4Q��2ZfR�.d����R�FMƖL�'a�����l��/�v�	�@綮���(no���G5����/�TM��{�'9��w�b6 �x���e����z��h����?<^�D��3KuKx�؞�J�c�{"��wႀޜ�5]3{)�~;�VX.�)��?i���A�('�,gZ'1��7ѝ�\�$ �-Dȥ$�zC�TWT]k�rZ�my���a�Y����5�n��������>��\M'5�0fm�g�����:��R����a5�ə���L=@^z���wG�G�|�w�%tl�`�^V���m�˫>
׭M��˕��;��+@���.�u��u<���bLR�q|D�\&��>��x�a2X9�3��࢐A��$GP��к�^X�U�`VRD�/��u�N���� <
�Z��Ι��,�c{�����{s���
�?cOJ�R0�t�x��E��9��R�Zd�`l�+ɖ��QOw���������/!?&���2Δ=�/���=	�-��^����(70I�G��W	'n��uC��YMu{l*i�i�h��o��R�3_J�v,6�C���z�O#����`>
D �V����`ơ��x���wϥ��������.���y�,�a�Έ�f˃�����3��<<���ld����I��TJ��>D���Ys����^@yV?�}!1v��I�B�_7yᣊU�P,8V>��5ɷQ���s�a��R�݋��=�[i/o�O���.�"�}������D� }��̣�iʒ���ȋO�'/�_������Wx)���H*�L�
�5fx1n�G���$g�}7���7w����[�Hj�����2��?!Z�U��P$������0t婦�x6�P�9�%�����5\�QZ �V^��qh|��N����1M�q6H��ϢΧ���LH�m�$;ע�:�*����7䝒�L�d�E��m�:�?z����[1�ID��}3�5�#Y4k��IJY���+��du��ɺ�l9b�
��UW݁��,kXf��_rXi�M�l�5]v��7w���T� d��8
$��:5��������{�?-��:���$*P�Q|�ǄcW��㺥���	~$�3��Mcw�ps�dt3��5+��եڦ׼���Zu�\oN�G�1��cg��V���K(�ر�~{zo�T��Lz��m`��yZ�}ݟ���U⣈ރ��B����[�#9�l�c1.��c�<���{��G��N�v~0z�����0S�T���?$x~���8��z��`x�+�q����ߜ���+i�?�⣄�XýȱC�kQ"@�ڹ�
oemLI>'��o���{�.��]�c���ek�f|��K���z .�F��u~}'���w��\�a����Q��ǔq���j سU d��^E2,�@>��ݩ[�
/~����:�n�����f��w���i;���̓w�%٘��C�6�RZ����(-�p��V1L�h���n�
�|����a�"��J��H���ք��-ıu*O"L)��"��em��>߽���NN���l(ix/��>�n.��[�z 	����1�.T-��c��������l    $0< �==�&�u��_�\.a(~H���с{e�u�]�2�$3E�i�j��>�*�PuWd�l�6�yZ�E�:��n��Cވ�J���T�f��(qI��Ǐ(��-���_�d��V lՇ��M�y�<�㨉�@���K��gfO�M�ł��V9����L��y����^�e��7^���p���yh�A�V���j�kBV�$,��K�g:j.N3.;*��lȤ�M�C&������tdr ֔��tέ%��w�;��kT
�N�xk�V-������[��^��sS7�j�,Q��<��$��+5��t�D�ݰ|j��T�C;uB��T��t>,%�'�YJ>Fh)���h�w�:��L�1"OH�+k)+���t���j˭p]gx9?�exc+��i��vw�de3X�W�n�`+�r���ī�K,!��8B}�v�)r7��Y��LȻ��&� ��50i3��I����� �k��V��t{�۲qp���]�1)@,,��|��PN�+���e޳S�	�������;^\c��麼øA�f�jBtFf1o��YxjXI	ӹH �Xe�j���K��V���9 �۽�	8
u������n� �.�B=})�J�(�&��7!=��v3�+H��Y pX��/�Y1b�p�\���U��c�Y�z�>�T7�	�]H���l�E�SUr�ŉܓr:�����ײ���K�.F0�2�%oiB�ɓb�f��)�я���ԕ��bn����)P��m�v.ꡣ ��{�o��������o�d���(��: ���CR������l{��1�ZJED��r�"�9�u'��OD~2�ġ����#�X�!�X~��hA�Z�;<��gt�� �f'���J�Rs���f��%B�d9��슾=e�aom_��j��V������g{���gV�&���-�	�[�(���b�VD��>�e�c�N7W	@"�|ZV���ӻT�\���0�h��#�]S_j��r:N>��d����C��~���VQ����&m���Ȇsa���wU[�u.c�wԡ�&�����5��g������>u  h{�ȶx��z����|��~_��6�:����bj�?|H�N�v��3��B��&��%�T3y��S��� ��'�i6���T����&�{m�=���a�2yL]�9NlV^
�7h�u�t+��؛��4�|�5�P��D�ZX���xÙ��YX ��ۖL~W��ݰ������4�����I�5��f�\�'�ĺJ�"N��2���|��]=��J.��M�������|7�~�ҫ���������P
K��R5�@�6d��������c{!�ĩ~��t!��#_T��$yq*<|r�|f�s�YE��<�\�fq�?��-��J*iW�7bP��W
|���|����p]c0*�3�c:v�մ#�d`)V3��Ц��B�)t6I$v9��Q������]���!V�'o3�&��:�u@��7�Sv/ǽL��w��]Nb�v�m|�W^m7�����5��!5Mj*K��n��a�m����/���5�6���d~��V�g[KJ�O������̏�T�&+�ך��\���ΐ'O�Esw�b�J�<�����W`o��f�!���!�)W��!Lx����]�+����B�t�՜�[K:cV'��1r_��Yn��g�@Pݒ������V2/p�mG�m@y�)�*�aޕéig2`�YYͳ3M�^5��߀ �pܭ�>"djH�7O�랽���t���Vݵ�빃�!V��_��ÂB�S���7�{[a^ʖ�ə�Eoa���fI���Ғ�	<��vpx�TzI�]��&uR��P�="���||?(	����ꭈ>�*eX�>�� ���r�G��4�u���J��TV�j<t�i^�W �Ό��{�z�ڸ ����.�����R�Y!�Z��@f���<�wc�g[>vSd��U	~צ���������:�"z�N�Ss%	jH^���^y���LB�۫R&hg��뜮�������+�,�e�ğ�΋gK+�Z��nw���)&������,�I�a��D�g���?��������O�M�'�A�OT���;��_�ɝ{�
V�&��VJO���h���El�^oIR�j �i6x_	���j�-���Φ	HI���������q�^�f'G����x���t\��_�r�����^W,�EE<�#p��ڒ��/s��5\���?+AukN�z�~��ŸV�}D}�?�e/n,+u��-{��o������YGtTQX
�T��'���P���:����][��Y.��am�$���~Ğ��p�T����M���a��$@�?�x��ߚvIc�ߐ|ߘ1�|�0����+	$��7��ר�ڇ�q�N�[�ԃ�l,�p �<�A�{���)(,��xZ�_R**�td\���R	U�*_,�S�l�i}�b��t�g��6��1��������o�����R��i��f�L�_�Ԥ�����	�+��"z�݉w;+�[?��3[R��s\2�)�·SU�������N��ُ���&�'�+5��Ax���������|ݿ[HN�H� ?�tS�Lx��Ã0W1���j'���������&uS�Ƚ��j'�S�pi�P��1�l��N�� �����i������t��e��ْ�{�T�h�?X��֪}�w�׮^�ii�Kq�N��V�Ʉ&�}>BP�N oˮ�x�B[�baO���2�I���-�p�`N�gw%kּC`wbEO�����F=ު���S�(�T���(�õ�6�bx�sf����K���5{����N�������q'��¶@?��t�X��h;�w)�D(u~Q�TO���j#���#aL Ld��e��-Q�Rr��u[�UF{�(���Ԧ�0v�](����No�Z�bV9Tۼ�KU��s��	j����譈>eA<$�/~d���sȰ� V��%��g�9W_���b�-|��̚NF�e�T��ő�Yrx� �-��J�N.���c���� *RK�e^4P� ����>r+\ϖ���J���X���x����@�
,Do���`Hܫ���'������E��{@���йHD��Cۻϔ�q�F�����7�Җ����y�
��M#���x���.�A� �c�5kb�%��;�"\ywh��]�a[��Y�폖'^��Ȫ�H�Dk����C*z�3{��ܰ����*y�p��Јן�x]#���Yƈ�M��v_���܇x�����Q��ϝ�=��sm2@�NY��S���?0/��C���	t�b��S�ϥ��(FЕ��f��N��#��eR�<��
��:˸�K���><aɝҶ��2����e}eZ(��K���Ihg3E�Z�-�@��k@����n��hI�����9ފxo�bi&]OPz}0����m���K0�f�VJe�=br��H����Wθ�������!�����Z=\=�ԇ��~<����vj��y�l\�H�d��Q{�6ߟ�#�8��dWp���s�7�RRcHsb5ɣ��}�b��p}��@|��b���N�Ɇp��u��
-,N�Mj;�:����͆�Ԝ�Mg%e�T|%���}ԪF)�H��ݳ���&DӶ$��a`���5}r�ӗ��ۋ�F���5eQD�!���ƚ�B�%��k}��O��K���B�lP�)�����?Xxqr9�]�I-�A�QY�C9��n=��#��k�Q��N�[���;�����$鷫��A�����@Q j���/�\�e�u�\y���jV]!m/�$[za�H�;;S�{�,+��(6��e��[ɎK��4����Kq�N���i8�rW%��J;��4Q^�f �p\�J�"����n���1wX��0)����
�+��T;���Odeu��R��e�g��0�	V޹P)5N�J�'����T׻Gl}x���I�r���Ov�=��D|+\�>$+��;u�+ܱ��e��_��r���.{��I��9�a����ZQ�H��)'otnԽ\�����V�-    e44���b"�����|����W�\m����$Ӫ���M�-���x�!݉跔ʐ9�9x� `뀶���UQ��q��u�'k�e���uZ᭑pc���C�,k^܋a�	&#�ޡ��2'4)�}��£Ad:�3�jXQ��%����]ɭp]�C5 �;�e��R���_�p�E^xѽ�N��S�u��#��S[����Ghe��+��7]K��i�T�^�wz{�ůw����l�|�h2��>L�.K�[�zz�$�t%�=���{�\'9|�휄1_��h��+ya���\b?n�sb�/ �ȡb�y��e��i�WZ�#�`0,�mA&�w�6 xӖ�xһ��X�66��O��ݧ����NGz��H��݊�u�\Yb)��EgQ<��#ׇ[LV0_яg�=$v��kL�͐�2,�I
%��#��.�Wآ�	�&VA��BJ~{ :�SP�tSr�:�HA�q�O;�}(�	�+�q�\{�ܭZ�GI�D��
"�Y��\}Su�F!�B���}M�����mY�nuP � �C�՞�C0�UPl:�ۛV$@h�T�#1o�qX5��<�$hX:����N"��W�F.r'����Ԑ�H\P��4fK��OG@9n���*R��s�0b����s�W ��k�[u�\�$�6'��C/� ��uu��VQ-Z���p���f ~f)x�}Jl��Ö]}KpP'�M>�� ��F��o��W2� P[�7Т^�Xʹ�9_�襜�?4�P����&��L��4?�yqh��A
�v��ç���6 �w�v�U+o�}ey������v�7��s�|��	�DZ�$����C���������k��ԓ����@�|�6�Unf��B%�t�����T��d�肤���5�_4��5.cHmY�0��L��ngA��a�+�`"��P��V|�qKxMߊ������y����Pf>J����Ik^3ͯӐjN��G�{�s�r���Pj�_r����'� ߒS���K���뭤y@�_�2t����C�,�]�2u�6��.�KdH�=t�I=^.Fw"��{S�8Kj�+�^��^#Af�����a�C���0��k�X�����Cޔ�����R�A6�]�����o�c��.0��m�9
��u���:����
�5gac���a���x�蒅bhv�A6xa����p��M��(�|�"X��!/N5��.Z^��J�m�e��9��]�<N#M��@a�X
�5P*}������q�[�v�rLH}�jO��>�A��P�Wh���<��0򑬎/a6�~�~���b��*}%j>H��Mc�r�#ͼ۷1`��:�u(��[9��'��ׇ�O�Q�[�zzi�����B�G�k�M5�q�+H�t�=ˏ [��AU�Du3���G��^Y��y�����>�`߷%��pz��cj7E�`�����7Ƹ����:H�$�A��Ur�P���.�U��Y��\����H�G���9��O����FX�h���,�9��>�}E�.5Y��S��U|�iV76&,��?,�^��V���W��ܠ,���٭�?-NY'���K5���1�����ۋ [��k����5��>,���.ᄹ�,f	D��-�){����L4dӱ�a<ty��<�ꞻ��͖%=���T��<�E@�SL��귭�������z%dY[T2�����u=���a֤��$-���;��ʮI-VcE��k2(6+����n.���P�5C��.�ʫ�����nE��fQ�Oy�C򢪆�(�d�6+�"{uoU���]�_J戋�!�Φ�8!���3u(�d��(u%!��k���j��<0D������v���~��[1��V@+R���I�Ͼ�oP��k�VD�ޒ[�՚#w]y��)�cOr!Ϫ]v��b�4�
�$�ba I�Jn���W�e��e�.3mY��+����b��U|كN ��"f!j�E]oƞg�dQ��Ib��������2���r]�ފ�΃f;�zy���n�>��vB��'LƜ0޾\P���&�5�=�-������ͤ��m�8���PYK���#�z�ǀ�.۴��|�f�+VR�&�w�}�Y�! ��X,�R)�ˬH
�@��运���>���D�{fj��h�jZJ�e^��gw���n�!��c݆9��V�K�^��4��-`�`�2��>��\��� |<��$����!�}��^R��uM0����m�j�M�P�����1v���ꮋt"��^���D-`l��
_A
!$4�ߐay�=���Da��
�;�&U�a'�6zcWz�C������	U�\rA�SoӦ�4S�F��H�����>;v)r0�J�ѝd1�����IN����W���ٶ�1sB?�R ��OGZ)�X��tkjxJ�7�]�y�/Ƿ�$�d�{jd0���E*��_w]��uu����#�M�I+a���P�~�6����,�Ȇ1l�� ����KZ�K�o��I�J���._���%� ߑe%�uF�͓d�vw��9ΰ��N<j1���jw(^�?�����{'��Æ +�Q��l$���ʇP���+���6��EB���`�ݲR�u_AG,U�s�<`:,�Ji�4|MW��Y�s��,0�GU�U&�zNj��lO7��2�Öq.��A9�#�{�o��_Zɷ"�l5�`���Gqr��ļ ��{��y�b�Δ(�B�x�mi�ǘ�t��n�#��3ڥ��K�VWr���"ٷ�̻����%�����f2Jܐ�?|�����T/&&��(��4<c5�F����|n��������P��,+����_v
������,$qɹ�KQ��+����/k#��r�T˚@�ؿM_������Y���I�sM�㳖~ ^�Է"z��a�Q�L��Kk�:^j�>��[|h#k�b��lQEb�
���e]N�k7VvNU��0./1�Q���U�_�,�NR7 �,�����/�[�	�Kɍ]�� u���@f!�)��:;9��[5>������s��<�C�m~��$��F�4% ��N�e9em�w���Qc�r;w���&'ѴU�3�q��f�[��R���;t�K�&�����J��e<G��e,�:O�BַY����%I���֙T���q4~�X�K�Mo����ܐN��&�E�c�}�ݗZ\(����n�����Н����K��VD_�j����R�G&љ:R鬣���=���$�aL%�1ւ�T��	�ϲ��1�M��)�8���fjݤ����~�?f(������*u����$f��~��5_��7���ߌ� �4�%������0$�%��ױv����>{E&f�,�x���ť�W1z1�~�H0��������X���޽�	&��`���e�s�5��9�_���ڗ���p=e��Ih��Ef�L�=�:��S�X1�h���\R�f��|gm���fa6�!�/I$_��#�<Ħ��,n��cw���$�Ŋ[5ۜ5�A�ݒ�ۨ�mXg�� ��K�b�T'UcGy�+�-��ꭈ^�Z:�����èz��v�e���Y[?�N��ZY��/RF*;�)�Y�
�z1+`��44QaN�>�I�l翔��q�(��3ϋ��K�a�!�����l��K�Cҽ��c�揰۷q����C�.��̣� �Ӆ?��ti���!�m<y�Է��E��y���I�z�Oi��̃kou/�c���d[ ��c�[�z2�2b1f��N�S�ZHڃM)9L�
l"�L�{���C#��¸4�����#�����ZZ�~;iJ�v�=���+�a/��c�ǝ�Q���"x7c�*�&�#���sxa���
��v�[}-k�&���=�j#���t5<�4�\x����ݡ��4^fz��L�Z%e��/�#�.V�zr�!f��0@�k�+���2�K|ʨ'�F�$�*ar�;��rI˲�zr�]�|:X�X��ޭ�>���&$A@����*z#�ߪ�X����rz�����!���� Eٖ����)�(��(�+c�Cˏ��-^P�l����i�    Ii�Ys��P[��-o�O�t��ݭp=˒�#�~Py%)�h���Ά5"�l�N�l4*Qʣ��.�u4����G���X�cg��7������@�2��f^~��]�d�KJ��xp&��j.�n�H��9�Hn-F60F��� ���jk��g`�95�n�����"��\�t�����W���Y3lW��7�<v�Q�w�Bw�����lD�f�}	��X&|��ͮ�ߣ/���V2[�Qm��%4<[Wg+���u�u+�W��(V��TZp�B�[�?k"�@x^ѷ�
��J%�i��!J�ۀ+���ǲ�Ŏ-�'cy@i8w��[Dـ���y����]u��Aѩ0˽S7����|q+\W��c"˸�/�]�:-Vi�����\�u�ۮ%k���TxdI����5E����e�JJ!@���W��)�ͮ�(;�a%����z�s���h�����]���uΛI�Y�L�7H����D�y�A���#�#G��X�>��I�i��Wt�|ܜ@YP�	腭m�����#�T�`$ޝF���U�����aGue��k���S�e��Y(l�.�n��������{����ND��RP/�D�WfY��jd5���9�W���!ڥ0����]Z>�ͣ�h�X%��K�`�NZ�yF�?oJw��#o�r`p$��(Ҟa�І�&��o�+i��;�dj�)Ta�{i��� ��V쭈>}B��\g�����S��ʮ�F�f�&��ْ�`���f�S����I.�d�6Ȼ%�ؼ'?����~�z����m9�ȥJGY�JQ��ok�i�q�����,�2��C�v�!����>�d̝�~���~.��u���� �	&�T�+�ӗ��ɾ��_�d�}����}M�5c��V��K�eD뫴mS�z���Y4����*r..�F�v�u76�s�q�A�b�.���-	��]4�{��VD��u�[ɡZI�(!�Cvq���_GU.��$��:Y";n�If+��J�u7�sn�d����W穧qE?��� �H~��l0�fy$X-��](9#�;R=X<�.�g� ���~%��έ�~��a�~���$}�-���qt��>�sty�R��\B?�!��x&V
�p첖-�K�;�k�^]rPrb~E���0��K�@S�|dʅ#K�w�����3Zjyk���HI�W����{+�O�ⲉ�T�y���)�G�xI�s/wž��ep�/^��Jڗ,�H��tJ�-5�]����r/�� _��pž�{�ݩ
�В{�y�8 g�V�Q|��%� W�T��W��XiK��W���>%$D�:
D���5�a�2�ywysZ�i��TM��=��}�I;JQ����s�\�Ƙ�؃| �}�����zr,�3�nb��;��q�����N�^�cG[���Β<�|}$3MT�r�X{Z9x�V�2�� ]��W6>���a�W��ī����rE�>���떑�*H�}L�����sKI�%�nn��Io��ySI\��� �IM�[]���qobr"�/v�a�F�j@c�.���9<`��h��Ů�8�����cj2��#���x����h�#�!��6Z/(��Y�%nx'\�4�Y�;����=��D�ZaSžW�?-�H�C�	1�n�p|S~[n�j�>�
4�����Է�)�
�?I
u��A�:�� g"\YD�������w�(��0G�m�s�F_�E�oE��^�-�kV�+�`�:!ږc�+���1�F ����JQ�.6����7/΄�BTK����fI{D]Q�!P��e��o�"O��l��5 Ue|\���Y��ץ�Ue�R�!K3�'Rᏸ���P������S��p�"��a����������6�)�X���S��z������ߝ�H�}�m ����}��Ȕ��{�a����^�_63��C(�Pg:kb����L>�Q���۝�kK'����w%�?N_y��E.�6KeH��r*�!���|��^!l��J/c�*��X�t/�u�}+\��W`�,l��x�Z����
μ�ʒ�'Q�T��ق$_��0�B�፨^1;�T:u�ڷ���`����v�2鲆D!iu��_bH������w�1zy@�,WH	٢�<Y󙻜�;�ފ��װ�Cb�U�jy�C�؇���5��}F� ���/�,��Dى�V���ܣ�Yּ��t����9�6�e�0Ԛ�.���&��k�S��?�1;�c}�������sr�E�P�f��'i��&S8
ٵ����t�*J����$�C7+i	u��
�K�i��[KGI<�+����NOɉR�}`i�6��[��F�(H6mϥF���FY^�����wuNމ蓏 ��0�@`>t|��4��sݚ�נc0g�|\6�n�(�����z��p���Y6CB٭�~6�R#$v��n�o��|z��C��Y0��χ�S���}��[�z6-����,e�a� �#�X�m�����Fb�̬.�8�ܜW�����W*��G�q����C]��ښ��bx�i4ؑuXehnj��2C���w}���}GiZ��ؾ�
 ���ř�[���e��#Dq�
\q�(޸B�j����� !s�!@Uʥێ|���0m��ǲ�:ʜvtu�tV��r��Y�Yv��6P.�$�)�y6kW�]��m�f���ꝼ��#�� ��T�m0�:�A�{�!����sF6��u�b� �����&��h�+���f�> Z�(>��� ���R�=Now�S㋄cVZ����r�pK���y�p]�BK"�
!KV�H�@��59���N�N���bևc3���
A�y���/������!�Z�r������8>u�ԥ����;���FJ�P�kv�	׫��CO�CiT]�Givu��TC�˴/�xvc]C4o�%����!8�#��,��A ���ɎkVuS}�����j�vn�=�mɀ��+G���Ov�m�7��T��p���[��g�j�GYҋg���p(���� R�)��Ϋ�f[�Ҙt?�4S��F�s�.Y��e���r.��dP�v-?�&��.�W��=X�T�>�.	�;�,P��!��ye�	1t���r�z�B>I��ڬ�|�4�ˊvRkR����Ӆ��F��3�|dU��Q6��ݫ=AK��.j��H�0�د~8����p}w1Mi����ʹ�扎>��#���B�VP�M+l�"�6���!�;�\���0�C�d.V9l��t���X���I:���dPI	�8���+�]��V��Q|��e;��*3O��=Ա��G�M�$�8/}������R���U�:~�V�h���}gC6�&e�;��t�I�V� q�Ȗ���:�����C��͎�$�7l�4��r�k�h9��op�kB�VD/�=IF�I�E�76)����[�@r��G#&������C��>��$��z�Y���8���a!Y�Cd�d���������Ai :P�G��SF�S�~�=�����:��2���b;������ԓ�����tѪS��&X6i���xq0=B۾ �u'	� ��S3��N�]�n�y+y��^�gC��z�t� �����ޗ�3�*NFj	�\������&�~��rj�ыtd!�my��	M�fEɶ�a�˫��~�k������Q�$O�(Iƫ��IM%[_���{F�F�Cv�����c�}�a9�m�d]�GP"���e�k�O������a��d�=P��i��ø�׹�}lO����!�0	X7v���{��"驁��*1��Ǆ�i�vO�/9.NW;?/�=A��B�:Ɉ�KvHEΛ�c����Y�v��T�A}��Y�!�U�ɕ�WD��u�|#��=��ƓcVn�I��7y� rH�/����l��g��7��)M��%��#�`�0���_�橐�!�M`�t]��ƾ��U������ǧT_'������/�XA�MAv��#�}}��jq�м�~�.�<�FX��H�JY��p���d��`MvJv�̉�6r��:���K�:�
�PP/Ҕc��PA��ݪ��k��    �0 d����,o�ޠ�d�q�X�}���8P�-|�S�d����L>A{}I�� w�d~�\���JB��Sx��i��Zή�.>���+�A�|�dn����-!�=Mv%}�!m��8��pʝ�^��>/C�;X��֖r�������6�˜$�,��b���m�"̗�=%���u��(,��x4Q�)����{�w�f��=4w��]��z��I��*��1q+\�*ͬ��Y�M{�`���
 -��.��X4h` �ͅEy 㢷>4�C~�͛tD��AG�s=�nI^�������.x�� ?8*�L���m������L�*`�q۬7�7/�[}^�X>�;����c�*�o�:��Wj�Z������=���N*����)�[B��ؑ4mP��:
�	���4���-�6 ���8p[W1�����b�����	^Ws�XG_K� �5�p��1:�/^��	1F�Q����&�ofKg�$�3��h��LV�L26�[�����@K\��_*#�c�d5*-+�@�|����v��jf�\����ͯt�_B�w"z�;(XaUR���~4Л,늬c��!_�'�n��o������\��/l*Aͦ�~UM�Ob�6�#�8��~���)o���G$ƖtG���6{Wf��#�Q�M�KIU'_[�T�Wf�.�;}5*ɽo�c��!�P�]%�dl,��qN��s;_����N�.�fݻ�G_/^�@U�"�Ӕ��NusW��ݎ�4r�f�U�䭵��2����[�z�j����R���^��e/3J������SF�Ɂ��J!B����q3����5[NϮ.$ HKłz�c�|W4�dwr�P��|^���ni�CC)(K�d�n��ަ��ױ������� �gq9�j�I��ơնV�q5LSی�L7������WM���q�M]��^S3W�Ù�a��$��v�������o���Csp�.��*�x2�j�����F��b+���[��lz51G^am�uxU� o��u
�♌d�l�"��=��Aj̏~Q^,�q�D<: ��!�_n�8�`%���Y���)��k��/�QB��$�%1v'\�Mא��Y_�#�n�Rf8\3C p-�t�&��N��fWv&��e����-d���]�nh�^+�
�DnrW�����:���2���#oUِog�P@AS��짩^��3��7�����;�oE���%9��u�Q$�&�@�6u��6�����O
�/���R�|��M'+� ��˚��1��k�h������*��]%,6)��1�%��
v�l-�v����׍��p=�wolwL���D�T���t�fЌ�3��4��]�+�i�f:h88����Q���)�,W��2,���7kߋ��m�!�i}���&���"Ï]ƻ�S'=UUHH+=�(��*S���կ�r+���7K*���q�ʜ�Qt�N8�S�� �,�L)~�<���b�@����������M�\�a,�~�u��:�y�5J�R��	+M_�+=Yk������H~���T঺Im�ہ	~%�/>y+��B�00�5��#8+�/�qr����:X�� �UC��/x���w������"�>;�H#�-3,vv�+��U{�������;{��/��]�]��%eb���<�ک�����������ߊ�k
�=d"��oȿ;�.�X�����_dٞƸ4�x �xh�������R���v�w��lb�ky?��E���B��;��m��z�ֻ����<4�g��ɓ(����k�4�x��{�ט���VD/ �uL���� ��,pYc��:{��l�7�Y������m��A���?ŔǥI~�7x�8�52��[�
d��@�հ���y�1ۭy&j��pkd��������=��O��yY�<���:'�F!�gh�	G�K�<�m��Ξ:��-��?B��@"��ڦd�J���Aȶ<���՜Z*�����49�Ú���>=~�m�|#\/�#�#��(D���pHo);S�1���,)Tx?߳�A�B;�-K���K�q�ʋ���j
�Ml"�H�JT6x��M�����%:���Ȱ���b�'����^=���u��7Q8�񧲵���߽���A^�)�3���t���U���q�I����b����y�R4ər$)P�"���✷�ǘ���FM#HY��Y��~x���#8�B�˦�FR��x����A����+ߊ�Չ�a)��D�e�t�̑�z�c���K�2Y�ae�ju#�~��)���3��kX�����S]��)��b�K�#�e�;�V��R�'�K=�d�����?K�q�+o�
E39_�3tY
��N�+_ߊ��@\ J���!��CG=�Z\��AW��g�ʶ��\�z�pg��J&�l�!�Ϻ�,'�núK��h���+?�k��I��`ioP�NR&��t�����@�i��X��H�y=F�~c�_��w"��kH���2����QZ�Go��F�L�:l�o��l�NV+̫Yv40Wm�� ���I�h}��H�Kc��u��79�SKj@�p�8�|���Օ�m��'�.��[�z����;��<���������~�ꅭ�	��͹����g�}U����S���̊.�?��u�%�휻t�K�/����ͳ��@�Eg4�Z�ƒZ�.�Hj� /�x+\��K��%��<�����K�`��|�����>2�ja���t-�K� ���]�+�0sIu��a���6��J��!?�ggT���օ�OyA��=���$l��:��NΛ1� ~���VD��
�X��5�&7yw��^9�����
�س�d�Y�g>S}��B�`,���U�� h�-��D�B�j����+���͆�V���*������v�w�j��F�KwɆ5?������5�u�oE�r" qƤɻ�:5�e��t^�e*n�}wV"}�\H؋j芚64KR1��L"5����#��q���6�uW�%�:� �u�6��h�/����w>lQ�d0��@>���(\��a]w%�[�Tݓ�7�9�(�P��A���]I/Ú��+E8�P�A"e���E��BV�Wޭ�(iE~T-?��HC)��]�x����0�f��k� J�|��.B�>��B$v^#�ɒ��j*߿!�vi�ߊ�#j��%Ф��͙���f�m�>`�؇Sv�=ɱ�=���N�	�ϒ�0�Kwu|X]E�&��}�IF��: �z�����-�Q�6��Sط�o�3�n<�:�-���>��W�T:[ͭ�_�ֻ���D�	etAS=|�r����M��Mt�:�j�)Q����+,�ґa�<�� �E����x��&u�;ʄ+�hQ��wJ�F|����.Ʌ����m�q��*g?~�i���h���XG
�p���]�E�p��:�*�d� �&Gub����!�h��#8�8A4M��A%���F MH6;�w�O`X=�vX�v^C���m�NƤ�a弫V�
���Ze�g�Q�Q���t�;��R�|�V�kN�N���Ѵ��eH���w\���)0՘d��m��P}۾�ke>ɭ�H��Ү��%]���)����fyC%C��l��h����.�F����z'�O%���	ބ�(������n��a�qž�qڕ��u��3��:es ����*��x�Z�l�-�:�-|��M����{i˶ʣ�Q��$M�{�c�f������+�(����j��=z�別��$[p�k�zj�����/�1��Z�/UF ��,�rv����l�U���{#̷���Z��.%���,�C����L�t�u�z'\�>6�L~4]����Ey�<�{���P5'Vx���KjBd�$7SK�?$���L�0@��[tw .�qN�����Q�!��"9�U��o$�c��U�| n���[噳�����]kG1�Y���J*�uR�)�8�v��H$�� �ҟ�^>�n�Ȏ�d�p���Sd��6�⭚�J�8cr D'uV��4��, �{��O�^Ê3ϣT_�o(�_76�"�Rß2M2���B>��p�I�N�a���jug[]#"!��/�r�d�tg��_�r<�ꧭ2� �j�:u�    q�ޝvI���!缃7mVx��t���_�2;��'�L0���;��w��oD�{���LɎC-u�@ԑY��c� ^)ş�LOV���8�ĕ��ʱ�f���t�b�K@�%��l�n�%��[�/g���)�2�f���{���Mި�y��sM-� �ݥ��U�VD_{���d���ƣ�ZՀ,3��b/ǖXU��^���f+5c� �f�yU2��iVs��.}�̣���V�v8�O���i�F94�����\ƿ}��E�qȘ�m��U��h�7b��ߊ���=s��E��(�^=T��3��THdI�1�i�z��>%f��
��L$��2�h5��2eĹ˻s{�r��J�䗢MkBkJ��p1}�[ẆۇuI�[K	��t�����x�� @^��ۖ��-�U׶���9^,�{K���4"�u�6��ɭ5��bpݐ$��l������/>�v���٦���;�z"8���ݮ�֌��}e�M~���{��|n���!������s�����C�֎;�U�i/ݹ�Y���}�{q�C,v"jD4�p(�;f��U�ex'\�Y]���F���=�5�q��:9�夸��"�m歳k۪|G%y����7̋��2Mt0��$�B��a�����t~mv��ӯ%e�� ��l���q�E�����#<C6H2=�H���+����k=�1��<��tB:rO6�����k��vʹw��ټ��x
R��F��lꥧ6��,�<�a?fQ�ʜ��{gr��"�Ua��� ���Wt^�w�"z-k�j�g�/�ԃ��u�R�Ѹ����9����l�ŵ$�jܵ4���$�/R0�6��0~)��a%'7_�z+2�zQ��~Gku�i%(һg{i�P|/�k8<ۙ�j�iz��+���ccw"����{����Pۃ�����Ej��ո��=Y�l˗�Z�r6q��������V�
S���!6Z9O!%c���V!��%�����ӆX����	��[
_�K��I��*��d-0S线{w�߈�un�k5�Ú�d��Щ;"�n�$�􊾦!u��7�dgM@�'O���,0�;����x�� �KKc��.+�s�l��Y�Gw��s$��
�NM�DH#u��aKt�B�	�u%��&l�҅�-Э=���?��
���a�B���)�e��L~�֟7�+���o��z ,+���iaۓ�[�]�;g��v���>�`�_rs��u�K�&dwl6�!?������X	��z�6��F8�Fvǒ��ܫ4h��BZ�!��9�,:��pG��/ްq�^����}�'�O�OT�ڤFض����4�a��+�����[��T�a��;7H[�p������k6�P8�����kֈ,�j]�L5�1Ni�Y*�Yj�m!4I�]a�g��%m�D"���%�� �0Ev}��O� �:w>�f|v��*�׹��o�x��މ�kY�,��b�'U�e<��5õ�ٿ��NS��)Ye  7����b�V}w_�Ds�� �}�Du͏	��2��S@�� CU��h��F)k.����1�Y�n�Z>��@�lA����D?^��7"�쇚u���A��/�:�i*X�,���}>���������h6_���8���_a��u`�%� z9�~�{(ehJB�P_��]Ni�f9[����ꐫT���=��h(/j�A�/�݊蓰o����&׈pP��w(�Ů��W������!v(ł�'3��@ϥ�鼜-�	)�D��\��mE>X*ժG�ݼ��M~F:���f�=��C���e�5�q'\�tnm���᝜�Fid��V��2��J��@��{��H���R)����Z4_t�'oݚ9j�Y��ד�^~��&�~jrk��:���5�_�f١3���P�E����{�ugp+��t>X'�w���M��Q&�q�^w��@;�1Y�a���FV�o��9�^L�)� ����S��M�l���mf�l���b6#��x��G�)Ghk�%A�[�:�g�|�-@4@�V0��h�	�x�֞� ��㎉��@����Gh��Ld��@��3U�n�ɫ����^�S��D�����}_j����!#�? �[��F���P|���>,� ���v'1�\������7uz�!d��V�BˣͬA�ƣ}H�3RZu���k�c�
�W��I���精�����iTڷWt&#{���+>���y�RI��7�� ފ�٦�h	�������̇oI}L����ӭi�k�=�$_��%�q g*���"?�V���o%"�1mA�]W���V�eBv�y��X+f{y�4p�{���P(��A娶�:�NC�j�/�F^�8w"�\�!�B-ɧ�G��9
��ȺO-H���@�U�g��fg��N-lv�\���9L6�o����z�> �د�l��}����CC�Y��]׼���ѳ M�c��5�ud��=�7����[�n�n؇&��h�Ӏ_<��Y���g��W�Frc���q�}�rљMI��I��$q[�$�������N}��z����{�ݥ��أi��d�	���(k�6���'�!'W`���VS�.)�P�0Ī�?_�MPU�!y$�C�E ��~tX�_0�+qݨ!�ss�Q�k�v���(�k_���n�,Yh��li޼{��(�[����W]�Vk���o��r�����sЅ��J9�T�+�����FP���3(%I��j� ˓�����=��C�Y/�s.��..X���n6�M-��i�Exű>�5���9F/����c��/�V�./���t�Ӕ]j`�e�G�G|�0]����x(�&���e�4Nj�(v�'��8' mo�L��6[K��#�ܻ#�B#7�D>[�k���˵�mR.k�[�z�g,>Tk%,��=�Q��CF�ƴ�I����(x[�(uP �p��4��=���5�T��$�4���3%������3�K�&�<��KB[��w�������G+3�P��>i *���}��nE���e�����v#��x�`@�>zK�<U��3�kyU��<t�pۚ��:!��G�B/{���h{`��47�?7[���Hku ����y�z��o..~+\��=�W�>ul"�g�p,,Y��k�e$��s �X�(�!�dn������SbMS�t����J&ex9��\ۻm�R���,O��xX�&R� ���θ�gs^�����uf9*���)T�\W�+[88^cǃ,I�@i���Rȡj�_��krC�~+��bbu�q�>�za�J�<�g0��4��P��S}���D�C��2��A*��F�xe�[�����ߧx��� =)���	30�[�3k�Ϥ-�E���+�vH��L�J����(�j8�?М��f������n�f_kg���a��Xktc�O۰����p��,��ԕy>B*:f��ཎ��0}��A4�z��b��;~�~��7�g
�d#53������c�+�᜶6��+�u���˓~���l�����,(H��(n�	`^����"x'��e��+��&^�{�v86Q���p�Ս��I�a94�ܺIvY��$���~�сsK�Ol\��;����Ս�[i����x�g���!������h�Z�e�M�K}PQ$3O�qE22���x+�ϫ�h{�3:��~PR�1g��V��+��H����n]=�Y��\]O_�2L5��o�ul��Q��|_ ;�x06���#:rH�m}����z�% �<�&��U'}�����?�Սs+��N��!`<%'Eh5bnFJ��%߰W��)��B �I��{g��3��Z^?8/njn�3]r���3KrI��w,">��5@|���(I܌Wu%� [����`��T��Te�1I�}���y%ä�h^U]D����<((����+��X@7y�9/��ʰ�h�aSl���E]�gq�>[��*T�N�W˲��?^VT��4�},j�U�AP��E]�.�_��Je'u���a�j�gK�m�T�!V*y��k$�|�    fC�Y�8�t+��CmٌP�f��Ճ=J�Onՙ2���4� _3&0,��ޞ{�|���	$A5r@�#Jخ�)2����Y�`m����1[/1@2p"����i舯�5$C꥘>����d�s_{��[�N�"� I�|�=�C�IG�	�4��kƀ-}.����'H�hN���ź��b������ 	|>�$����W��t���
m��k�'�)��𸮱N)W�����z���V�WSU���>J&���Z�ޞ��j-:���Û��	í_����X���/�=Y��料��;~��թ~Юj�Έ[�rC̟n��3�x'\�>h�T@�^�����$�*֨Z�
�;��a͒�M�$�)��Fҭ��dʯк�^�Ao�쩰����P@k߶�!�R�c�b��p��ohFI�C�J���\�tw�u-ɷ{(��F�?j��X���Lb���w�?DT}򺈪P�A��^�:�s�������Ve�(a�4�U&�z���Q9��g�����@6K�ە�'x�f�?\�V�k���$G|�_�+}�Jȝ�^s;�B�:���)��4�Xޚ>��w���n�p$���IL��5˸�Y/�@w���)�i�I�t�O������p�X_��"�{%���7�lR}}�Mv:hsٶ�U=\������aKߐ}��nE�╺��=k�ºq4W�!�o�8Ar/n��g�ۥ�|���mvγ��*�F�#_+�4��ZQW+��V���x�Ԥ�>i��P�ҧ�9�CI�o��~I�݆��Zf�D�f[���t��2ϭ�>!���0�{H�^���xO��$�m�ë�ϧS��r���q�Ie�-M]c���Ƭ�JQ�^��)o�W��i)�m�Q�}�S��&�W��_�g�G`�S����O��=l��٧?+�ND_+��\��}x���C����Y�$s9׹W��<rI���%}������+���a��B˒������� /�]��_�H��DI�zB��Y7S�0�FMo��yc#w�8�Hjr�rio��$���p��N/iZ[4w�Sz�;����-���)�	�:+�J~ ��S8�uP�G��c�ݑ�a� �"Ӓ����"/{����CMjc>��%;,�ڿbzpu߉��n��H.Gl��[8H��{6�㧼�|=g$��$d>Rr�ɤׯ��)�ǟ�;�J���c���l1X�~=��VQ6���ի��!����m���R����#zm?�3`ٵ�=�ny��߉�a�]{��X���]���N���#���S=#�H����햳U#���<�Q���ß���/M#30�]�˻�����,C���g�딂�b�ǻ�K�[��#��ba c�d�$��P�iS�/�J`���"�,�Z][���*r���~���pu�Q��%JcY�mt/���*��A���a$4?�$�]��/G�[�P�W��������%4j��]D��5n�iR��q����#��2?���Y�E�^���mV��UZ�n�H�S�G7|aA*d�-C��օK�F��7���#�U��T��XU�w �^����Au1�H�֭)Q�������5�Ϫ�	� ��9�n� [FK�ӻ�`O1D7�ɥ[�"~��r��ᣦW�ӭp]�nH�/���r�b���soا�_�1�0O�Vl�6ʸmڵ<u�_�<��.^%�{F������x�<$٘�32i��u���5\����+�x���l_��X�ܕ\�����OqY*T��u��Yj$4[}�j�E7�����o�'�*�0M&m�@G疏��W��i��ΞL7�aT����N�n����z�� a��x�����0�踾��nE�b%�­qed��ۚ�����L[}�@_��!�ԛڢ�uo���j�b'j|���O�-�
#�5�̬�<�Vj�o.^�OgcHĆ���$���?������k��f�@T���f���߸�:nE�:�ִ���؞Ҫ�:���֛�&;mvW��gϠ�Pf�*i)�����+w��#�Uե���y�����*���NC�����@�K*]z7v�X��wz�c�Z)wER8r�T�6-�|���G}oE��_]|QoǑ�#�/(&�o*��I3�:LB9�S]�I�`��z�O�	�����I8�l_�/��!�NMF�/��nn��O��\�vu��8��T�����Ӻc/a��x��5����:���ʈ}Vh�_�*W��$����� �6+�,������H�$��f3�yP�����|��@)��ѠK�]��_O^o; -5��s�����R��IXj��Qӭ�>�ǲ]w;kU��R�:��nkV�\c4�h��z�������|�ڃNJ���u����a��)
8F���=}Ω%;qj{�c�NnZ����7�j����-���ے��F�ԅoE�J���}V�!��.q���S����e���D�s�=IY˫���X���H�	��f�T_�	� �*��~EߞSF�d��ׇղyG�)��wE3��S��N�P̐��mu��f�bA��?���jGּ����X{Xh$̚}EߝI�@�Ȋ�l��	�$<\t��OJ��m�;QZN]�����]�X��w�#��j��������E���9B��������g���&0;Or�����;�f�j^�
�?�a���7F:ג��#5�گZ�ó� �Aw7�4u�8^@q�G�⻵�t����j�rN�<�(y���Zy�N�^��r���:i�اwMoj�����Ù�:id6����A���?�M�~�^=�,�K�h$c[�pܠ�k葏"��>�+f�d�(����4��bt�-���-x�fu_�_��SnD����K�ڑWӥ�GvlE�U�L���Oɂۚ�z���{�\ ��J!�T�!�P,�_D
|w��gК�ږ��3�5Tt�1}/�6�LS��E��{Z�j�`���+���)ୈ^�g�����z-��R���9`�7�z����Q�,�i2U���
�c��4W���%�d wf��f^m|��s@lw��|�.���$�_�_�"��/�'�����'�$C-/l��}#��[���u�~W���u<��:�g{x���+��t����Wv�"Z��YB��e��p���d��
��ERp#�������nv5��V�>���~�ǈO(�çY�����������sG~��YZ�RJ9���ˋ�,q3�l��t�σ�	aQJ:�MW�Z�rt�Й�gQCOMb��k"�1��r�;����kkE1��G�ı�'�+=�aG���\F�K��FD��N#�i�G����!��Jb�/��XO�{�,P��`uP�2��Iu�`~vN�mOJ��9���	
yX��}=��[�-��"ӕ݃_�=t�ӻ��H�*��X�/�XZ�
�����01r�w߉�#� t�q��Zb���:}Ó�
�FA^�'����x�ph1��i�aq���?	����Ƴ����)"�[�f��v�UtJI#9�߬�Q{)	���iQ����p]�&���z'�:寧��R6��y�&{n5f��]e8�nk ^@|�	�
�=�i�R=;ظ��S�b�b��ޭ����_N�\�&ۧ}l�-s�UR�J~z_k�V���"��� eD}�ѧ�K �5u{֝S���4ө=��+yE1�4!ȿ'R�0�C�E���:�]�����\B�ߝb2˺:�L�nC0e���k5�����f�;���Q.k�َmԐ�z<z���F���G�a��R�濔���34�V�g�F��٩e;�vwW�$���M�=��
�W�_Jng&)�
(������olK�$����侼t5�M���pɘ߈�cY�
��A~b���: �[��k���k
��BCRg^��)��5�����d[��}]�S��������-�~(>
��G�e���쳑i�B�*���q�$2o��y���l3/������VD�����Ò�{��z�Dڈ,[����5�(��F��!�l�Ɠ���a�D���R�9��{    \ݫ�s�D��VR���x���C?�g�'R��;�h���^V�w���l0�.6�AQ�|n����eȐ���]MR������.�.���X���D�A�$#�9��u��f�s�:&�Bb3��wnS�R5�2�C}���wG���	.2��&��\ZLF�
�H(��ߊ�s��� ����f�^|?�d;u��W�|FH�pM٨Ì�f��,Eŵ�O�$U����D�H�y�^�b���s�U�&	s��L =��bK�m�`t����O_>����j��+
�/>y+�W�%���!�������z���R�L唳��K��F���~����/���i�($el�sҕ�D�䊕��(E��"<���^� �F���36�%�x+\�{2��do܍'��2�'���U� :_b�b��1��'IjF��3I�n���Җk �8�������Up-��A/N�0!H�;�w��2�h��ujN���pJ,+��e���;}�I=x�}ȇ R���W�}IlȌ�m��gsJ�U
��_���˾�%w�Ϣ�a�NK-�
"�5pq-�u|��f*[�i�l��Y19�$I��Pc�A�[��G�,5]������譎ìf�[�b��Z0[/j$�ҵ&��P�Dm��jӡ������$�`�J�L?4�ӮJ�G��~�۪	Xf�f� ��P��0��d]R輷E�ٍ1ꈣV[�j����G�G�y�`yOy��D�  �Ε 5]'�1�������6��R+��)�R�o���$[�uh2 ���xx���a�������	�L��5ԗ�$N��~ة��ٹ�'�@�6�A��~��!`8V�Yg���W�{�'t�O�Myh�+���2S�`���D,K�k�&�匐���4|��?�(�(/���,s��)߾��-h*������l!d&���ZԷ"�䓫��?����!��#�Μ��{�>�ҟ��Тv/��"ϖh@���y���n��h"�`C�������k;>z�Jme�ِ	{�0��Ϋo��j*�{O���NC�{�ql%Ғ�R_�$9��h��47,۰�$�޶�ů��L�:��w����t��=�Rƻ�8�')C ����n�c�������W"��k� +{b����"�FrO����Iji��bN�\Ev�;mX�z���Bּ�2|��&� {��%us�T$y�>t���n���[��r{yY���?�������}�@umy@�^%L���g�qo���r�R�:�+�	2?�Rc��T�^��A�������7������?Dqkv׬��NѾ��|i]��t���%�;ReM}���j���k*ɤ����E��M�3��s�WN�g0,b�5{��dX"3�-�o�Q�6�D��,Z���<��'��ݣ�I�8�^,��7�Q��"8����$�[Ẁ�gII������z�f���}��3��H�Z��K��͑�0۞�2꼷�8X�7Y�xIa���꒑��չ�GM��'��[�H�����|Rz�
��\�Ŧ��Dz]Z̑`/َ�1]b�w"z-l�d�3��e��q�P���Sl��R칖:y�>W���$����2�!���<���ry(����H)m˥��G� ��B6OT��e�$M���\{�\��9ZPG�߱�}!��&��#���ĝ�^@DB8���2$Y�5yS"��;�'q��Kqg������m�B��`*6�x��o�����m}Ɂ�ͫ��A��)^>ʚ��X��vI8W�)�w8����}��\���Ur(7S�(@+�o$u��������J�$��A(�!��C��=�<�}I-BϢ�ʣ	{�1(6�$ύf�tWV�JT���$$������g��xjK@�(1��.��9Z?�9�n��՝H3�9���i�	Ki��C�������!���V����A�E�;�����a�@X�ϱ'��T����F�(u+��b�K�=��4�G���Mi�B��pJtpt�C�:��� ���
~�_��Mf0&���mu���I�����e��oE���hu�AWAݔB}��"ɜW�H��ҁ@�yw���Z��u�	|������7a���R�Y/T����?e��!R�[�
.���0�O���z���p�Z[eE�1G��Ci�#
�%�=!|6�c�Fi��g�ٶ6�YM�p�0�]��t/߷FOX|,��ܻ��S���J�%{LyIi���_񳁵W��p=OClt�G��h"J�%^�����_s�%�Nw�C��NvL�y9޶DB5����b� #�O��&%�Y�n"���;��g�2l�KJ��=�!� ���i�|���mcO�� �i~�g�Z�w"�\Ԓ��y�5��"U���� 3���L��n5�%!>�� ��b���xd����b�j������B����Q+�Sr�0a�cv����"���NV�Fo��y��>�_�����Jo�R��pj��V�<ҝ�H$��:Q)�L����2T�۵>�'?��vX˿RJ=˶Mj0B����`�J��$�n?�`kXs�Og1��s.�V����E~n��ՌM �lF=�=du��F�� �`� H5g�̶!`v�a4�]`=�H��t~k�G�j�K^`q4J |�v>*M�������8�@�)�	�)E��ufx��9�
�-�R�ގ��b�{5K݊�5�gX�}�#�я c��JF7�f����V��H���d��2��^8��+y��1E�|��:/�9L�����?���(��C��b��i�Z��w�����k���Q���u����jl؜Bya��N��ey�j��u�d;�3�zh#���h���%�E�,TN3g��S�\a磨�.��$��=ٽ@v�d��B�)ɉ&W����bVuˏ��o\D^�W�"ze봽k���'>����vnˊ�f\��'˘d�<Li)v�v����*�/�����7�9g������z� ��3Y3C�!�x���k�ކ0ۧ����
��S'���I�I��>�6 �=�c)Vù��5�����\[&���2��KЙ�3Y$>)�o��%��$�U���I����g1���^����%�u<�Z���ѭ�.���IP1���'�da�5��YH�0����B�&`Yꎯc��+R��]�S���hAnT��B����(+7�L�z2�w��H3��m5�pRD���ʋ�<�4O�l#g\�Kw"z�6�K����Sw�v�CM��N-�f)�����C&K����C4qu-���0���&,�X�T�l	=頻�$1�+��,������%�}��.���y�����kZ�F�Mѽ�D����6�迀ȭ���g�3Uo�<�|���/ �9�k�g�UJ�Sլݏ!x����-�~�N�5��|�W���a@b��? 0���Xm�����J��BV��ڄ��T��]�z�x)Ь��?E�j.����%i�-�'5U�qyr�cyuC���x5�r��(�+q���1���a��Ư��f�Wf�8�5�Ɏ��󩦽��Td]�uf�k�AY�v���2a��m�\-�7�u�cŲ��lK2O3���"K�&�Zϱ'��85("���ޭng���]+��Ն�'��3;�v>��I����뼝�?'Ae�V)�>�M�r��\حp=ѵ\_�G4���=d�Ǜ�-=�z��cN��%��%@{{�O�>�Xԁ֬�}�5�$"d�<��t�� �߲��$�V�*�U���dEY��n���x#\�F���j;�g�8�,QI�(�ns~�֞�ce߸�n�[qA����v���rt�k��l��lk7�X䖅:�����E�4#� E��մ��۽+0Vv����ݤqlZq��S�_�2ƭ�>��e-�xX ڡ1���R�\L���x�ޝ ��mrdU舛Ďr�'g�O8�O��3#�:��EF@��4�ʹ�k��zH�W�+�~�]RR�}6�{���QG��N���WoE�"�&� x>Ԝȳ���;H�n�P�eU]�    ?�ݑ�t�K���8�������T��x�A詇+�=t��h��{�7��׼�0��\3�7��/i�`#�G&E��5��O��y�׺���b��i�j!�e��]{6�U�Y��O��I�W��E��]�� �R2nnW�7 �t�j֎ݯ��S �U�:�
I�z^Suҁ���w�x���8i�@���Uw��W������ѧ>|,~¶�[=�~CD�A%rB���W��p2|%Svj�֌��RS�R�������$�H�%; ��H��k�F������6a�))�<����7�&o}�R�{+\.�� ꒢�V�,9��T-Y�+_$֢��;��
�QH�,k�0���_�Mg�'�YT��Z�?���rRfx���԰:v�UC�R���A�=�~�[��)�ӂ9���#͚&�C^�Vse�|��­m���Q6�)�h��^/Mʟ~�׮	���:��C${8�p��2[gA��=�٭����U�*����$+�Ji�2@eM��w�^��|��ݿ����>���Io��6�0j<j�rK����+c@񲎌�Ě�ޕҦב��Yl|�a���v��%$��p^vn;�?ٺ�nݻ�Pӳ3�Y)��w��P7|�C� 3GX}�kt=��囧P�"���A#��$�P�r+[���,u��&��z���tu��e��t�����WJ�0
y;�Ʊ�ٻ߶�پA�,s���4ke�]��
�!���F�n����^Y-LPc�S�b���x���lm�	K��w�(k�1'*�8j"�د�~|�@L�nK׷5��+.�珋��Q$q�Ǥr���}@�*Yw3R
q������C�/���J�q����6�ފ�5���l1��ڣ�Fe�";vͫ��X{�1�Fh�؝,9��Ъ���<��O\sW�ȏ�8�r�Ĭ+��QqQt�D�- �������@�y�r=&*5;>2\�P`U�}���3 ��B�"�T(�V�!`�O��B3�6��W��W�ݹ�!i�H�cg����lnc�:���eJ��p�Ф����ʂƪG#����idR��=��e49���Ԥ��Ò?v�w�uu�w��Is����)/`2�İ`����<�"�
�6�ul9�Z��+jv�+�LI��"�z"�a��e�p=[.��G��ȏh�T�ti94�d_�M�����7/�)�#-��K�j�Y����WԆ/��;�ӓ��0��}�0|id����l�_�'�o�7� �ˁ������D���)k�� ��M7c��`��$�m���r�%�Yz�]:`��<�A��oF�.W+���SR:iWM����7P�ucs+��A!�\S�G�M������"+M#�]5��瑛��h-p
�ICd·�o��V��5[����K�5Z�� K�{��qԿ�LpɄ�����	��������4C�#p#\�@�x�������%���H�Z\����d��Y�զ�38���mRX�缑�©aTR�MR�O����jܗ�eXmf+�Kt[�~�����U<�V�@��}��<����y䥋v+�W����=���\�/�jǡYi}��%�Pl>�<� �w��8�#8/��dU쏵֍d�,R �&����uM觽��O�hBw\��`���5�r�j��]'�]�o�GlR�@�pZ���WT,��by#��'K/���,_��8Z�툁�"�9�W��YGE�B�ʣ%QL�1��M�es���+ίf%�I�9�pE��v�d��^��լr����]r�vV�C��N����2б�{}���URoE�9��L�1��b����$���ԓ�K�W��9Ҁp8+NI�zKu������D\Z����0�2��tȈW��	�X�Oç��;�V�+�^�R����M���<S�rP䘔�l��!�?���L��q�q�)>E?:���&s�h��}gζ�`W7�,�
8d��"����������n4\�����`l;�M�y׿L�ݤ3J�ɾS�fA����x�;牷��$@�����˔�i�[ʣZv���X{:;��T={�󪠆�[�<����B/Cr��e&o�Tᖒ L1���ێ{ ���.�Y�7���4��y�n�O�\��w���.ij�rPUҕ2����gY�{��s���S�2�ض��VH���N�y%i � �B�{�1�7�E����7Y�W��1Ѭi���������K��V�.��] ���x�6�?lu# G��Xx���hҠP�תNʫ$Ɉd��W`���jS�Q&��*�@\�-T%�n�YW�C>�k&y�.y���$��Yl})5�	�uk�Y�a�`M��K0��j45�5��݅�ʉ�9�.?���X<|��\�Cd��u��M����5�]�3�]E9V����%�V�m)x�B6P�������Ƹ�gO�Ĥe�!Q��{��T;E³"_����Գ��³�Yi@1Lt2k���+��G��ɦWh���#f�9�s��E�U6�<�1�1�()G�)�jv'\���lC��Ќ?�ͣ٤�^�0�R����Sq:ݘ�f59����Y�F��N�[��4�<��]�֌2�����V�a�M�������$-��%\p+\�	��s57������c���͒ଣL�
m>5������/�4�4ǿs���.?�P���3����V�٫��E���d�$��
ug������5�޻'HRs�[#u�[��t7-��{������W�ͭ�>{~k'e|_�P
����U�6���u�G4��(�H�؊�ʽ4x ����B��^Fb$K���������\L����r�P��Y RU���X���U�n��9��I�rL���`��Ɉ.&�
�5ԋ�	����1&V��(�ŵ�_}	N^S��!���&)�lR��s�������èY��qZME��:�7I�b���*����RK X�c��Kܬ-���@�u9��Beޜ�pł��(/�|M�m_ ?l`u"���[gk�-l.���W���d��|�v��YW��s����ͻ�T"��j���d����ˬ�VD���5ǖ�>�!=�|�1����/��e7L����AZ@D�J�DF�?��tH�7���ݧi��C,4��{{���M5�x2��n�ie�C�|w�o�07�oo�b瘽t�2`�ơ��X�VD��{�j�|F�);�h�I��P������m���r�Ҏ$���(Ɂ�~4�:�K�,rPr��KZ	j�(W��Y���r(s��z��/뚩Cc��^/	<X_����������h�+�{._Sa7"�t�+��F����������c!�Z��9��ٕ6��F��D����)Ζ_!z�E�ö��=;��X�ZX�E�u��d��k?MIO��
e:�mv0��ķ����٫��V����@��:H�U&�� ��@@�ܮ���X���٪MZӆ��A�2`��PB!耎�����I���y_a���9��,�ReM�����?����Sp;�"���̦���5Й�7��^�[}&s�Fc����ݎ�{�
HQ��W����]��Z�jq��NͿ2�/��] �r�޼��R�'�4��ЂW��(@r�^d ~�����} ����i�Y慀��R)�a,������?��ND��ܻG/ӡBx���Q$��!�W-�tj/�jfQs;{ձ�)���ɗ�o(%�i��X֑�اsw]�n�:ڛFV���4��6�]W �-HC���FW_7	�U������5�{'�O<��-)3t5��B�<<��&��g��)1	)��2A�:z�nVy5R�ٿ�y>KL5K7��9 Ѓ�S5a���C�d��l�e+��Yg-fCY��?=v)��	��`&9ڱӱL�G6��áJ��a\˺�Iz|jn�Vw�^�S�4i ��uH�� ������C�-p�4C*�/�6��>����))Q�Ք);歳�����
ן)FR����:ɛt������W�����e�
!�RJ�&��rШRv����dY-/Du��0��r�|\[�^�Kb.;�Z�#/	�S�ڇ��u�z+\OlW5י���#�0xr-@�N2�1�:1F���U�K�7�    3N��^������Wc`�r�������.k�i#_i'k�V{���Z��ć;h���[�z�Q�>X{�9` �rFɲW�ɂ���+���k&	h����@�Y4)����B�K�
?I�"��@�c��<>*w���4�|�H���66d���n{P7�IQfM�L��K��g{lV�7�z��loD�yH"��,nP�)��urmV�yu�Q� ��rI��&i�Y�e��J�����a�q�!��|su��=6H<�����xySԱ]�f~������N�|z4�\�+7�uu�-�r��R�������#�w��	�j�	��e�m�����K5rt A[��H�<P��A�S3/5�QZ�3�GA����`@VW��e�j�T�hާ,�j�l4N
�W_�l䯲W����"z��5@9���S�A�Z������.}��/�XI)��^��Y��f��˩Q�~-�p��e-��N m�J��a00� ���M��
�>Ӫ���4�C�>Vu�l}+\OaCR���.���]b8�&�r Z/E��E@��Lp��9��>F��2����w����4zhE�O�aR����|w Ԅ%-g��v��'9�J:���e�Z�����p]8kZf��o)%�xPB�]G�/��)�J���wy��3SM,��T6�O�m�K���[�=�&�̾�u��G����!YylkS�{P��>��w��˃�w��畕������}c��R���W�H��e���d�|���K4�������u�R웍�Qb���FB��2��`�&/@*�aJ_��tE?�,е�Fhz���=yg�4�|�ً\dYH���I(a'�����?���܊��ö��mR���d�����A���+���&��Z''����?2;��a�So���	i�v<�q�l���v5P�tH�V����
Rr��#�Ά�uG	��=�s:v}�fȁ-lC��� �W�­�>ݪ����8�V[����*��k>p.�\����0z���UdVge��uc�5�N��v�601�x����dM�4��=>JW;u�[��Gx�(^>)�����dR�MZA���,�$���dþ�Dz+��u�h�c9L�+"�G�d�$��b�Q��]�ɩ�H�h�xW
�[����e��1!�&��|�$�B(^����,��
��Y?���T��ɒ�6��?I"ɦm�O�^V��Ou{���(-\>w"�ri�n:#�"����Q��I#���{{���hϵ	u���K�έ�eAe�i��!Jp{��S���]�Z/���|�
�:CXE�N7[f���6�=X�ߎL��5�5��!JҘ��Et~+��س<v��>O���y��IjD.�]܋tFw&])�v6B����2ٺ���:������K�d��5}��5�h������:�)���� ��z
L���l?���J(��u���f��d|�=��W֦d�׸� �?K�`��+U����^��4�w�N�x8�ω�ӅoY��˓e�+�Կ����_��!+�eY��IR���@�}}������p=/��%/�/-�"E�q9��d$�
l8�))��Z���lI>�E�n�6��B���̗�0k� ��d���]��wѩ�&���T���|w�*��}�ך����l�]�c�I�K܎�	�����ծ���h�RJ��U��)ڐ�wT�U^��;w��4H���,+� �K���� ����R��>��F�,�z��gt��M��Ieagͻkx8~SQ�VD/Eq�K�e��V�:@����T�m��_L�|��[��C����q�rkm���_w\QF&�P�D���#��>�� A���u��2]���/��*�j��s���|q]��
�+�����C�5�я�V>,x��Cz�6�� ��&��FN�٭�4)���;��mR��Ԭp{O������(�8xE�T6��/�)����S쥕�Љ�D�&�P�8���]�����}�nE�9�a���1BYG��x+%Hna-?�B�}9a��ԝ�)��Y���kP�_˺�Q3)�Z�,Œ=(���*����]��˓2ؒkt�*�k�d�N{��!�kl�V���:��يRn�`����>�l��k�W�j�{|�st[�$v��A��ZX��~��QbP�o;%X��!uI4Q�o���-y2��r�r��*_	�p�򅦭M��0D��=���V0	����/F��ٓ��A�}����{|iqK���~�a7�$��T1>Ş�-�d���5�N��;�V��֞>A�w(�/gڇ�į�[�z&��7�6$T�; f���̬f�A���sf�%� F�� �����5J�+�d�]F��%/=^;XoY���]�1@�(�!�Q0$l��g�S����uvt+\�5���r 7�f���t���ڔTv{��9K��ڢp�ʄ�N�Ym�)8�Ӓ�
�&�;��\Qr/�]'I~�dksm�8�<�����h�wG�u8���@�1�� ]���XV��}3nE�����U��4���5��.�[Դ�� ��P��2�I]:��-��8�#KI���N��G��Z��fK��;�5��d�pU3�!��������#Y7߽6�G�ݲ���j
M+�S)���������~+�ϖ�l����<������������t��p���"{�a�N���Yյ��:�u���q���}8+ï-����)�8�V~[�.(hw|G��nx�}xF�j���?��E�];�y�5Ɋ�~�M2h��
m<W�:��S�f���۱$�oW���x��Mr/�X؞�2K.��[�]�YP�Pk+_��wK��^�=Ɩ��an������:뱶, ����4��ڟ;��Nh68��Lu�:�Ԁ�@U
Y�u���!4�!T�o*���4�5&��	��ǙEO��>��� �yߨ�䤏����N�.��(Y9��$�P2+|�'p�Sj�"{)���6Q'�d�|����H}��x�˦�Ty3���7 sT�D����p��Vr�Ff�`��(��܇�ەio����P+r��1�]�rk]$co�\���}��>T���gں�Kv�a�_����˓���^��#��.-X��m�:쏫H�m���QA�TN�aM��:Ҽ��Dǆ"ߣ/a���o��Nj�f�:�R=��������i�r�u�B�R��zj�|��(:��R��`L�n`7�����x�i3]+~
[�a���jŘ?�j_l�V����J��7C'��7oe���0e��m6�Q�-v�>ɟ6'p�&�}���6�y����ݒDݺL]�ef���d���m�9���P�̶lHîh`���_6ط���4�3+��l@�}7��Zg۰�j�ɖ�JZsl����i���iA2ȿ�y�l�&q� a��K���]��)��lN��KG@[�	З�C�͕Ow���p=��Q��.u��C�8b�R'+/���r�ތ%�9��x!Oδq�_�ug���n�p��1��I�0К.�w�vĵY�r����K��h�~�����p�N�^�FV�?��@T5�C��$w�]�5G�aW��eAQ]�m�v�i�n�H�F-�ڞ^�<�ne�.�!�t�d>ʓL�ŻֆG�޹�H�0�w�\��ڳ:n��-�ԓf�*o��ޒ/ͣ�dX.;5Z�G�| �6yO5@�	�J����klKvB���Wԥ����k�&���<òSW����\���[3n��l3��L����jy�ɢ�X��Q�8S��Ym�)���_� w"z�G���i����G/���A���Ͱ9�o�[�	�r�<5�=G�%�"�<�|�:��h�co��Ńj��֩|�����a�>S{o�۵-��E���
�u����q	��	�Ӻ��G�6Q��쥓�ӹ= W���_'>�'�ǝԤ��e����d��p��i��<G-�W9�(Ճ���E��%�샼��~WE����� ��1.^�t�8}���BnE��`3�[�"Eج�9ϛJ�~ɞ~�].����H%ja[�H��C�Y�<���{�v���ˁ�8c�m�����Y�R��߮��ʀi�N��nz�6�w����Z	q�1���N$���[    ���Y��nE�J+S�3�S��G��1:����^i��J&3�������j�×���,��A�"�lS�N�g`k�a���clj᫅�O%�d�!7�4�zw�����ٚXo� _$���T���8�|�݊��j��C;�(7#�h�9阝�Wr/��iܳ'�o{�i�N^��6� .Қ�y����[|>�'�C���>uS�2{L�F�ݺVzr�����=խp=��&8.�z�5��3���l���dZ���䳘ӷ��Sw����!���\Y��.��հ��h�;1%�A�����
;��#�;���3��	%3IU�Wb�$c�� $���~�xߊ�e��� �1��<Kh.����;j���=�\%��_���
������p��[3�.=��4ʐ�[2Cb��/^������W�id"<\1���u?-pui��	ו�Ӧ�m�z�\�j�3��͎2�@~�֝�Phy�W���ij�\��u����k���%�2s˲I��%��~���Rt)���2)�2`lPg@�������[�z�,���0��%�d�*�����:6�:�C*����$��]�����)����Y��K�(�����������9�_q�!.$7���é�r����H����������'"0mjJ>_� ��j��h(q��|ΔxMo�K��W��a9N'�*ĵI)l�E��\K��d�u��!�V�w�;�Eu]3L��w�=o�뺄����Q����m���ٞ'9�J�T���_NIAR�1֍�����F��qS�]���hq����ZN*��5dŕ�z\�p�3�����V��v���8������Nn�'�����_�M �=��"���%i�?G����?��q�gy� QCR`J�v2��b�k�,��X�;,'@�z�M�_iͺ�k��e�|4H�v�;V���~M\�kJ��U�.��� E�:&��<=~)g��|Q�[�t�q&RO����)���Hiz$-~~�:5���������uqz'\O��s�9�=�<
_T�;��f���-g[���I���7Vl��S����N�7V�P�`��-Ψ|�h>����F.�Y��n����)�mi̜)�3�����Pk�o�"�F��%ot+���8��x\���.�h���X�W6]t����-���lщ6�0��,������-~����L��,�^}��F#��:��V���㱶�(��w���7*(ʐV#����}�;��!-���;}^	��^��2���Tc��j�E�_��՜2.f��,e�y;2�+n�������ȶf�S�d�v��G�����^b��H)V]�N��������N�)�;������wx� ��8zw��lH(K��h��,`%�z��>�����+ ��ԏЪ����A(����ּ����&�����o���e>�Z���;Llƞ<�)R���nHY��^?�]�Ǣ��[}�`�R��sx[�5�x�dK鹼���#`8�������G�/�|��&��q>&��Q�c�Cu�{j�ަ���9F9�F��V��l�-�\4 ;>ܪqy�
�3W�%�h%�2�A����R�9����#���\o�Yw!6��7�j+�������쀎����}'�W��I�G���Ё���塑s���S�{�9	�W
S�����&�D�������ND�$W��#r;�xD�Y?�!,Sw+�PJ�_��%����aC�JT�}!w����ڬ�p@
ua��J�J�d�+��,Ə��j+�B�H�y7��wO�%��SW�?�;m������7�_L�VD/��6c����?����m6�T*A�l+�pJ�g�Vz�Z�e�A$2�$_-�Y���J�]�d������4�x+�0��ǻMJ�_��R�h`%ȸ4��MY�s�Q{��[�B��v��l����yֲZ��mٮ�W�WM&2${F�Q��/X��2��3���0��/����
����W곎��Q��v`��q?P��6ҹ%�Ô�o���+��<Q@%�i��K�$�{��]�|n�C.e�v:��H�|Lk�.���Oh�i/5���rJP���/��}����/F.��(%EVN�P���.����p]���	�c�1*�:�5�Y��- ת-��H:%q������2A7�C[ΰ(P��Kl�$�#P��=��6��c�b��#�Uj�
��w-^���u�ԛL���0v;�v�Gխ��G&��)��dK���1�<�_��s2H�%�ï�96=ؤ#NK�	�����.�j��9�u�d��ad�@r�'��Oνr��p]�5�����6^�� ��_�d�Cm>��1�Ҍ��|���a���R���W�_��l�Ɉ�d�B�+η�Q�>�����c�"xUA"�|��"��w�(�F��F譆��r�Ӄ���׹��nE�j��[���T���{�4j�iVϟxE�J���[�Q��½5�:ٷ��re����a4	�'�!ْ���CW�#<�4_�&e4�F����W�9�N�ۇoJ����	�5��s�3�ʣ+z��Ý�>:��*6�Zw�N���iI3Ы[_�~d�xH��U�$��FQo�Q�d�i�����]��H	(z��K�cJ|��.�p�t(Ww^:�kÊ4�9n=_Xؗ����>ϑ��k�lu��d�G���Q�|�����O�谠�%���nUgMs�F��~ e��r�e��dH����Ǹb�O n	�$k6>�z�o�F�H�T�5��5;�$pM���O�����#�o��^�ڷ"z��-)��§�?��`a���z7G<�+�A+?O8O�p�<�[ϻȦ9�u}�+�H�ԑ�u�BDe070�$�{?�=L�a���ί 12�yM��'m�O{b�����q�,�ma�ń��&!/):�X�)�B�T( ��c�]�U�&��%�
m<��1��2�4j�0�Շ[M� �w/`������H�>�s������V��F�ll�um4W<f?*9�pCZN֔��+���~�5aVÊ�z����|8�b9�Q�3)�E�sDR����؉d/%�M9�,E�o���o�߻�چnʉ��0o�g���B�p��K�A�5w�Ƀ����A�*�Р���.�dM��ϒj�I��#7��������s){-��\I*5IxU#���ӌ��5TS*�.�>��HI�ü�j
�����O��۲'3��r���ؗ�-��w'�����3k�|J�ӲU&Ű�1cֶ$�+uQm^�0b����QM�-5�i�Z�C��hn}k�~��E/��wɞ��s��v5�]�7I/x+������h��F�"�R������W��ɢ�E"�6�Ѷ)^-�b?�TƆ��X�{tA��Y�r������ձ4[�{����<bXV��/#��~�GU7d�T�b�>c�����>o_9�����D���5�ȴ%AH��5���Ή�5�R}<�KsHk����������E��$>�֣V�d�-����_��4F�&����B�N�S�r\��&��p]��iZ�R*A�C�*��z	Q#U O��p�U�S0�.Z�R�jB���T^&L�<njiKT~�����极�2POqj��ͩ������Z��&K�?Tfc`��5,`��m�7�/��[}�7B�ĩ)GQWC9j[�ȣ�,s����֞#���*���K�hKnc�Z��%��=Z��|��2���6e�����o����E����u�D���`yEr���h�ח�ޭp]g�`1��;6��,��IR���B�&�:�u�Y�ö�A�[�QK?��Y����;�Ԑ��5L�˄��+��b+o%����,͔t��|z�a�d~,{�Mũljy}�R���xu+��1��;zهoM;Pc�{K�\>�ν��ϵ����C��a4�S ���`p�g�P��E@�a��ê$,�b���G�h�w��\��KE�L�Y���̑�L��#���.
^�s[�|�\b�w"��M����қ�ѧ��ݱ�+G�N�؇�rgՐ�!��";��    � ����۹�ȭ$M����p��"fq���,R���p����~h�Je9#��"��t&�#�����muk��k�%gИ�f�|7���K���A�0��>%4_?ܣpk.>
�m=�4����G��{i�\uJ�0�p��x�����>Suja��@͗cܶ�MZ�?����6���X $�f�|���V���k��)CͤNm��]-��քȿ����zV/��|���{�G��e�έH4A-�/�*���%-H��ޗ+�Pq�i���n�ƭ�_����?�<�0�z�LJ�9G�Y��F�dw�A�m��]�Bm���96�
�]� �>0����>�k-�iƱ	�+��܎��ڲZ+7���� J,"mre�]�.=�@M_��	a���)�-�T�� ��c�x}sQǎni�t_��";��ͻ�Zu�6�;%��-�5�4�ʯ�����ID/�����T��Tg���e����1��[N���AF�Qq0#��ճ���?!`9cj�$�a�I{KJ�W��0��ZX��2�˝�Xר��K��H����e�(\�uL��v��쀼��ӏ�aw�>]�\��'�}A!�I���"�3�Bsϟ���'+�9�͐��Y�Vm�œ�����(�'�X|m̩��1�a!����Q����,������ݲ; �9�n0_������;��d�5�	���S*���y-�î�0^�|wK /k� �->�X�9���m�\/�3֧e��x� \� F��JԽf�w�š��a�89A"���2$ή���y9�,�D�K��/�ёS~),&��r��j"�oϽ����>r�;K諍^4��{7�i�>Oϲ�1��{ L���@��Ɠ�������W��{u�Bp��c����(gW*v��f�X�|\p�������R�5���˳Pz�3� #�M�y7_PU�R�����1� �T�:-?�p�v=	׷Ͳ����=��,�2C5�p�6��,���S#�@�V�9X5�JƧޤ�*ɣ|���l�)��Ț�!�zk�����Ґ!��!�� x]�܉U���A�,� ��H(�S��>S�����E}[�<��MZ,[�pH� ��C5�XѪk��X/t��IB��/86��m�v!k�~Ja�ǅ��с�:Q�2�����QO�x�k� ��cj-;�����ǧ5����'������N�{{�����)���띫�SI_���[p�۶��#��_|���=���lyY��D�0w�a�@86��[g��?��kO��~W�*� ��R[*nɫ���u5��ƕ@�GD���5���d�*�7�� �֔���ORI�q[���ZI�˄ �NE�����T�Ȫ���&)Zޚ}9k�(ЩwGå����f;l7�������w���pݽd���;���~�j��(Ւ^@��+��d!�������KR��g�([]~?B�ϝ���2TqlpG��֌��P݌���O6�qX8��c��twmO�C����[5�I��+\�FW��W���=������(��׉�+甘(�.��l�>e���2�ڥ�m9��eT�c Wm uRe��W�x���U|���cI$���T߬N��0ݻB�(\wGMIjHd����2�w���2r=�'��{���K�T�iX�a�̘��u]�Oh�Y�wȘ���h�-G0�ufz7�vh�3ը�6��h�)�t�ߟ������{�Y����#�aR�'G#�����SǗ�._�)O�$$�D����6U��Y?�y88�Kr��վN�@${W�X�..�:G.���:�M	%kK�&���[��G=�A��4�Hw-�#�Y��I���k��־�Ť��L�c/�ƞ�0 Z��� ���~�k[�=DW�(M��n�ijY������{�%�給�j�L�0�U�E�]`���p���my�Xw"��γ����WH�Zw��[s�ĥ�Ų{h������&�6�}�J��,/׼t��0��\���S�D$L겲q���q����n�ڈ�F�z�y�R���*��2�7�Y����D��K�,A,htI˗��ԍ1������W#p��n������SN�M�53�7����bG�?���hG���(rͶ:��I�]�a���1�*��.�64�<�����k�$ǳ|�g�g����S."����CA��rO�P>g��zV���1|�c���_-�z�Ѽ��*)�|�*���#�L�ZE�U���Y��W�Z{ɔ7��S�o�ƿM��=
�V��Լ��T��V�
���Wܦo�(�w��!�ҎTk�����y~J�B.W�ә@s&or��$��:`"�ӛP~�txI�Er+]�s�h�2e��E�jx�n��l`8���L狤Ф?����'�?
�]-#[ ��T��݆C���KG�\̟��O~�f(��i�}��ʘlY�=X�O��Ô5�.��۷�В�c+�a�g�]1(I~�%�z?�!�.c4���.���=
�=��7�e*�nS����^�a�2*I�n�+g#��i�b#Ů�+�`��8�P���%�;�v�w�a�Q"^�}w�b��d�\�tTa~�����79LX��A~���5C����*�>�uY���<'��N����v�h����2���;J^mq��ϐ�!o��W�5e8D
��{}��Á�Js,?�`(��E��e}\v��5��ce�l��:�h/����E�V5w��S�8Xn����Z������×w��������:+�*+
x���GA��`鍚Ӑ�F�2���~�lQ�YA XC�����췛�}�!�׿wc<��=Z�ٵd���{�G��N}�Ah�b�����;�ڀ�A�Tu�E2?nW�������FWY�[-�e]��������&e" 4��m��E��F�a��G��I�����s�!��Pe��%&q%{�cwN(t�4�v:3�a�y�N�s�_�)RI
�m�S�	��d�G��vw��4��V���F�|�*_��we��S�j<]N*x-��p���+_���X٫	4��L�P���vP�i��x���Ľ���!eO�7k�%>�Z��mb��H�bR�Ȯ��3���5�):+�L���ջ�mR�ԝ���'��{�1jE�Y�/D�V>x��&p�4K�}T��Ɩ������+��R��LʖD0�=��� ��*�z�J���� B�ynV�,&�|xw�"��W�"�;�H`���~���J��ͣp�߫��μ�!C+�:�ܷs����,����B<�S@Gt˯�	5yX�����F���#ˠC�a+�,���sο)��k`m0SU�d��&��iP�]����Z�{�.��D����c��B� �B�T���S�B�&Mh&K�dWSK(<��O�~Uy�ތ�ۘ>���;��|i��b�����4�,��^Cy�������VfhC"���ݺe�����ME�[¸����l�@��0d9H9�����k�gSVm�2�yмi��I�i������)���[{�=�V^�ջ DҜ�e�V�T�4EB��x��R���Q��[��-�����V�yF� �P���Qs��\��%y4OJ�Q
^?q4v���&@>m��XM(������{�:h�N)�Zb���n�A�~K~�Q�nѤ�^)G	�� W����v��k��M��l�%UP#%^�?B[�l��8���sK���������� �2F�R�i: ����Ow{^g�����f��Av?B��i��0���H�c���Z�Q�N=Y��e��iJr!J�eW�?.��K^F�֪+���c��^:h�mM�ݔ���ݔ>�i�^J�u^����W�$\����XNIlPZ�^���û��˥6ʎ?!tK����L�ϲaѭl	�֯T^&�{���YV�u8S��M���0�s�(��2��4R̨��\�ؖ"���u(��3��6`����=��wCb��� �L�Z�r=���^`��WXѝ3.�;�:����f�]��t�G��a�V�6 I5��EJ2�l��q��þ#-�z���m�0�b��    �0��G�zv�ƀX����G�uC�!);_����Vb�ƪ�"�U���'�~m@D�$'�Q�	��/�g��9�Az>
�g$6��k�D��e˖���w[�6���A�����bO`��7��u��(���Q.A���� ��	��$�0��wE_�2���ޠy{'����~hH���a#��D�:� [p�m�	��f��_�h��*.Fޓ��%V�R���W�O/��>kD�c*�Ds������n!�^�8���-c���x)|�o5w֏f��|�Ri�w6�ݲ&�Z���_/��5�Xw�P<�[o����ց�kBm>�?d�I��=%y����xT�"ظ�+�d��%��ƚQ�s~y����f��"cب�$��M�}$K��&\��X#�{�ӽ7�lf��-9�wo��n�s~]�8��N�����=>� �9#�^�"z�մ)���ƓU����C��"ꉷu�>�K7��u��8��wY=!�Pf�|�v9�
<m8
� �')����Z����z�@��;h�d�[co� �:mm����p}�o�|H����@�4� �Y���I��rJ�ny*���&�@F�5��_rOR��'!�<����s�_���/���eV�y/lpP�b����]"(t�Ғ]�\��!�7�� m���x��'��RL��^#�Z� ��C��/�q���"lPz���_w����ۮ��.q}U�s�^��s��R��9A[��:�}���Lu[pÖ$;�	6��,}d��{��z}������`��g��새޾��]+h|��y �,۸#�iڮ��[M)��甠��aB��r�,J��/��C�%`�]�%�9���n���GQ8\��-�]^ꥮEj��/z�&��r��R9��r^�Q�G)+�F�/��(� �_�쒥�=B����)��h-�o}�ޞ��6?3y�:�`Q]�0TN1�IV]�E>ݺ*/���Pl৽coO��=ֽ�MȆ4���D��-���'�abH��@�D�����X��)ԣ��-J�[��9Ƴ�ruH
Բgt�}E�X[�Du+z��hVҡCﴮ��:���D3�t��`a�Fb0}ǵ�ܼ�Y^���y�,�f��T���x�?ݢt+f>
�}}X�0����\f����ECjΡ��p�Y��m
�x�W�ޓ5�l�:�%��R�GN��F�������	⣀uփ-�V���U����ﶨ��H�����ϥ�eP�rD���{|��s�(sd�G��n�I3�$��ҝЃX�ս/��R7V�� ���$?<��X�t�����v]������e4��"yK�u����\s\>��oE�'��v���^+e�{	�;��C��$`g��w���F�)!ǡAz�����$�(���$��F�̅��H�:�5f������a(��Q#��9��-EX���	�=H�(\���vz�l@1���EcmY>};+X���aJg{���^��V�@���*7�/���f�w'��4���EZ�~�=��F�R���PT{tp��t���-������Ksm�`j �LO|������|����2`G�\>ӫ)$�k��b��ܸ�IS�p`��b��<�l�t������m��P��$C�u�����{�)�b�Q���Z��ԑλ�Y�� �+J슊���
�	Sƞ�8��F�oѓ'����m]R}�u�M�uyVZ *��yž����=�ޱ,kH�J������˔PV�s@ۭ��GQT�V�ݱ/�V��J�8�2����(�3r9�}B���JYNR6�?�����?��=�%T`IH[*%i�+Oxj}�C�5���ZO�fܤ�Vf+�ճ6t��~��0C���#�ʗ��@uP2��Mz����H}�X�m�u+l�:Pr���=0�����j:s��� 9� � 5>��6�e]�-�]Kβ� ���Cb�EI*}�����f�����*w[�k��Փx,9����(����Ʉ�?-�2J�T����J�:�hk�/�-9��8M��E��ج(���o�!��E^��;�Z��ݿc����[.�8Gj)y��$  �����N�2~��F] �Q��@jL�>�⣆�B/��lMt���$��f�۽"$�]�ê�m��=Q*��i�~��QD��5g��蒺Wǔ��W��D�.Բ��g�֑D@;Cćs)i�.e��?)��p�/���S2��j���	7�ݳ*��!�g����rx���J:��t��ǚ���j�Hܷ��CV+��X�iю�u���		1��V�zث�5`O�:����ooᆥ$u�z���6(�2?���K��d��T�r�~�N�(��v��:�n�.�u#h$�.Eת����r��ϣ�~k&i.�΋��C���Σ��Kd�����C���Ϳ�e *>����S]_Sx��dV�8��d �e�}��GM��W��Zu�(�T�"������cL�Q�Ԃ=�b���o$��x�QD/nT��}�[�IHB/,{����{c�؇�Fm�`:Y�W��A!U�q�uď�N`��ҽ̹�Z�Z`S��,c�n��-�"_2"�	�H�/Y�?
ם�A�n�~MB4C��}���2��]+�]03+9S�0Qb<ENo�k�z��orRg;I��3��丌!������\�#AŬ���ԅ]#�����7�tRtd3t��9���J��W�u�k僈�1��є^���i�Q�A,):uEާ)9�#�4GwE9�Jl���@OP�����P zuIC��k��ek���7>����D�k�5�>������������=E�U���ۘI�����Ͻ%�E�~�F��#n������������e]��'fK�bL��RÂ^Y���J|���ԛ���M3��a���9����x*,����Yr��EO��<ۻ�W;<辇ҧ�ԑR
k����k�{8�QD��R/+�q?�|�$�U(�N���]B{ž���C5�gX�������_r�<LZ��E�0r3����\�[Q<޽�C3금����!��
��!����T���r�ș� �F�z�l�o2���H�R�����Z�d��rt"����SHD{�*�$�ތ���}���2���E�i������`	��=����Ν1��j=q:T�j�'�ǔϴS�w�$���C���FH+�8�E��rnp��ԶOcr�j]'�nw�T�Q^:��:
-J7�%ʫ5���[m_�έ6�9@+���X�M���õ�;�"���vᡴ3yݹ�B�;Op6$��)��	�"�fmf�3�.��R��Y�<ܩ�R������BQ�<q�J�X��b�D�����E5fxA�ϲʋ�<
��(�ٷ:x	Њ#���8� m�Ȑ�����S��J�"9�p��vM�x�m���;ݢ�uai��!?�L�	�jk�;�"�B��DB��S��!�;���Q��,�Q������3:5I�@\w�u��c�}�y����'�lt��h|�r��c��?��s������!&U������W-c�Yd��$1�Ɨ���a~�n�^�����jS����-qH�Q ?GmѾ4�j���|PKs.r�_�s��-����@�㈉�a�n�D�O�f+���w^d�"׭wGo�q�?����X������â����p}6�65�ԫj���(���b��Ͱ����D�m�Ѝ�ip�=P�tiX���z6���X�p�T��@l~J�{���.����=��yESe�"�g��%�!%�Ϣ��k�I�nU2E\��V���aױ��-dW뭪R�Ym�&��g��R�z���(6�a~uPum�O�Z�O���(i��;���YmF��	�I��Wyk�9��2ꥭ�`��ò�8�U�#��f�M��G�^�~�@�:*E�����1�1�$��.��˘�O5R֤��\�f�J��[��4Hѿx(������i���K�f��ݱ�gUoȮ�C&i�G��PI(3�?�$��_zM���yy�X~�s��|�5<��7hg�����u�7�7���c�7���_O���;�$
)i&�e�#��p���Z�~5�:u����EY3� �  �� ���eȏ x뫎4>- [�	��f�G�P�C2n� [�۶����+����%�On ~9���e���%lhJ�����ss� �:��F1L�O/��1�P�h���zv;�r���6�۳4�@��I�,�<�o}j���F�=� �7ɶ�A�	�%'y�0�!;u����t^dj�H�u��V�7��F3�W�uk�䭵e��|]�<Y�� >��mk.X�!�w���u�Y�|��dC历�#qkMk�Q~�[�AD���%ѹ��?�>���(`�a���+��4��}S�]�y�Y��:	�Uj^ ��놳�'uK��L��<�����Q�a��T�F�����%m�O㔫R>
�ݵ��N��c�2@�bl�Uٺ�v��
�k�����kTͬE>��w-<���`��<�}��;�� /���v�iْ�u�2^�'D�YxhU�ژ��N��m���(���c����%�2��eO[⾛m�x�v��%f����b$X���u0��n��Ȃ���Y��}���m$U�ho��)��{���c�𪽉��p}��F#�{ �!8.����2��u�?�� �:|_2[Y&x_ȼ�Iy�Iએ���ݾ$�#ґ�ً8�Q�G���^S�_��V/�P��m��&i ~�C��q7�?	�7p�r�Y�X�ꊖǻ�N�{�%�sϐ�x�(�:;�"�4�Vͼ�z�ӗV�3r�2$���&�'���[���Z �C�a������f�4v
�]wI6�v&sY��f�$gS��W��n��'�)㎋���m&;2���'�� ���1F:}6*5�F����42Xj@N�ڰE���-l�fkj6�N���s*�oȿ([�@^8n	�oE��=��:G��`.J�/%]笕d_����-\�QDo�'y6����n�G�v����i��t,w�ȍ��[�p�4�JS:k��/݋.�� q��a9> .��~>�'F�5iv]$��1(���m��5�-�3���:��5f���]j~�q;xߴ<��wC6��c���/�bw;X�Ҋ� sž��0)�ݍ䥀J� ���kf1�4O��֦�[p��I�	���}�[��a@tV�G�:43?K��O�M���6a��	�� 9"H�ǨQb�{Y���l[��@]�%H|K)�+���ŏLJ�1�*��k��s\O�������K�M` �Rp�>����;|WX�嶁Cݤ,o����+fWG���!s��ݟ�����?��?���!�\X      �      x������ � �      �      x������ � �      �      x������ � �      �      x��}I�,9����u>P9)��u_�#P�N���G���3�^�V"3�wq�A�*B�����vqA}t���:j�?�h9��2��sX�xW�x��F�G:m�l����On��Ͽ�������	��5�����o;B�gř�H�y�ǥR�k�m'����8��Ke�*2\�ZG]�i����|F��^)����+6A^WlBH��zr:�ϵ���ݐ��^��u�;��p��hƇn����Kii��W��O�_�	�bۏ�g��g��E��;�5��V(ɟ6fn��w�}s���R��Z�e���Y���O�{�&��(,��i��ځ�q���.u:�:s�*��+��N+��Y�KA���ť�O_e�+��R�}�&��M��?g�"����H+z7����Ra��6\�m�{��_��$Rv���ac�]-��� _Wl@��Y;[Y)�M��q/��K�|O!_M�8R՝>���n,|W�y����z��~4���6bF�j\������Ќ[l����hq�+���n;0�����A�_qx��֥�_�	�bB�'�Kœ�e{�t=Ö��gn�0�s��O�p�Ά:nLQc�{������}�&��M��9�칤��;�D���ϭ>�s�v�Z1�\�
���V�k[�E�}�!��%�'�/�y]��G�g��h!ѩ��\M�E��)�0���2�p���%��U,W��l#gś(W�g�0A�FaA�(r�C�ne�X�q'wr]҆ԝ�5��{q~nkdq#y<?O���U����&��(,\q�X�x�N-`2a��k�ǧ6R���x�%��'?�UmX��+��^�d����UX oWaA�J��Ϧ�϶��g��w9�+��ߕ�!�{h2�+>�$[Ev�j�Igl�����>�)�q������<p�r�_3�^�U�3�:�n�)�'�6�/?r6�piOFa��.؄-Q�P�}�(|����;x�@�TR�j���kA$E$�����N[s�r�ѿ6A^lB�~��
��ρb�&bt�5�Q-���y�k�=�|vDPx� Ǟ�r�?s��F��'�]�	�vm\[��'���� m`"qjҢޏ"��G�/V��,����E����W�?�/z� �+6!@�:Z��2I=@8��
耸CAdĒ�W�~:o?�0��&+����WjO�f����g[��H�tG���kG���c)�[	ڳ�~���M��V#� {KZWk�SK&�۳YPKx�'L���<3��U�\n5�ZZ�^:#�tp>�})͍�XZKo��5�C����y�%B����*�4�ǇAPq1�1�ׁ;�]��{ͧ�n����c�Y�ڠp�W�'�0A^WlB ���r�F��'�^Ru;Ƴ\bK��늸��N��/+�w,�V�j�3p?�S� �+6!��jl+T] u�8LDhm�n�UN�T���?���A���']�t��t��RNb���gl����G>�@�g��� �A��Pt�&�.U<����-�W�
a�|Dh�'F����]�	�fml���!���.����A�ki�=�����m��b�W�7����2��N�����y����`!�e�tƩc}
��,"���4��	A��������� z����Ks����7@�D��G�gvD:���Xsdw8�(��V� �Z;"	%l��%���f(����[��� �+����I�o��p�
rI��;I+,����\�'���!AAP����μ�O��&��[�^x���v�����@�ĵ�O��~�N7�鯡�}�y���ղ��=l؂x۰�>���ys��$N���E��,��Ό�~��~V�����!�ώ��j�Q��?�/<� �� `�u��wܽ>��6"�ā@ŭ;/����a��� ���/u�8f��3t� o�fA��*����*yGGikzpcqV�3([l#p׎L4�}��=�Ѡ���%?���,�7� D>���~a1�j4#:�����.�'�+�X�T~�'%z�u����CϧlЩ�c@&�;v�~�}J�2��(0�������ůq�
�Jx������Sg�w��!T�������5�F-�x�[Lgm��8����ܜ�fR��/H��'|�BX�M	b������(�R<��3A�v(��=��H|Zڐ�m
�c����X�j2��#�����C������)�bˏ�-;�m�D� :9d#�G7N�ŷ1@2�:~_�Q`B��~��4P�1��i����X�;�&����G>Xa��n�ENL�\e��\9F�4�\�A�����R�蓛qP�k��
tb��?#6Aޮ؂���� �*��r��Լ�S8�U��r�6��F�^���|�E�h�¶",*,s��b��&,�xD@�uȨ� E��yU�2���ڽĐ�w<��M&�:<7{.a����M��P� �=Ϙ�q`��Uɉ�I$�]W,��G�9����*}9}�P	7Ε�O�{�&ț�XTv�\!PJ����^W#�ވ	�^5,ң{C���o��ow=�Iː.������y�Y���b���7�8�?f`��#�Eu��(Kb��MX�<cuq���TzY��`g��.؄��Co�s��hGE�݃���C}�`��Mᡚl�׆}i �D�rxl����	�	ۏ|B�0_]��Z��!�����sm��׻�+&�� �n
�T��ݳbU���g�0A��΂�OPO=)��r��j�P��n"B/<7x��f.X׵{����y���sCE�h�	�`(��6b�;yRw0xx<�v@EC���X�@�v�(�\���*�	��{��Oy�	��߀H��Uw,�Ћ�XJ���+)�ڑ��$r9�꠼��G|��r=�lܩ��&�?d����#F ������*��9��^dI������.Xz`Iʣ���&A��_��-��ַ ��r�������X��ps0�� w:�j�	�
���d�X�P^���lB�ل!壢K'�K��K4��a!�y�.;"$"�b�r'�D�_����,��\aA�-��Y��ڼ@;/�p4#�1�eԞc���#���ʜ]���;o�W,�'=����"�B�DE��8�c�	\s��eH�T�:ց�����f�vC؄�ĝ����@aB��L��?pU�d��$�5wwPQ����\ �A���=�L��^:���#����Eg@�gS"G��ոaD}j���j�~!�<j�%�>��5sǊ:����Ko������y+g>��si�6�z�ꜻ8�m��܉'�KG��ͽd����>)�Y-\k�t��'6A��ǂ������VF�N�5��c�&��u�k�~:�/]h�<�X=}ūZr�]?���,��g3�H�ā�ձ�`���-���������ڻVh<x�n���A+bMx�5't ��#��:�1 ���$���=�v,<,��@��&��z��8����Ȝ�lixI�r5yn�� ��	"�'�%qck��is�)����GGŒ�
�xa.t-ONᇼ+�B4�}�r}z
�-;,0��7��}#>������.��2���K�-6��r�Z�
���Ƅ����M���� ����)M?@�yhG�7�C|��\(0�	��GU(������#ȻSĚ�����	��Q� �g#Xfc��=��.O�d3RF�Y.��V���N�j��1��b�3S��s�y]�	o��\�po�N^�P�:(�^S��ƫ#)H���F���d����-_I��v&��[>2c�t���nj��b^��v�����M(Ce/U�#\&�Ȑz�����S�H�	����OJi�|�ߧ{�N��P�m'_3��w�N�� �"�!�
f/�,���L��ٳ5:g����Pf 3��U�iK�1ͻ�@��I|�Ƶ� V��ɦ	�M���	�	"�f���;�������p�	깦���.$ɠD?�8����>}�����|�[O�a    cL���d!��۫X��{\�e.�Yx(C�#q�
~����0住iA�G₮>A">*<��܍<�i<^R��U*��l���]�]�4� ��&o�Q �+Ȁ�zF�g�+.�$B���f��R��}��"p�7�� T�9�z�'�>hfx�� o7aA�b^�?�~rC��cx�G�����}
HF��ى[�P��\P3�|��u��S���	��lx�AL�nb*O=|�#��&%Dp#�z!<��X�9���	��a�E�V݊Oz�[�- B�3��Z�u���wXpu��7��.;g�E0Lu%�m�Zޠ��������y]��G
�ΐ���!�26�&d늸� 5� �Lg.�bu��J������(L��sF�{�{��� `<K.����>G?ܫ���@����D�.�9J^��]G� ��~��� _9�D�De�7������SeB�R]�t�7�b���ր�����$]s���5e_���?_l�|�=0�����F�~�=��0�����x�����&��.h�}�Z�3����'L��3� ��ϒyX�֘�8���C�Τ�����M����B��D��zf�]x�]������0 �'�y"�I��S`�4�|���U�(�u�߼2D�s�GtD��3�9�&���M?�A$��p�*Rz��IBV�%�ȏA�pe|w��A�<XM�XZ�2���A(,�7��  �.�J޿G�H'�#�,�
�@�|� .L��$n���SV8��g��ޏ�
d�|Q �	�y��p�'��� Bl��	�ݘM]��Wk��ސ��k3�A���>���H���&�;Ȃ��Y[koZ܄��ڷw��5�!���<�7D�0��c5������U�����(��@����Q�Z)G�t3��ن���c�����v2� �Ƞ&m05J@��O��>��L���%�NwT��xӎbH�L0�5�Sv�\$�"p"x3�6����Vz�堕�cKނxo�~�3���vVbin�����@�(;�sϢ�f�^��:�{`����� ��U�oݙ o+�  ��٬�͸��KHaANYӢ�D�͋��� �pC���/���
O��*��Gl��Ý������d��P���[F���Bs�9��"�4<�}�>�.��ʙ�t0r\���?ol�|���#��x��|'#B&,ҕX��+����d�*<�#���	�+�фx_���^���<"sú�1���	�JPWsN��>�ms�ܗ���b|np� o^lA�K��&���3 �Mx���?xl�B��M��DZ�Tݘ�*!��qg�10�G��	�^v��"��޴�*L���\��='B�'���Ҕ����.��Lya�i���tL�=
�}�s�gI~B�VV����ܮ4�C覘�54��:s1�\�"��� �^R
���3w�y[�!��Z��mu�M ��dC�g�@�/1]���<+�
����5*S%�����3�� ��q4 ��!T����,lZ������7����Q<g&�p� 
�;�Ƴ<u�����@�;��b����g#`������W�����<IX<�� f�$k:��T$nq�˷?�a���؂ �,q{���k��V.A��/���S.��(�0��ƃ���'䶘lZ~􏵙 o3� ��܂[c1ͱ��X"�J�>���2��/��p�ިQ��;���?�L��[��GL�����[7�&X��ɃfB��~��	^�F�������oRbp5t?=O�M���Z�)g�.%>�Y	0vS��A<-x��|���z�s�WWy����R۩��6A�nh�cqWO�I6m����Dg/d.B���	ܵOܵ��,���l�^">���Ϧ��r�l)�c2�� ��u�P�u��j��/P�/w��n�w�b@�Z�3S��*���H�Ծ���]���
 ����Z�����{.OV���2a(�����'��~$~� odA�O�Ѻ0�?2SE���>�T�t�W8���:��t�u!v�J�wz�C)Y o�dA�(�\�n��1MϽ
\u8�jiW)�"H&-�V+��q{�Y��u��W�ϒ	�+�р�$E��<�P�1Gvn ��ï:��B�������Y�rB��#h�`��O��	䭔,яJ���5?��f�gmn���1K\NkF��s���;O/�����«�繒	�b�Ggʙ�*�R��n�9������j�#7����)NEY�y���̾3k�@&�WW�I��T�mfC��n�xJ*���!�&�����X2�R���p�+�N�M��4G�W���\x�I�Hk���"%(�^A��z��m�ɘȂ�����A<������~���,,�:E�L���a��de'St!���M�k�,�^���cM䤮�2����&f��� o�fA�	z�ws:wV"��q�?���U.���j���Eه������;�ϯ���>L���FB�	u�7�ḿ�5�T��k����.P�ݽz�2UOY �G��Xy'�R�]�#��y�cέ��6n�Hc�k	t��#B@�=�Tz��(��,Un�+��(!0�a���Y�X�	��h@������/��y�4�qh.eJ\2��@��\rJq��"� Oy����3��`��ס���h���@��o�i��.�mvjK!�h�S^+@�6����/H,�*����4ń�J5 �'�衖��#�}3-az��mW���T\|E�L�<䀬�eQ�5�5#��i}�� o�i��;�N����m�,���O��T�&�5r�;��
KZ4HLxsʶ��GcD䫧�>����Xi��f�#>�Ƅ-i��� 	䶳�2�ok������
�p�Y�c�|��რ�����h�ѬXt�{����]=�� �����p�:Vg%u����|�^f�[t&ț�Y?�7���x�c�Z���.`�=�̣��Ξ��3Z�1�3@����˰�j?�/ڙo�fAH�����c��L��k5sKh)	lT��X���ˍ�Ȥþ���8�ώC��t�0A�z�x�~Wf�T�FQ;�
7�XX�b�����g�$.uj��ư	6�����=
䫂̀`�>I1/=���9�[l�7V������ď�zRXlO�R2JH�#^���� �A"}2d��	1�}��y��͎b�
��hW�4h��,�6��wu�R����O�yh�=,�g�w��@U�:5vh۬rl �m�5��&4$Tp��������I�Yý��h�d��I-�jl�o��N_Pf2Ay�=稣������%�2%��H%����e칙��ȸ2A�6�����fˇ�ٴKy\��#
���FQ���kb�����)���.}�[�<v�L��3� �g#���QX'-�u6����G�-��Vߘ+ٛ	*���"먱��8����Ƅx��[�l!��Y׈�B�,ɄX��1yA��e񀊩 �����5���%	�X�D���U1 x�K��|�������q۫`n�y�O��}��,�+�l���=k���i�>��yK"}bLp�p��l
ҙ�®KY:�rg��ӌ'l�6O��L4-�Hعf�]G����ۈM?�>��\@(Y�F�a�9{Q���^Ɖᚧ���bF��9�,|I
&]�v3��=��� �+� �3Nh�=�p�`xcƻ=��k��/𡶸]��0S⫍
ѽ��a�3�R�?2�L��T� D>��R��ܙl(.�,y�r)R�u�t�_�|�)���t��|���䜩�J���&�{���}��3�T�]J>�У���8EOo�_���'Y�ݘd���s�Qr�9�p{�����udn@��������V��a9,��+��do�2w:`�l����]
;M�+O=ۯ&țPX���O�u������\�K*~�lbfB�wV*�W�Pk`qr��N&�;:[�Sa�=u����'�|v    ���w�Y��f�_�|a��Gc���f�wS�J����&���m?��x�J��#O����s1>�-
�w%P�Y��dy��>����LX!+?��I0A�6aA���6��	��S�U��Aݍy����L�a�r?)0##r"���z���՟�'�L�w���G<Jٽ�����j�|Cl-�Va[��j|K,�L,��Aw!��ҷ�I�d]䭟-f[�w��W�1�v��LS
�Я����[���M/	�x?��豵�Oz�5� _Wl@�Eo[��٨�o +�l���.К�šO�S��/u�0u�~]4N��P�j��,�LT�Y��v�w��
����#�:[��i@�2��ng2g20�zx��3Xoxp6�ڀ(����`24fOc��Kw8B�i�Uz��X�p8<a��霜����Y#���_��>Y� ��);���F��#԰�v����e�.Y+�a�Xސ������N�IT��!/ț[�s��s�ny�]�^��vHZ��۹���x�Id���+�	�{�'�x&p[ oBaA�� @9�(�}b��z	4�8ݫ��G8u�*[ܬ�lW���ݓ�j�5h�����c9�R5��%(��%�X�nx �7��gu�6Oc~,��eKO���~�(���f���v@lً�y��!���R���Ȍ�Ԯ�Kh�*�+�q�srz͕�K�Y �� $C���)@�"�w��	*�_X�8Ri�2��{�o �2Y�̎R��"۳�	�J������Faͣ����=�!ͷ�k������7)���,a���RN����x�Lyv0@�:w3H��N<Ϝx@�a����R�ޥp{�K�����b5$���Κ-�El�
+�m�I�#t����3��d�'� }��Ma�1�0�Igs?�=ǼN�#��r'�&	���y�Z�?���}g#@� "*�oK�0��\X�GJ
n��c��,O������j'��Վ�֣�����/��&��/��>b:D=�\�}W��e���m��-C�w{�q���� �}�h��`���	�$�~SV�U|`)o�&^gC�G�_�Y��{�5U�Hc�t�<��	�vD�`�����»�'؈�ʽPpS�b��zF���s���e�4����u�Z�� _�؀`
wgRB��o�o�
	<�\"�Y-���W�!�P���^ރ	��='N�������2A޴��#�)����.\,E �o9nw�hӱA�:\E)��G"�,�*�9u���5������A���*�{Xѩ�3t0�l���\���-J�s�'f��©4��w��l�.f��}`I����-�;;3�;����Ĥ�F���}F��d6�U�.O�+)�Wm��6@���e�tn��Շ�G�'�E�wv�^������G�6�k^z���o�7���ߦd�Rsn� 
]^cSL�wȳ p�;(��<.��;�
�%.�������63�kexo�Xs��ԉ�������[l�����nޛ�w���pK�Ub���F��c�l54���/����jH��&�W��+�E�fwכ��J���:w�7�$�^O�,�+�1��_&	�ve�V�������<��,�;�p<9q�H�6��Q�.������
#�7�ؗ����`���q���+�Al?�# ��p�X�  ���s��B|i���,95�mU�|8M��Wk_ �=09���M�/Yj@ H���(t}LX��R�VT�r�U���A����sM�#�չ��B�Փ�|�z��3AުԂ(�!zX�ªX��ƪ4�I>�rf?���{q7�ԣq���Nn8��+_9>S�M��o� ؖ�L��g�1���̭Xs�cKtii�4&��p��G�'�A�ܦ&&� _]4,?�R�A�qx-��! *�������P=�YX�c�D��X�Ή�>F�oa�����yo[p�v�\��,e��;�3F�Z��d����(�q^��6��H3���	v�)LMx� onlA�͏�b�NG����ʡ��p�'xf-p:���rS� v��}s�?:�� _y�D��>��"�||����Z �u1�	�r*XR����yV��2rߩ+[ɾ�L�w��!����3�^�kD�PKa	;}J��~2)'U63"9쓓A�5b�`�w��ó� _�K����EθK����� g%�I5�igN?S��qNi��EԪ}�s�56A��l����tWP0����@1�;��`��8w�N�-����+�'u�%�	x���Äx;
T�1V�͝ИY�}pVP�[y�+�����˽ �e����*rz,+��>���l�o�O���N��ްk��Z�n��S��bK�;�p�	�JV�\��¹ڳBׄ�jSb@�?beWAU�G̓>8�
��}Vm���R��%�>(�9��Sf﹟]8s"ׇ 5@�����𬖈w�Ɍ��9m�78�4�X��5f2���,����6�¸r��R�O���1��S�#O���dz�Q����lW�a(υ���x%X��i�/s���c2�	�>�� `mHo��7�g+S6�\MA��]��w�ށ��_yb�T;'���!V�R�;,���g!�D��p�uU��`:Cv��E�Cw���I���ę�X�x&�W�6�|@�v�P̓Y��Z����������E�m���í�r�;g%��u���|�Y o3� �#��<Jړ�ROF�Q���|��t64 �z�=���8	��YLQ����Z[ o�oAP��lK˚7�ԷD�1h(�TJ���m��6j���9�zr.�:���5a����m&�;�Y��ui� ��y���u��+�`��"�yQ@8�u��ℾF�go[�Jם�.�����ޢ� �g��=Δ�I8DfU�c��A��Ճ���U ���N��֌[�~��9��'�	�M�,���DOƳ��	vH���O������T=(He��L���G��6�{k��3�ф�:!5 ��`� �G&٤�;l�&~X-�n���Ps�B��MF�uO��mK�ӻ�6A�&lA�F���}��rLn�bN�9TP]���@x����V�8����bPv$�z����,���0"}TqyР<L��=q[lʝ�:0v���I}f����,�
^YN��.B�����dR���,�٦�֢�]3yc��S��F��/V������S����%޹aY��ҕ�,ބ�.��ψ���o�����J79���m�R�Nޫ�]�̆��s:zc�)ܸ��c�ZxY� o:aA�$9m�y��7�|�r����0���������D��w�x3{�2'=��	����x�x�l�p�@�G�����1��>���s* ͞������� �x�F7���0��؄	�JD��H�	�R&�I+kS��Y"R*'��6k��\���``D&75/ͽ�%v�֍�+�ڀ�!��h��]樶�	^T��!ov��E|�=����O�q2!�5h)7+|��5@����?L$�>8)�hM���z�ޕ���h%r �;9����.�]��.$��n����,��)]N����N�	
 ����'�rJmm�a�D�e�Ax��~��kPz�=���-��Lˏ|�`Y,G����������jO�'�ig�?�|��ٓL�3/�Wx��_%�ĝ����F�g!)!6V��쎿�#bM�Q9�Ӣ:	sb��X�����d�W}�0!�Z߂(��5�4�{��0`q�À���i�W��M�2&<<$	�3�^����}�<��� _'`Ϟ�~�p��O#�*����z��T��O���.	�w�u%��N���4�� �"�DR��%vF�����y�~e�6>�R���
[�Y����"��ę~�����,���� �*wd�����aW������4��@�\{�UVu�q@YJ:�5a&Pznb _���^?�b�x?�&�޵�+' �'�������f̣�+�<    s�� nN<֝	�I�	&kf���:×te��<�9��V˅ȷ�ڗ�I%/����Q�!��~2w'���-����>k5/169�v'�Hg/�u���+�	ϖqp�8ӊr7�^�����%l�^F&�۵Y��'|�7^�3Tv����G��'�$W��7bK�L����8n���r��Z��B̄x�[lh]&*�z7�u�}6]ԭ��$
"���(��
9ۭ���À�ϲD%m���gCk�mD�@��ɳ<v��5�6Xu|g�m��Wc3�}6>ąr��(���_�f���<=0A��΂`�#�q���{����cTrdڞ�(h6%A�O�)4�S�I�c��Pp���-HњCL���9�8�gܛ얶��t�l��]lԵ�H� �Ҡ��t�ڜ����&ț�~���c�c�>����;��F�`�~,���jʜ�������(	 �_d���RJ&�[�Y|ě3]�ȕ$V�b&.i�poٟ�6a^7�S�;[A@�8���9Wݰ��^��,��sQˏ|��랈Y<���o�J0��;��k������,����y�:����oݙ o�f��L���=������a���ʥ��N�P)�J�7�Ԑ��
!��I�[l�|m������-WӼ�c�e����k�����qm6:b���:-v�6��OqW�q�a��9��e��]@��vF�ώ�����]=�h�0�xO=�7~�|٘p��p�9��>��#6A��ق��Z"<4`��F���3��������M�v�0�9K�W0�~V��(ʂ�GN�	�b"�<{�Gº�� ��2��nz�:(��n��S�ӱ:��5��{�����O�m�<$
�y �/��4��"��zZh��R:K���R��fdX�sg�,u��J��1�	��U΀@���"xY�Ć�rB��ł���鬊�m���	�J�u����!S2�	3Bhv��Q��W+B?~35^8�#`s�K	���a��Γ�a����U�yxHr<@�CXx�3���v&�{sۂ�Ϭ��+�}p �����V�LR6���~�z�?�p�Jg���H�9&�Ѡ�y[��G�g���Q0��9�Gu��rkqLج���`8���43��;��D�,�9�y�Y��!R�lv[��O����X�Z��������N��I<�����B��^��~�^2A��Â�E`:�`E7���5`�A��+r|H �qhڜY-_�+t��i�̟g����ʔG·�v���ʮ~�ma�Fl!͜�w/�0���{ކd6����Dt���A�� _�΀`&��Q3�� �G\-�Qa51|:�Ň�<�ABq>3���N�����
q���f�|�n�S#,���1w��{�oE��>)e���æx�FJ�]mn{�\k=���̯�	��(,?"���$NJ9_�"�(f=NA�z�>#{��*`���IF�<�rnBk#�G���C���&�[,�~��4�&W�'�S�q�& H�(�2���GAW=3�7��,�O�����g;G�-=l?�X����}���ݢ�v�2��3't+T�Y��R���h1?����S��>�	�^w�M0Ja����	���}��/9O(�:�2o���
�����㉇=7'�?z�� ���x�:��&?<H�CG��	O�#�@Q,���VR�5��V�"2� �?k�U����,��&�!���6��zf[f����K4��g�S/!k���y ��Ȅk�v;is����Vl������}<G����@��*����ms�3��g����۬���J��½�<G�� _Vl@�O�x�M�;��@"�Y���莡nr ��g>Fc�te!�C��d:L�qYy�� _��#�sJIl���}�1���*4��/|V���\��@�����e�kp�2��{�&ěfZ��7��,�Q�)�Fu66�e�Ȏ��.9�� �f�Y�ν�t�2vgix�;�-=,�p����6D7�!Va���S��?e�w/�f8*&x�X�˹�YKX�Ń���0A�*,?�)��Q�sn��F����SHFG4����|���t�K2����WQ|���0~fY _�`�'$~d��]r�=_�F1|:U�Z�Ut��'���!�|9_�G$/�W��W�e�+cЀ`_vi����e,'��@�w��@)N��:w�B�xAlg{r��"Ӄ�Z��y6� �y�XXx��
�	���+�m�@�y����C�]2;$0�W:
�|�K3$�%��]�	�>�6�H��޺��E�F��uu&N�
�"p���+��پ�/l@
�����Cs�z5>�QX �glA@|�qb-�2s�-�QeQؙd^k^󊇩[�9%�P����R��F.�%�NH?�<�6@��Ə �|�v�{zT�8q�4�DO��a�ݸ�qst��`yV��2C��>륯�[Ļӂ(� n18q�������\�3�醧�:ֵN�t��0�4���>���K�`��ď��b�M�,{tO-�^h:��HWXs�r���U딌h罱|�Y�,`��L���L�y�6"}���>�����st�g�4���3�'\%�y��� �̀�O��x�� _���#�x��>̤l�����,jk�|���4a.����f*xrs/	���G�6�}��&�km�ȣ�x6c�^�9fw4\���+���1�}ܓ�ZJ�ڊT��Ia����A*d�3su���!���#"w��˹�x	́����r+)��L�]��&�W�+�|j*�G�^3����PP'�L|$TMWe�Mg�#�iS��t�;x�Mv�T��D�dA�f�	�ɔ�Ö\4��+@�����J�0u|â���mc/�)[9�ZZ���� _]>��)mO��2��Iu�M�ksdxP�*��ϴy����,>H�
��enB����9au(�m�/p�p,	
k�a֑e�zyn��^,n��L�;��1`��l�&�Q�h��i��bm�W?=�,�8n�O���]�~�+]�Q7�0~[D�����v<�ñg_�=���oe�|��a�:����A/"j_���.p�-�@˒�Vv.-Ќ`;�r��]��L�7c� �#�j�<�\�m�E��Fzf�l
�z�����`$&��-�18���9����Z�sHL���� ��X��ݢ�ٜ�1$�pLB��6H��+����*P��9��7���3�G;m&��ٝi��;��;X�wA�h삶��������n�ج,�*AX��;��%V�?�	��D��bZ�,<����׸ц'\N;��63��v��P�X�5�?��rDPlφ5&��ٝ�v\A��r���b!�d(0��1���'L�pQ��!��{���D�O|e��g�w��G��|\�ࡲs��{<n�����,�U63A
k8�bTH�}X��k���gOV���Q�͊M��>:9WI.�����ޅ����V�#������`3�l8���,x�xx���Ca��Ý�G>3�R
��m����o6Y�r�q��Q�ff��%����]�=*Waó��m�<ۚq4R���0�w��X'b�dmA�A�1c�s@�< '+���.~p��<g� _��p̶�J�H%�,ƻƜSpQ��9tGw8U#_(O��`��&`�Z�kL�7+� 8T�Id�G�fnpGfq Ŕ���}UD!�P�ټi����6��Nes��3]�y;
��tp�ob�e�8*������r�Y�}�Ꝁ��e����႟#�L���W����o522z�W7))K4���@��Kd��#�;I�'�7�;@aq�ѧ�yo�Y�Y��!� ��>Q�[W��xW{�gu�31�@$ɝB	-�;V�^���96�ge��0V�"G��L�LІ�0:`��a��9խ��	�E���T��s���&�W�0�}(���cq��d]N殰rW�r-I�>A�r˅B@��3i��@U
�k���-�7-�     �'Ƽ���A�q���#"��Z�άz������޹gs��4D_ٟ�3�%��c���v�~z�Q�����R%E�1�V�� �F
��iN� �cF	{�����U�<�3!�t?K=<KO���8�n͈��|?C�2�r��:�u��%Z[eZ�X��?�/��Т&�;pX�?�3�I�ҲS��G9�$ɯ�e�|�ce��⩩��A^����"�:�f��%�k[Ѐ���;8e>�>B��9Ur�GO��v/�pCÝߚN��e�V��7������c��=�1zX���S61biM�TR���O��l���*�6�ݬN>z������@�zx�w�� <c\�	���g�!ʂL;�=�Ė;٬0��)��=B9�|�9{�y�gB>+����]��ó1�M���q�m�	�nʾg�n�u��KF�WbD|��� _5l�G��p��N^bj��-�}����9{�x
eZH���	��gº�4��c�y_��/m)�ʭ�n	ʍLv����w�/�2����ė&l�tK�2��xSX�&p� oglA��Fv�jc;��ٙ��&�Y`���0���c�	�,�>�.���C��xb��,�/�%�H��[SA/��9��� h`��>���G|�Xѣ��Y������IX�xW"bLY`��{c7�&$�|�w1��#�S���y�w ����uM�~կ
�+����tg��h�!$��'��Ӓ6�R�1(��9F��-�x�D��pe�>��&�۱Y��y��Y\�[
���jȭ��n�x����
PO�=seKq�t&��3kX������ysL��l�}.��9~���w��\�O��q�<V`�f�v�.��P��"�"�Ϝ�+�À�	�;[���>S_�F&r�y�ٛ9�ׄ��9p�|�#ص+z�1�n��2Ys�h�g�|u�0 �瞥���nO�}8hVqpХa%��'�B��!%kF@�F�Ș!���Xr����ʐ7 �'���{�gG�kl��6�ah3�]���XnN&���!�Y�*){����3L���B�V�;`��|s���߇���N���p��/w��8�v9�zl^Go�ec��r�oA��1cp7)��[�t��̣&�ϔ|��$��p� �b�jܜ�R2�+w2Uw&�{cЂ��9)���G����r� 
q����3�WV�c��a��� ���^�(?"�g�!��3��N��M8���@lrչ��]��8��+�?ϑ��m�9 ^�����2*��]��`��)��G��s�v���;���u�/m��^j� m �Z�^�l�9V�g����D�%|����ys
�v<�� ���1Ć]5�P0Jٽ��`3�5��d�椝%��)t�ź�ʃ��((�@�WlAH�T6�$$B��2٢�e��|�"�L�г����֖����2f�I���S�owlA��6wcEg;�S9�'��'�*l�u��Jp6�����
�7;�,�;L�x47A޻�Gǥ�)#�!��';nvO�����S̜�zV��
q�[s4�%���q��?'6 _��8޸y�7��Gy$�8pNA�{���5�������p!��]����	�l�Y�fB�wU,�6�6�ǘk���J8[У���1a6��Nb��>6�c>: L$�����y���K�������gN��J̼�@6ik��"y2MB�aimq�W���o��J�,R���,���y͕�q�����C��g_9e�2�rӠ�'ZK��,mÅ&���ڸ2A���ж��X���Jy��6,�x����$�`�72qka�����u�>�"�	�@��΂��x�ꉓT���߶'SpvTV��*?�;��p�jb���Ⱥs�Kf!O>���	�N2��'����
gWó���I���{����CH6T��W����� 	.{�v5y%�[ _l��O�Z�gفg�
�X=�J<�C�ͩ��
��4�>q�_�X�f�f�I�|�&�{�Y��bf��p�'���W�gz���t$7=G�ggpl�[K�d�V����@&�[zX��ۢ"z��)p,pol�Cm<����d�XZ��]�f��ɪ��Α��;L��G"~"���' �!���c1:��i���ؿ40�f$���H���A=�E�컛��&ț[1��#<y���bk��*
�X=����;2#}1��=�;S�{�CĿ�����k���>A� �3����aU
��;'���)� ��Q�2H��u��\���Am�ê��Cۣe�	��+6�H����s P�&(&�;�u��Ne�+�X˃A�����2���$��>W���&�{Ȃ��>����ڼ�7[Y3��ʩ5�i��v�L��U's~�a'�I��9�$�sxل	���ܝl�>V+���b̈́�v��AJ���s�=����g��6�VlD�
;��W��	�8��[7���y���:ȥ+~��c]kN��V�#%�e�#���m1�1A����3��,��nM��j`��,>�v@�.��<�M5�;�Q�����pk���C�� �HgAH��%�p���S���{���B8���N��Rv-儒:Jc˼:+Bݣ̄���4 ��)��I`kJq��l�i1C��Jp���AQa%l���At���S���p���an��S>,��{K
KP���Ab��_S���q���1����@Lh_{k���7�_��Ug�����(h��{��y�=��v���%�����d����kٓ#m�tr0�N�yxX���W�'{W�h��K�b�8;{Nt��Y��F��k �7x�"%g��W�M�,&8�T�r�='wV;��7xVv�|_��O�ݟ���k��,7�l�h�d�|U �).��� =xlG���4���M{�?����靍��q���%�wbz�[ _uJ�����iL�Œ		��S�
Ir��������Mb���K��/L��n���M��#� �����%r��������e��t�s��4�N6+�e��3��w��}�+hAp��w����T�P�6�w`�h�%]�F��&��)�^�,%��J��w�����y�;ӏ�O�%"�p>-�����!%b��!{8m���cWc��]��v�@L�;��?�FM���/|�V0)��
�q4�:��!.x�����gl��� ��ʃ�ɉ�M��`&�W���G�'���*kY���HA@37���5w�o��ʚ �@��rg���![���35��=�{Z �glA�*本h�L��35lx���	SNP@�;��E�[��<�8W΁�
�Wy�O��mAȇ���醻N���Ȁ�k'@�2E�@��mp��M�/����;{3���5��QX~$N`������ӵ9���5v&I��J��{���^����Pz<ޗt�$!R/+o^j���� 3�T%α��
�~|��')Ҥz�¥�L����g��	�GA� �	���h��o��B���}iߚ�ӧL��4B���y��*Vj7k�(Oi{�l�>���������Q:+Xy�^Ӫ��t�|RϞ�qm�rB���`ߘ=5CL�����{=A�� ��oM,��~wE�����.����0��w�\�����p��q&}c.�] m��#ȏn�"~S�٣��Q�S]�W`v�~����W�I4c$��<�|N1SA>�V�]���A~����0X��E�]�ת6��Fğ���@�Y;����x��|Gy�,-�ܶ^��-?����	�~�U�|-���bJ\N�2H<k���y�"�2;;]���5=�]8���ė��#��{�@>u��;'���Dy��+P��m�d��յ,M���Z�
 �t��g�q���>@�g0Y+*�nY����C/�K����x��Z{���s>[��E�񱨾�nU��ɾ#ȏD���h�h�Ķ�Q��r�e�H,��1��##:g�<    �Z�)'�/̋��e�p�>����	�~�E�"u���x4�\d��w��Uo}��b-*��aV�y���ݬѝW�p�Y�A~�����,�'%����Xt���\�F�������9����9�R.I�ڪ������v'.�ޜ"�-04a�Ej���YE�D�������Q�6��� �2|n�Y>V;6M��[�#Ȼ=A�Ud�+m/:�â6�3^>���KU�Nz��N�Rp���I��j���ž>;� ����*�r�/{G��H���+���U�4ѧ�Z��w�2zGp�������y�v���=�%Z�y�H̢;��l3/�S�N����3���~�6P	"��*�]�:F/z��!�q��E<Z("��s@��[)y�����\xx�>ǛGBA՗�2�)Ę�4 <�� o�v��J�o��u۔� /v]�땦� �\^���{�v�-��KYg,4,ĕ�7ԢG��� �h�[A$�?g��i�V��io���TH��@{��o��̖�5X2f��04���#ț�� ��Ǟ.S)M븢���7LE��|D�{LZ:ˮ�����7�i)�dmA����y�4� �7�n����JG<�>����Lv���#
R�K�]Б�0H�����T�^۟��	��N�j�܆�]=\8�_6���w[\T�?�z�u��6�REȐ�)o��L���B9���cT���l'E
��+�p�m����h��-��p>�{x���^��hǨ���|���L�>zَ �X|������T���7�"B-ΩM�����g����<T4qG|���Q���J�O���Bq�9�?�%��Rf�7.	�ᡪ@H�����td�{^�[�=r���!����l�!~:2��luL�_�k܍Dw=Ӛ!g�̸��W*c��nKo*���S���r5�5q���8@���9��U�	�[��(�0���86~�P���b�UT7Mtۏ"�}�y�|��A8@艳�~�8�������ā�+̂�����d�� %C#x/��گy�T)2��q<��?�_���QK���]�#r�D@#�~V1n��=#�lΥ�k�m-�6������N������z��qL)$ΘU��ыm�����'Q(�z	t��59u�>�8Ro-҇��	�g
� ���l�wa:j*Qw}����r�t�~b�!с�����<�`��B=Q�群yp�#Ȼ%�P�=)P����Fc�i��+��y%�Y�;5yLԷC9��zeZ
]�O���C���^'�����37�X��5�k9��AUUW���$�o_1p,��E���P+�a����I� �.����y���m����=�U��R��ƧL<�D�Te�a��R��6���?r�w�k�����a��~�3�KB�Rq܍���Ygqe�hz�4֢O��'rx��i\kU���T��-<�(N �>Aԯ��=G?�G���{�e͚*^��Spw��b%��7�h��a�I5�ç�e����'�����,��2��H7�i�ӯ�f��У���QQն,Ve�1�e�pڟ�6�:����	�s�f����}���Qshx~X��T����Z�����%���r�U����	��&�'�	Q�`]�J�̍�߬j��e�
n��ђ�΋K�F�?�H���53�{/��#ȏH��/1_}��O}��9}�Tf�c�9����哃)a�����#��ض�R!#���8����aU+����Q��T@K����1�h>��H7�A�2o]�p����%�W++[��;���OL���� ��$Sb���ĸ���-GϷ��B�y:1�T��_��D��G|y7�� )�J�4�PF��L�������E��H��%�[�sȡ�3��)1��[�A~������/�ޙ�e�<�j*�AipͲ��ls/�Q�ԛ��ź=	�#Ȼ=�%����u\�G����_�k1y�L��F�a�о��l⢫r[Vw\�>�T� ?�?̫8j��������ڛi�m���b���t��9U��fsN�C��a/yy'����l\<z�Q)�-�~�|Syt���\#]�^�GZ����q 1��R^:����	�)~��`���sS�8&��*�s쬌��we7f�
��� �@]�1-t����]�G�wyw���(/b#�R�>s�Б��BLHo�ǏQ=����ԘJ,�~L�Q1�W����v��Mf	�*�� V��֦���'�[��f\*������=լ�.-�>.?��� ����[Yib�qmS�;�*ҹ<-9�����(,�)��+^�V���k��mI��\�?����Nz�����|ϰ��<������,*�gV�[�$e��n�W"�Q-f�?h|�XT��u~�Iy��_������ƣ`����lU}�(G�ZqԹ��j��0�5U���~�'������'�������������*��E�wZ�y8�	����Vi�8��J
���'��U��g� XLo���}����ѩ�]`��Bn:�ϼ����{�Y/��,��y��#�{� �O�^y%���¨N�tFUx����IMћ��k����4�.+�k�j������G*� Q�b׬kT:0�.S�f�$��mjC�d�WZ#qW���$��FҖ.�2���-�	���Nt~�鶣�1%�9XF�Di5�ʼ>
8�E1�����&J%w��C��x��#ȏ���|GSŇi��6�\&��SÍ0��u�<Ο1�V���N�uO��ᦙ��!vy_"���تsٗ�H�m���!Fu�M
�*�?Si��ƫ}q bo�����^pJ~
A�%�	�~�6���cE)Z�
G�z_����j�����K���(�Y��Jg��������Gq�p"�
Ԝ�-�nZ,��Vj\�Y�ʠf+]�nB�gV�Z֟@l2���;�*��v���;@��X=�mE}���[��զ`��U��cPo���:ڛҽY�.7v����^�@���=�o�M�Ն��*���u+�Ym�x�1]{�֌Z��R\�Z�M_s٨�]�|�JG��&�D����Hh_�4�z�i�����T�����ާJ�����A�{/��J��	�Ώȯr�#(�枾�_��]	��e�Jz1S�;��R�hLm�|gd��C'�@G������xEe����(	Y�[厊	��}��?x{,�$G�%�)��-����6��	�y�x��J8@(�m��D�[7F7�ij��o~_���O�*_��	Q�E��q-ߊ�7�I��L��.��~�7+`O܀RJ�CO�a�+\ϲco�C��%��(�h�xd�E�|ϡ#��/:���C�7"~���b�֮��:�|���;R���-�gl���H3��M�w�[?|��T����O ?:�F1E�6�4�?��ecg���VF)�/�kR������UE`�7���}\�A~H�BO�LUdV����=1;o�҂�=J����h�[S�׼*���k��xD�#ȯ�#����~�G(�̷��GmY	��ǔ�X�_�xGI�-�v=_+!u�j����������|��]�<��� ]�H��md? ��O}E3�++�3!��CsV�))�h�)�K�#�;N� ҷ.���u���%-(��`��n>~/qR��L[(oj�`Q�	�����!��N'��v�{�a-߶L�<b]��>X�)�+0U�I_�k���W��"׹�y��?@�e��s���O��8�6͌�i���ڛ�+�����m��	۾t��=�2� ?����5��R����-�Y�ޢ3��N����A$*V_ö{�Ha=s���ֵ�D�
-�v�#��i����
�%x��k0jc����ia<����
8c�qEF��E`*�Ԙ[ݯ�p�����3�v�`Ө�7q_����4$x���cL�&>Ώ<�R�ջз��)W���՘�Kʙ}�8<��k�D��P�u�aL����1Ͻ+-:�bz�i��	���Z	*���6������>����     ٞMϤś2.wE�p�9�\n{�b�E��ܣ����ǉ2�$�w9U��f��	��v��a@wF�Ȯ�� ��*�+�ō�b��tE��+�sa
�pșsȋ�A�bG�E����F-k�'�I�u_T�]n�����|P��#VI�! ��W@	�{�=FG� ���@���p���ьT��MAj6���Z���x|Sa�vsO�P��+抲��_�YA�@��	"|+�O�y4�� �dEo�êvǔ���E��������1z󝫧�E�{�/�@~��B%�n��rA1���n�}��W��/�J��>ň.��g�6Ґ��3C���ٴ{?�Î ?]����vV�/��2�c�q��~���c�f���^m�	�f�f��#�=��� ?}�>b��v��_��bߌVJP��U��Rq��皰֥�F9��O57�+7�W;�	佊�~I�Z��F(FܞK>c$��Z9��Zb�5/O�m��+$n�ǆ8NT�����8}=��0�DA�M9�ӱi�*�(�Gf��L�7����eH��n��W�T���f�������8B��e h�P�B�슷��-�е��"�7���U�k��[%4��u���z�Z��c�k��t8��o�Obm�~ }��5��YW̶�rtfڤb�����re˴��ݥq��mD
q�~�/=�N �'>A��n*��(����>LJr�����`��3��Kk���`C���Oe��~j��@~zI8��:VJWf ���)-�:���*z<�=ą�.�=5+LF��0��%�)��E��}�v���6��Bd+A*!���ܖ���4?;��Gm�Am�ɤoU�.��R��
�Q<��N o�v�p_���-��c��J��A1"�ւ��7�����Kg�EDJ���-��vz�#��>A�o5v�{܆��g?�'f���TN�	�s���P/*���j` $��ԣ��z� �bI-V�o)]��^���	���O���'���ޛt���;�O��|���� TzT�ĺ�-A��y��:oI\��[kt��+�0��f���R��;�Q�s�O��#țQ� �Wf���L�q_��]�YE�ҵع��+��!���_��� ��8	�f1� ���Ac�ꓐh�i�a�`�.%�DH�=�@Q�����[!��U�\�	يϊ�q~��0?��)�	"}GH5pZ��f���ߴ�Xm��)��ݔ~T��t���q�M;��ޢ��T(9����	�Z�*���J�1"�5ǩ�ەj���U��_�銍��FyW�d���iM|y_�� �S1ю{�t����JzȄX���myWQ��gzS��~b�Ѭui��:b���#�Ϙ�"�U�Ҕ_I�Xy�e<�wf��m������R5NsHbNl[ߍ��M��z��<<�N �F���z�Z"w��ƅG7��D�P���+v��2ѫږ˜m0)T[����w��v���=@hQ���� ��&}��ڿ��G1��S�
��V!�#b��JHN�>!?�i� �ޚ�*c�Yw�سB���]1\%�F�ƍ"7���n�=�3?GԴU�E��M�nEG����	B�"Lq���!�Aw�#HoTEʎ�!I�?]y�DO����U��Z�Y�ȝ���W�B��!��	��&zm���i�|h�Ђ�=qN�CN�mU���٬�ʫ"k���Oz�/!~����h�g^�����=�咯�Ϭ�L|�Ĥ�
������>�)U5�3������� �Pq����B�2�0��#�ϻ\6��G�a��iY	���Ɋ{ME��sf/�|�w���#ț�� �����-q���`m�tӋ�Y[���[���K�n�
�r�j��sW�~A�O|����F��ژфJ;��=����n䏘g
�3FFo��;d�\��SY�o�F��ac~ys�#��ʹ�5-Z�V�-}kf�K��Ǒ-�A����!��������A�!qu��<@���ޜ\����g̔1G��B*J�����x��ɠ�}�^f�M��֜���a����v'>b�w���7��AWhr�!�l��-!Z�eFq�d�m@���q	���-���� ��WNQeb�ԙ��
rţ$d�V����O�G3,_���Z�vƩS��Cr�y���<�������WU�4��9я}������R5�~s�ey-��ƻm����s�ǉ��� ��9���	ϛ+]n8��4AoL^U���v��luA��b���~�\��K8���D��4{�}\���F�"
:V��EtH�Y��+��}7��B߼SD��H��O~��@�|��"iM�s�Es7�mQ��l�s�w{DRmq����:=C�m�6�ॶpߚ?N�N �*5����<N�Xk��*R��e��b�����!^"�Mi�YKW�YN�@~8���V���7�ֳ�Y㞗J��ЄOe~ĎVeB��
���AX�ce�|+h<&� �c��_b�(�p�bk���=\�b/n׭qk��&�����d�ua�[1�b���?��}y��'��/;!g}�+!�BC�pb��(s��h�����ܥ�hՅIV��v����1�{y��'FJ��\{NZ.���4��VZ=����8�]�5*Ǵ���Q[�(qZqQWh;\|A�O|�K�1o� '���;��a��v��J�ɧ���V.�8��-bxeH�g����->.HO ��D���1a1�b��w�K�3F3��l���w�xU\b'�&D��۬������qOQ�#�;N� ��b^;�Eي-R�M�.���6�R����D5��3Q�ڱt��X� K�a�y���'��;�k�g��4\`4�V��(�����Ŏ�=ʫ����ĽYp��	��}y_7� �וbӠ/dЫ�+i�lw+!z��8K�4���^��S������{Fۘ|,Aޥ�	B�٨8Y����7|<��r��n���I�*�迖MA5��uQB4�gI6��$�a�qy���4�K�l���c�h{�fVe��q�Cڼ�0f�E��fcD��qx8��@�O|���krR�U�2:�?�U��f�n��?kqA���.Q8��*o]�i��������❟O�|k�5�
i��`x�UŪ �!�8�����&�����c� 6)�O���Aާ�'�����/M��3(�\��\*�"�qJ����z�Z��+S^���Wo�GZaZ!�S�'�w�8Ap��_!=��ɀ��=��3�����`ϝvA�.��DDS �zwU����G��c��_�'�#/V�����\�JkZW�n��������7��7tO��r�o��V�}�A���A���[��v�����Jkx~G�Cպg���߅v)�x�k�X���L��s}w�i�g��H�D蜾X�P�i��[܇��������fe��e���s�8�|�c���&�'}�3�+*W��̼����$u���G�}ݛ��՘�ђkEl�M�W���?����	} �����F抻s};\���ҙ�/��L��DZ��nbBt��!s���8�����#�Z�����mZR���mja�{~��\X1u|(�E̫s@��#ܳ�Fs��A���|ь�Y�ݬ�0E��.*?��qE�*�Gqň�4<�y�J�z�|_�Z|X�8�x�&A���A/�T�$�1)�"s��9a5�Fg��>=��m0�"v6{I���H�|E}��A~Zvz��X
b���>���4#��"j����gZ�?U(��͌���b�.\M,�k��U��*N6m2M�i���N�����E6�W,�DΉ��ִ�ֿ!���ꘊ�*����zA�ǃ'���nS	�X�%���bPps��ik;|��B����^�U_&Y�4_3�6?���w���į�r}b�2)l:e[T]��.�{�����-���m81�X�Lc|u�O��w����	�g�� �����2���h�h�6q�����mgި*pS��Vd����K�U���?'>� �9����I����,�V�E8o��VU�S��(�UFo?��o�kc^� �  �$7�++&Q��*>��W�	B�GL9�m�!�RY��*7�HZ`yW��Ao�1�\�3ӻ�;�x��� ��g� ��N���(�w5�D�e�܄<��6>C�^EG���3.fZ�s�(���pw1=*�#Ȼ������LE͖#.�!ʆ��͕��u��K�f�G���2|vU��g�a(�4�vJbG�������U�}���cؙl�*�5� b�5��*DE����'
T�T�v�[3�ݣ`:���ߝ����D��H2�� ��b�`fSj��2�v�[~
%E�'����N�p+�<2>���- ��|�U����z�����y�K���rRl�pk91����D!R%��}����	 �E���֝�;F�P�����U��Mg؎���g ���i�6�������z�lk���Q�/A���àSjRh4'U�0��Z�.6�)f���G��r��=:)� o�y���Č��:m�*Pl�!������:f�/�͗����T{rr�^��#�Og��bN餺�4�)SBܙ�1Ҝ��j�$�Z�`� t�SS��7%�ٙ�60A~D(O~I��=o/�k��}C��*���Z�q+Z�2�w�s�#%���}U�71��*~0A����:����F,�3�H-��km�Z�U��F/�et�S�!R�c+�!&��%���CY����'-
�J�VD�� ��6X��/l��3�.�O.M`S��시L�Ө�h[)����:��� ��ތ�l��}C�����fe��c�,}�)��n�NBF�G����SٻGA	���I� �C�7�Y���5��+E�0ߚ6*wO��?�M�B����Kb���>���z���g����Nz�n����Al�
-�%K%JU�v�Ĵf���U��q%ǽ�X�S����J�{�����hM8����	㵇��aB*�������'�e��GD�]�r{�ρ�:��e�=����)�q��N)�U�g���ӿ���.[��ѷh�� Bo*��e2�V<����RO;�X-z;�����;A��w������'�5�q1��}
�"z_�ys[�deN���Cߖ�h�'�?������q2�&�B&�yJ谯�[�7#j�a�i�kTTe�&<����-*���O��,>���� TA�eK�����N����ŋO���(5i���l4��I�R�����:�����4܎
}��� ��43��P��t�3����̅:-�(؅�ci(	}r���K�� �Eq�p��[�;�=�h"�� C��4�q�s�MB����'�4��ѷH���q�Y�A~ʻD�������BW\^��B�TD������v�C*�p�˹]�քPY�㝪G�c��~���߲Sj	�F��@x$UOZ�zD��:�����9�/��J�����G��">Ah�2�hZ:k�R\�үޕ.�X+V�Ŕ��I1t5���3!VN��%hW�����:���x~�K���{,VLEƝ^n*խ���l?a�M�9N�WF���?.s+7"��k;��w�	�}c�D�pUr���}5�?F^������ġ����'��h	W���מ*�^�wG��">A0�Tء�����XPU��"��EV��U���o�@��Ί�e��Z�Ƶ�����A�	�]{� �{��T&�f��o,>*LT�w(8T�fp�&���^�� A�_���=�]�G��� ������~�N��      �   �   x�-��q1�^�5�
~�/����cgw���b�]���4��t<9���h�b�Y��
�T�f�������Z����3����84s;�)��0��������,���k��Ȅ;�pWF#�l��{mg�xBZ���!�	A0���Z̍���R��6��<��o�ޒ�V�T9]�@T�6W�!_�!OS���}�����FRY     