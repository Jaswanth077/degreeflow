import Logo from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { User } from "lucide-react";

export default function Test() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-10">
      <Card className="w-full max-w-md space-y-6">

        <Logo size="large" />

        <Input
          label="Register Number"
          placeholder="Enter Register Number"
          icon={<User size={18} />}
        />

        <Button>
          Login
        </Button>

      </Card>
    </div>
  );
}