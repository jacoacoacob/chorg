"use client";

import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

function AuthTabs() {
  return (
    <Tabs aria-label="Authentication options" shouldSelectOnPressUp={false}>
      <Tab key="login" title="Login" shouldSelectOnPressUp={false}>
        <Card>
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>
      </Tab>
      <Tab key="signup" title="Sign Up" shouldSelectOnPressUp={false}>
        <Card>
          <CardBody>
            <SignupForm />
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}

export { AuthTabs };
