import { useState } from "react";
import axios from "axios";

export default function UploadPdf() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadStatus("Uploading...");
      const res = await axios.post("http://localhost:8000/upload-ncert/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadStatus(res.data.message || "Upload successful!");
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Upload NCERT Book (PDF)</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
    </div>
  );
}
