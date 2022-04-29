from flask import Flask, render_template
from flask import request
from flask import make_response
import random

app = Flask(__name__, static_folder="../build/static", template_folder="../build")

@app.route("/", methods=["GET"])
def main():
   # render web project
   return render_template('index.html')


@app.route("/api/get-data", methods=["GET"])
def getData():
   # get your real time silo data and return in below format
   resp = make_response({ "status": "success", "data": [ {"name": "silo-1", "level": random.randrange(0, 100)}, {"name": "silo-2", "level": random.randrange(0, 100)}  ] })
   resp.headers['Access-Control-Allow-Origin'] = '*'
   return resp


@app.route("/api/get-graph", methods=["GET"])
def getGraph():
   name=request.args.get("name")
   start=request.args.get("start")
   end=request.args.get("end")
   interval=request.args.get("interval")
   # get your real time silo data and return in below format
   resp = make_response({ "status": "success", "data": [ {"date": "4/28/2022 00:00", "level": 20}, 
   {"date": "4/28/2022 04:00", "level": 50}, {"date": "4/28/2022 08:00", "level": 80}, 
   {"date": "4/28/2022 12:00", "level": 10}  , {"date": "4/28/2022 16:00", "level": 90}, 
   {"date": "4/28/2022 20:00", "level": 60}, {"date": "4/28/2022 24:00", "level": 80}, {"date": "4/28/2022 00:00", "level": 20}, 
   {"date": "4/28/2022 04:00", "level": 50}, {"date": "4/28/2022 08:00", "level": 80}, 
   {"date": "4/28/2022 12:00", "level": 10}  , {"date": "4/28/2022 16:00", "level": 90}, 
   {"date": "4/28/2022 20:00", "level": 60}, {"date": "4/28/2022 24:00", "level": 80} ]})
   resp.headers['Access-Control-Allow-Origin'] = '*'
   return resp