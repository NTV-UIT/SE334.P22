from flask import Flask, request, jsonify, render_template
from marshmallow import Schema, fields, ValidationError
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch
from sqlalchemy import create_engine, Column, Integer, String, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import pandas as pd
import plotly.graph_objs as go
import plotly.io as pio
import os
import pytz

# Múi giờ Việt Nam
VN_TIMEZONE = pytz.timezone('Asia/Ho_Chi_Minh')

# Flask app
app = Flask(__name__)

# Load sentiment analysis pipeline (multilingual, 3 lớp cảm xúc, hỗ trợ tiếng Việt)
MODEL = "cardiffnlp/twitter-xlm-roberta-base-sentiment"
LABELS = {0: "negative", 1: "neutral", 2: "positive"}
tokenizer = AutoTokenizer.from_pretrained(MODEL)
model = AutoModelForSequenceClassification.from_pretrained(MODEL)

sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model=model,
    tokenizer=tokenizer,
    device=0 if torch.cuda.is_available() else -1
)

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:Vinh_132004@localhost:5432/sentimentdb")
engine = create_engine(DATABASE_URL)
Base = declarative_base()

class Sentiment(Base):
    __tablename__ = 'sentiments'
    id = Column(Integer, primary_key=True)
    text = Column(String)
    label = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(VN_TIMEZONE).replace(tzinfo=None))

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)


# Marshmallow schema for input validation
class AnalyzeSchema(Schema):
    text = fields.String(required=True)

analyze_schema = AnalyzeSchema()

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = analyze_schema.load(request.json)
    except ValidationError as err:
        return jsonify({"error": err.messages}), 400
    text = data["text"]
    result = sentiment_pipeline(text)[0]
    label_id = int(result["label"].replace("LABEL_", "")) if result["label"].startswith("LABEL_") else result["label"].lower()
    label = LABELS[label_id] if isinstance(label_id, int) else label_id
    with Session() as session:
        session.add(Sentiment(text=text, label=label))
        session.commit()
    return jsonify({"label": label, "score": result["score"]})

@app.route("/trend", methods=["GET"])
def trend():
    session = Session()
    interval = request.args.get('interval', 'day')
    from sqlalchemy import func, extract, cast, String
    from datetime import datetime, timedelta
    today = datetime.now(VN_TIMEZONE)
    start_date = today - timedelta(days=29)
    # Xử lý group theo interval an toàn
    if interval == 'second':
        group_expr = func.to_char(Sentiment.created_at, 'YYYY-MM-DD HH24:MI:SS')
    elif interval == '15min':
        # Group theo 15 phút: làm tròn phút về bội số 15
        group_expr = func.concat(
            func.to_char(Sentiment.created_at, 'YYYY-MM-DD HH24:'),
            (extract('minute', Sentiment.created_at) // 15 * 15).cast(String)
        )
    elif interval == 'hour':
        group_expr = func.to_char(Sentiment.created_at, 'YYYY-MM-DD HH24')
    elif interval == '12h':
        # Group theo 12 giờ: lấy ngày + (giờ // 12)*12
        group_expr = func.concat(
            func.to_char(Sentiment.created_at, 'YYYY-MM-DD '),
            (extract('hour', Sentiment.created_at) // 12 * 12).cast(String),
            ':00'
        )
    else:
        group_expr = func.to_char(Sentiment.created_at, 'YYYY-MM-DD')
    results = session.query(
        group_expr.label('period'),
        Sentiment.label,
        func.count().label('count')
    ).filter(
        Sentiment.created_at >= start_date
    ).group_by(
        group_expr,
        Sentiment.label
    ).order_by(group_expr).all()
    session.close()
    # Sử dụng pandas để tăng tính declarative khi pivot dữ liệu
    df = pd.DataFrame(results, columns=["period", "label", "count"])
    if not df.empty:
        pivot = df.pivot(index="period", columns="label", values="count").fillna(0).astype(int)
        return pivot.to_dict(orient="index")
    else:
        return {}

@app.route("/current-time", methods=["GET"])
def current_time():
    """Endpoint để kiểm tra thời gian hiện tại theo múi giờ Việt Nam"""
    current = datetime.datetime.now(VN_TIMEZONE)
    return jsonify({
        "current_time": current.strftime("%Y-%m-%d %H:%M:%S"),
        "timestamp": current.timestamp(),
        "timezone": "Asia/Ho_Chi_Minh (UTC+7)"
    })

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=5050)
