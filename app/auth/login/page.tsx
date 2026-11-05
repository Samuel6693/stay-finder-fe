import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:py-20">
      <div className="hidden overflow-hidden rounded-[2rem] bg-[#dce8d9] p-10 lg:block">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1f6f50]">Stay curious</p>
        <h2 className="mt-4 max-w-sm text-4xl font-bold leading-tight tracking-[-0.04em] text-[#203128]">Good places make good stories.</h2>
        <div className="mt-14 rounded-3xl bg-white/70 p-6 backdrop-blur">
          <p className="text-sm leading-6 text-[#566159]">“A simple way to find a quiet weekend away or a new corner of the city.”</p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-md rounded-3xl border border-[#dce2dc] bg-white p-7 shadow-[0_18px_60px_rgba(31,55,43,0.09)] sm:p-9">
        <AuthForm mode="login" />
        <p className="mt-6 text-center text-sm text-[#667068]">New here? <Link href="/auth/register" className="font-bold text-[#1f6f50] hover:text-[#15543c]">Create an account</Link></p>
      </div>
    </main>
  );
}
