import { useQuery } from '@tanstack/react-query';
import { fetchContactMessages } from '@/api/admin/contact';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

export const AdminContactMessagesPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: fetchContactMessages,
  });

  if (isLoading) return <div>Loading...</div>;

  const messages = data?.data?.data ?? [];

  if (!messages.length) {
    return <div className="text-muted-foreground">No messages found</div>;
  }

  return (
    <div className="space-y-4">
      {messages.map((m: any) => (
        <Card key={m.id}>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>{m.subject}</span>
              {!m.is_read && <span className="text-xs">NEW</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              From: {m.first_name} {m.last_name}
              {m.user_name && ` (${m.user_name})`}
            </div>
            <div className="text-sm text-muted-foreground">
              {m.message.slice(0, 120)}...
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Mail className="h-4 w-4 mr-1" />
                {m.email}
              </Button>
              {m.phone && (
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4 mr-1" />
                  {m.phone}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
