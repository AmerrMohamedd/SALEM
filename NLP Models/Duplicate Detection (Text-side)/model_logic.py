from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer('aubmindlab/bert-base-arabertv02')


existing_texts = [
    "حادث في شارع الهرم",
    "وقوع حادث بشارع الهرم",
    "سيارة توقفت في الطريق",
    "انقلاب سيارة على الطريق الصحراوي"
]

existing_embeddings = model.encode(existing_texts)

def is_duplicate(new_text, existing_embeddings, threshold=0.8):

    new_embedding = model.encode([new_text])
    

    similarities = cosine_similarity(new_embedding, existing_embeddings)
    

    if any(similarities[0] > threshold):
        return True, similarities[0]
    else:
        return False, similarities[0]


new_text = "وقع حادث في شارع الهرم"

duplicate, scores = is_duplicate(new_text, existing_embeddings)

if duplicate:
    print("This text is a duplicate")
else:
    print("This text is new")


for i, score in enumerate(scores):
    print(f"Similarity of the new text with existing text #{i}: {score:.2f}")

