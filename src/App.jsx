import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { RequireAuth } from './components/RequireAuth'
import { AuthLayout } from './pages/AuthLayout'
import { ChatCare } from './pages/ChatCare'
import { Disclaimer } from './pages/Disclaimer'
import { Emergency } from './pages/Emergency'
import { HowItWorks } from './pages/HowItWorks'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { VoiceCare } from './pages/VoiceCare'

const Landing = lazy(() =>
  import('./pages/Landing').then((m) => ({ default: m.Landing })),
)

function LandingFallback() {
  return (
    <div className="page" style={{ minHeight: '40vh' }}>
      <p className="page-lead" style={{ margin: 0 }}>
        Loading…
      </p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<LandingFallback />}>
                <Landing />
              </Suspense>
            }
          />
          <Route
            path="chat"
            element={
              <RequireAuth>
                <ChatCare />
              </RequireAuth>
            }
          />
          <Route path="voice" element={<VoiceCare />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="disclaimer" element={<Disclaimer />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="auth/sign-in" element={<SignIn />} />
          <Route path="auth/sign-up" element={<SignUp />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
