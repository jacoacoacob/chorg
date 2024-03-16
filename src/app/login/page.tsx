import { signup, login } from "./actions";

function LoginPage() {
  return (
    <div className="flex justify-center  max-w-3xl">
      <form className="space-y-2 flex flex-col">
      <div className="p-2 flex flex-col">
          <label htmlFor="email">Username:</label>
          <input id="username" name="username" type="text" />
        </div>
        <div className="p-2 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="p-2 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
        </div>
        <div className="flex justify-end space-x-2">
          <button className="p-2 border rounded" formAction={login}>Log in</button>
          <button className="p-2 border rounded" formAction={signup}>Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;