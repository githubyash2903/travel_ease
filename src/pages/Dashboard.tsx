import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User } from "lucide-react";
import { useProfileData, useUpdateProfile } from "@/hooks/useProfile";
import { toast } from "react-toastify";

const Dashboard = () => {
  // edit states
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");

  const { data: user, isLoading,refetch } = useProfileData();
  const updateProfileMutation = useUpdateProfile();
  const handleSaveProfile = () => {
    if (!name) {
      toast.error("Please enter a name");
      return;
    }
    updateProfileMutation.mutate(
      { name },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          setIsEditing(false);
          refetch()
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to update profile");
        },
      }
    );
  };
  const hasUnsavedChanges = name !== user?.name;

  if (isLoading || !user) {
    return <p className="text-center py-20">Loading...</p>;
  }
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <main className="container  py-8 w-full p-10 ">
        {/* USER INFO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-3">
            <User className="h-10 w-10 text-white" />
          </div>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        {/* DASHBOARD TITLE */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold">My Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Manage your bookings and account
          </p>
        </div>

        {/* TABS */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="mx-auto">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* BOOKINGS */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8 text-muted-foreground">
                No upcoming trips.
              </CardContent>
            </Card>
          </TabsContent>

          {/* PROFILE */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* NAME */}
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    {isEditing ? (
                      <input
                        className="border p-2 w-full rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <p className="text-muted-foreground">{user.name}</p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="text-sm font-medium">Phone</label>

                    <p className="text-muted-foreground">
                      {user.phone_no || "Not added"}
                    </p>
                  </div>
                </div>

                {/* UNSAVED WARNING */}
                {isEditing && hasUnsavedChanges && (
                  <p className="text-sm text-yellow-600">
                    You have unsaved changes
                  </p>
                )}

                {/* PROFILE ACTIONS */}
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3 flex-wrap">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* PAYMENTS */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Saved Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-10 text-muted-foreground">
                No saved payment methods
                <Button className="mt-4">Add Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
