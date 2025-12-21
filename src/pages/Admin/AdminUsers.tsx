import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/api/axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Search,
  Eye,
  Mail,
  Phone,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { format } from "date-fns";
import { fetchAllUsers } from "@/api/admin/users";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-all-users"],
    queryFn: fetchAllUsers,
    select: (data:any) => data?.data?.data,
  });


  const filteredUsers = (users || []).filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.phone_number?.includes(searchTerm)
  );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const statusBadge = (is_active: boolean) => {
    if (!is_active) {
      return <Badge variant="destructive">Blocked</Badge>;
    }
    return <Badge variant="secondary">Active</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">
          View and manage registered users
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>{filteredUsers.length} users found</CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-center py-8 text-muted-foreground">Loading...</p>
          ) : filteredUsers.length > 0 ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user?.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {user?.email}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {user?.phone_country_code} {user?.phone_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                      {statusBadge(user?.is_active)}
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        Joined {format(new Date(user?.created_at), "MMM yyyy")}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No users found
            </p>
          )}
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View and manage user account</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {getInitials(selectedUser?.name)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedUser?.name}
                  </h3>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      {selectedUser?.role}
                    </Badge>
                    {statusBadge(selectedUser?.is_active)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">
                    {selectedUser?.phone_country_code} {selectedUser?.phone_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">
                    {format(new Date(selectedUser?.created_at), "PPP")}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {/* <div className="flex justify-end gap-3">
                <Button
                  variant="destructive"
                  disabled={
                    !selectedUser?.is_active ||
                    deactivateMutation.isPending
                  }
                  onClick={() =>
                    deactivateMutation.mutate({
                      id: selectedUser?.id,
                      status: "Blocked",
                    })
                  }
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Block User
                </Button>
              </div> */}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
