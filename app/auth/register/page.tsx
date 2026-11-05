import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-20">
      <div className="hidden overflow-hidden rounded-[2rem] bg-[#e9dfd2] p-10 lg:block">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a5a34]">Your next stay</p>
        <h2 className="mt-4 max-w-sm text-4xl font-bold leading-tight tracking-[-0.04em] text-[#372a20]">A new view is closer than you think.</h2>
        <div className="mt-14 rounded-3xl bg-white/70 p-6 backdrop-blur">
          <p className="text-sm leading-6 text-[#6e5f53]">Create an account to book homes and keep your stays in one place.</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md rounded-3xl border border-[#dce2dc] bg-white p-7 shadow-[0_18px_60px_rgba(31,55,43,0.09)] sm:p-9">
        <AuthForm mode="register" />
        <p className="mt-6 text-center text-sm text-[#667068]">Already have an account? <Link href="/auth/login" className="font-bold text-[#1f6f50] hover:text-[#15543c]">Log in</Link></p>
      </div>
    </main>
  );
}
