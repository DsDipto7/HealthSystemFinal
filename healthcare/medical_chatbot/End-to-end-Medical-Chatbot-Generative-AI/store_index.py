# # from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings
# # from pinecone.grpc import PineconeGRPC as Pinecone
# # from pinecone import ServerlessSpec
# # from langchain_pinecone import PineconeVectorStore
# # from dotenv import load_dotenv
# # import os


# # load_dotenv()

# # PINECONE_API_KEY=os.environ.get('PINECONE_API_KEY')
# # os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY


# # extracted_data=load_pdf_file(data='Data/')
# # text_chunks=text_split(extracted_data)
# # embeddings = download_hugging_face_embeddings()


# # pc = Pinecone(api_key=PINECONE_API_KEY)

# # index_name = "medical"


# # pc.create_index(
# #     name=index_name,
# #     dimension=384, 
# #     metric="cosine", 
# #     spec=ServerlessSpec(
# #         cloud="aws", 
# #         region="us-east-1"
# #     ) 
# # ) 

# # # Embed each chunk and upsert the embeddings into your Pinecone index.
# # docsearch = PineconeVectorStore.from_documents(
# #     documents=text_chunks,
# #     index_name=index_name,
# #     embedding=embeddings, 
# # )



# from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings
# #from pinecone.grpc import PineconeGRPC as Pinecone
# from pinecone import ServerlessSpec
# import os
# from pinecone import Pinecone
# from langchain.embeddings import HuggingFaceEmbeddings
# from langchain.vectorstores import Pinecone as LangChainPinecone

# # Explicitly set the API keys
# PINECONE_API_KEY = "pcsk_7FDdzx_UQCMcSrHT8Q26MxkwsZ5Vx31vpcahULhhEg88LVTzH8FYWpZcS3bLSjHJar68G1"
# GEMINI_API_KEY = "AIzaSyD14-_c3whLQ4ax-T0Pn6iA9f4gqOyCsUM"

# # Load PDF file and split into chunks
# extracted_data = load_pdf_file(data='Data/')
# text_chunks = text_split(extracted_data)

# # Download embeddings
# embeddings = download_hugging_face_embeddings()

# # Initialize Pinecone
# pc = Pinecone(api_key=PINECONE_API_KEY)

# # Specify the index name and parameters
# index_name = "medical"

# # Create a Pinecone index
# pc.create_index(
#     name=index_name,
#     dimension=384,
#     metric="cosine",
#     spec=ServerlessSpec(
#         cloud="aws",
#         region="us-east-1"
#     )
# )

# # Embed each chunk and upsert the embeddings into your Pinecone index
# docsearch = PineconeVectorStore.from_documents(
#     documents=text_chunks,
#     index_name=index_name,
#     embedding=embeddings,
# )













#codes till 23/03/2025


# from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings
# from pinecone import Pinecone, ServerlessSpec
# from langchain.embeddings import HuggingFaceEmbeddings
# from langchain.vectorstores import Pinecone as LangChainPinecone
# import os

# # Explicitly set the API keys
# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "pcsk_3okcoT_AWC3fjfHJKEgQ17CDk4HLoe1sKk7RcbmGAao51t5ayVwpNFUqQtKDnpoNEBJRBk")
# GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBnLM9NpnROgiYbeghuAXbt6jLS_bqTuQM")

# if not PINECONE_API_KEY:
#     raise ValueError("PINECONE_API_KEY is not set. Please set it in your environment variables or directly in the script.")

# # Load PDF file and split into chunks
# extracted_data = load_pdf_file(data='Data/')
# text_chunks = text_split(extracted_data)

# # Download embeddings
# embeddings = download_hugging_face_embeddings()

# # Initialize Pinecone
# pc = Pinecone(api_key=PINECONE_API_KEY)

# # Specify the index name and parameters
# index_name = "medicaldhaka"

# # Create a Pinecone index if it does not exist
# if index_name not in pc.list_indexes():
#     pc.create_index(
#         name=index_name,
#         dimension=384,
#         metric="cosine",
#         spec=ServerlessSpec(
#             cloud="aws",
#             region="us-east-1"
#         )
#     )

# # Embed each chunk and upsert the embeddings into your Pinecone index
# docsearch = LangChainPinecone.from_documents(
#     documents=text_chunks,
#     index_name=index_name,
#     embedding=embeddings,
# )




#codes after 23/03/2025



from src.helper import load_pdf_file, text_split, download_hugging_face_embeddings
from pinecone import Pinecone, ServerlessSpec
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Pinecone as LangChainPinecone
import os

# Explicitly set the API keys
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "pcsk_3okcoT_AWC3fjfHJKEgQ17CDk4HLoe1sKk7RcbmGAao51t5ayVwpNFUqQtKDnpoNEBJRBk")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBnLM9NpnROgiYbeghuAXbt6jLS_bqTuQM")

if not PINECONE_API_KEY:
    raise ValueError("PINECONE_API_KEY is not set. Please set it in your environment variables or directly in the script.")

# Load PDF file and split into chunks
extracted_data = load_pdf_file(data='Data/')
text_chunks = text_split(extracted_data)

# Download embeddings
embeddings = download_hugging_face_embeddings()

# Initialize Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# Specify the index name and parameters
index_name = "medicaldhaka"

# Create a Pinecone index if it does not exist
if index_name not in pc.list_indexes():
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

# Embed each chunk and upsert the embeddings into your Pinecone index
docsearch = LangChainPinecone.from_documents(
    documents=text_chunks,
    index_name=index_name,
    embedding=embeddings,
)