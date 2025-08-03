import os
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
#from langchain.llms import OpenAI  # You can replace with ChatOpenAI or any local LLM
from langchain_huggingface import HuggingFaceEndpoint,ChatHuggingFace

llm = HuggingFaceEndpoint(
    repo_id="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    task='text-generation'
)

model = ChatHuggingFace(llm=llm)

# Path to store the vector database
VECTOR_DB_PATH = "vectorstore/ncert_faiss"

# === 1. Ingest NCERT PDF and create vector store ===
def ingest_ncert_pdf(pdf_path: str):
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = splitter.split_documents(documents)

    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectordb = FAISS.from_documents(chunks, embeddings)

    os.makedirs("vectorstore", exist_ok=True)
    vectordb.save_local(VECTOR_DB_PATH)


# === 2. Answer a question from stored NCERT content ===
def answer_question_from_ncert(question: str) -> str:
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectordb = FAISS.load_local(VECTOR_DB_PATH, embeddings)

    retriever = vectordb.as_retriever()

    qa_chain = RetrievalQA.from_chain_type(
    llm=model,
    chain_type="stuff",
    retriever=retriever  # <-- pass your actual retriever object here
    )

    # To use:
    return qa_chain.run(question)
