import { AuthTabs } from "./auth-tabs";

function LoginPage() {
  return (
    <div className="flex justify-center pt-56 min-h-screen">
      <div className="flex flex-col">
        <AuthTabs />
      </div>
    </div>
  );
}

export default LoginPage;