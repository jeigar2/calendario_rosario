from flask import Flask, render_template, request, redirect, url_for, make_response
import os
import uuid
from datetime import datetime, timedelta
import calendar
import locale

app = Flask(__name__)

DATA_FILE = 'data/names.txt'

def read_names():
    if not os.path.exists(DATA_FILE):
        return {}
    with open(DATA_FILE, 'r') as file:
        return {line.split(',')[0]: line.strip().split(',')[1] for line in file.readlines()}

def write_name(identifier, name):
    with open(DATA_FILE, 'a') as file:
        file.write(f"{identifier},{name}\n")

@app.route('/')
def index():
    month = request.args.get('month', default=datetime.now().month, type=int)
    year = request.args.get('year', default=datetime.now().year, type=int)
    month = int(month)
    year = int(year)
    cal = calendar.monthcalendar(year, month)
    # Set the locale to Spanish
    locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')

    month_name = calendar.month_name[month]

    names = read_names()
    selected_name = request.cookies.get('selected_name')
    return render_template('calendar.html', calendar=cal, month_name=month_name, user_name=selected_name, month=month, year=year)

@app.route('/calendar')
def calendar_view():
    month = request.args.get('month', default=datetime.now().month, type=int)
    year = request.args.get('year', default=datetime.now().year, type=int)
    first_day = datetime(year, month, 1)
    last_day = (first_day + timedelta(days=31)).replace(day=1) - timedelta(days=1)
    days = [first_day + timedelta(days=i) for i in range((last_day - first_day).days + 1)]
    return render_template('calendar.html', days=days, month=month, year=year)

@app.route('/select_name', methods=['POST'])
def select_name():
    name = request.form['name']

    identifier = str(uuid.uuid4())
    write_name(identifier, name)
    response = make_response(redirect(url_for('index')))
    response.set_cookie('selected_name', name)
    return response


@app.route('/set_name')
def set_name():
    name = request.args.get('name')
    identifier = str(uuid.uuid4())
    #write_name(identifier, name)
    response = make_response(redirect(url_for('index')))
    response.set_cookie('selected_name', name)
    return response

@app.route('/delete_name', methods=['POST'])
def delete_name():
    name_to_delete = request.form['name']
    names = read_names()
    if name_to_delete in names.values():
        del names[next(key for key, value in names.items() if value == name_to_delete)]
        with open(DATA_FILE, 'w') as file:
            for identifier, name in names.items():
                file.write(f"{identifier},{name}\n")
    response = make_response(redirect(url_for('index')))
    return response

if __name__ == '__main__':
    app.run(debug=True)