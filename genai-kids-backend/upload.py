from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from utils.rag import ingest_ncert_pdf

router = APIRouter()

UPLOAD_DIR = "uploads/ncert"

@router.post("/upload-ncert/")
async def upload_ncert(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    # Ensure directory exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Save the uploaded PDF
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    try:
        # Ingest the PDF into vectorstore
        ingest_ncert_pdf(file_path)
        return {"message": f"{file.filename} uploaded and processed successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")
