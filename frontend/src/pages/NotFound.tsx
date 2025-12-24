// src/pages/NotFound.tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="p-8">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>404 - Page Not Found</CardTitle>
          <CardDescription>The page you're looking for doesn't exist</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}