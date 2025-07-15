# Đánh giá mô hình sentiment analysis trên bộ dữ liệu UIT-VSFC
# Yêu cầu: pip install datasets scikit-learn

from datasets import load_dataset
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from sklearn.metrics import classification_report, accuracy_score
import torch

# Tải bộ dữ liệu UIT-VSFC
print("Đang tải bộ dữ liệu UIT-VSFC...")
dataset = load_dataset("ura-hcmut/UIT-VSFC", split="test")

# Chuẩn bị mô hình và pipeline
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




# Lấy 10% dữ liệu test (sử dụng cột 'text' thay vì 'sentence')
import random
num_samples = int(0.1 * len(dataset))
indices = random.sample(range(len(dataset)), num_samples)
texts = [dataset[i]["text"] for i in indices]
true_labels = [dataset[i]["label"] for i in indices]

# Dự đoán
print("Đang dự đoán trên tập test...")
preds = []
for text in texts:
    result = sentiment_pipeline(text)[0]
    # Xử lý nhãn trả về
    label_id = int(result["label"].replace("LABEL_", "")) if result["label"].startswith("LABEL_") else result["label"].lower()
    label = LABELS[label_id] if isinstance(label_id, int) else label_id
    preds.append(label)

# Đánh giá
print("Kết quả đánh giá:")
print(classification_report(true_labels, preds, digits=4))
print("Accuracy:", accuracy_score(true_labels, preds))
