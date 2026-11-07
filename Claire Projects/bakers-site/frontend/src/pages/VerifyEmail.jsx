import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function VerifyEmail() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    api.get(`users/verify/${uid}/${token}/`)
      .then(() => setStatus("✅ Email verified! You can now log in."))
      .catch(() => setStatus("❌ Verification link is invalid or expired."));
  }, [uid, token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-white shadow rounded">
        <h1 className="text-xl font-bold">{status}</h1>
      </div>
    </div>
  );
}

export default VerifyEmail;