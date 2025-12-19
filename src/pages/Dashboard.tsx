import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile, changePassword } from "@/api/user";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { User } from "lucide-react";
import { showToast } from "@/lib/toast";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // edit states
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getMyProfile();
      setUser(data);
      setEditName(data.name || "");
      setEditPhone(data.phone_no || "");
    } catch (err) {
      showToast.error( "Failed to load profile",
      );
    } finally {
      setLoading(false);
    }
  };

  const hasUnsavedChanges =
    editName !== user?.name ||
    editPhone !== (user?.phone_no || "");

  const handleSaveProfile = async () => {
    try {
      const updatedUser = await updateMyProfile({
        name: editName,
        phone_no: editPhone ? parseInt(editPhone, 10) : 0,
      });

      setUser(updatedUser);
      setIsEditing(false);

      showToast.success("Profile updated successfully",
      );
    } catch (err: any) {
      showToast.error(
          err?.response?.data?.message ||
          "Failed to update profile",
      );
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      showToast.error(
         "Both password fields are required",
      );
      return;
    }

    try {
      await changePassword({
        oldPassword,
        newPassword,
      });

      setOldPassword("");
      setNewPassword("");
      setShowPasswordForm(false);

      showToast.success(
         "Password changed successfully",
      );
    } catch (err: any) {
      showToast.error(
          err?.response?.data?.message ||
          "Failed to change password",
      );
    }
  };

  if (loading || !user)
    return (
      <p className="text-center py-20">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <main className="container  py-8 w-full p-10 ">

        {/* USER INFO */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-3">
            <User className="h-10 w-10 text-white" />
          </div>
          <h3 className="font-semibold text-lg">
            {user.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {user.email}
          </p>
        </div>

        {/* DASHBOARD TITLE */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold">
            My Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your bookings and account
          </p>
        </div>

        {/* TABS */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="mx-auto">
            <TabsTrigger value="bookings">
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="profile">
              Profile
            </TabsTrigger>
            <TabsTrigger value="payments">
              Payments
            </TabsTrigger>
          </TabsList>

          {/* BOOKINGS */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>
                  Upcoming Trips
                </CardTitle>
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
                <CardTitle>
                  Personal Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* NAME */}
                  <div>
                    <label className="text-sm font-medium">
                      Name
                    </label>
                    {isEditing ? (
                      <input
                        className="border p-2 w-full rounded"
                        value={editName}
                        onChange={(e) =>
                          setEditName(e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-muted-foreground">
                        {user.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-sm font-medium">
                      Email
                    </label>
                    <p className="text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  {/* PHONE */}
                  <div>
                    <label className="text-sm font-medium">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        className="border p-2 w-full rounded"
                        value={editPhone}
                        onChange={(e) =>
                          setEditPhone(e.target.value)
                        }
                      />
                    ) : (
                      <p className="text-muted-foreground">
                        {user.phone_no ||
                          "Not added"}
                      </p>
                    )}
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
                  <Button
                    onClick={() =>
                      setIsEditing(true)
                    }
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-3 flex-wrap">
                    <Button
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(user.name);
                        setEditPhone(
                          user.phone_no || ""
                        );
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}

                {/* CHANGE PASSWORD */}
                <div className="pt-4 border-t">
                  {!showPasswordForm ? (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setShowPasswordForm(true)
                      }
                    >
                      Change Password
                    </Button>
                  ) : (
                    <div className="space-y-3 max-w-sm">
                      <input
                        type="password"
                        placeholder="Old password"
                        className="border p-2 w-full rounded"
                        value={oldPassword}
                        onChange={(e) =>
                          setOldPassword(
                            e.target.value
                          )
                        }
                      />

                      <input
                        type="password"
                        placeholder="New password"
                        className="border p-2 w-full rounded"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(
                            e.target.value
                          )
                        }
                      />

                      <div className="flex gap-3">
                        <Button
                          onClick={
                            handleChangePassword
                          }
                        >
                          Update Password
                        </Button>

                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowPasswordForm(
                              false
                            );
                            setOldPassword("");
                            setNewPassword("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PAYMENTS */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>
                  Saved Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-10 text-muted-foreground">
                No saved payment methods
                <Button className="mt-4">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
