import { useEffect, useState } from "react"; // 🔹 UPDATED (GENERAL ONLY)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Building, 
  Mail, 
  Bell,
  Shield,
  Globe,
  Palette
} from "lucide-react";

import { getSettingsAPI, updateSettingsAPI } from "@/api/admin/settings"; // 🔹 UPDATED (GENERAL ONLY)
import { showToast } from "@/lib/toast"; // 🔹 UPDATED (GENERAL ONLY)

export default function AdminSettings() {

  /* ================= GENERAL SETTINGS STATE ================= */ // 🔹 UPDATED
  const [settings, setSettings] = useState({
    website_name: "",
    email: "",
    contact_no: "",
    maintenance_mode: false,
  });

  const [logo, setLogo] = useState<File | null>(null); // 🔹 UPDATED
  const [loading, setLoading] = useState(false); // 🔹 UPDATED

  /* ================= FETCH GENERAL SETTINGS ================= */ // 🔹 UPDATED
  useEffect(() => {
    getSettingsAPI().then((response) => {
      const data = response.data;
      setSettings({
        website_name: data.website_name || "",
        email: data.email || "",
        contact_no: data.contact_no || "",
        maintenance_mode: Boolean(data.maintenance_mode),
      });
    });
  }, []);

  /* ================= SAVE GENERAL SETTINGS ================= */ // 🔹 UPDATED
  const handleSave = async () => {
    try {
      setLoading(true);
      await updateSettingsAPI({
        ...settings,
        logo,
      });
      showToast.success( "Settings updated successfully");
    } catch (err: any) {
      showToast.error(
        "error",
        err?.response?.data?.message || "Updation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Business
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* ================= GENERAL SETTINGS ================= */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Settings
              </CardTitle>
              <CardDescription>Configure general website settings</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">

                {/* Site Name */}
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.website_name}              
                    onChange={(e) =>
                      setSettings({ ...settings, website_name: e.target.value })
                    }
                  />
                </div>

                {/* Site URL (UNCHANGED) */}
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input id="siteUrl" defaultValue="https://travelpro.com" />
                </div>

                {/* Support Email */}
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.email}                   
                    onChange={(e) =>
                      setSettings({ ...settings, email: e.target.value })
                    }
                  />
                </div>

                {/* Support Phone */}
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={settings.contact_no}               
                    onChange={(e) =>
                      setSettings({ ...settings, contact_no: e.target.value })
                    }
                  />
                </div>

                {/* Logo Upload (OPTIONAL, GENERAL ONLY) */}
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setLogo(e.target.files?.[0] || null)
                    }
                  />
                </div>

              </div>

              <Separator />

              {/* Maintenance Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable site access for visitors
                  </p>
                </div>
                <Switch
                  checked={settings.maintenance_mode}           
                  onCheckedChange={(val) =>
                    setSettings({ ...settings, maintenance_mode: val })
                  }
                />
              </div>

              <Button
                type="button"
                onClick={handleSave}                        
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>

          {/* ================= APPEARANCE (EXACT SAME) ================= */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark theme for admin panel</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Compact Sidebar</Label>
                  <p className="text-sm text-muted-foreground">Use icons-only sidebar by default</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Settings */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Your company details for invoices and communications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="TravelPro Pvt Ltd" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input id="gstNumber" defaultValue="27AADCT1234A1ZH" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Business Park, Mumbai, Maharashtra 400001" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Currency & Tax</CardTitle>
              <CardDescription>Configure pricing and tax settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" defaultValue="INR" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstRate">GST Rate (%)</Label>
                  <Input id="gstRate" type="number" defaultValue="18" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tcs">TCS Rate (%)</Label>
                  <Input id="tcs" type="number" defaultValue="5" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Notifications
              </CardTitle>
              <CardDescription>Configure email alerts for different events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>New Booking Alert</Label>
                  <p className="text-sm text-muted-foreground">Get notified for every new booking</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Payment Received</Label>
                  <p className="text-sm text-muted-foreground">Alert when payment is confirmed</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Booking Cancellation</Label>
                  <p className="text-sm text-muted-foreground">Alert when a booking is cancelled</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Low API Credits</Label>
                  <p className="text-sm text-muted-foreground">Alert when API credits are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Daily Summary</Label>
                  <p className="text-sm text-muted-foreground">Receive daily booking summary</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>Manage authentication and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Session Duration (minutes)</Label>
                <Input type="number" defaultValue="60" className="max-w-32" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Security</CardTitle>
              <CardDescription>Manage API access and rate limiting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">Limit API requests per minute</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Requests per Minute</Label>
                <Input type="number" defaultValue="100" className="max-w-32" />
              </div>
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
