import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useProfileData, useUpdateProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { data: user, refetch } = useProfileData();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState("");

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  const hasChanges = name !== user?.name;

  const handleUpdate = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    updateProfile.mutate(
      { name },
      {
        onSuccess: (res) => {
          toast.success(res?.data?.message || "Profile updated");
          refetch();
        },
        onError: (err: any) => {
          toast.error(err?.message || "Update failed");
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        <Button
          onClick={handleUpdate}
          disabled={!hasChanges || updateProfile.isPending}
        >
          {updateProfile.isPending ? "Updating..." : "Update Name"}
        </Button>
      </CardContent>
    </Card>
  );
}
