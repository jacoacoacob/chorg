import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card shadow="none">
        <CardBody className="p-8 gap-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/login">Login</Link>
        </CardBody>
      </Card>
    </div>
  );
}
