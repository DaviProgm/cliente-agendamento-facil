import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CreditorCardProps {
  name: string;
  email: string;
  role: string;
}

const CreditorCard = ({ name, email, role }: CreditorCardProps) => {
  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-all duration-200">
      <CardContent className="space-y-2 p-4">
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <p className="text-gray-700">📧 {email}</p>
        <p className="text-sm text-muted-foreground capitalize">Função: {role}</p>
      </CardContent>
    </Card>
  );
};

export default CreditorCard;
