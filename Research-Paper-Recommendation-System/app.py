import tensorflow as tf
from tensorflow.keras import layers
from tensorflow import keras
from ast import literal_eval
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dense
from sklearn.metrics.pairwise import cosine_similarity

arxiv_data = pd.read_csv('arxiv_data_210930-054931.csv')

# print(arxiv_data.describe())
# print(arxiv_data.duplicated().sum())
arxiv_data.drop_duplicates(inplace=True)
arxiv_data.reset_index(drop= True,inplace = True)

titles = arxiv_data['titles']
abstracts = arxiv_data['abstracts']

from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('all-MiniLM-L6-v2')
if not isinstance(titles, list):
    titles_list = titles.tolist()
else:
    titles_list = titles

titles_embeddings = model.encode(titles_list)

if not isinstance(abstracts, list):
    abstracts_list = abstracts.tolist()
else:
    abstracts_list = abstracts

abstracts_embeddings = model.encode(abstracts_list)

def recommendation(input_paper):
    # Calculate cosine similarity scores between the embeddings of input_paper and all papers in the dataset.
    input_embedding = model.encode(input_paper)
    cosine_scores = cosine_similarity(titles_embeddings, input_embedding.reshape(1, -1))

    # Get the indices of the top-k most similar papers based on cosine similarity.
    top_similar_papers_indices = np.argsort(cosine_scores, axis=0)[-5:][::-1].flatten()

    # Retrieve the titles of the top similar papers.
    papers_list = [titles[i] for i in top_similar_papers_indices]

    return papers_list

def recommendation_abstracts(input_paper):
    input_embedding = model.encode(input_paper)
    cosine_scores = cosine_similarity(abstracts_embeddings, input_embedding.reshape(1, -1))
    top_similar_papers_indices = np.argsort(cosine_scores, axis=0)[-5:][::-1].flatten()
    papers_list = [titles[i] for i in top_similar_papers_indices]
    return papers_list

input_paper = input("Enter the title of any paper you like: ")
recommend_papers = recommendation(input_paper)


print("Recommended Papers:-->")
for paper in recommend_papers:
    print(paper)

input_abstracts = input("Enter the abstract or a bit of description of any paper you like:")
recommend_papers = recommendation_abstracts(input_abstracts)
print("Recommended Papers:-->")
for paper in recommend_papers:
    print(paper)