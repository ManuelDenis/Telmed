web: gunicorn DjangoKnoxReact.wsgi
web: python manage.py runserver 0.0.0.0:$PORT
web: npm start --prefix frontend

release: python manage.py migrate