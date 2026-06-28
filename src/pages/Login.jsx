import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { createUserProfile } from "../services/profileService";

export default function Login() {
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      await createUserProfile(result.user);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-violet-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* card */}
      <div className="relative w-[380px] bg-slate-900/70 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-2xl p-10">

        {/* title */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text">
          Last Minute 
        </h1>

        <p className="text-center text-slate-400 mt-2 text-sm">
          AI Productivity Assistant
        </p>

        {/* divider */}
        <div className="my-6 h-px bg-slate-700" />

        {/* google button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] transition shadow-lg"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* small text */}
       

      </div>
    </div>
  );
}