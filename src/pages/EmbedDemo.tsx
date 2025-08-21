import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import WikiPreview from "../components/WikiPreview";
import UploadIcon from "../components/svg/UploadIcon";
import CameraIcon from "../components/CameraIcon";
import ShieldIcon from "../components/svg/ShieldIcon";
import ListIcon from "../components/svg/ListIcon";
import BookIcon from "../components/BookIcon";
import SparkleIcon from "../components/svg/SparkleIcon";
import LeafIcon from "../components/svg/LeafIcon";
import CheckIcon from "../components/CheckIcon";
import Stat from "../components/Stat";
import { formatBytes } from "../hooks/utils";
import AiDiagnose from "../components/AiDiagnose";

/**
 * PlantCare — AI 진단 & 위키 랜딩 (React + Tailwind)
 *
 * ✅ 구성
 * - 헤더: Home / AI / Wiki (sticky)
 * - Hero: 식물 컨셉 히어로 + CTA
 * - Features: 핵심 기능 4가지
 * - AI Diagnose: 이미지 업로드 + 메모 + (모의) 진단 결과 UI
 * - Wiki Preview: 검색 + 카드 그리드 (모의 데이터)
 * - FAQ
 * - 푸터
 *
 * 사용법
 * 1) Vite(React-TS) + Tailwind 프로젝트에서 이 파일을 src/App.tsx 로 저장
 * 2) 이미지/문구/색상 커스터마이즈
 * 3) 실제 AI 엔드포인트 연결 시 `runDiagnosis` 함수로 교체
 *
 * 디자인 노트
 * - 그린(emerald/lime) 팔레트 + 라운드(rounded-2xl~3xl) + 소프트 그림자
 * - 큰 타이포 / 넉넉한 여백 / 카드 레이아웃
 */



export default function App() {
  return (
    <div className="min-h-screen bg-emerald-50 text-slate-900 selection:bg-emerald-200/60">
      <Hero />
      {/* <Features /> */}
      <AiDiagnose />
      <WikiPreview />
      {/* <FAQ /> */}
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-lime-300/30 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-emerald-900 md:text-6xl">
            AI로 <span className="text-emerald-600">식물 상태</span>를
            즉시 진단하고, <span className="text-emerald-600">위키</span>로 해결하세요.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            한 장의 사진과 간단한 증상 입력만으로 병해/영양/환경 문제를 추정하고,
            바로 적용 가능한 관리 가이드를 제공합니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#ai"
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:translate-y-[-1px] hover:bg-emerald-700">
              지금 진단하기
            </a>
            <a
              href="#wiki"
              className="rounded-2xl border border-emerald-400/60 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
              위키 둘러보기
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
            <li className="flex items-center gap-2"><CheckIcon /> 500+ 종 카탈로그</li>
            <li className="flex items-center gap-2"><CheckIcon /> 증상 체크리스트</li>
            <li className="flex items-center gap-2"><CheckIcon /> 커뮤니티 기여</li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -left-6 -top-6 h-24 w-24 rotate-12 rounded-3xl bg-white/80 shadow-2xl" />
          <img
            alt="hero-plant"
            className="relative z-10 mx-auto w-full max-w-md rounded-3xl border border-emerald-200/60 bg-white shadow-2xl"
            src="https://images.unsplash.com/photo-1463320898484-cdee8141c787?q=80&w=1200&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { title: "AI 진단", desc: "이미지 + 증상 입력 → 질병/영양/환경 의심 사항 제시", icon: <SparkleIcon /> },
    { title: "위키 가이드", desc: "물주기·광·토양·비료·번식 등 관리법 일목요연", icon: <BookIcon /> },
    { title: "체크리스트", desc: "초보자용 점검표로 기본 관리 습관 만들기", icon: <ListIcon /> },
    { title: "개인정보 안심", desc: "업로드 이미지는 분석 후 즉시 파기(설정 가능)", icon: <ShieldIcon /> },
  ];
  return (
    <section className="bg-white/70 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-emerald-900 md:text-3xl">왜 PlantCare인가요?</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          {feats.map((f) => (
            <div key={f.title} className="rounded-3xl border border-emerald-200/70 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function FAQ() {
  const qas = [
    {
      q: "정확도는 어느 정도인가요?",
      a: "조명/초점/거리 등의 품질과 종 데이터에 따라 달라집니다. 베타 기준 상위 증상군은 80%± 신뢰도로 제시됩니다.",
    },
    {
      q: "어떤 사진이 좋나요?",
      a: "문제 부분이 또렷하고 전체 맥락(화분/토양/배치)이 함께 보이면 좋아요. 과도한 보정/역광은 피해주세요.",
    },
    {
      q: "내 사진은 저장되나요?",
      a: "기본값은 분석 후 즉시 파기입니다. 연구 기여에 동의한 경우에만 익명화되어 모델 개선에 사용됩니다.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-emerald-900 md:text-3xl">FAQ</h2>
      <div className="mx-auto mt-8 max-w-3xl divide-y divide-emerald-200 rounded-3xl border border-emerald-200/70 bg-white">
        {qas.map((item, i) => (
          <details key={i} className="group px-6 py-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              {item.q}
              <span className="float-right text-emerald-600 transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-emerald-200/60 bg-white/50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <a href="#home" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white"><LeafIcon /></span>
            <span className="text-lg">PlantCare</span>
          </a>
          <p className="mt-3 text-sm text-slate-600">
            식집사를 위한 AI 도우미 & 위키. 더 건강한 실내 정원을 만드세요.
          </p>
        </div>
        <FooterCol title="서비스" links={["AI 진단", "위키", "기여 가이드"]} />
        <FooterCol title="리소스" links={["블로그", "고객지원", "업데이트 노트"]} />
        <FooterCol title="정책" links={["개인정보", "이용약관", "쿠키"]} />
      </div>
      <div className="border-t border-emerald-200/60 py-6">
        <p className="mx-auto max-w-6xl px-4 text-sm text-slate-500">© {new Date().getFullYear()} PlantCare UI — React/Tailwind demo.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {links.map((l) => (
          <li key={l}><a href="#" className="hover:text-emerald-700">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}





