import requests

API_URL = "http://127.0.0.1:5000/analyze"

test_cases = [
    ("I love this product!", "positive"),
    ("This is terrible.", "negative"),
    ("It is okay, not bad.", "neutral"),
    ("Sản phẩm rất tốt", "positive"),
    ("Tôi không thích dịch vụ này", "negative"),
    ("Bình thường", "neutral"),
]

for text, expected in test_cases:
    res = requests.post(API_URL, json={"text": text})
    if res.ok:
        label = res.json().get("label")
        print(f"Input: {text}\nExpected: {expected}, Predicted: {label}\n{'PASS' if label == expected else 'FAIL'}\n")
    else:
        print(f"Input: {text}\nError: {res.text}\nFAIL\n")
