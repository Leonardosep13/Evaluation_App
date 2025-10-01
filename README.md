Option 1 – Using Docker:
You can start both the backend and the frontend by simply running:

"docker compose up"

(Make sure you have Docker Desktop installed for this option.)

Option 2 – Running Locally:

Backend:
cd ClassRankBack
pip install -r requirements.txt
python manage.py runserver

Frontend:
cd classrankfront
yarn install
yarn start
