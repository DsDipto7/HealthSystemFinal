from flask import Flask, request, jsonify
from flask_cors import CORS
from src.helper import download_hugging_face_embeddings
from langchain_community.vectorstores import Pinecone as LangChainPinecone
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "your_pinecone_api_key_here")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your_gemini_api_key_here")

if not PINECONE_API_KEY or not GEMINI_API_KEY:
    raise ValueError("Missing API keys. Check your environment variables.")

# Flask app setup
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for frontend requests

# Initialize embeddings
embeddings = download_hugging_face_embeddings()

# Retrieve the existing Pinecone index
index_name = "medicaldhaka"
docsearch = LangChainPinecone.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)

# Set up retriever and chains
retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", api_key=GEMINI_API_KEY)

system_prompt = (
    "You are an assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to answer "
    "the question. If you don't know the answer, say that you "
    "don't know. Use three sentences maximum and keep the "
    "answer concise.\n\n{context}"
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)

@app.route("/get", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        msg = data.get("msg", "").strip()

        if not msg:
            return jsonify({"response": "Please provide a valid question."})

        print("User Input:", msg)
        response = rag_chain.invoke({"input": msg})
        answer = response.get("answer", "Sorry, I couldn't find an answer.")

        print("Response:", answer)
        return jsonify({"response": answer})  # Always return 'response' key

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"response": "An error occurred while processing your request."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
